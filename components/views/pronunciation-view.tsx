"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, Mic, Loader2, RotateCcw, ChevronRight, Target, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface PracticeWord {
  word: string
  phonetic: string
  meaning: string
}

const practiceWords: PracticeWord[] = [
  { word: "entrepreneur", phonetic: "/ˌɒntrəprəˈnɜːr/", meaning: "doanh nhan" },
  { word: "particularly", phonetic: "/pəˈtɪkjələli/", meaning: "dac biet" },
  { word: "comfortable", phonetic: "/ˈkʌmftəbl/", meaning: "thoai mai" },
  { word: "restaurant", phonetic: "/ˈrestrɒnt/", meaning: "nha hang" },
  { word: "temperature", phonetic: "/ˈtemprətʃər/", meaning: "nhiet do" },
]

const practiceSentences = [
  { text: "The weather is particularly nice today", meaning: "Thoi tiet hom nay dac biet dep" },
  { text: "I would like to book a table at the restaurant", meaning: "Toi muon dat ban o nha hang" },
  { text: "She is a successful entrepreneur", meaning: "Co ay la mot doanh nhan thanh cong" },
]

// Speaker button with wave animation
function SpeakerButton({ text, size = "sm" }: { text: string; size?: "sm" | "md" | "lg" }) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  
  const speak = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11"
  }

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }

  return (
    <button
      onClick={speak}
      className={cn(
        "relative rounded-full flex items-center justify-center transition-all",
        "bg-primary/10 hover:bg-primary/20 text-primary",
        sizeClasses[size]
      )}
    >
      <Volume2 className={cn(iconSizes[size], isSpeaking && "animate-pulse")} />
      {isSpeaking && (
        <>
          <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" />
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-0.5 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${6 + i * 3}px`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </span>
        </>
      )}
    </button>
  )
}

// Recording state types
type RecordingState = "idle" | "recording" | "processing"

// Pronunciation result
interface PronunciationResult {
  original: string
  spoken: string
  words: { word: string; correct: boolean }[]
  score: number
}

export function PronunciationView() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [mode, setMode] = useState<"words" | "sentences">("words")
  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  const [result, setResult] = useState<PronunciationResult | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [practiced, setPracticed] = useState(0)
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const currentItem = mode === "words" 
    ? practiceWords[currentWordIndex]
    : practiceSentences[currentSentenceIndex]

  const targetText = mode === "words" 
    ? (currentItem as PracticeWord).word 
    : (currentItem as typeof practiceSentences[0]).text

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"
      }
    }
  }, [])

  const startRecording = () => {
    if (!recognitionRef.current) {
      alert("Trinh duyet khong ho tro nhan dang giong noi")
      return
    }

    setResult(null)
    setRecordingState("recording")

    recognitionRef.current.onresult = (event) => {
      setRecordingState("processing")
      const spoken = event.results[0][0].transcript.toLowerCase()
      
      // Simulate processing delay
      setTimeout(() => {
        analyzeResult(spoken)
      }, 800)
    }

    recognitionRef.current.onerror = () => {
      setRecordingState("idle")
    }

    recognitionRef.current.onend = () => {
      if (recordingState === "recording") {
        setRecordingState("idle")
      }
    }

    recognitionRef.current.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const analyzeResult = (spoken: string) => {
    const originalWords = targetText.toLowerCase().split(" ")
    const spokenWords = spoken.split(" ")
    
    const analyzedWords = originalWords.map((word, index) => {
      const spokenWord = spokenWords[index] || ""
      // Simple comparison - in real app would use phonetic comparison
      const correct = word.replace(/[.,!?]/g, "") === spokenWord.replace(/[.,!?]/g, "")
      return { word, correct }
    })

    const correctCount = analyzedWords.filter(w => w.correct).length
    const score = Math.round((correctCount / originalWords.length) * 100)

    setResult({
      original: targetText,
      spoken,
      words: analyzedWords,
      score
    })

    setTotalScore(prev => prev + score)
    setPracticed(prev => prev + 1)
    setRecordingState("idle")
  }

  const nextItem = () => {
    setResult(null)
    if (mode === "words") {
      setCurrentWordIndex((prev) => (prev + 1) % practiceWords.length)
    } else {
      setCurrentSentenceIndex((prev) => (prev + 1) % practiceSentences.length)
    }
  }

  const retry = () => {
    setResult(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{"Luyen Phat Am"}</h1>
          <p className="text-muted-foreground">{"Luyen tap phat am voi AI nhan dang giong noi"}</p>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{practiced} {"da luyen"}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">
              {practiced > 0 ? Math.round(totalScore / practiced) : 0}% {"TB"}
            </span>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === "words" ? "default" : "outline"}
          onClick={() => { setMode("words"); setResult(null) }}
          className="flex-1"
        >
          {"Tu Vung"}
        </Button>
        <Button
          variant={mode === "sentences" ? "default" : "outline"}
          onClick={() => { setMode("sentences"); setResult(null) }}
          className="flex-1"
        >
          {"Cau Hoan Chinh"}
        </Button>
      </div>

      {/* Main Practice Card */}
      <Card className="bg-card border-border">
        <CardHeader className="text-center pb-2">
          <CardDescription>{"Nghe va lap lai"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Target Text */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <SpeakerButton text={targetText} size="lg" />
              <h2 className="text-3xl font-bold text-foreground">{targetText}</h2>
            </div>
            
            {mode === "words" && (
              <>
                <p className="text-lg text-muted-foreground">
                  {(currentItem as PracticeWord).phonetic}
                </p>
                <Badge variant="secondary" className="text-sm">
                  {(currentItem as PracticeWord).meaning}
                </Badge>
              </>
            )}
            
            {mode === "sentences" && (
              <p className="text-muted-foreground">
                {(currentItem as typeof practiceSentences[0]).meaning}
              </p>
            )}
          </div>

          {/* Recording Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={recordingState === "recording" ? stopRecording : startRecording}
              disabled={recordingState === "processing"}
              className={cn(
                "relative h-20 w-20 rounded-full flex items-center justify-center transition-all",
                recordingState === "idle" && "bg-primary hover:bg-primary/90 text-primary-foreground",
                recordingState === "recording" && "bg-red-500 text-white",
                recordingState === "processing" && "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {recordingState === "idle" && <Mic className="h-8 w-8" />}
              {recordingState === "recording" && (
                <>
                  <Mic className="h-8 w-8" />
                  <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping" />
                  <span className="absolute inset-[-4px] rounded-full border-2 border-red-300 animate-pulse" />
                </>
              )}
              {recordingState === "processing" && <Loader2 className="h-8 w-8 animate-spin" />}
            </button>
            
            <p className="text-sm text-muted-foreground">
              {recordingState === "idle" && "Bam de bat dau ghi am"}
              {recordingState === "recording" && "Dang nghe... Bam lai de dung"}
              {recordingState === "processing" && "Dang phan tich..."}
            </p>
          </div>

          {/* Result */}
          {result && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                  result.score >= 80 ? "bg-emerald-500/20 text-emerald-400" :
                  result.score >= 50 ? "bg-amber-500/20 text-amber-400" :
                  "bg-red-500/20 text-red-400"
                )}>
                  <span className="text-2xl font-bold">{result.score}%</span>
                  <span className="text-sm">
                    {result.score >= 80 ? "Xuat sac!" :
                     result.score >= 50 ? "Kha tot!" : "Can luyen them!"}
                  </span>
                </div>
              </div>

              {/* Word by word analysis */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">{"Ket qua phan tich:"}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {result.words.map((item, index) => (
                    <span
                      key={index}
                      className={cn(
                        "px-2 py-1 rounded text-lg font-medium",
                        item.correct 
                          ? "bg-emerald-500/20 text-emerald-400" 
                          : "bg-red-500/20 text-red-400"
                      )}
                    >
                      {item.word}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  {"Ban da noi:"} <span className="text-foreground">{`"${result.spoken}"`}</span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={retry} className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {"Thu lai"}
                </Button>
                <Button onClick={nextItem} className="flex-1">
                  {"Tu tiep theo"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Word List Preview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">
            {mode === "words" ? "Danh sach tu vung" : "Danh sach cau"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {(mode === "words" ? practiceWords : practiceSentences).map((item, index) => {
              const isActive = mode === "words" 
                ? index === currentWordIndex 
                : index === currentSentenceIndex
              const text = mode === "words" 
                ? (item as PracticeWord).word 
                : (item as typeof practiceSentences[0]).text

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (mode === "words") setCurrentWordIndex(index)
                    else setCurrentSentenceIndex(index)
                    setResult(null)
                  }}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                    isActive 
                      ? "bg-primary/10 border border-primary/30" 
                      : "bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <SpeakerButton text={text} size="sm" />
                    <span className={cn(
                      "font-medium",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {text}
                    </span>
                  </div>
                  {isActive && (
                    <Badge variant="secondary" className="text-xs">
                      {"Dang luyen"}
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

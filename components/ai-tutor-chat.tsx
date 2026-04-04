"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Mic,
  Volume2,
  AlertCircle,
  Check,
  Briefcase,
  Plane,
  ShoppingCart,
  Heart,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Practice scenarios
const scenarios = [
  {
    id: 1,
    icon: Briefcase,
    title: "Phong van xin viec",
    context: "Job Interview",
    initialMessage: "Hello! I'm the hiring manager. Could you please tell me about your professional background and why you're interested in this position?",
    level: "B1+"
  },
  {
    id: 2,
    icon: Plane,
    title: "Du lich nước ngoài",
    context: "Travel Booking",
    initialMessage: "Good afternoon! I'm at the hotel reception desk. How can I help you today?",
    level: "A2+"
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: "Mua sam tai cua hang",
    context: "Shopping",
    initialMessage: "Welcome to our store! Are you looking for something specific, or would you like me to show you our latest products?",
    level: "A2"
  },
  {
    id: 4,
    icon: Heart,
    title: "Tan gau & chat chuyen",
    context: "Small Talk",
    initialMessage: "Hey! How's your day going? What are you up to these days?",
    level: "A2+"
  }
]

// Mock corrections - in real app, would come from AI
const mockCorrections = [
  { userText: "I goes to school", corrected: "I go to school", issue: "verb conjugation" },
  { userText: "She have worked", corrected: "She has worked", issue: "auxiliary verb" },
  { userText: "I dont know", corrected: "I don't know", issue: "contraction" }
]

interface Message {
  id: string
  type: "user" | "ai"
  text: string
  correction?: {
    original: string
    corrected: string
    explanation: string
  }
}

export function AITutorChat() {
  const [selectedScenario, setSelectedScenario] = useState<typeof scenarios[0] | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize scenario
  useEffect(() => {
    if (selectedScenario && messages.length === 0) {
      const initialMsg: Message = {
        id: "initial",
        type: "ai",
        text: selectedScenario.initialMessage
      }
      setMessages([initialMsg])
      speakText(selectedScenario.initialMessage)
    }
  }, [selectedScenario])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Text-to-Speech
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.rate = 0.9
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  // Speech-to-Text
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser")
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = "en-US"
    recognitionRef.current.continuous = false
    recognitionRef.current.onstart = () => setIsRecording(true)
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputValue(transcript)
      setIsRecording(false)
    }
    recognitionRef.current.onerror = () => setIsRecording(false)
    recognitionRef.current.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
  }

  // Send message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    setIsProcessing(true)
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue
    }
    
    // Simulate grammar correction (random)
    let userMsgWithCorrection = { ...userMsg }
    if (Math.random() < 0.4) {
      const randomCorrection = mockCorrections[Math.floor(Math.random() * mockCorrections.length)]
      userMsgWithCorrection.correction = {
        original: randomCorrection.userText,
        corrected: randomCorrection.corrected,
        explanation: `Better to say "${randomCorrection.corrected}" instead of "${randomCorrection.userText}" (${randomCorrection.issue})`
      }
    }
    
    setMessages(prev => [...prev, userMsgWithCorrection])
    setInputValue("")

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponses = [
        "That's great! Could you tell me more about your experience with leadership?",
        "Interesting! How long have you been working in this field?",
        "I see. What are your main strengths and how do they fit this role?",
        "That sounds good. What would you like to know about our company?",
        "Excellent point. Can you give me an example of when you demonstrated that skill?"
      ]
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)]
      }
      
      setMessages(prev => [...prev, aiMsg])
      setIsProcessing(false)
      speakText(aiMsg.text)
    }, 1000)
  }

  if (!selectedScenario) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Chon tinh huong thuc hanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary hover:bg-card/80 transition-all text-left"
              >
                <div className="flex-shrink-0">
                  <scenario.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{scenario.title}</p>
                  <p className="text-xs text-muted-foreground">{scenario.context} • {scenario.level}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px] bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <selectedScenario.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{selectedScenario.title}</p>
            <p className="text-xs text-muted-foreground">{selectedScenario.context}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedScenario(null)
            setMessages([])
          }}
        >
          Quay lai
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.type === "user" && "flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                msg.type === "ai"
                  ? "bg-primary/20 text-primary"
                  : "bg-emerald-500/20 text-emerald-400"
              )}>
                {msg.type === "ai" ? "AI" : "You"}
              </div>

              {/* Message */}
              <div className={cn(
                "flex-1 max-w-md",
                msg.type === "user" && "text-right"
              )}>
                <div className={cn(
                  "p-3 rounded-lg inline-block text-sm",
                  msg.type === "ai"
                    ? "bg-muted text-foreground rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none"
                )}>
                  {msg.text}
                </div>

                {/* Grammar Correction */}
                {msg.correction && (
                  <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-left">
                    <div className="flex gap-2 items-start">
                      <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 text-xs">
                        <p className="text-amber-400 font-semibold mb-1">Sua loi nhe:</p>
                        <p className="text-muted-foreground line-through">
                          {msg.correction.original}
                        </p>
                        <p className="text-emerald-400 font-semibold mt-1">
                          {msg.correction.corrected}
                        </p>
                        <p className="text-muted-foreground mt-1">
                          {msg.correction.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                AI
              </div>
              <div className="p-3 bg-muted rounded-lg rounded-tl-none">
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Dap lai bang tieng Anh..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => e.key === "Enter" && handleSendMessage()}
            disabled={isRecording || isProcessing}
            className="flex-1 bg-background border-border text-foreground"
          />
          
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={cn(
              isRecording && "bg-red-500 hover:bg-red-600 border-red-500"
            )}
          >
            <Mic className={cn(
              "h-4 w-4",
              isRecording && "animate-pulse"
            )} />
          </Button>

          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isProcessing}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Audio Control */}
        {messages.length > 0 && !isRecording && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => speakText(messages[messages.length - 1].text)}
            disabled={isSpeaking}
            className="w-full text-muted-foreground hover:text-primary"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            {isSpeaking ? "Dang phat..." : "Phat am cuoi cung"}
          </Button>
        )}
      </div>
    </div>
  )
}

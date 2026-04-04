"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Volume2, Plus, Check, BookOpen, ChevronLeft, ChevronRight, Bookmark, Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample reading content
const readingContent = {
  title: "The Little Prince - Chapter 1",
  level: "A2",
  content: `Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal. Here is a copy of the drawing.

In the book it said: "Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion."

I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing.`,
}

// Vocabulary dictionary with IPA and meanings
const vocabularyDict: Record<string, { ipa: string; meaning: string; partOfSpeech: string }> = {
  magnificent: { ipa: "/mæɡˈnɪfɪsənt/", meaning: "tuyệt đẹp, lộng lẫy", partOfSpeech: "adj" },
  primeval: { ipa: "/praɪˈmiːvəl/", meaning: "nguyên thủy, cổ xưa", partOfSpeech: "adj" },
  forest: { ipa: "/ˈfɒrɪst/", meaning: "rừng", partOfSpeech: "n" },
  boa: { ipa: "/ˈbəʊə/", meaning: "trăn", partOfSpeech: "n" },
  constrictor: { ipa: "/kənˈstrɪktər/", meaning: "trăn siết mồi", partOfSpeech: "n" },
  swallowing: { ipa: "/ˈswɒləʊɪŋ/", meaning: "nuốt", partOfSpeech: "v" },
  animal: { ipa: "/ˈænɪməl/", meaning: "động vật", partOfSpeech: "n" },
  drawing: { ipa: "/ˈdrɔːɪŋ/", meaning: "bức vẽ", partOfSpeech: "n" },
  prey: { ipa: "/preɪ/", meaning: "con mồi", partOfSpeech: "n" },
  chewing: { ipa: "/ˈtʃuːɪŋ/", meaning: "nhai", partOfSpeech: "v" },
  digestion: { ipa: "/daɪˈdʒestʃən/", meaning: "tiêu hóa", partOfSpeech: "n" },
  pondered: { ipa: "/ˈpɒndəd/", meaning: "suy ngẫm", partOfSpeech: "v" },
  deeply: { ipa: "/ˈdiːpli/", meaning: "sâu sắc", partOfSpeech: "adv" },
  adventures: { ipa: "/ədˈventʃəz/", meaning: "cuộc phiêu lưu", partOfSpeech: "n" },
  jungle: { ipa: "/ˈdʒʌŋɡəl/", meaning: "rừng rậm", partOfSpeech: "n" },
  succeeded: { ipa: "/səkˈsiːdɪd/", meaning: "thành công", partOfSpeech: "v" },
  colored: { ipa: "/ˈkʌləd/", meaning: "màu", partOfSpeech: "adj" },
  pencil: { ipa: "/ˈpensəl/", meaning: "bút chì", partOfSpeech: "n" },
  six: { ipa: "/sɪks/", meaning: "sáu", partOfSpeech: "num" },
  years: { ipa: "/jɪəz/", meaning: "năm", partOfSpeech: "n" },
  old: { ipa: "/əʊld/", meaning: "tuổi", partOfSpeech: "adj" },
  saw: { ipa: "/sɔː/", meaning: "nhìn thấy", partOfSpeech: "v" },
  picture: { ipa: "/ˈpɪktʃər/", meaning: "bức tranh", partOfSpeech: "n" },
  book: { ipa: "/bʊk/", meaning: "sách", partOfSpeech: "n" },
  called: { ipa: "/kɔːld/", meaning: "được gọi là", partOfSpeech: "v" },
  true: { ipa: "/truː/", meaning: "thật", partOfSpeech: "adj" },
  stories: { ipa: "/ˈstɔːriz/", meaning: "câu chuyện", partOfSpeech: "n" },
  nature: { ipa: "/ˈneɪtʃər/", meaning: "thiên nhiên", partOfSpeech: "n" },
  about: { ipa: "/əˈbaʊt/", meaning: "về", partOfSpeech: "prep" },
  whole: { ipa: "/həʊl/", meaning: "nguyên vẹn", partOfSpeech: "adj" },
  without: { ipa: "/wɪˈðaʊt/", meaning: "mà không", partOfSpeech: "prep" },
  after: { ipa: "/ˈɑːftər/", meaning: "sau khi", partOfSpeech: "prep" },
  able: { ipa: "/ˈeɪbəl/", meaning: "có thể", partOfSpeech: "adj" },
  move: { ipa: "/muːv/", meaning: "di chuyển", partOfSpeech: "v" },
  sleep: { ipa: "/sliːp/", meaning: "ngủ", partOfSpeech: "v" },
  through: { ipa: "/θruː/", meaning: "xuyên suốt", partOfSpeech: "prep" },
  months: { ipa: "/mʌnθs/", meaning: "tháng", partOfSpeech: "n" },
  need: { ipa: "/niːd/", meaning: "cần", partOfSpeech: "v" },
  work: { ipa: "/wɜːk/", meaning: "công việc", partOfSpeech: "n" },
  first: { ipa: "/fɜːst/", meaning: "đầu tiên", partOfSpeech: "adj" },
  making: { ipa: "/ˈmeɪkɪŋ/", meaning: "tạo ra", partOfSpeech: "v" },
}

// Word component with popover
function InteractiveWord({ 
  word, 
  addedWords, 
  onAddToFlashcard 
}: { 
  word: string
  addedWords: Set<string>
  onAddToFlashcard: (word: string) => void
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const cleanWord = word.toLowerCase().replace(/[.,!?;:'"()]/g, "")
  const vocabEntry = vocabularyDict[cleanWord]
  const punctuation = word.match(/[.,!?;:'"()]+$/)?.[0] || ""
  const displayWord = word.replace(/[.,!?;:'"()]+$/, "")
  const isAdded = addedWords.has(cleanWord)

  const handleSpeak = () => {
    setIsPlaying(true)
    const utterance = new SpeechSynthesisUtterance(cleanWord)
    utterance.lang = "en-US"
    utterance.onend = () => setIsPlaying(false)
    speechSynthesis.speak(utterance)
  }

  if (!vocabEntry) {
    return <span className="cursor-default">{word} </span>
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <span 
            className={cn(
              "cursor-pointer rounded px-0.5 transition-colors duration-150",
              "hover:bg-primary/20 hover:text-primary",
              isAdded && "bg-emerald-500/10 text-emerald-400"
            )}
          >
            {displayWord}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="center" side="top" sideOffset={8}>
          <div className="p-4 space-y-3">
            {/* Word and pronunciation */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xl font-bold text-foreground">{cleanWord}</p>
                <p className="text-sm text-muted-foreground">{vocabEntry.ipa}</p>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  {vocabEntry.partOfSpeech}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full",
                    isPlaying && "animate-pulse bg-primary/20"
                  )}
                  onClick={handleSpeak}
                >
                  <Volume2 className={cn("h-4 w-4", isPlaying && "text-primary")} />
                </Button>
              </div>
            </div>

            {/* Vietnamese meaning */}
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-sm font-medium text-foreground">{vocabEntry.meaning}</p>
            </div>

            {/* Add to flashcard button */}
            <Button
              variant={isAdded ? "secondary" : "default"}
              size="sm"
              className="w-full gap-2"
              onClick={() => !isAdded && onAddToFlashcard(cleanWord)}
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">Da them vao Flashcard</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Them vao Flashcard</span>
                </>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {punctuation}{" "}
    </>
  )
}

export function ReadingRoomView() {
  const [addedWords, setAddedWords] = useState<Set<string>>(new Set())
  const [fontSize, setFontSize] = useState(18)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 12

  const handleAddToFlashcard = (word: string) => {
    setAddedWords(prev => new Set([...prev, word]))
  }

  const words = readingContent.content.split(/\s+/)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Phong Doc Thong Minh
          </h1>
          <p className="mt-1 text-muted-foreground">
            Cham vao tu bat ky de xem nghia va them vao flashcard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 border-emerald-500/50 text-emerald-400">
            <BookOpen className="h-3 w-3" />
            {addedWords.size} tu da luu
          </Badge>
        </div>
      </div>

      {/* Reading Settings */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Co chu:</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                >
                  <span className="text-xs">A-</span>
                </Button>
                <span className="w-8 text-center text-sm">{fontSize}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
                >
                  <span className="text-xs">A+</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Danh dau trang</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Reading Area */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{readingContent.title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
                  Cap do {readingContent.level}
                </Badge>
                <span>Trang {currentPage}/{totalPages}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          {/* Text Container */}
          <div 
            className="prose prose-invert max-w-none leading-relaxed"
            style={{ 
              fontSize: `${fontSize}px`,
              lineHeight: 2,
            }}
          >
            {words.map((word, index) => (
              <InteractiveWord
                key={index}
                word={word}
                addedWords={addedWords}
                onAddToFlashcard={handleAddToFlashcard}
              />
            ))}
          </div>
        </CardContent>

        {/* Pagination */}
        <div className="border-t border-border/50 p-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Trang truoc
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              Trang sau
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Saved Words Summary */}
      {addedWords.size > 0 && (
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-400">
              <BookOpen className="h-5 w-5" />
              Tu vung da luu ({addedWords.size})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[...addedWords].map(word => (
                <Badge 
                  key={word} 
                  variant="secondary" 
                  className="bg-emerald-500/10 text-emerald-400 gap-1"
                >
                  <Check className="h-3 w-3" />
                  {word}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 gap-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
              Luyen tap ngay voi Flashcard
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="text-lg">i</span>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Huong dan su dung</p>
              <p className="text-sm text-muted-foreground">
                Di chuot qua bat ky tu nao de thay highlight. Click vao tu do se hien thi nghia tieng Viet, 
                phien am IPA va nut phat am. Ban co the them tu vao flashcard de on tap sau.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

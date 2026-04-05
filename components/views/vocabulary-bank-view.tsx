"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookMarked,
  Search,
  Filter,
  RotateCcw,
  Trash2,
  Volume2,
  Calendar,
  Target,
  Zap
} from "lucide-react"

interface VocabularyWord {
  id: string
  word: string
  meaning: string
  phonetic: string
  exampleSentence: string
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
  status: "new" | "learning" | "mastered"
  dateAdded: Date
}

const mockVocabulary: VocabularyWord[] = [
  {
    id: "1",
    word: "Serendipity",
    meaning: "Su may man ba gap trong cuoc song",
    phonetic: "/ˌserənˈdɪpɪti/",
    exampleSentence: "Meeting her was pure serendipity.",
    level: "B2",
    status: "learning",
    dateAdded: new Date("2026-04-01")
  },
  {
    id: "2",
    word: "Ambiguous",
    meaning: "Co nhieu y nghia, khong ro rang",
    phonetic: "/æmˈbɪɡjuəs/",
    exampleSentence: "The instruction was ambiguous and caused confusion.",
    level: "B1",
    status: "new",
    dateAdded: new Date("2026-04-03")
  },
  {
    id: "3",
    word: "Eloquent",
    meaning: "Phat bieu ro rang, xuc dong",
    phonetic: "/ˈeləkwənt/",
    exampleSentence: "The speaker gave an eloquent presentation.",
    level: "B2",
    status: "mastered",
    dateAdded: new Date("2026-03-15")
  },
  {
    id: "4",
    word: "Meticulous",
    meaning: "Chi ti, toan than co tac, can than",
    phonetic: "/məˈtɪkjələs/",
    exampleSentence: "She was meticulous in her work.",
    level: "C1",
    status: "new",
    dateAdded: new Date("2026-04-04")
  },
]

export function VocabularyBankView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [vocabulary, setVocabulary] = useState(mockVocabulary)
  const [showReviewMode, setShowReviewMode] = useState(false)

  const filteredVocab = vocabulary.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel ? word.level === filterLevel : true
    const matchesStatus = filterStatus ? word.status === filterStatus : true
    return matchesSearch && matchesLevel && matchesStatus
  })

  const statusColors = {
    new: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    learning: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    mastered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  }

  const statusLabels = {
    new: "Chu a hoc",
    learning: "Dang hoc",
    mastered: "Da master"
  }

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"]

  const handleDelete = (id: string) => {
    setVocabulary(vocabulary.filter(word => word.id !== id))
  }

  const newWordsCount = filteredVocab.filter(w => w.status === "new").length

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">So Tay Tu Vung</h1>
          <p className="text-muted-foreground">Quan ly va on tap toan bo tu vung da luu tru</p>
        </div>
        {newWordsCount > 0 && (
          <Button 
            onClick={() => setShowReviewMode(true)}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            On tap {newWordsCount} tu
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{vocabulary.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Tong so tu</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">{vocabulary.filter(w => w.status === "mastered").length}</p>
              <p className="text-sm text-muted-foreground mt-1">Da master</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{vocabulary.filter(w => w.status === "learning").length}</p>
              <p className="text-sm text-muted-foreground mt-1">Dang hoc</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-400">{newWordsCount}</p>
              <p className="text-sm text-muted-foreground mt-1">Chua hoc</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Tim kiem</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tim tu hoac nghia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-secondary/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cap do</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setFilterLevel(null)}
                    variant={filterLevel === null ? "default" : "outline"}
                    size="sm"
                  >
                    Tat ca
                  </Button>
                  {levels.map(level => (
                    <Button
                      key={level}
                      onClick={() => setFilterLevel(level)}
                      variant={filterLevel === level ? "default" : "outline"}
                      size="sm"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Trang thai</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setFilterStatus(null)}
                    variant={filterStatus === null ? "default" : "outline"}
                    size="sm"
                  >
                    Tat ca
                  </Button>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <Button
                      key={key}
                      onClick={() => setFilterStatus(key)}
                      variant={filterStatus === key ? "default" : "outline"}
                      size="sm"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vocabulary List */}
      <div className="space-y-3">
        {filteredVocab.length > 0 ? (
          filteredVocab.map(word => (
            <Card key={word.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{word.word}</h3>
                      <Badge variant="outline" className={statusColors[word.status]}>
                        {statusLabels[word.status]}
                      </Badge>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {word.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2 flex items-center gap-2">
                      <span>{word.phonetic}</span>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Volume2 className="h-3.5 w-3.5" />
                      </Button>
                    </p>
                    <p className="text-foreground mb-1">{word.meaning}</p>
                    <p className="text-muted-foreground text-sm italic">"{word.exampleSentence}"</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Them {word.dateAdded.toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDelete(word.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <BookMarked className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Khong co tu vung nao</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

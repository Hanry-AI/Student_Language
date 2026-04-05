"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle2,
  ChevronRight,
  Zap,
  Target,
  Award
} from "lucide-react"

type Step = "language" | "goal" | "test" | "result"

interface TestQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const englishTestQuestions: TestQuestion[] = [
  {
    id: 1,
    question: "Anh ta _____ da lam viec o day trong ba nam.",
    options: ["works", "is working", "has been working", "worked"],
    correct: 2,
    explanation: "Dung 'has been working' cho hanh dong bat dau trong qua khu va van tiep tuc den hien tai"
  },
  {
    id: 2,
    question: "Neu toi _____ biet dieu ay trc, toi se bao cho ban.",
    options: ["had", "would have", "have", "did"],
    correct: 0,
    explanation: "Conditional 2: If + past simple, would/would have + past participle"
  },
  {
    id: 3,
    question: "Chiec xe nay la _____ de bao tri hon chiec ke ca tien.",
    options: ["less expensive", "less expensively", "inexpensive", "more expensive"],
    correct: 0,
    explanation: "Dung comparative form 'less expensive' khi so sanh hai su vat"
  },
  {
    id: 4,
    question: "Anh ta suggeste toi _____ loi ky thi no y trung.",
    options: ["take", "taking", "to take", "takes"],
    correct: 0,
    explanation: "Sau 'suggest' dung verb + -ing hoac that-clause"
  },
  {
    id: 5,
    question: "Quyen sach nay _____ ra vao nam 2020.",
    options: ["was published", "has published", "is publishing", "published"],
    correct: 0,
    explanation: "Dung passive voice voi thoi diem cu the trong qua khu"
  },
  {
    id: 6,
    question: "Cau nay bi sai: \"I wish I would know his address\"",
    options: ["knew", "had known", "know", "would know"],
    correct: 0,
    explanation: "Sau 'wish' ve dieu khong co that trong hien tai: dung past simple"
  },
  {
    id: 7,
    question: "\"By next year, I _____ hoc tieng Anh duoc 5 nam.\"",
    options: ["will study", "will have studied", "am studying", "have been studying"],
    correct: 1,
    explanation: "Future perfect: will have + past participle cho hanh dong hoan thanh trong tuong lai"
  },
  {
    id: 8,
    question: "Anh ta xuat hien sai... mot tuan truoc.",
    options: ["as if", "as though", "even though", "though"],
    correct: 0,
    explanation: "As if/as though dung de chi trang thai gia dinh"
  },
  {
    id: 9,
    question: "\"Toi da an com roi\", anh ta noi. -> Anh ta noi toi _____.",
    options: ["had eaten", "have eaten", "ate", "would eat"],
    correct: 0,
    explanation: "Reported speech: qua khu don gian -> had + past participle"
  },
  {
    id: 10,
    question: "Neu day khong phai chu nhat, toi _____ ngoi nha.",
    options: ["would stay", "will stay", "stayed", "would have stayed"],
    correct: 0,
    explanation: "Conditional 2: If + past simple, would + bare infinitive"
  }
]

export function PlacementTestView({ onComplete }: { onComplete?: (level: string) => void }) {
  const [step, setStep] = useState<Step>("language")
  const [language, setLanguage] = useState<string | null>(null)
  const [goal, setGoal] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [testComplete, setTestComplete] = useState(false)
  const [score, setScore] = useState(0)

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang)
    setStep("goal")
  }

  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal)
    setStep("test")
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = optionIndex
    setSelectedAnswers(newAnswers)

    if (currentQuestion < englishTestQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      const correctCount = englishTestQuestions.filter((q, idx) => newAnswers[idx] === q.correct).length
      setScore(correctCount)
      setTestComplete(true)
    }
  }

  const getLevel = () => {
    const percentage = (score / englishTestQuestions.length) * 100
    if (percentage >= 90) return "C1"
    if (percentage >= 80) return "C1"
    if (percentage >= 70) return "B2"
    if (percentage >= 60) return "B1"
    if (percentage >= 45) return "A2"
    return "A1"
  }

  // Step 1: Language Selection
  if (step === "language") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Chao mung den Polyglot Hub!</CardTitle>
            <CardDescription>
              Chon ngon ngu ban muon hoc
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleLanguageSelect("english")}
                className="p-6 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
              >
                <div className="text-4xl mb-2">🇬🇧</div>
                <p className="font-semibold text-foreground">Tieng Anh</p>
                <p className="text-sm text-muted-foreground mt-1">English</p>
              </button>
              <button
                onClick={() => handleLanguageSelect("japanese")}
                className="p-6 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
              >
                <div className="text-4xl mb-2">🇯🇵</div>
                <p className="font-semibold text-foreground">Tieng Nhat</p>
                <p className="text-sm text-muted-foreground mt-1">Japanese</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Step 2: Goal Selection
  if (step === "goal") {
    const goals = [
      { id: "communication", label: "Giao tiep", emoji: "💬" },
      { id: "exam", label: "Thi IELTS/JLPT", emoji: "📝" },
      { id: "interview", label: "Phong van", emoji: "👔" },
      { id: "travel", label: "Du lich", emoji: "✈️" },
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">Muc tieu cua ban la gi?</CardTitle>
            <CardDescription>
              Dieu nay giup chung toi dieu chinh luong hoc cua ban
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {goals.map(g => (
                <button
                  key={g.id}
                  onClick={() => handleGoalSelect(g.id)}
                  className="p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
                >
                  <div className="text-3xl mb-2">{g.emoji}</div>
                  <p className="font-medium text-foreground text-sm">{g.label}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Step 3: Test
  if (step === "test" && !testComplete) {
    const question = englishTestQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / englishTestQuestions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline" className="border-primary/30 text-primary">
                Cau {currentQuestion + 1}/{englishTestQuestions.length}
              </Badge>
              <span className="text-sm text-muted-foreground">Trac nghiem xep cap</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 text-left transition-all text-foreground font-medium"
              >
                <span className="inline-block w-6 h-6 rounded-full border-2 border-muted-foreground mr-3">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Step 4: Result
  if (testComplete) {
    const level = getLevel()
    const percentage = Math.round((score / englishTestQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl mb-2">Cap do cua ban: {level}</CardTitle>
            <CardDescription>
              Ban dung {score}/{englishTestQuestions.length} cau ({percentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-2xl font-bold text-primary">{percentage}%</p>
                <p className="text-sm text-muted-foreground">Ty le dung</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-2xl font-bold text-emerald-400">{level}</p>
                <p className="text-sm text-muted-foreground">Cap CEFR</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Tuan sau, he thong se de xuat:</p>
              <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                <li>Hoc cac cau truc ngu phap cap {level}</li>
                <li>Vu tu vung cap {level}</li>
                <li>Luyen tap phat am theo dung chuan</li>
              </ul>
            </div>
            <Button 
              onClick={() => {
                if (onComplete) onComplete(level)
              }}
              className="w-full gap-2"
            >
              Bat dau hoc ngay
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

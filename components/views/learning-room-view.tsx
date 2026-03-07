"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  RotateCcw, 
  Check, 
  X, 
  ChevronRight, 
  Lightbulb,
  Brain,
  Sparkles,
  Volume2,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  Briefcase,
  Plane,
  ShoppingCart,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

// Flashcard data
const flashcards = [
  {
    id: 1,
    word: "Resilient",
    phonetic: "/rɪˈzɪliənt/",
    meaning: "Có khả năng phục hồi, kiên cường",
    partOfSpeech: "Adjective",
    example: "She remained resilient despite facing many challenges.",
    exampleVi: "Cô ấy vẫn kiên cường dù đối mặt với nhiều thử thách.",
    level: "B2"
  },
  {
    id: 2,
    word: "Procrastinate",
    phonetic: "/prəˈkræstɪneɪt/",
    meaning: "Trì hoãn, chần chừ",
    partOfSpeech: "Verb",
    example: "Don't procrastinate on your assignments.",
    exampleVi: "Đừng trì hoãn bài tập của bạn.",
    level: "B1"
  },
  {
    id: 3,
    word: "Meticulous",
    phonetic: "/məˈtɪkjələs/",
    meaning: "Tỉ mỉ, cẩn thận",
    partOfSpeech: "Adjective",
    example: "He is meticulous about his work.",
    exampleVi: "Anh ấy rất tỉ mỉ trong công việc.",
    level: "B2"
  }
]

// Grammar situations
const grammarSituations = [
  {
    id: 1,
    icon: Briefcase,
    situation: "Phỏng vấn xin việc",
    grammar: "Present Perfect",
    formula: "S + have/has + V3/ed",
    realExample: '"I have worked in marketing for 5 years."',
    realExampleVi: '"Tôi đã làm marketing được 5 năm."',
    whyUse: "Dùng để nói về kinh nghiệm tích lũy đến hiện tại - điều nhà tuyển dụng muốn nghe!",
    practice: [
      { blank: "I ___ (manage) teams of up to 20 people.", answer: "have managed" },
      { blank: "She ___ (complete) many successful projects.", answer: "has completed" }
    ]
  },
  {
    id: 2,
    icon: Plane,
    situation: "Du lịch nước ngoài",
    grammar: "Would like to / Could I",
    formula: "Would like to + V / Could I + V",
    realExample: '"I would like to book a room." / "Could I have the menu?"',
    realExampleVi: '"Tôi muốn đặt phòng." / "Cho tôi xin menu được không?"',
    whyUse: "Cách nói lịch sự khi yêu cầu dịch vụ - giúp bạn được phục vụ tốt hơn!",
    practice: [
      { blank: "___ I have a window seat?", answer: "Could" },
      { blank: "I ___ to check out, please.", answer: "would like" }
    ]
  },
  {
    id: 3,
    icon: ShoppingCart,
    situation: "Mua sắm & Thương lượng",
    grammar: "Comparatives & Superlatives",
    formula: "more + adj / adj-er + than | the most + adj / the adj-est",
    realExample: '"Is there anything cheaper?" / "This is the best quality."',
    realExampleVi: '"Có cái nào rẻ hơn không?" / "Đây là chất lượng tốt nhất."',
    whyUse: "So sánh sản phẩm để mua được món hời - kỹ năng sống thiết yếu!",
    practice: [
      { blank: "This one is ___ (expensive) than the other.", answer: "more expensive" },
      { blank: "Which is the ___ (good) option?", answer: "best" }
    ]
  },
  {
    id: 4,
    icon: Heart,
    situation: "Hẹn hò & Giao tiếp xã hội",
    grammar: "Present Continuous for Plans",
    formula: "S + am/is/are + V-ing (+ time)",
    realExample: '"Are you doing anything this weekend?" / "I\'m meeting friends on Saturday."',
    realExampleVi: '"Cuối tuần bạn có làm gì không?" / "Thứ 7 mình gặp bạn bè."',
    whyUse: "Cách tự nhiên để hỏi và nói về kế hoạch - không cứng nhắc như 'will'!",
    practice: [
      { blank: "What ___ you ___ (do) tonight?", answer: "are, doing" },
      { blank: "I ___ (have) dinner with my family.", answer: "am having" }
    ]
  }
]

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: 'Chọn từ đúng: "She ___ in this company since 2020."',
    options: ["works", "has worked", "is working", "worked"],
    correct: 1,
    explanation: "Dùng Present Perfect (has worked) vì hành động bắt đầu trong quá khứ (2020) và kéo dài đến hiện tại. 'Since' là dấu hiệu nhận biết."
  },
  {
    id: 2,
    question: '"Resilient" có nghĩa là gì?',
    options: ["Yếu đuối", "Kiên cường, phục hồi nhanh", "Chậm chạp", "Thông minh"],
    correct: 1,
    explanation: "Resilient = có khả năng phục hồi, kiên cường. VD: A resilient person bounces back from failure."
  },
  {
    id: 3,
    question: 'Cách nói lịch sự khi gọi món ăn là:',
    options: ["Give me a coffee!", "I want coffee.", "Could I have a coffee, please?", "Coffee now."],
    correct: 2,
    explanation: '"Could I have...please?" là cách nói lịch sự nhất trong nhà hàng. Tránh dùng mệnh lệnh trực tiếp như "Give me".'
  },
  {
    id: 4,
    question: 'Điền vào chỗ trống: "This hotel is ___ than the one we stayed last year."',
    options: ["more comfortable", "comfortabler", "most comfortable", "the more comfortable"],
    correct: 0,
    explanation: 'Với tính từ dài (comfortable), dùng "more + adj + than" để so sánh hơn. Không thêm -er vào cuối.'
  },
  {
    id: 5,
    question: '"I\'m meeting John tomorrow" đang dùng thì gì và với mục đích gì?',
    options: [
      "Present Simple - thói quen", 
      "Present Continuous - kế hoạch đã sắp xếp", 
      "Future Simple - dự đoán",
      "Past Continuous - quá khứ"
    ],
    correct: 1,
    explanation: "Present Continuous (am/is/are + V-ing) dùng cho kế hoạch đã được sắp xếp, lên lịch trước. Tự nhiên hơn 'will meet'."
  }
]

// Flashcard Component
function FlashcardSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<number[]>([])
  const [reviewCards, setReviewCards] = useState<number[]>([])

  const currentCard = flashcards[currentIndex]
  const progress = ((knownCards.length + reviewCards.length) / flashcards.length) * 100

  const handleKnown = () => {
    setKnownCards([...knownCards, currentCard.id])
    nextCard()
  }

  const handleReview = () => {
    setReviewCards([...reviewCards, currentCard.id])
    nextCard()
  }

  const nextCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 200)
  }

  const resetCards = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownCards([])
    setReviewCards([])
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="h-5 w-5 text-primary" />
              Thẻ Ghi nhớ Từ Vựng
            </CardTitle>
            <CardDescription>Lật thẻ để kiểm tra trí nhớ - Active Recall</CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/50 text-primary">
            {currentIndex + 1} / {flashcards.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 mt-3" />
        <div className="flex gap-4 mt-2 text-sm">
          <span className="text-emerald-400">Thuộc: {knownCards.length}</span>
          <span className="text-amber-400">Cần ôn: {reviewCards.length}</span>
        </div>
      </CardHeader>
      <CardContent>
        {currentIndex < flashcards.length ? (
          <>
            {/* 3D Flip Card */}
            <div 
              className="perspective-1000 cursor-pointer mb-6"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div 
                className={cn(
                  "relative w-full h-72 transition-transform duration-500 transform-style-preserve-3d",
                  isFlipped && "rotate-y-180"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex flex-col items-center justify-center p-6 backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Badge className="mb-4 bg-primary/20 text-primary border-0">{currentCard.level}</Badge>
                  <h3 className="text-4xl font-bold text-foreground mb-2">{currentCard.word}</h3>
                  <p className="text-muted-foreground text-lg">{currentCard.phonetic}</p>
                  <Button variant="ghost" size="icon" className="mt-4 text-muted-foreground hover:text-primary">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  <p className="text-muted-foreground text-sm mt-6 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Bấm để lật thẻ
                  </p>
                </div>
                
                {/* Back */}
                <div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex flex-col items-center justify-center p-6 rotate-y-180 backface-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <Badge variant="outline" className="mb-3 border-emerald-500/50 text-emerald-400">
                    {currentCard.partOfSpeech}
                  </Badge>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-4 text-center">{currentCard.meaning}</h3>
                  <div className="bg-background/50 rounded-lg p-4 w-full">
                    <p className="text-foreground italic mb-2">"{currentCard.example}"</p>
                    <p className="text-muted-foreground text-sm">{currentCard.exampleVi}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleReview}
                variant="outline" 
                className="flex-1 border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Cần học lại
              </Button>
              <Button 
                onClick={handleKnown}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Thuộc rồi
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
              <Check className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Hoàn thành!</h3>
            <p className="text-muted-foreground mb-4">
              Thuộc: {knownCards.length} | Cần ôn: {reviewCards.length}
            </p>
            <Button onClick={resetCards} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Học lại
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Grammar Section Component  
function GrammarSection() {
  const [selectedSituation, setSelectedSituation] = useState<number | null>(null)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState<Record<string, boolean>>({})

  const situation = selectedSituation !== null ? grammarSituations[selectedSituation] : null

  const checkAnswer = (situationId: number, practiceIndex: number, userAnswer: string, correctAnswer: string) => {
    const key = `${situationId}-${practiceIndex}`
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    setShowResults({ ...showResults, [key]: isCorrect })
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MessageSquare className="h-5 w-5 text-primary" />
          Ngữ Pháp Ứng Dụng
        </CardTitle>
        <CardDescription>Học ngữ pháp qua tình huống thực tế - không còn khô khan!</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Situation Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {grammarSituations.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedSituation(selectedSituation === index ? null : index)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all",
                selectedSituation === index 
                  ? "bg-primary/10 border-primary" 
                  : "bg-secondary/50 border-border hover:border-primary/50"
              )}
            >
              <item.icon className={cn(
                "h-6 w-6 mb-2",
                selectedSituation === index ? "text-primary" : "text-muted-foreground"
              )} />
              <p className="font-medium text-foreground text-sm">{item.situation}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.grammar}</p>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        {situation && (
          <div className="bg-secondary/30 rounded-xl p-5 border border-border space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <situation.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{situation.situation}</h4>
                <p className="text-sm text-muted-foreground">{situation.grammar}</p>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Công thức</p>
              <p className="font-mono text-primary">{situation.formula}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Câu mẫu thực tế</p>
              <p className="text-foreground font-medium">{situation.realExample}</p>
              <p className="text-muted-foreground text-sm mt-1">{situation.realExampleVi}</p>
            </div>

            <div className="flex items-start gap-2 bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
              <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-200">{situation.whyUse}</p>
            </div>

            {/* Practice */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Luyện tập ngay:</p>
              {situation.practice.map((item, idx) => {
                const key = `${situation.id}-${idx}`
                const result = showResults[key]
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Điền đáp án..."
                      className={cn(
                        "flex-1 bg-background border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                        result === true && "border-emerald-500 bg-emerald-500/10",
                        result === false && "border-red-500 bg-red-500/10"
                      )}
                      value={practiceAnswers[key] || ""}
                      onChange={(e) => setPracticeAnswers({ ...practiceAnswers, [key]: e.target.value })}
                    />
                    <Button 
                      size="sm"
                      onClick={() => checkAnswer(situation.id, idx, practiceAnswers[key] || "", item.answer)}
                    >
                      Kiểm tra
                    </Button>
                    {result === true && <Check className="h-5 w-5 text-emerald-400" />}
                    {result === false && (
                      <span className="text-xs text-red-400">Đáp án: {item.answer}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Quiz Section Component
function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === question.correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setCompleted(false)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              Trắc nghiệm Phản hồi Tức thì
            </CardTitle>
            <CardDescription>Kiểm tra nhanh - Sửa lỗi ngay lập tức</CardDescription>
          </div>
          {!completed && (
            <Badge variant="outline" className="border-primary/50 text-primary">
              Câu {currentQuestion + 1} / {quizQuestions.length}
            </Badge>
          )}
        </div>
        {!completed && <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2 mt-3" />}
      </CardHeader>
      <CardContent>
        {!completed ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-4">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === question.correct
                  const showResult = selectedAnswer !== null

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={cn(
                        "w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                        !showResult && "bg-secondary/50 border-border hover:border-primary/50 hover:bg-primary/5",
                        showResult && isCorrect && "bg-emerald-500/20 border-emerald-500",
                        showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500",
                        showResult && !isSelected && !isCorrect && "opacity-50"
                      )}
                    >
                      <span className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium shrink-0",
                        !showResult && "border-muted-foreground text-muted-foreground",
                        showResult && isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                        showResult && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
                      )}>
                        {showResult && isCorrect ? <Check className="h-4 w-4" /> : 
                         showResult && isSelected && !isCorrect ? <X className="h-4 w-4" /> :
                         String.fromCharCode(65 + index)}
                      </span>
                      <span className={cn(
                        "text-foreground",
                        showResult && isCorrect && "text-emerald-400 font-medium",
                        showResult && isSelected && !isCorrect && "text-red-400"
                      )}>
                        {option}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={cn(
                "p-4 rounded-xl border mb-4 animate-in fade-in slide-in-from-bottom-2",
                selectedAnswer === question.correct 
                  ? "bg-emerald-500/10 border-emerald-500/30" 
                  : "bg-red-500/10 border-red-500/30"
              )}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={cn(
                    "h-5 w-5 mt-0.5 shrink-0",
                    selectedAnswer === question.correct ? "text-emerald-400" : "text-red-400"
                  )} />
                  <div>
                    <p className={cn(
                      "font-medium mb-1",
                      selectedAnswer === question.correct ? "text-emerald-400" : "text-red-400"
                    )}>
                      {selectedAnswer === question.correct ? "Chính xác!" : "Chưa đúng!"}
                    </p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedAnswer !== null && (
              <Button onClick={nextQuestion} className="w-full">
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>Câu tiếp theo <ChevronRight className="h-4 w-4 ml-1" /></>
                ) : (
                  <>Xem kết quả <ArrowRight className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
              score >= quizQuestions.length * 0.8 ? "bg-emerald-500/20" : 
              score >= quizQuestions.length * 0.5 ? "bg-amber-500/20" : "bg-red-500/20"
            )}>
              <span className={cn(
                "text-3xl font-bold",
                score >= quizQuestions.length * 0.8 ? "text-emerald-400" : 
                score >= quizQuestions.length * 0.5 ? "text-amber-400" : "text-red-400"
              )}>
                {score}/{quizQuestions.length}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {score >= quizQuestions.length * 0.8 ? "Xuất sắc!" : 
               score >= quizQuestions.length * 0.5 ? "Khá tốt!" : "Cần cố gắng thêm!"}
            </h3>
            <p className="text-muted-foreground mb-6">
              Bạn trả lời đúng {score} / {quizQuestions.length} câu hỏi
            </p>
            <Button onClick={resetQuiz} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Làm lại bài quiz
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Main Learning Room View
export function LearningRoomView() {
  const [activeTab, setActiveTab] = useState<"flashcard" | "grammar" | "quiz">("flashcard")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Phong Hoc Tuong Tac</h1>
        <p className="text-muted-foreground">Micro-learning - Chia nho kien thuc de hoc hieu qua hon</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl">
        <button
          onClick={() => setActiveTab("flashcard")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
            activeTab === "flashcard" 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Brain className="h-4 w-4" />
          Tu Vung
        </button>
        <button
          onClick={() => setActiveTab("grammar")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
            activeTab === "grammar" 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <BookOpen className="h-4 w-4" />
          Ngu Phap
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
            activeTab === "quiz" 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles className="h-4 w-4" />
          Trac Nghiem
        </button>
      </div>

      {/* Content */}
      {activeTab === "flashcard" && <FlashcardSection />}
      {activeTab === "grammar" && <GrammarSection />}
      {activeTab === "quiz" && <QuizSection />}
    </div>
  )
}

"use client"

import { useState } from "react"
import { BookOpen, Clock, GraduationCap, Library, TrendingUp, AlertTriangle, CheckCircle2, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Data with exponential hours growth to show "Reality Check"
const englishData = {
  levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
  vocab: [500, 1500, 3000, 5000, 8000, 16000],
  // Cumulative hours showing exponential growth
  cumulativeHours: [100, 200, 400, 700, 1100, 1600],
  // Hours needed for each level (incremental)
  incrementalHours: [100, 100, 200, 300, 400, 500],
  details: {
    A1: {
      title: "A1 - Beginner",
      subtitle: "Khởi đầu hành trình",
      vocab: "500 từ vựng",
      hoursNeeded: "100 giờ",
      totalHours: "0 - 100 giờ",
      grammar: [
        "Thì hiện tại đơn (I work, She works)",
        "Thì hiện tại tiếp diễn (I am working)",
        "Động từ to be + tính từ/danh từ",
        "Số đếm, ngày tháng, sinh hoạt cơ bản"
      ],
      canDo: [
        "Giới thiệu bản thân đơn giản",
        "Hỏi và trả lời câu hỏi cá nhân",
        "Hiểu bảng chỉ dẫn, biển báo cơ bản"
      ],
      courseBooks: [
        { name: "English Grammar in Use (Essential)", author: "Raymond Murphy", why: "Ngữ pháp cơ bản có hình ảnh minh họa" },
        { name: "English File Beginner", author: "Oxford", why: "Giáo trình chuẩn châu Âu, có audio" }
      ],
      readingBooks: [
        { name: "Oxford Bookworms - Starter", words: "250 headwords", example: "The Mystery of Manor Hall" },
        { name: "Graded Readers Level 1", words: "300-400 words", example: "Stories for kids" }
      ],
      plateauWarning: null,
      motivation: "Giai đoạn này tiến bộ rất nhanh! Mỗi ngày bạn sẽ thấy mình hiểu thêm nhiều điều mới."
    },
    A2: {
      title: "A2 - Elementary",
      subtitle: "Nền tảng vững chắc",
      vocab: "1,500 từ vựng",
      hoursNeeded: "100 giờ",
      totalHours: "100 - 200 giờ",
      grammar: [
        "Thì quá khứ đơn (I worked, I went)",
        "Thì tương lai đơn (will + V)",
        "So sánh hơn/nhất (bigger, the biggest)",
        "Câu điều kiện loại 0, 1"
      ],
      canDo: [
        "Kể về sự kiện trong quá khứ",
        "Nói về kế hoạch tương lai",
        "Mô tả người, địa điểm đơn giản"
      ],
      courseBooks: [
        { name: "Solutions Elementary", author: "Oxford", why: "Phát triển 4 kỹ năng đồng đều" },
        { name: "KET Practice Tests", author: "Cambridge", why: "Chuẩn bị cho chứng chỉ A2 Key" }
      ],
      readingBooks: [
        { name: "Oxford Bookworms - Level 2", words: "700 headwords", example: "Robinson Crusoe (Adapted)" },
        { name: "Penguin Readers Level 2", words: "600-700 words", example: "Sherlock Holmes Short Stories" }
      ],
      plateauWarning: null,
      motivation: "Bạn đã có thể giao tiếp cơ bản! Hãy tự tin nói chuyện với người nước ngoài."
    },
    B1: {
      title: "B1 - Intermediate",
      subtitle: "Ngưỡng cửa tự tin",
      vocab: "3,000 từ vựng",
      hoursNeeded: "200 giờ",
      totalHours: "200 - 400 giờ",
      grammar: [
        "Thì hiện tại hoàn thành (I have done)",
        "Câu bị động cơ bản (It was made)",
        "Câu tường thuật (He said that...)",
        "Mệnh đề quan hệ (who, which, that)"
      ],
      canDo: [
        "Tham gia thảo luận về chủ đề quen thuộc",
        "Viết email, thư chính thức đơn giản",
        "Xem phim có phụ đề tiếng Anh"
      ],
      courseBooks: [
        { name: "Destination B1", author: "Macmillan", why: "Tập trung Grammar & Vocabulary chuyên sâu" },
        { name: "English File Intermediate", author: "Oxford", why: "Nhiều bài nghe thực tế" }
      ],
      readingBooks: [
        { name: "The Little Prince (Original)", words: "~17,000 words", example: "Truyện ngắn văn học kinh điển" },
        { name: "Oxford Bookworms - Level 4", words: "1,400 headwords", example: "A Tale of Two Cities (Adapted)" }
      ],
      plateauWarning: "Bắt đầu từ đây, mỗi cấp độ cần NHIỀU thời gian hơn gấp đôi. Đây là quy luật tự nhiên của việc học ngôn ngữ.",
      motivation: "B1 là cấp độ 'sống sót' - bạn có thể du lịch, làm việc cơ bản bằng tiếng Anh!"
    },
    B2: {
      title: "B2 - Upper Intermediate",
      subtitle: "Độc lập ngôn ngữ",
      vocab: "5,000 từ vựng",
      hoursNeeded: "300 giờ",
      totalHours: "400 - 700 giờ",
      grammar: [
        "Tất cả 12 thì tiếng Anh",
        "Câu điều kiện loại 2, 3",
        "Modal verbs nâng cao (could have, should have)",
        "Đảo ngữ nhấn mạnh (Not only...but also)"
      ],
      canDo: [
        "Tranh luận và bảo vệ quan điểm",
        "Viết essay có cấu trúc logic",
        "Xem phim không phụ đề (70% hiểu)"
      ],
      courseBooks: [
        { name: "Destination B2", author: "Macmillan", why: "Tổng hợp ngữ pháp/từ vựng B2" },
        { name: "Mindset for IELTS Level 2", author: "Cambridge", why: "Chuẩn bị IELTS 5.5-6.5" }
      ],
      readingBooks: [
        { name: "Harry Potter Series", words: "77,000-198,000/book", example: "Đọc nguyên bản, không adapted" },
        { name: "BBC News Articles", words: "500-800/article", example: "Tin tức thời sự hàng ngày" }
      ],
      plateauWarning: "Đây là 'vùng trũng' phổ biến nhất. Nhiều người bỏ cuộc ở đây vì cảm giác không tiến bộ. KIÊN TRÌ!",
      motivation: "B2 mở cửa cho công việc quốc tế và du học. Đây là mục tiêu của đa số người học!"
    },
    C1: {
      title: "C1 - Advanced",
      subtitle: "Thành thạo chuyên nghiệp",
      vocab: "10,000 từ vựng",
      hoursNeeded: "400 giờ",
      totalHours: "700 - 1,100 giờ",
      grammar: [
        "Idioms và Phrasal verbs phức tạp",
        "Văn phong học thuật (Academic English)",
        "Đảo ngữ nâng cao, Subjunctive mood",
        "Cấu trúc nhấn mạnh (Cleft sentences)"
      ],
      canDo: [
        "Thuyết trình chuyên nghiệp",
        "Viết báo cáo, luận văn học thuật",
        "Hiểu humor, sarcasm trong ngôn ngữ"
      ],
      courseBooks: [
        { name: "Destination C1/C2", author: "Macmillan", why: "Ngữ pháp & từ vựng nâng cao" },
        { name: "CAE Practice Tests", author: "Cambridge", why: "Luyện thi Certificate in Advanced English" }
      ],
      readingBooks: [
        { name: "Sapiens: A Brief History", words: "~150,000", example: "Non-fiction học thuật" },
        { name: "The Economist", words: "1,000-2,000/article", example: "Phân tích kinh tế, chính trị" }
      ],
      plateauWarning: "Tiến bộ ở C1 rất chậm và khó nhận ra. Hãy đo lường bằng những gì bạn CÓ THỂ LÀM, không phải cảm giác.",
      motivation: "C1 là cấp độ của các chuyên gia. Bạn có thể làm việc hoàn toàn bằng tiếng Anh!"
    },
    C2: {
      title: "C2 - Proficiency",
      subtitle: "Gần như bản ngữ",
      vocab: "16,000+ từ vựng",
      hoursNeeded: "500+ giờ",
      totalHours: "1,100+ giờ",
      grammar: [
        "Ngôn ngữ như công cụ nghệ thuật",
        "Hàm ý, ẩn dụ, châm biếm",
        "Văn bản cổ điển (Shakespeare, etc.)",
        "Biến thể ngôn ngữ (British, American, etc.)"
      ],
      canDo: [
        "Phiên dịch chuyên nghiệp",
        "Viết văn học, báo chí chuyên sâu",
        "Hiểu mọi accent và phương ngữ"
      ],
      courseBooks: [
        { name: "Objective Proficiency", author: "Cambridge", why: "Giáo trình chuẩn C2" },
        { name: "CPE Practice Tests", author: "Cambridge", why: "Luyện thi Certificate of Proficiency" }
      ],
      readingBooks: [
        { name: "Classic Literature", words: "Varies", example: "Shakespeare, Orwell, Austen" },
        { name: "Academic Journals", words: "5,000-10,000/paper", example: "Research papers in your field" }
      ],
      plateauWarning: null,
      motivation: "C2 không phải điểm đến, mà là hành trình. Ngay cả người bản ngữ cũng học suốt đời!"
    }
  }
}

// Chart data showing exponential growth
const chartData = englishData.levels.map((level, index) => ({
  level,
  hours: englishData.cumulativeHours[index],
  increment: englishData.incrementalHours[index],
}))

export function EnglishView() {
  const [selectedLevel, setSelectedLevel] = useState<string>("B1")
  const detail = englishData.details[selectedLevel as keyof typeof englishData.details]
  const levelIndex = englishData.levels.indexOf(selectedLevel)

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
            EN
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight text-balance">
              Lộ Trình Tiếng Anh (CEFR)
            </h1>
            <p className="text-muted-foreground mt-1">
              Khung tham chiếu ngôn ngữ chung Châu Âu - Chuẩn quốc tế
            </p>
          </div>
        </div>
      </header>

      {/* 2.1 Reality Check Chart */}
      <Card className="bg-card border-border mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Biểu Đồ Sự Thật: Thời Gian Cần Thiết
              </CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Số giờ học tăng theo cấp số nhân. Từ A1 lên A2 chỉ cần 100 giờ, nhưng từ B2 lên C1 cần 400 giờ.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Reality Check
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              hours: { label: "Giờ tích lũy", color: "#34d399" },
            }}
            className="h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="level" 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tickFormatter={(value) => `${value}h`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "hours") return [`${value} giờ tích lũy`, "Tổng thời gian"]
                    return [value, name]
                  }}
                  labelFormatter={(label) => `Cấp độ ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#34d399"
                  strokeWidth={3}
                  fill="url(#hoursGradient)"
                  dot={{ fill: "#34d399", r: 6, strokeWidth: 2, stroke: "#1e293b" }}
                  activeDot={{ r: 8, fill: "#34d399" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Insight box */}
          <div className="mt-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Hiệu ứng Plateau:</strong> Khi bạn ở mức B1-B2 và cảm thấy tiến bộ chậm, đó là hoàn toàn bình thường. 
                Biểu đồ cho thấy thời gian cần thiết tăng dần theo từng cấp độ.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2.2 Level Selection Buttons */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          Chọn cấp độ để xem chi tiết:
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {englishData.levels.map((level, index) => {
            const isSelected = selectedLevel === level
            const hours = englishData.incrementalHours[index]
            return (
              <Button
                key={level}
                variant={isSelected ? "default" : "outline"}
                onClick={() => setSelectedLevel(level)}
                className={cn(
                  "h-auto py-4 flex flex-col gap-1 transition-all",
                  isSelected
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-lg shadow-emerald-600/20"
                    : "hover:border-emerald-500/50"
                )}
              >
                <span className="text-xl font-bold">{level}</span>
                <span className={cn(
                  "text-xs",
                  isSelected ? "text-emerald-100" : "text-muted-foreground"
                )}>
                  +{hours} giờ
                </span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* 2.2 & 2.3 Level Detail Card */}
      {detail && (
        <Card className="bg-card border-l-4 border-l-emerald-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h4 className="text-2xl font-bold text-foreground">{detail.title}</h4>
                <p className="text-emerald-500 font-medium">{detail.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {detail.totalHours}
                </Badge>
                <Badge variant="outline" className="border-muted-foreground/30">
                  {detail.vocab}
                </Badge>
              </div>
            </div>

            {/* Plateau Warning */}
            {detail.plateauWarning && (
              <div className="mb-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <p className="text-sm text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                  <span>{detail.plateauWarning}</span>
                </p>
              </div>
            )}

            {/* Motivation */}
            <div className="mb-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <p className="text-sm text-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                <span>{detail.motivation}</span>
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Grammar Focus */}
                <div>
                  <h5 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Ngữ pháp trọng tâm
                  </h5>
                  <ul className="space-y-2">
                    {detail.grammar.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Can Do */}
                <div>
                  <h5 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Bạn có thể làm được
                  </h5>
                  <ul className="space-y-2">
                    {detail.canDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Resources */}
              <div className="space-y-6">
                {/* 2.3 Course Books */}
                <div>
                  <h5 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Sách giáo trình chuẩn hóa
                  </h5>
                  <div className="space-y-3">
                    {detail.courseBooks.map((book, i) => (
                      <div key={i} className="p-4 bg-muted/50 rounded-xl border border-border">
                        <div className="font-semibold text-foreground">{book.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{book.author}</div>
                        <div className="text-sm text-emerald-400 mt-2">{book.why}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2.3 Reading Books */}
                <div>
                  <h5 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Library className="w-4 h-4" />
                    Sách đọc phù hợp trình độ
                  </h5>
                  <div className="space-y-3">
                    {detail.readingBooks.map((book, i) => (
                      <div key={i} className="p-4 bg-muted/50 rounded-xl border border-border">
                        <div className="flex justify-between items-start">
                          <div className="font-semibold text-foreground">{book.name}</div>
                          <Badge variant="outline" className="text-xs">{book.words}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">VD: {book.example}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

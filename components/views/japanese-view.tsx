"use client"

import { useState } from "react"
import { BookOpen, Clock, GraduationCap, Library, TrendingUp, AlertTriangle, CheckCircle2, Target, Type } from "lucide-react"
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

// Data with exponential hours growth
const japaneseData = {
  levels: ["N5", "N4", "N3", "N2", "N1"],
  vocab: [800, 1500, 3700, 6000, 10000],
  kanji: [100, 300, 650, 1000, 2000],
  // Cumulative hours showing exponential growth
  cumulativeHours: [150, 300, 600, 1000, 1600],
  // Hours needed for each level (incremental)
  incrementalHours: [150, 150, 300, 400, 600],
  details: {
    N5: {
      title: "JLPT N5",
      subtitle: "Khởi đầu hành trình",
      metrics: { vocab: "800 từ", kanji: "100 Kanji" },
      hoursNeeded: "150 giờ",
      totalHours: "0 - 150 giờ",
      grammar: [
        "Câu cơ bản: A は B です",
        "Chia động từ: masu/te/nai/ta form",
        "Trợ từ cơ bản: は, が, を, に, で, へ",
        "Tính từ い và な"
      ],
      canDo: [
        "Tự giới thiệu bản thân",
        "Đọc hiragana và katakana thành thạo",
        "Giao tiếp siêu cơ bản trong sinh hoạt"
      ],
      courseBooks: [
        { name: "Minna no Nihongo I", author: "3A Corporation", why: "Giáo trình chuẩn cho người mới" },
        { name: "Kanji Look and Learn", author: "Japan Times", why: "Học Kanji qua hình ảnh" }
      ],
      readingBooks: [
        { name: "Truyện cổ tích song ngữ", level: "Có Furigana", example: "Momotaro, Urashima Taro" },
        { name: "NHK News Web Easy", level: "Simplified", example: "Tin đơn giản có audio" }
      ],
      plateauWarning: null,
      motivation: "Chỉ cần 150 giờ để bắt đầu đọc được tiếng Nhật! Hãy tập trung vào Hiragana và Katakana trước."
    },
    N4: {
      title: "JLPT N4",
      subtitle: "Nền tảng giao tiếp",
      metrics: { vocab: "1,500 từ", kanji: "300 Kanji" },
      hoursNeeded: "150 giờ",
      totalHours: "150 - 300 giờ",
      grammar: [
        "Tôn kính ngữ cơ bản (desu/masu)",
        "Thể bị động (rareru)",
        "Thể sai khiến (saseru)",
        "Điều kiện: と, ば, たら, なら"
      ],
      canDo: [
        "Giao tiếp cơ bản trong du lịch",
        "Hiểu hội thoại đơn giản",
        "Đọc văn bản ngắn có Furigana"
      ],
      courseBooks: [
        { name: "Minna no Nihongo II", author: "3A Corporation", why: "Tiếp nối giáo trình N5" },
        { name: "Soumatome N4", author: "ASK Publishing", why: "Tổng hợp luyện thi N4" }
      ],
      readingBooks: [
        { name: "Shinkanzen Đọc hiểu N4", level: "N4", example: "Bài đọc ngắn với giải thích" },
        { name: "Manga: Doraemon", level: "Có Furigana", example: "Manga dành cho trẻ em Nhật" }
      ],
      plateauWarning: null,
      motivation: "N4 là cấp độ 'sống sót' ở Nhật. Bạn có thể đi du lịch và giao tiếp cơ bản!"
    },
    N3: {
      title: "JLPT N3",
      subtitle: "Cầu nối trung cấp",
      metrics: { vocab: "3,700 từ", kanji: "650 Kanji" },
      hoursNeeded: "300 giờ",
      totalHours: "300 - 600 giờ",
      grammar: [
        "Diễn đạt cảm xúc phức tạp",
        "Lý do/Nguyên nhân: せい, おかげ, ため",
        "Phân biệt văn nói và văn viết",
        "Kính ngữ và khiêm nhường ngữ"
      ],
      canDo: [
        "Đọc tin tức đơn giản không Furigana",
        "Viết email chính thức cơ bản",
        "Tham gia hội thoại về chủ đề quen thuộc"
      ],
      courseBooks: [
        { name: "Shinkanzen Master N3", author: "3A Corporation", why: "Bộ sách luyện thi toàn diện" },
        { name: "Mimikara Oboeru N3", author: "ALC", why: "Ngữ pháp dễ hiểu với ví dụ thực tế" }
      ],
      readingBooks: [
        { name: "NHK News Web Easy", level: "Easy News", example: "Tin tức đơn giản hóa có audio" },
        { name: "Manga: Yotsuba to!", level: "Đời thường", example: "Ngôn ngữ tự nhiên, hội thoại thực" }
      ],
      plateauWarning: "N3 là 'vùng trũng' đầu tiên. Kanji tăng gấp đôi so với N4. Nhiều người mất động lực ở đây!",
      motivation: "N3 là bước ngoặt quan trọng - từ đây bạn bắt đầu 'thực sự' học tiếng Nhật!"
    },
    N2: {
      title: "JLPT N2",
      subtitle: "Năng lực thực chiến",
      metrics: { vocab: "6,000 từ", kanji: "1,000 Kanji" },
      hoursNeeded: "400 giờ",
      totalHours: "600 - 1,000 giờ",
      grammar: [
        "Ngữ pháp báo chí, thông báo",
        "Văn bản thương mại chính thức",
        "Kính ngữ nâng cao trong công việc",
        "Cấu trúc câu dài, phức tạp"
      ],
      canDo: [
        "Đọc báo Nhật không cần từ điển (80%)",
        "Làm việc tại công ty Nhật",
        "Xem anime/drama không phụ đề (70%)"
      ],
      courseBooks: [
        { name: "Shinkanzen Master N2", author: "3A Corporation", why: "Chuẩn vàng luyện thi N2" },
        { name: "Tobira Gateway to Advanced Japanese", author: "Kurosio", why: "Giáo trình đại học" }
      ],
      readingBooks: [
        { name: "Yahoo Japan News", level: "Native", example: "Tin tức thật, không đơn giản hóa" },
        { name: "Tiểu thuyết Keigo Higashino", level: "Popular Fiction", example: "Detective novels phổ biến" }
      ],
      plateauWarning: "N2 cần gấp đôi thời gian so với N3. Đây là cấp độ mà nhiều người học mãi không đạt!",
      motivation: "N2 mở cửa cho việc làm tại Nhật! Hầu hết công ty yêu cầu tối thiểu N2."
    },
    N1: {
      title: "JLPT N1",
      subtitle: "Cấp độ học thuật",
      metrics: { vocab: "10,000+ từ", kanji: "2,000+ Kanji" },
      hoursNeeded: "600 giờ",
      totalHours: "1,000+ giờ",
      grammar: [
        "Cấu trúc cổ điển (文語)",
        "Văn bản nghị quyết, hành chính",
        "Ngôn ngữ văn học cổ điển",
        "Biểu đạt hiếm gặp trong giao tiếp"
      ],
      canDo: [
        "Đọc văn học Nhật cổ điển",
        "Làm việc học thuật bằng tiếng Nhật",
        "Phiên dịch chuyên nghiệp"
      ],
      courseBooks: [
        { name: "Shinkanzen Master N1", author: "3A Corporation", why: "Bộ sách hoàn chỉnh N1" },
        { name: "Soumatome N1", author: "ASK Publishing", why: "Ôn tập nhanh, hiệu quả" }
      ],
      readingBooks: [
        { name: "Luận văn, Báo cáo kinh tế", level: "Academic", example: "Văn bản chuyên ngành" },
        { name: "Tiểu thuyết cổ điển Nhật", level: "Literature", example: "Natsume Soseki, Mishima Yukio" }
      ],
      plateauWarning: "N1 không phải đích đến - nhiều người đỗ N1 vẫn chưa nói trôi chảy. Đây chỉ là chứng chỉ!",
      motivation: "N1 chứng minh năng lực học thuật. Nhưng để 'giỏi' tiếng Nhật, hãy tiếp tục học sau N1!"
    }
  }
}

// Chart data showing exponential growth
const chartData = japaneseData.levels.map((level, index) => ({
  level,
  hours: japaneseData.cumulativeHours[index],
  increment: japaneseData.incrementalHours[index],
  kanji: japaneseData.kanji[index],
}))

export function JapaneseView() {
  const [selectedLevel, setSelectedLevel] = useState<string>("N3")
  const detail = japaneseData.details[selectedLevel as keyof typeof japaneseData.details]

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/20">
            JP
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight text-balance">
              Lộ Trình Tiếng Nhật (JLPT)
            </h1>
            <p className="text-muted-foreground mt-1">
              Kỳ thi Năng lực Nhật ngữ - Chuẩn quốc tế
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
                <TrendingUp className="w-5 h-5 text-rose-500" />
                Biểu Đồ Sự Thật: Thời Gian & Kanji
              </CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Tiếng Nhật đòi hỏi học Kanji song song. N3 cần gấp đôi Kanji của N4!
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
              hours: { label: "Giờ tích lũy", color: "#f43f5e" },
            }}
            className="h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="hoursGradientJP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
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
                    if (name === "kanji") return [`${value} chữ Kanji`, "Kanji cần nhớ"]
                    return [value, name]
                  }}
                  labelFormatter={(label) => `Cấp độ ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fill="url(#hoursGradientJP)"
                  dot={{ fill: "#f43f5e", r: 6, strokeWidth: 2, stroke: "#1e293b" }}
                  activeDot={{ r: 8, fill: "#f43f5e" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Kanji Progress */}
          <div className="mt-6 grid grid-cols-5 gap-2">
            {japaneseData.levels.map((level, index) => (
              <div key={level} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">{level}</div>
                <div className="text-lg font-bold text-rose-400">{japaneseData.kanji[index]}</div>
                <div className="text-xs text-muted-foreground">Kanji</div>
              </div>
            ))}
          </div>
          
          {/* Insight box */}
          <div className="mt-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Đặc thù tiếng Nhật:</strong> Kanji là rào cản lớn nhất. 
                Từ N4 lên N3, số Kanji tăng hơn gấp đôi (300 → 650). Hãy học Kanji song song với ngữ pháp!
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2.2 Level Selection Buttons */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-rose-500" />
          Chọn cấp độ để xem chi tiết:
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {japaneseData.levels.map((level, index) => {
            const isSelected = selectedLevel === level
            const hours = japaneseData.incrementalHours[index]
            const kanji = japaneseData.kanji[index]
            return (
              <Button
                key={level}
                variant={isSelected ? "default" : "outline"}
                onClick={() => setSelectedLevel(level)}
                className={cn(
                  "h-auto py-4 flex flex-col gap-1 transition-all",
                  isSelected
                    ? "bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-lg shadow-rose-600/20"
                    : "hover:border-rose-500/50"
                )}
              >
                <span className="text-xl font-bold">{level}</span>
                <span className={cn(
                  "text-xs",
                  isSelected ? "text-rose-100" : "text-muted-foreground"
                )}>
                  +{hours}h | {kanji} Kanji
                </span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* 2.2 & 2.3 Level Detail Card */}
      {detail && (
        <Card className="bg-card border-l-4 border-l-rose-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h4 className="text-2xl font-bold text-foreground">{detail.title}</h4>
                <p className="text-rose-500 font-medium">{detail.subtitle}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">
                  {detail.totalHours}
                </Badge>
                <Badge variant="outline" className="border-muted-foreground/30">
                  {detail.metrics.vocab}
                </Badge>
                <Badge variant="outline" className="border-muted-foreground/30">
                  <Type className="w-3 h-3 mr-1" />
                  {detail.metrics.kanji}
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
            <div className="mb-6 p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
              <p className="text-sm text-rose-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
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
                        <span className="text-rose-500 mt-1">•</span>
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
                        <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
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
                        <div className="text-sm text-rose-400 mt-2">{book.why}</div>
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
                          <Badge variant="outline" className="text-xs">{book.level}</Badge>
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

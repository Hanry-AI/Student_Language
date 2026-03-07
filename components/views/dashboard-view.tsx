"use client"

import { useState } from "react"
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Target,
  Trophy,
  Zap,
  Calendar,
  TrendingUp,
  Play,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface DashboardViewProps {
  onNavigate: (view: string) => void
}

// Mock user data - in real app, this would come from database
const userData = {
  name: "Minh",
  streak: 12,
  totalHours: 48,
  lastLesson: {
    type: "vocabulary",
    language: "english",
    title: "Business Vocabulary - Unit 3",
    progress: 75,
  },
  todayLearned: false,
  weeklyGoal: 5, // hours
  weeklyProgress: 3.5,
}

const goals = [
  {
    id: "english",
    language: "Tiếng Anh",
    flag: "🇬🇧",
    currentLevel: "B1",
    currentLevelFull: "Intermediate",
    targetLevel: "B2",
    targetLevelFull: "Upper Intermediate",
    progress: 45,
    totalLessons: 120,
    completedLessons: 54,
    color: "emerald",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "japanese",
    language: "Tiếng Nhật",
    flag: "🇯🇵",
    currentLevel: "N5",
    currentLevelFull: "Sơ cấp",
    targetLevel: "N3",
    targetLevelFull: "Trung cấp",
    progress: 20,
    totalLessons: 200,
    completedLessons: 40,
    color: "rose",
    gradient: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
]

const nextActions = [
  {
    id: 1,
    type: "continue",
    title: "Tiếp tục: Quiz từ vựng Business Unit 3",
    description:
      "Hôm qua bạn học từ vựng, hôm nay hãy kiểm tra với Quiz để củng cố!",
    language: "english",
    icon: Play,
    priority: "high",
    estimatedTime: "10 phút",
  },
  {
    id: 2,
    type: "review",
    title: "Ôn tập: Ngữ pháp N5 - Trợ từ は/が",
    description: "Đã 3 ngày chưa ôn tập, nên củng cố lại kiến thức này.",
    language: "japanese",
    icon: BookOpen,
    priority: "medium",
    estimatedTime: "15 phút",
  },
]

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

  const streakData = [true, true, true, true, true, false, false] // Mon-Sun

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      {/* Header with Greeting */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Chào {userData.name}! Sẵn sàng học hôm nay chưa?
          </h1>
          <p className="text-muted-foreground mt-2">
            Hãy duy trì chuỗi ngày học liên tục để đạt mục tiêu nhanh hơn.
          </p>
        </div>
        {!userData.todayLearned && (
          <Badge
            variant="outline"
            className="border-amber-500/50 text-amber-400 bg-amber-500/10 px-4 py-2 text-sm self-start"
          >
            <Zap className="w-4 h-4 mr-2" />
            Chưa học hôm nay
          </Badge>
        )}
      </header>

      {/* Section 1.3: Daily Streak & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak Card */}
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30 md:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Streak Number */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Flame className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Chuỗi ngày học
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">
                      {userData.streak}
                    </span>
                    <span className="text-xl text-muted-foreground">ngày</span>
                  </div>
                </div>
              </div>

              {/* Week Calendar */}
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-3">Tuần này</p>
                <div className="flex gap-2">
                  {weekDays.map((day, index) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-muted-foreground">{day}</span>
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                          streakData[index]
                            ? "bg-gradient-to-br from-orange-500 to-red-500 shadow-md shadow-orange-500/25"
                            : index === 5
                              ? "border-2 border-dashed border-muted-foreground/30"
                              : "bg-muted/50"
                        }`}
                      >
                        {streakData[index] ? (
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        ) : index === 5 ? (
                          <span className="text-xs text-muted-foreground">?</span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {userData.totalHours}h
                </p>
                <p className="text-xs text-muted-foreground">Tổng thời gian học</p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Mục tiêu tuần</span>
                <span className="text-foreground font-medium">
                  {userData.weeklyProgress}/{userData.weeklyGoal}h
                </span>
              </div>
              <Progress
                value={(userData.weeklyProgress / userData.weeklyGoal) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 1.2: Smart Call-to-Action */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">
            Hành động tiếp theo
          </h2>
          <Badge variant="secondary" className="ml-2">
            Đề xuất thông minh
          </Badge>
        </div>

        <div className="grid gap-4">
          {nextActions.map((action, index) => (
            <Card
              key={action.id}
              className={`border-border hover:border-primary/50 transition-all cursor-pointer group ${
                index === 0 ? "ring-2 ring-primary/20 bg-primary/5" : "bg-card"
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      action.language === "english"
                        ? "bg-emerald-500/10"
                        : "bg-rose-500/10"
                    }`}
                  >
                    <action.icon
                      className={`w-7 h-7 ${
                        action.language === "english"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {action.language === "english" ? "🇬🇧" : "🇯🇵"}
                      </span>
                      {index === 0 && (
                        <Badge className="bg-primary/20 text-primary border-0 text-xs">
                          Ưu tiên cao
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {action.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground">
                        Thời gian ước tính
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {action.estimatedTime}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className={`gap-2 ${
                        index === 0
                          ? ""
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      onClick={() =>
                        onNavigate(
                          action.language === "english" ? "english" : "japanese"
                        )
                      }
                    >
                      {index === 0 ? "Học ngay" : "Xem"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 1.1: Goal Tracker */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">
            Theo dõi Mục tiêu
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className={`bg-gradient-to-br ${goal.gradient} ${goal.borderColor} hover:shadow-lg transition-all cursor-pointer`}
              onClick={() => onNavigate(goal.id)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{goal.flag}</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {goal.language}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {goal.completedLessons}/{goal.totalLessons} bài học
                      </p>
                    </div>
                  </div>
                  <TrendingUp className={`w-5 h-5 ${goal.textColor}`} />
                </div>

                {/* Level Progress Visual */}
                <div className="relative mb-6">
                  <div className="flex items-center justify-between">
                    {/* Current Level */}
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl ${goal.bgColor} flex items-center justify-center mb-2 border-2 ${goal.borderColor}`}
                      >
                        <span className={`text-xl font-bold ${goal.textColor}`}>
                          {goal.currentLevel}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Hiện tại</p>
                      <p className="text-xs text-foreground font-medium">
                        {goal.currentLevelFull}
                      </p>
                    </div>

                    {/* Progress Arrow */}
                    <div className="flex-1 mx-4 relative">
                      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            goal.id === "english"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                              : "bg-gradient-to-r from-rose-500 to-pink-400"
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <span className={`text-sm font-bold ${goal.textColor}`}>
                          {goal.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Target Level */}
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-2 border-2 border-dashed border-muted-foreground/30">
                        <span className="text-xl font-bold text-muted-foreground">
                          {goal.targetLevel}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Mục tiêu</p>
                      <p className="text-xs text-foreground font-medium">
                        {goal.targetLevelFull}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className={`w-full justify-between ${goal.textColor} hover:bg-white/5`}
                >
                  Xem lộ trình chi tiết
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Lab Highlight */}
      <Card
        className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 border-primary/30 cursor-pointer hover:border-primary/60 transition-all group overflow-hidden"
        onClick={() => onNavigate("ai-lab")}
      >
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg shadow-primary/25 shrink-0">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <Badge className="bg-primary/20 text-primary border-0 mb-2">
                AI-Powered
              </Badge>
              <h3 className="text-2xl font-bold text-foreground">
                Gia sư AI với NotebookLM
              </h3>
              <p className="text-muted-foreground mt-2">
                Biến sách giáo khoa thành Podcast, tạo Quiz tương tác, và nhận
                giải đáp thắc mắc 24/7 từ AI.
              </p>
            </div>
            <Button size="lg" className="gap-2 shrink-0">
              Khám phá ngay
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

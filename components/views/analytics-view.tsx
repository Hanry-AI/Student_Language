"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp, Zap, BookOpen, Volume2, Eye } from "lucide-react"
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const skillsData = [
  { skill: "Tu vung", value: 85 },
  { skill: "Ngu phap", value: 72 },
  { skill: "Phat am", value: 58 },
  { skill: "Doc hieu", value: 80 },
  { skill: "Nghe hieu", value: 65 },
]

const weeklyVocabData = [
  { week: "Tuan 1", words: 32 },
  { week: "Tuan 2", words: 28 },
  { week: "Tuan 3", words: 45 },
  { week: "Tuan 4", words: 38 },
  { week: "Tuan 5", words: 52 },
  { week: "Tuan 6", words: 41 },
  { week: "Tuan 7", words: 48 },
]

const recommendations = [
  {
    skill: "Phat am",
    issue: "Sac khoang gom phap 40% (Yeu nhat)",
    suggestion: "Tang 30 phut luyen tap phat am moi ngay",
    urgency: "high" as const
  },
  {
    skill: "Nghe hieu",
    issue: "Sac khoang gom phap 65% (Trung binh)",
    suggestion: "Xem them video podcast tieng Anh goc",
    urgency: "medium" as const
  },
  {
    skill: "Tu vung",
    issue: "Sac khoang gom phap 85% (Tot)",
    suggestion: "Tiep tuc dieu chinh can co, ban dang hoc tot!",
    urgency: "low" as const
  }
]

export function AnalyticsView() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Phan tich Hoc Tap</h1>
        <p className="text-muted-foreground">Khoa hoc chi tiet ve tien bo va diem yeu cua ban</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">73%</p>
              <p className="text-sm text-muted-foreground mt-1">Tong diem</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">234</p>
              <p className="text-sm text-muted-foreground mt-1">Tu da hoc</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Volume2 className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">42.5h</p>
              <p className="text-sm text-muted-foreground mt-1">Thoi gian hoc</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground mt-1">Chuoi ngay</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Phan tich 5 Ky nang Chinh</CardTitle>
          <CardDescription>Danh gia chi tiet tung ky nang da hoc</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis tick={{ fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
              <Radar 
                name="Diem so" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.25}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Vocabulary Learning */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Vung Hoc Duoc Moi Tuan</CardTitle>
          <CardDescription>Tien do hoc tu vung 7 tuan gan day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyVocabData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="words" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">De xuat toi uu</h2>
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <Card key={idx} className={
              rec.urgency === "high" ? "border-red-500/30 bg-red-500/5" :
              rec.urgency === "medium" ? "border-amber-500/30 bg-amber-500/5" :
              "border-emerald-500/30 bg-emerald-500/5"
            }>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className={
                    rec.urgency === "high" ? "h-5 w-5 text-red-400 mt-0.5" :
                    rec.urgency === "medium" ? "h-5 w-5 text-amber-400 mt-0.5" :
                    "h-5 w-5 text-emerald-400 mt-0.5"
                  } />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{rec.skill}</h3>
                      <Badge variant="outline" className={
                        rec.urgency === "high" ? "border-red-500/30 text-red-400" :
                        rec.urgency === "medium" ? "border-amber-500/30 text-amber-400" :
                        "border-emerald-500/30 text-emerald-400"
                      }>
                        {rec.urgency === "high" ? "Khan cap" : rec.urgency === "medium" ? "Trung binh" : "Tot"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.issue}</p>
                    <p className="text-sm text-foreground"><strong>Goi y:</strong> {rec.suggestion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

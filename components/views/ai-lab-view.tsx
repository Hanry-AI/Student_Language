"use client"

import { useState } from "react"
import {
  Sparkles,
  FileText,
  Headphones,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Upload,
  Settings,
  Play,
  Users,
  PenTool,
  BookCheck,
  ChevronRight,
  Lightbulb,
  Target,
  Volume2,
  Mic,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const setupSteps = [
  {
    number: 1,
    title: "Chuan bi Tai lieu PDF",
    description:
      "Tai ban PDF cua giao trinh duoc goi y o Module 2 (Roadmap). Vi du: English File, Minna no Nihongo, Oxford Bookworms...",
    icon: FileText,
    tips: [
      "Nen chon sach co ban quyen hoac sach da mua",
      "File PDF nen duoi 50MB de tai len nhanh",
      "Co the tai nhieu file vao cung mot Notebook",
    ],
  },
  {
    number: 2,
    title: "Tao Notebook Moi",
    description: "Truy cap Google NotebookLM, dang nhap bang tai khoan Google va tao mot so tay moi cho mon hoc.",
    icon: Settings,
    tips: [
      "Dat ten Notebook ro rang: 'English B1 - Unit 3'",
      "Moi cap do nen co Notebook rieng biet",
      "Co the chia theo chu de: Grammar, Vocabulary, Reading",
    ],
  },
  {
    number: 3,
    title: "Tai File len Sources",
    description: "Keo tha file PDF vao phan 'Sources' o goc trai. NotebookLM se tu dong phan tich noi dung sach.",
    icon: Upload,
    tips: [
      "Doi 1-2 phut de AI xu ly tai lieu",
      "Kiem tra AI da hieu dung noi dung chua",
      "Co the them ghi chu bo sung neu can",
    ],
  },
  {
    number: 4,
    title: "Kich hoat Audio Overview",
    description:
      'Nhan nut "Generate" trong phan Audio Overview. AI se tao mot ban Podcast voi 2 MC thao luan ve noi dung sach cua ban!',
    icon: Headphones,
    tips: [
      "Podcast dai khoang 10-15 phut",
      "Nghe khi di xe buyt, rua bat, tap the duc",
      "Co the tai ve de nghe offline",
    ],
  },
]

const audioFeatures = [
  {
    icon: Volume2,
    title: "2 MC AI Song dong",
    description: "Hai giong noi AI thao luan tu nhien nhu ban tin radio thuc su",
  },
  {
    icon: Target,
    title: "Noi dung Tuy chinh",
    description: "Podcast dua tren CHINH XAC noi dung sach ban tai len, khong phai kien thuc chung",
  },
  {
    icon: Mic,
    title: "Nghe Thu dong",
    description: "Hoc tieng Anh luc lam viec nha, di bo, tap gym - khong can nhin man hinh",
  },
]

const promptCategories = [
  {
    id: "roleplay",
    label: "Nhap Vai",
    icon: Users,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  {
    id: "quiz",
    label: "Tao Quiz",
    icon: BookCheck,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "corrector",
    label: "Sua Loi",
    icon: PenTool,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
]

const prompts = {
  roleplay: [
    {
      id: "roleplay-interview",
      title: "Phong van Xin viec",
      scenario: "Luyen noi chuyen voi nha tuyen dung",
      content: `Ban hay dong vai mot nha tuyen dung tai cong ty cong nghe. Toi la ung vien dang phong van cho vi tri [Ten vi tri]. 

Hay phong van toi bang tieng Anh, su dung tu vung va ngu phap phu hop voi cap do [Cap do, VD: B1]. Neu toi mac loi ngu phap, hay sua loi mot cach lich su trong ngoac don () roi tiep tuc cuoc phong van tu nhien.

Bat dau bang cau hoi: "Good morning! Please tell me a little about yourself."`,
      value:
        "Tao ap luc nho de phan xa nhanh. Luyen tap tu vung chuyen nganh va cach tra loi phong van thuc te.",
    },
    {
      id: "roleplay-travel",
      title: "Du lich Nuoc ngoai",
      scenario: "Noi chuyen voi nhan vien khach san, nha hang",
      content: `Ban hay dong vai nhan vien le tan khach san tai London. Toi la khach du lich muon check-in va hoi ve cac dich vu.

Hay noi chuyen voi toi bang tieng Anh trinh do [Cap do]. Su dung tu vung thuong gap trong du lich. Neu toi noi sai, hay sua nhe nhang roi tiep tuc phuc vu.

Bat dau bang: "Good afternoon! Welcome to The Grand Hotel. Do you have a reservation?"`,
      value: "Luyen tap tinh huong thuc te khi du lich, tu vung khach san, nha hang, giao thong.",
    },
    {
      id: "roleplay-character",
      title: "Nhan vat Truyen",
      scenario: "Noi chuyen voi nhan vat trong sach da doc",
      content: `Dua vao cac nhan vat trong cuon sach truyen toi vua tai len, hay dong vai nhan vat chinh [Ten nhan vat].

Toi se la mot phong vien va phong van ban ve dien bien cau chuyen. Tra loi theo dung tinh cach, giai dieu cua nhan vat trong truyen.

Neu toi dat cau hoi sai ngu phap, hay nhac nho toi mot cach lich su trong ngoac don () truoc khi tra loi.`,
      value:
        "Hoc ngu phap qua cot truyen yeu thich. Tao dong luc hoc vi muon hieu sau hon ve nhan vat.",
    },
  ],
  quiz: [
    {
      id: "quiz-story",
      title: "Trac nghiem Cot truyen",
      scenario: "Kiem tra hieu noi dung da doc",
      content: `Hay quet noi dung chuong [So chuong] cua tai lieu toi vua tai len. Tao cho toi 5 cau hoi trac nghiem tieng Anh ve noi dung cot truyen.

Tu vung va cau truc ngu phap KHONG DUOC VUOT QUA cap do [Cap do, VD: B1].

Dung dua dap an ngay. Dua tung cau mot, doi toi tra loi roi moi cham diem va giai thich chi tiet dua tren noi dung sach.`,
      value: "Kiem tra comprehension, dam bao da hieu truoc khi chuyen sang chuong moi.",
    },
    {
      id: "quiz-grammar",
      title: "Trac nghiem Ngu phap",
      scenario: "Luyen tap diem ngu phap trong bai",
      content: `Dua tren giao trinh da tai len, hay trich xuat cac diem ngu phap chinh cua Unit/Bai [So bai].

Tao 5 cau hoi trac nghiem de kiem tra tung diem ngu phap do. Moi cau phai co 4 lua chon A, B, C, D.

Sau moi cau tra loi cua toi, hay giai thich TAI SAO dap an do dung/sai, trich dan vi du tu giao trinh.`,
      value: "Hoc ngu phap co he thong, bam sat giao trinh dang hoc thay vi kien thuc tao lan.",
    },
    {
      id: "quiz-vocab",
      title: "Tu vung Dien khuyet",
      scenario: "Luyen tu vung qua nghe canh",
      content: `Tu tai lieu da tai len, hay chon ra 10 tu vung quan trong nhat cua chuong [So chuong].

Tao bai tap dien khuyet: Dua ra cau van co cho trong ___, toi phai dien dung tu vung.

Sau moi cau tra loi, hay:
1. Cho biet dung hay sai
2. Giai thich nghia cua tu trong ngu canh do
3. Dua them 1 cau vi du khac de toi hieu ro hon`,
      value: "Hoc tu vung trong ngu canh, khong phai hoc rieng le danh sach tu vung kho khan.",
    },
  ],
  corrector: [
    {
      id: "corrector-gentle",
      title: "Sua Loi Nhe nhang",
      scenario: "Noi chuyen tu do, AI sua loi kin dao",
      content: `Tu gio, chung ta se tro chuyen bang tieng Anh ve chu de [Chu de]. Hay noi chuyen tu nhien voi toi.

Khi toi mac loi ngu phap hoac dung tu sai, hay:
1. Tra loi binh thuong de khong lam dut mach cuoc tro chuyen
2. O CUOI moi luot noi cua ban, them phan [Gop y nhe] neu co loi can sua
3. Giai thich ngan gon va dua ra cach noi dung

Bat dau bang mot cau hoi ve chu de tren.`,
      value: "Luyen noi tu nhien, khong bi gian doan lien tuc. Loi sai duoc ghi nhan de hoc sau.",
    },
    {
      id: "corrector-strict",
      title: "Sua Loi Ky luong",
      scenario: "Luyen viet, can feedback chi tiet",
      content: `Toi se viet mot doan van ngan bang tieng Anh ve chu de [Chu de]. 

Sau khi toi viet xong, hay phan tich ky luong:
1. Liet ke TAT CA loi ngu phap, chinh ta, dung tu
2. Giai thich tai sao sai va cach sua
3. Viet lai doan van HOAN CHINH da sua loi
4. Cho diem tu 1-10 va gop y de cai thien

Hay bat dau bang: "Moi ban viet doan van cua minh!"`,
      value: "Danh cho luc can luyen viet ky, nhan feedback chi tiet nhu thay giao cham bai.",
    },
    {
      id: "corrector-compare",
      title: "So sanh Cach dien dat",
      scenario: "Hoc cach noi tu nhien hon",
      content: `Toi se viet mot cau/doan tieng Anh. Nhiem vu cua ban:

1. Xac nhan cau cua toi co DUNG NGU PHAP khong (Du dung nhung co the khong tu nhien)
2. Dua ra 2-3 CACH KHAC de dien dat cung y do ma nguoi ban xu thuong dung
3. Giai thich su khac biet ve tone, muc do trang trong, ngu canh su dung

Vi du toi viet: "I want to ask you a question"
Ban co the goi y: "Can I ask you something?", "I have a question for you", "Quick question..."`,
      value: "Vuot qua muc 'dung ngu phap' de dat muc 'noi tu nhien nhu nguoi ban xu'.",
    },
  ],
}

export function AILabView() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("roleplay")
  const [expandedTip, setExpandedTip] = useState<number | null>(null)

  const copyPrompt = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header>
        <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Tinh nang Dot pha
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3 text-balance">
          Phong Lab AI: Bien Sach thanh Tro choi
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Tich hop{" "}
          <a
            href="https://notebooklm.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1 font-semibold"
          >
            Google NotebookLM
            <ExternalLink className="w-4 h-4" />
          </a>{" "}
          de bien kien thuc tinh tu sach vo thanh trai nghiem tuong tac - khong can ton tien thue
          gia su.
        </p>
      </header>

      {/* Section 4.1: Setup Guide */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">4.1 Huong dan Cai dat</h2>
            <p className="text-sm text-muted-foreground">4 buoc de bat dau voi NotebookLM</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {setupSteps.map((step, index) => (
            <Card
              key={step.number}
              className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => setExpandedTip(expandedTip === index ? null : index)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {step.number}
                  </div>
                  <step.icon className="w-5 h-5 text-muted-foreground mt-1" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {step.description}
                </p>

                {expandedTip === index && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {step.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-2 text-xs">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button className="text-xs text-primary flex items-center gap-1 mt-2 group-hover:underline">
                  {expandedTip === index ? "An meo" : "Xem meo"}
                  <ChevronRight
                    className={`w-3 h-3 transition-transform ${expandedTip === index ? "rotate-90" : ""}`}
                  />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Audio Overview Highlight */}
        <Card className="mt-6 bg-gradient-to-br from-primary/10 via-card to-card border-primary/30 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Badge className="mb-3 bg-primary/20 text-primary">Tinh nang Dac biet</Badge>
                <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-primary" />
                  Audio Overview - Podcast AI
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Chuyen doi sach giao khoa dang chu nham chan thanh ban tin Podcast tieng Anh song
                  dong voi 2 MC AI thao luan ve noi dung sach cua ban. Nghe thu dong luc rua bat, di
                  xe buyt, tap gym.
                </p>
                <Button className="gap-2" asChild>
                  <a
                    href="https://notebooklm.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="w-4 h-4" />
                    Mo NotebookLM
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-1 gap-3">
                {audioFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                  >
                    <feature.icon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 4.2: Prompt Library */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">4.2 Thu vien Lenh (Prompts)</h2>
            <p className="text-sm text-muted-foreground">
              Copy va dan vao NotebookLM de bat dau hoc
            </p>
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="bg-muted mb-6 p-1">
            {promptCategories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="gap-2 data-[state=active]:bg-background"
              >
                <cat.icon className={`w-4 h-4 ${cat.color}`} />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {promptCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="space-y-4">
              {prompts[cat.id as keyof typeof prompts].map((prompt) => (
                <Card
                  key={prompt.id}
                  className="bg-card border-border overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <CardHeader className="pb-3 bg-muted/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${cat.bgColor}`}>
                          <cat.icon className={`w-4 h-4 ${cat.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-base font-bold">{prompt.title}</CardTitle>
                          <p className="text-xs text-muted-foreground">{prompt.scenario}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyPrompt(prompt.id, prompt.content)}
                        className="gap-2 shrink-0"
                      >
                        {copiedId === prompt.id ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400">Da copy!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {prompt.content}
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-primary">Gia tri:</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{prompt.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Quick Tips */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            Meo su dung hieu qua
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Thay the [...] bang thong tin cu the</h4>
              <p className="text-xs text-muted-foreground">
                VD: [Cap do] thanh B1, [Chu de] thanh &ldquo;du lich&rdquo;, [Ten vi tri] thanh &ldquo;Marketing
                Executive&rdquo;
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Ket hop nhieu Prompt</h4>
              <p className="text-xs text-muted-foreground">
                Sau khi lam Quiz, chuyen sang Roleplay de thuc hanh tu vung vua hoc trong tinh huong
                thuc te
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Luu lai hoi thoai</h4>
              <p className="text-xs text-muted-foreground">
                NotebookLM luu lich su chat. Xem lai de on tap nhung loi sai da duoc AI sua truoc do
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Zap, Sparkles, BookOpen } from 'lucide-react'

interface LessonGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLessonGenerated: (lesson: GeneratedLesson) => void
}

export interface GeneratedLesson {
  title: string
  level: string
  topic: string
  reading: {
    title: string
    content: string
    vocabulary: Array<{ word: string; meaning: string; ipa: string }>
  }
  flashcards: Array<{ word: string; meaning: string; example: string; ipa: string }>
  quiz: Array<{
    question: string
    options: string[]
    correct: number
    explanation: string
  }>
}

const motivationalMessages = [
  'Dang soan tu vung cho ban...',
  'Dang ren tri tue nhan tao...',
  'Dang xay dung phuong phap hoc...',
  'Dang tao cau vi du thuc te...',
  'Dang soan bang trac nghiem...',
  'Dang kiem chung chat luong bai hoc...',
  'Sap xong roi, chi con chut...',
]

const levels = [
  { value: 'A1', label: 'Beginner (A1)' },
  { value: 'A2', label: 'Elementary (A2)' },
  { value: 'B1', label: 'Intermediate (B1)' },
  { value: 'B2', label: 'Upper Intermediate (B2)' },
  { value: 'C1', label: 'Advanced (C1)' },
  { value: 'C2', label: 'Mastery (C2)' },
]

const LoadingScreen = ({ progress, message }: { progress: number; message: string }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-6">
    <div className="flex items-center gap-3">
      <Sparkles className="h-8 w-8 text-primary animate-spin" />
      <div>
        <p className="text-lg font-semibold text-foreground">{message}</p>
        <p className="text-sm text-muted-foreground">Tien do: {progress}%</p>
      </div>
    </div>

    <div className="w-full max-w-md space-y-2">
      <Progress value={progress} className="h-2" />
    </div>

    <p className="text-xs text-muted-foreground text-center">
      He thong AI dang tao bai hoc rieng cho ban...
    </p>
  </div>
)

export function DynamicLessonGenerator({
  open,
  onOpenChange,
  onLessonGenerated,
}: LessonGeneratorProps) {
  const [level, setLevel] = useState('B1')
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0])

  useEffect(() => {
    if (!isGenerating) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 90)
      })
    }, 800)

    const messageInterval = setInterval(() => {
      setCurrentMessage(
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ]
      )
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [isGenerating])

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)
    setProgress(0)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 6000))

      // Mock generated lesson
      const generatedLesson: GeneratedLesson = {
        title: `Hoc ve: ${topic}`,
        level,
        topic,
        reading: {
          title: topic,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          vocabulary: [
            { word: 'Hello', meaning: 'Xin chao', ipa: '/həˈloʊ/' },
            { word: 'Coffee', meaning: 'Cafe', ipa: '/ˈkɔːfi/' },
            { word: 'Please', meaning: 'Vui long', ipa: '/pliːz/' },
          ],
        },
        flashcards: [
          {
            word: 'Morning',
            meaning: 'Buoi sang',
            example: 'Good morning!',
            ipa: '/ˈmɔːrnɪŋ/',
          },
          {
            word: 'Water',
            meaning: 'Nuoc',
            example: 'A glass of water, please.',
            ipa: '/ˈwɔːtər/',
          },
          {
            word: 'Thank you',
            meaning: 'Cam on',
            example: 'Thank you very much!',
            ipa: '/ˈθæŋk juː/',
          },
        ],
        quiz: [
          {
            question: 'Dung tieng Anh de noi "Xin chao"',
            options: ['Goodbye', 'Hello', 'Good night', 'Welcome'],
            correct: 1,
            explanation: 'Hello la cach chao hoi chinh thuc trong tieng Anh.',
          },
          {
            question: 'Cau nao dung ve thoi tiet?',
            options: [
              'The weather is nice today',
              'The weather are nice today',
              'Nice is weather today',
              'Weather nice today is',
            ],
            correct: 0,
            explanation:
              'Weather dung voi "is" vi no la danh tu so it, chu khong phai "are".',
          },
          {
            question: 'Dung tu nao de tao loi moi?',
            options: [
              'Would you like...',
              'Do you want...',
              'Ca A va B deu dung',
              'Chi A dung',
            ],
            correct: 2,
            explanation: 'Ca hai cach phat bieu deu chinh xac va su dung pho bien.',
          },
        ],
      }

      setProgress(100)
      setTimeout(() => {
        onLessonGenerated(generatedLesson)
        setIsGenerating(false)
        onOpenChange(false)
        setTopic('')
        setProgress(0)
      }, 500)
    } catch (error) {
      console.error('Error generating lesson:', error)
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Sinh Bai Hoc Tu Dong
          </DialogTitle>
          <DialogDescription>
            Hay cho AI biet ban muon hoc gi hom nay
          </DialogDescription>
        </DialogHeader>

        {!isGenerating ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chon Cap do</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Chu de Hoc</label>
              <Input
                placeholder="Vi du: Cach order cafe, Tin tuc cong nghe..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && topic.trim()) {
                    handleGenerate()
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Cang chi tiet cang tot, AI se tao bai hoc phu hop nhat
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic.trim()}
              className="w-full"
              size="lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Tao Bai Hoc
            </Button>
          </div>
        ) : (
          <LoadingScreen progress={progress} message={currentMessage} />
        )}
      </DialogContent>
    </Dialog>
  )
}

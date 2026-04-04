"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { DashboardView } from "@/components/views/dashboard-view"
import { EnglishView } from "@/components/views/english-view"
import { JapaneseView } from "@/components/views/japanese-view"
import { AILabView } from "@/components/views/ai-lab-view"
import { LearningRoomView } from "@/components/views/learning-room-view"
import { ReadingRoomView } from "@/components/views/reading-room-view"
import { PronunciationView } from "@/components/views/pronunciation-view"

type ViewType = "dashboard" | "english" | "japanese" | "ai-lab" | "learning-room" | "reading-room" | "pronunciation"

export default function PolyglotHub() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard")

  const handleNavigate = (view: string) => {
    setActiveView(view as ViewType)
  }

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView onNavigate={handleNavigate} />
      case "learning-room":
        return <LearningRoomView />
      case "reading-room":
        return <ReadingRoomView />
      case "pronunciation":
        return <PronunciationView />
      case "english":
        return <EnglishView />
      case "japanese":
        return <JapaneseView />
      case "ai-lab":
        return <AILabView />
      default:
        return <DashboardView onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <AppSidebar activeView={activeView} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader activeView={activeView} onNavigate={handleNavigate} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  )
}

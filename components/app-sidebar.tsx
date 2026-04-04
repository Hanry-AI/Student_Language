"use client"

import { BookOpen, Home, Sparkles, GraduationCap, Languages, BookText, Mic } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  activeView: string
  onNavigate: (view: string) => void
}

const navItems = [
  {
    group: "Hoc Tap",
    items: [
      { id: "dashboard", label: "Tong Quan", icon: Home },
      { id: "learning-room", label: "Phong Hoc Tuong Tac", icon: GraduationCap },
      { id: "reading-room", label: "Phong Doc Thong Minh", icon: BookText },
      { id: "pronunciation", label: "Luyen Phat Am", icon: Mic },
      { id: "english", label: "Lo trinh Tieng Anh", flag: "GB" },
      { id: "japanese", label: "Lo trinh Tieng Nhat", flag: "JP" },
    ],
  },
  {
    group: "Cong Cu Tro Giang",
    items: [{ id: "ai-lab", label: "Phong Lab AI", icon: Sparkles }],
  },
]

export function AppSidebar({ activeView, onNavigate }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 text-primary font-bold text-xl tracking-tight">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Languages className="w-5 h-5 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Polyglot Hub
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto px-3">
        {navItems.map((group) => (
          <div key={group.group} className="mb-6">
            <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {group.group}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    activeView === item.id
                      ? "bg-primary/15 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.icon ? (
                    <item.icon className="w-4 h-4" />
                  ) : (
                    <span className="text-lg leading-none">{item.flag}</span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-primary-foreground font-bold text-sm">
            HV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{"Hoc Vien"}</p>
            <p className="text-xs text-muted-foreground">{"Tai khoan Mien phi"}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

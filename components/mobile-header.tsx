"use client"

import { Languages } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MobileHeaderProps {
  activeView: string
  onNavigate: (view: string) => void
}

const navOptions = [
  { value: "dashboard", label: "Tong Quan" },
  { value: "learning-room", label: "Phong Hoc" },
  { value: "reading-room", label: "Phong Doc" },
  { value: "pronunciation", label: "Phat Am" },
  { value: "english", label: "Tieng Anh" },
  { value: "japanese", label: "Tieng Nhat" },
  { value: "ai-lab", label: "Phong Lab AI" },
]

export function MobileHeader({ activeView, onNavigate }: MobileHeaderProps) {
  return (
    <header className="md:hidden bg-card h-16 border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-2 text-primary font-bold text-lg">
        <Languages className="w-5 h-5" />
        <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Polyglot Hub
        </span>
      </div>
      <Select value={activeView} onValueChange={onNavigate}>
        <SelectTrigger className="w-[160px] bg-muted border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {navOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  )
}

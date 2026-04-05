"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, Globe, Palette, Settings } from "lucide-react"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [voiceGender, setVoiceGender] = useState<"male" | "female">("male")
  const [voiceSpeed, setVoiceSpeed] = useState(1)
  const [language, setLanguage] = useState("english")
  const [theme, setTheme] = useState("dark")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Cai dat va Ca nhan hoa
          </DialogTitle>
          <DialogDescription>
            Tuy chinh tro trong hoc tap theo suc thich cua ban
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Voice Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Tuy chinh Giong Noi
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Gioi tinh giong noi</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setVoiceGender("male")}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    voiceGender === "male"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  Nam
                </button>
                <button
                  onClick={() => setVoiceGender("female")}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    voiceGender === "female"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  Nu
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Toc do doc ({voiceSpeed}x)</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.25"
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Cham (0.5x)</span>
                <span>Nhanh (2x)</span>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Tuy chinh Ngon Ngu Hoc
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLanguage("english")}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  language === "english"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">🇬🇧</div>
                <p className="text-sm font-medium">Tieng Anh</p>
              </button>
              <button
                onClick={() => setLanguage("japanese")}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  language === "japanese"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">🇯🇵</div>
                <p className="text-sm font-medium">Tieng Nhat</p>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Luu y:</strong> Ban co the bat cu luc nao thay doi giua hai ngon ngu tren Sidebar
              </p>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Tuy chinh Giao Dien
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme("dark")}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  theme === "dark"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">🌙</div>
                <p className="text-sm font-medium">Toi (Hien tai)</p>
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  theme === "light"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">☀️</div>
                <p className="text-sm font-medium">Sang</p>
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-3 border-t border-border pt-6">
            <h3 className="font-semibold text-foreground">Cau hinh Nhanh</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  setVoiceGender("female")
                  setVoiceSpeed(0.75)
                }}
                variant="outline"
                size="sm"
              >
                An (Cham + Nu)
              </Button>
              <Button
                onClick={() => {
                  setVoiceGender("male")
                  setVoiceSpeed(1.25)
                }}
                variant="outline"
                size="sm"
              >
                Tiem (Nhanh + Nam)
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 border-t border-border pt-6">
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Luu Cai Dat
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1"
            >
              Thoat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

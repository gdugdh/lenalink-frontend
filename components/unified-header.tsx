"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function UnifiedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#7B91FF]">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 max-w-full">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white shrink-0">
                <img src={"/logo.png"} className="w-full h-full object-contain p-1" />
              </div>
              <span className="text-lg sm:text-xl font-semibold text-white">LenaLink</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <button className="text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap">
                ENG
              </button>
              <button className="text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap">
                Помощь и поддержка
              </button>
              <button className="flex items-center gap-2 text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap">
                Регистрация
              </button>
              <button className="flex items-center gap-2 text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap">
                Вход
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle className="text-left">Меню</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
            >
              ENG
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
            >
              Помощь и поддержка
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
            >
              Регистрация
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
            >
              Вход
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

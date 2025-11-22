"use client";

import Link from "next/link";

export function UnifiedHeader() {
  return (
    <header className="bg-[#7B91FF]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <img src={"/logo.png"} />
            </div>
            <span className="text-xl font-semibold text-white">LenaLink</span>
          </Link>

          <div className="flex items-center gap-6">
            <button className="text-sm text-white hover:text-white/80">
              ENG
            </button>
            <button className="text-sm text-white hover:text-white/80">
              Помощь и поддержка
            </button>
            <button className="flex items-center gap-2 text-sm text-white hover:text-white/80">
              Регистрация
            </button>
            <button className="flex items-center gap-2 text-sm text-white hover:text-white/80">
              Вход
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'quiz' | 'excuses' | 'calculator' | 'wheel' | 'reflex';
  setActiveTab: (tab: 'quiz' | 'excuses' | 'calculator' | 'wheel' | 'reflex') => void;
  onStartQuiz: () => void;
  isDark: boolean;
  toggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onStartQuiz,
  isDark,
  toggleDark,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-200/60 dark:border-stone-800 bg-amber-50/90 dark:bg-stone-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setActiveTab('quiz')}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            SlothMeter
          </span>
          <span className="text-xs text-amber-700/80 dark:text-amber-400/80 hidden sm:inline whitespace-nowrap">
            สถาบันวัดความขี้เกียจสากล
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'quiz' ? 'text-amber-800 dark:text-amber-400 font-semibold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            แบบวัดระดับ
          </button>
          <button
            onClick={() => setActiveTab('excuses')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'excuses' ? 'text-amber-800 dark:text-amber-400 font-semibold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            สุ่มข้ออ้าง
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'calculator' ? 'text-amber-800 dark:text-amber-400 font-semibold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            คำนวณแคลอรีที่เซฟ
          </button>
          <button
            onClick={() => setActiveTab('wheel')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'wheel' ? 'text-amber-800 dark:text-amber-400 font-semibold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            วงล้อช่วยคิด
          </button>
          <button
            onClick={() => setActiveTab('reflex')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'reflex' ? 'text-amber-800 dark:text-amber-400 font-semibold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            ทดสอบความไว
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleDark}
            aria-label="สลับโหมดกลางวัน/กลางคืน"
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-amber-100/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onStartQuiz}
            className="px-4 py-2 text-xs font-semibold text-white bg-amber-800 dark:bg-amber-600 hover:bg-amber-900 dark:hover:bg-amber-500 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>เริ่มตรวจวัด</span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer / sub-bar for small screens */}
      <div className="md:hidden flex overflow-x-auto gap-3 px-4 py-2 bg-amber-100/50 dark:bg-stone-800/60 border-t border-amber-200/40 dark:border-stone-800 text-xs no-scrollbar">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'quiz' ? 'bg-amber-800 text-white font-medium' : 'text-stone-700 dark:text-stone-300'}`}
        >
          แบบวัดระดับ
        </button>
        <button
          onClick={() => setActiveTab('excuses')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'excuses' ? 'bg-amber-800 text-white font-medium' : 'text-stone-700 dark:text-stone-300'}`}
        >
          สุ่มข้ออ้าง
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'calculator' ? 'bg-amber-800 text-white font-medium' : 'text-stone-700 dark:text-stone-300'}`}
        >
          คำนวณแคลอรี
        </button>
        <button
          onClick={() => setActiveTab('wheel')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'wheel' ? 'bg-amber-800 text-white font-medium' : 'text-stone-700 dark:text-stone-300'}`}
        >
          วงล้อช่วยคิด
        </button>
        <button
          onClick={() => setActiveTab('reflex')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'reflex' ? 'bg-amber-800 text-white font-medium' : 'text-stone-700 dark:text-stone-300'}`}
        >
          ทดสอบความไว
        </button>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { EXCUSES_LIST } from '../data/excusesData';
import { ExcuseItem } from '../types';
import { Shuffle, Copy, Check, Star, ShieldAlert, Sparkles } from 'lucide-react';

export const ExcuseGeneratorModal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentExcuse, setCurrentExcuse] = useState<ExcuseItem>(EXCUSES_LIST[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter excuses
  const filteredList =
    selectedCategory === 'all'
      ? EXCUSES_LIST
      : EXCUSES_LIST.filter((item) => item.category === selectedCategory);

  const handleRandomize = () => {
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * filteredList.length);
      setCurrentExcuse(filteredList[randomIdx]);
      counter++;
      if (counter >= 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 60);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentExcuse.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>เครื่องมือสนับสนุนสายสลอธ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          คลังข้ออ้างระดับพรีเมียม
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          สุ่มข้ออ้างสุดเนียนเพื่อการปฏิเสธอย่างสุภาพ ปลอดภัย และได้นอนพักผ่อนอย่างเต็มอิ่ม
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/70 rounded-xl max-w-lg mx-auto">
        <button
          onClick={() => {
            setSelectedCategory('all');
            setCurrentExcuse(EXCUSES_LIST[0]);
          }}
          className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          ทั้งหมด ({EXCUSES_LIST.length})
        </button>
        <button
          onClick={() => {
            setSelectedCategory('friend');
            const found = EXCUSES_LIST.find((e) => e.category === 'friend');
            if (found) setCurrentExcuse(found);
          }}
          className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'friend'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          เลื่อนนัดเพื่อน
        </button>
        <button
          onClick={() => {
            setSelectedCategory('work');
            const found = EXCUSES_LIST.find((e) => e.category === 'work');
            if (found) setCurrentExcuse(found);
          }}
          className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'work'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          เลื่อนส่งงาน
        </button>
        <button
          onClick={() => {
            setSelectedCategory('party');
            const found = EXCUSES_LIST.find((e) => e.category === 'party');
            if (found) setCurrentExcuse(found);
          }}
          className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'party'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          งานสังสรรค์
        </button>
        <button
          onClick={() => {
            setSelectedCategory('exercise');
            const found = EXCUSES_LIST.find((e) => e.category === 'exercise');
            if (found) setCurrentExcuse(found);
          }}
          className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            selectedCategory === 'exercise'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          ออกกำลังกาย
        </button>
      </div>

      {/* Main Excuse Display Card */}
      <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 transition-all">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-stone-100 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-amber-800 dark:text-amber-400">
              หมวดหมู่: {currentExcuse.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-mono">
              <span className="text-stone-500">ความเนียน:</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < currentExcuse.believability
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 text-stone-500">
              <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />
              <span>ความเสี่ยง: <strong className="font-medium text-stone-700 dark:text-stone-300">{currentExcuse.riskLevel}</strong></span>
            </div>
          </div>
        </div>

        {/* Excuse Text Box */}
        <div
          className={`p-6 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 min-h-[140px] flex items-center justify-center transition-all ${
            isSpinning ? 'opacity-50 scale-98' : 'opacity-100 scale-100'
          }`}
        >
          <p className="text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 text-center leading-relaxed">
            "{currentExcuse.text}"
          </p>
        </div>

        {/* Tactical commentary */}
        <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl text-xs text-stone-600 dark:text-stone-400">
          💡 <strong>เทคนิคใช้งาน:</strong> {currentExcuse.effectNotes}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleRandomize}
            disabled={isSpinning}
            className="cursor-pointer w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-lg bg-amber-800 dark:bg-amber-600 text-white hover:bg-amber-900 dark:hover:bg-amber-500 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Shuffle className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>สุ่มข้ออ้างใหม่</span>
          </button>

          <button
            onClick={handleCopy}
            className="cursor-pointer w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'คัดลอกข้อความแล้ว!' : 'คัดลอกไปส่งไลน์'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

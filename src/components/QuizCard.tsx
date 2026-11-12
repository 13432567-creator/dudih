import React, { useState } from 'react';
import { QuizQuestion, QuizOption } from '../types';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, Lightbulb, Check } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (option: QuizOption) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Web Speech API for lazy users who don't want to read
  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${question.scenario}. ${question.question}. ตัวเลือกที่ 1: ${question.options[0].text}. ตัวเลือกที่ 2: ${question.options[1].text}. ตัวเลือกที่ 3: ${question.options[2].text}. ตัวเลือกที่ 4: ${question.options[3].text}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'th-TH';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-all">
      {/* Top Meta Bar: Question Progress & Audio Reader */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
          <span className="font-semibold text-amber-800 dark:text-amber-400">
            คำถามที่ {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span aria-hidden="true">/</span>
          <span>{String(totalQuestions).padStart(2, '0')}</span>
          <span aria-hidden="true">·</span>
          <span className="text-stone-400 dark:text-stone-500 hidden sm:inline">
            {question.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Lazy reader speech button */}
          <button
            onClick={handleToggleSpeak}
            title={isSpeaking ? 'หยุดอ่าน' : 'เปิดเสียงอ่าน (สำหรับคนขี้เกียจอ่านตัวหนังสือ)'}
            className={`cursor-pointer px-2.5 py-1 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
              isSpeaking
                ? 'bg-amber-800 text-white animate-pulse'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isSpeaking ? 'กำลังอ่าน...' : 'อ่านให้ฟัง'}
            </span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden mt-3 mb-6">
        <div
          className="bg-amber-600 dark:bg-amber-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Scenario kicker */}
      <p className="text-xs font-medium tracking-wide text-amber-700 dark:text-amber-400 uppercase mb-2">
        สถานการณ์: {question.scenario}
      </p>

      {/* Main Question Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 leading-snug mb-6 text-balance">
        {question.question}
      </h2>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(option)}
              className={`cursor-pointer w-full text-left p-4 rounded-xl border transition-all duration-150 relative group ${
                isSelected
                  ? 'border-amber-800 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-950/20 shadow-xs'
                  : 'border-stone-200 dark:border-stone-800 hover:border-amber-400/80 dark:hover:border-stone-700 bg-stone-50/40 dark:bg-stone-800/40 hover:bg-white dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-semibold transition-colors ${
                    isSelected
                      ? 'bg-amber-800 text-white'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 group-hover:bg-amber-200 group-hover:text-amber-900'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : String.fromCharCode(65 + idx)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 leading-normal">
                    {option.text}
                  </p>
                  {option.subtext && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {option.subtext}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Instant reaction feedback note if selected */}
      {selectedOption && (
        <div className="mb-6 p-3 bg-amber-100/60 dark:bg-amber-950/30 border border-amber-300/50 dark:border-amber-800/40 rounded-xl flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
          <span className="font-medium">
            ความคิดเห็นสลอธ: "{selectedOption.reaction}"
          </span>
          <span className="font-mono font-semibold text-amber-800 dark:text-amber-400">
            +{selectedOption.points} แต้ม
          </span>
        </div>
      )}

      {/* Tip footer */}
      {question.tip && (
        <div className="flex items-start gap-2 text-xs text-stone-500 dark:text-stone-400 mb-6 bg-stone-50 dark:bg-stone-800/30 p-3 rounded-lg border border-stone-100 dark:border-stone-800">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>เกร็ดความรู้สลอธศาสตร์: {question.tip}</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`cursor-pointer px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
            canGoPrev
              ? 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              : 'text-stone-300 dark:text-stone-700 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ย้อนกลับ</span>
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-5 bg-amber-800 dark:bg-amber-400'
                  : i < currentIndex
                  ? 'bg-amber-300 dark:bg-stone-600'
                  : 'bg-stone-200 dark:bg-stone-800'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`cursor-pointer px-5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
            canGoNext
              ? 'bg-amber-800 dark:bg-amber-600 text-white hover:bg-amber-900 dark:hover:bg-amber-500'
              : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
          }`}
        >
          <span>{currentIndex === totalQuestions - 1 ? 'ดูผลการประเมิน' : 'ข้อถัดไป'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

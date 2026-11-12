import React, { useState } from 'react';
import { WHEEL_OPTIONS } from '../data/excusesData';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const LazyWheel: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedResult(null);

    // Pick random index
    const randomIndex = Math.floor(Math.random() * WHEEL_OPTIONS.length);
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full turns
    const degreesPerSegment = 360 / WHEEL_OPTIONS.length;
    
    // Target rotation
    const targetDeg = rotation + extraSpins * 360 + (WHEEL_OPTIONS.length - randomIndex) * degreesPerSegment;
    setRotation(targetDeg);

    setTimeout(() => {
      setSelectedResult(WHEEL_OPTIONS[randomIndex]);
      setIsSpinning(false);
    }, 2800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 text-center">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ระบบช่วยตัดสินใจแบบไม่ต้องใช้พลังสมอง</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          วงล้อคนขี้เกียจคิด
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          เมื่อสมองล้าเกินกว่าจะเลือกว่าจะทำอะไรต่อ ให้โชคชะตาแห่งสลอธชี้นำทางให้คุณ
        </p>
      </div>

      {/* Wheel Canvas Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
        {/* Pointer Triangle at top */}
        <div className="absolute top-0 z-20 -mt-2">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-800 dark:border-t-amber-500 drop-shadow-md" />
        </div>

        {/* Circular Wheel */}
        <div
          className="w-full h-full rounded-full border-4 border-amber-300 dark:border-stone-700 shadow-xl overflow-hidden relative transition-transform duration-[2800ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {WHEEL_OPTIONS.map((opt, idx) => {
            const angle = (idx * 360) / WHEEL_OPTIONS.length;
            const bgColors = [
              'bg-amber-100 text-amber-950',
              'bg-orange-100 text-orange-950',
              'bg-amber-200 text-amber-950',
              'bg-yellow-100 text-yellow-950',
              'bg-stone-100 text-stone-900',
              'bg-emerald-100 text-emerald-950',
              'bg-blue-100 text-blue-950',
              'bg-rose-100 text-rose-950',
            ];
            const colorClass = bgColors[idx % bgColors.length];

            return (
              <div
                key={idx}
                className={`absolute top-0 left-0 w-full h-full flex items-start justify-center pt-3 text-[11px] font-semibold ${colorClass}`}
                style={{
                  clipPath: 'polygon(50% 50%, 30% 0%, 70% 0%)',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <span className="w-20 text-center leading-tight line-clamp-2 mt-2">
                  {opt}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Spin Hub Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="absolute z-10 w-20 h-20 rounded-full bg-amber-900 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-amber-800 disabled:opacity-80 transition-all cursor-pointer flex flex-col items-center justify-center border-4 border-amber-100"
        >
          <Compass className={`w-5 h-5 mb-0.5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'หมุน...' : 'หมุนเลย'}</span>
        </button>
      </div>

      {/* Result Display Box */}
      {selectedResult && (
        <div className="bg-amber-100/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 p-6 rounded-2xl max-w-md mx-auto space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>โชคชะตาบัญชาให้คุณ:</span>
          </div>
          <p className="text-xl font-bold text-stone-900 dark:text-stone-100">
            "{selectedResult}"
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            ทำตามนี้ได้เลย ไม่ต้องคิดมาก สบายใจได้!
          </p>
        </div>
      )}
    </div>
  );
};

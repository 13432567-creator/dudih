import React, { useState } from 'react';
import { ENERGY_ACTIVITIES, EnergySavedActivity } from '../data/excusesData';
import { Flame, Clock, Leaf, PlusCircle, CheckSquare, Square, RotateCcw } from 'lucide-react';

export const EnergyCalculator: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['a1', 'a3', 'a4']);
  const [bedHours, setBedHours] = useState<number>(4);

  const toggleActivity = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(ENERGY_ACTIVITIES.map((a) => a.id));
  };

  const resetAll = () => {
    setSelectedIds([]);
  };

  // Calculations
  const selectedActivities = ENERGY_ACTIVITIES.filter((a) => selectedIds.includes(a.id));

  const baseCalories = selectedActivities.reduce((acc, curr) => acc + curr.caloriesSaved, 0);
  const baseMinutes = selectedActivities.reduce((acc, curr) => acc + curr.timeMinutes, 0);
  const baseCarbon = selectedActivities.reduce((acc, curr) => acc + curr.carbonGrams, 0);

  // Additional calculation from lying in bed instead of running errands (~60 kcal saved per hour vs walking)
  const bedCalories = bedHours * 55;
  const totalCalories = baseCalories + bedCalories;
  const totalMinutes = baseMinutes + bedHours * 60;
  const totalCarbon = baseCarbon + bedHours * 120; // savings from not driving/taking transit

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" />
          <span>สถาบันวิจัยการอนุรักษ์พลังงานแห่งชาติ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          เครื่องคำนวณพลังงานที่ประหยัดได้จากความขี้เกียจ
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
          เปลี่ยนความขี้เกียจให้กลายเป็นคุณงามความดี! คำนวณแคลอรี เวลาพักผ่อน และคาร์บอนเครดิตที่คุณช่วยกู้โลกด้วยการไม่ขยับตัว
        </p>
      </div>

      {/* Real-time KPI Metric Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 p-6 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>พลังงานกล้ามเนื้อที่ประหยัดได้</span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-900 dark:text-amber-400 tabular-nums">
              {totalCalories}
            </span>
            <span className="text-xs font-mono font-medium text-stone-500">kcal</span>
          </div>
          <p className="text-[11px] text-stone-500">
            เทียบเท่ากับการไม่ต้องวิ่งรอบสนาม {Math.max(1, Math.round(totalCalories / 45))} รอบ
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 p-6 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>เวลาพักผ่อนสุทธิที่ได้รับคืน</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-blue-900 dark:text-blue-400 tabular-nums">
              {(totalMinutes / 60).toFixed(1)}
            </span>
            <span className="text-xs font-mono font-medium text-stone-500">ชั่วโมง ({totalMinutes} นาที)</span>
          </div>
          <p className="text-[11px] text-stone-500">
            เวลาสำหรับไถคลิปสั้นและนอนกลางวันเพิ่ม
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 p-6 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>คาร์บอนไดออกไซด์ที่ลดลง</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-900 dark:text-emerald-400 tabular-nums">
              {totalCarbon}
            </span>
            <span className="text-xs font-mono font-medium text-stone-500">กรัม CO₂</span>
          </div>
          <p className="text-[11px] text-stone-500">
            ฮีโร่ปกป้องโลกร้อนตัวจริงโดยไม่ต้องก้าวขา
          </p>
        </div>
      </div>

      {/* Bed Hours Slider */}
      <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 p-6 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>🛏️ ชั่วโมงที่นอนแผ่หลาบนเตียง/โซฟาวันนี้:</span>
            <span className="font-mono text-amber-800 dark:text-amber-400 font-bold text-base">
              {bedHours} ชม.
            </span>
          </label>
          <span className="text-xs text-stone-500">
            (ประหยัด {bedHours * 55} kcal + ช่วยโลก {bedHours * 120}g CO₂)
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={16}
          step={1}
          value={bedHours}
          onChange={(e) => setBedHours(Number(e.target.value))}
          className="w-full accent-amber-800 dark:accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-400 font-mono">
          <span>0 ชม. (ขยันเกิน)</span>
          <span>8 ชม. (มาตรฐาน)</span>
          <span>16 ชม. (สลอธแท้จริง)</span>
        </div>
      </div>

      {/* Activity Checklist */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            เลือกพฤติกรรมที่คุณละเว้นวันนี้ (ติ๊กเพื่อสะสมคะแนนกู้โลก)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="cursor-pointer text-xs font-medium text-amber-800 dark:text-amber-400 hover:underline"
            >
              เลือกทั้งหมด
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={resetAll}
              className="cursor-pointer text-xs font-medium text-stone-500 hover:underline"
            >
              ล้างค่า
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ENERGY_ACTIVITIES.map((act) => {
            const isChecked = selectedIds.includes(act.id);
            return (
              <button
                key={act.id}
                onClick={() => toggleActivity(act.id)}
                className={`cursor-pointer w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'border-amber-700 dark:border-amber-500 bg-amber-50/60 dark:bg-amber-950/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 bg-stone-50/40 dark:bg-stone-800/40'
                }`}
              >
                <div className="mt-0.5 text-amber-800 dark:text-amber-400 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 fill-amber-100 dark:fill-amber-900" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                    {act.name}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    เซฟ {act.caloriesSaved} kcal · ได้เวลาคืน {act.timeMinutes} นาที
                  </p>
                  <p className="text-[10px] text-amber-800 dark:text-amber-400/90 italic mt-1">
                    {act.funFact}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

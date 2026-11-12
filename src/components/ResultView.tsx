import React, { useState, useEffect } from 'react';
import { UserAssessmentResult } from '../types';
import { SlothMeterGauge } from './SlothMeterGauge';
import { Certificate } from './Certificate';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Award,
  Sparkles,
  Zap,
  ShieldAlert,
  Clock,
  Bed,
  Layers,
  Activity,
  HeartHandshake
} from 'lucide-react';

interface ResultViewProps {
  result: UserAssessmentResult;
  onRetake: () => void;
  userName: string;
  onNameChange: (name: string) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onRetake,
  userName,
  onNameChange,
}) => {
  const [tab, setTab] = useState<'overview' | 'certificate' | 'routine'>('overview');
  const { profile, score } = result;

  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#10b981', '#6366f1', '#ec4899'],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Hero Banner of Result */}
      <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative aura */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-100/50 dark:bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          {/* Gauge & Main Score */}
          <div className="flex flex-col items-center shrink-0">
            <SlothMeterGauge score={score} size={260} />
            <div className="mt-2 text-center">
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                สถานะผลการตรวจ: สมบูรณ์ 100%
              </span>
            </div>
          </div>

          {/* Classification & Sloth Mascot */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <img
                src="/src/assets/images/sloth_mascot_avatar_1794458098710.jpg"
                alt="Sloth Mascot Avatar"
                className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-amber-200 dark:border-stone-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs uppercase font-mono tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                  ประเภทสายพันธุ์ความขี้เกียจของคุณ
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                  {profile.titleTh}
                </h1>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  {profile.titleEn}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed max-w-xl">
              {profile.description}
            </p>

            <blockquote className="border-l-0 pl-0 italic text-xs sm:text-sm text-amber-900 dark:text-amber-200 bg-amber-50/80 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
              "{profile.quote}"
            </blockquote>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setTab('certificate')}
                className="cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg bg-amber-800 text-white hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-500 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Award className="w-3.5 h-3.5" />
                <span>รับใบประกาศนียบัตร</span>
              </button>
              <button
                onClick={onRetake}
                className="cursor-pointer px-4 py-2 text-xs font-medium rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 border border-stone-200 dark:border-stone-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ทำแบบทดสอบใหม่</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/80 rounded-xl max-w-md mx-auto">
        <button
          onClick={() => setTab('overview')}
          className={`cursor-pointer px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
            tab === 'overview'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          ดัชนี & จุดเด่น
        </button>
        <button
          onClick={() => setTab('routine')}
          className={`cursor-pointer px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
            tab === 'routine'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          ตารางชีวิตสลอธ
        </button>
        <button
          onClick={() => setTab('certificate')}
          className={`cursor-pointer px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
            tab === 'certificate'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          ใบประกาศนียบัตร
        </button>
      </div>

      {/* Tab 1: Overview & Metrics */}
      {tab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Quantitative Biomarkers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">ดัชนีรวมร่างกับเตียง</span>
                <Bed className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {profile.bedFusionIndex}%
              </p>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${profile.bedFusionIndex}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500">อัตราการดูดกลืนมวลสารเข้าสู่ฟูกนอน</p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">การผัดวันประกันพรุ่ง</span>
                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {profile.procrastinationRatio}%
              </p>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-600 h-full rounded-full"
                  style={{ width: `${profile.procrastinationRatio}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500">โอกาสที่จะบอกว่า "พรุ่งนี้ค่อยทำ"</p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">ความเร็วในการสุ่มข้ออ้าง</span>
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {profile.excuseVelocity}%
              </p>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${profile.excuseVelocity}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500">ความเนียนในการหาเหตุผลเอาตัวรอด</p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">สัมประสิทธิ์การเซฟแรง</span>
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {profile.energyConservation}%
              </p>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${profile.energyConservation}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500">ประหยัดพลังงานเพื่อสู้โลกร้อน</p>
            </div>
          </div>

          {/* Superpower & Weakness Dual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-amber-200/80 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-semibold text-sm">
                <Zap className="w-4 h-4" />
                <span>พลังพิเศษประจำสายพันธุ์ (Superpower)</span>
              </div>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {profile.superpower}
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-amber-200/80 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>จุดอ่อนที่ต้องระวัง (Vulnerability)</span>
              </div>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {profile.weakness}
              </p>
            </div>
          </div>

          {/* Philosophical Advice */}
          <div className="p-6 bg-amber-50 dark:bg-stone-800/60 rounded-2xl border border-amber-200/60 dark:border-stone-800 flex items-start gap-4">
            <HeartHandshake className="w-6 h-6 text-amber-800 dark:text-amber-400 shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                สารจากสถาบันสลอธศาสตร์: อย่ารู้สึกผิดกับความขี้เกียจ!
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                ความขี้เกียจคือกลไกทางวิวัฒนาการในการอนุรักษ์พลังงานของบรรพบุรุษมนุษย์ สิ่งสำคัญคือการบริหาร "ความขี้เกียจเชิงสร้างสรรค์" ทำงานฉลาดเพื่อประหยัดเวลา แล้วเอาเวลาที่เหลือไปนอนเล่นอย่างมีความสุข!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Daily Routine */}
      {tab === 'routine' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              ไทม์ไลน์ชีวิตใน 1 วันของ "{profile.titleTh}"
            </h3>
            <p className="text-xs text-stone-500">
              แบบจำลองตารางเวลาที่สะท้อนวิถีชีวิตสลอธอย่างแท้จริง
            </p>
          </div>

          <div className="space-y-4">
            {profile.dailyRoutine.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-stone-700 text-amber-900 dark:text-amber-300 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Official Certificate */}
      {tab === 'certificate' && (
        <Certificate
          userName={userName}
          onNameChange={onNameChange}
          profile={profile}
          score={score}
        />
      )}
    </div>
  );
};

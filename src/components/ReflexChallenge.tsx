import React, { useState, useRef } from 'react';
import { Timer, Zap, RotateCcw, Award } from 'lucide-react';

type GameState = 'idle' | 'waiting' | 'ready' | 'finished' | 'too_early';

export const ReflexChallenge: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);

    // Random delay between 1.5s and 4.0s
    const delay = Math.floor(Math.random() * 2500) + 1500;
    timerTimeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState('ready');
    }, delay);
  };

  const handleClickBox = () => {
    if (gameState === 'idle') {
      startTest();
    } else if (gameState === 'waiting') {
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
      setGameState('too_early');
    } else if (gameState === 'ready') {
      const elapsed = Date.now() - startTimeRef.current;
      setReactionTime(elapsed);
      setHistory((prev) => [elapsed, ...prev.slice(0, 4)]);
      setGameState('finished');
    } else if (gameState === 'finished' || gameState === 'too_early') {
      startTest();
    }
  };

  const getEvaluation = (timeMs: number) => {
    if (timeMs < 250) {
      return {
        title: 'ขยันเกินมาตรฐานมนุษย์!',
        desc: 'เร็วปานสายฟ้าแลบ หัวใจเต้นถี่เกินไปแล้ว รีบผ่อนคลายกล้ามเนื้อด่วน',
        color: 'text-amber-600',
      };
    }
    if (timeMs < 500) {
      return {
        title: 'ความเร็วปุถุชนคนทั่วไป',
        desc: 'ตอบสนองตามสัญชาตญาณปกติ ยังมีความอยากขยับตัวอยู่บ้าง',
        color: 'text-blue-600',
      };
    }
    if (timeMs < 900) {
      return {
        title: 'เข้าสู่ฌานแห่งสลอธ',
        desc: 'เริ่มชิล จิตใจผ่อนคลาย กล้ามเนื้อเริ่มไม่ยอมทำงานตามสั่ง',
        color: 'text-emerald-600',
      };
    }
    return {
      title: 'จักรพรรดิแห่งความเชื่องช้า!',
      desc: 'นิ่งสนิทดุจก้อนหินริมลำธาร ไม่มีความรีบร้อนในดีเอ็นเอ ยินดีด้วย!',
      color: 'text-purple-600',
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 text-center">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
          <Timer className="w-3.5 h-3.5" />
          <span>แบบทดสอบระบบประสาทสัมผัส</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          ทดสอบความไวสไตล์สลอธ
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          ในโลกสลอธศาสตร์ ยิ่งคุณกดช้า... แปลว่าคุณยิ่งเข้าถึงสัจธรรมแห่งการพักผ่อน!
        </p>
      </div>

      {/* Interactive Click Area */}
      <div
        onClick={handleClickBox}
        className={`w-full h-64 sm:h-72 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-200 border-2 shadow-sm ${
          gameState === 'idle'
            ? 'bg-amber-100/60 dark:bg-stone-800 border-amber-300 dark:border-stone-700 hover:scale-[1.01]'
            : gameState === 'waiting'
            ? 'bg-rose-100 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
            : gameState === 'ready'
            ? 'bg-emerald-500 border-emerald-600 text-white animate-pulse'
            : gameState === 'too_early'
            ? 'bg-amber-200 dark:bg-amber-900 border-amber-400'
            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
        }`}
      >
        {gameState === 'idle' && (
          <div className="space-y-3">
            <Zap className="w-12 h-12 text-amber-800 dark:text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              คลิกตรงนี้เพื่อเริ่มทดสอบ
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
              เมื่อหน้าจอกลายเป็นสีเขียว ให้กดให้ไว (หรือแกล้งกดช้าๆ เพื่อความเป็นสลอธ)
            </p>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="space-y-3">
            <div className="w-10 h-10 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-xl font-bold text-rose-900 dark:text-rose-200">
              รอแป๊บ... ห้ามกด!
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-300">
              รอจนกว่าพื้นหลังจะเปลี่ยนเป็นสีเขียว
            </p>
          </div>
        )}

        {gameState === 'ready' && (
          <div className="space-y-2 text-white">
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
              กดเดี๋ยวนี้!
            </h3>
            <p className="text-xs text-emerald-100">คลิกที่กล่องนี้ทันที!</p>
          </div>
        )}

        {gameState === 'too_early' && (
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-amber-950 dark:text-amber-200">
              ใจร้อนเกินไปแล้ว!
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              กดก่อนสัญญาณสีเขียว แปลว่ายังมีกิเลสความรีบร้อน คลิกเพื่อลองใหม่
            </p>
          </div>
        )}

        {gameState === 'finished' && reactionTime !== null && (
          <div className="space-y-2">
            <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              เวลาตอบสนองของคุณ
            </p>
            <p className="text-5xl font-extrabold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
              {reactionTime} <span className="text-lg font-normal text-stone-500">ms</span>
            </p>
            <div className="pt-2">
              <span className={`text-sm font-bold ${getEvaluation(reactionTime).color}`}>
                {getEvaluation(reactionTime).title}
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                {getEvaluation(reactionTime).desc}
              </p>
            </div>
            <p className="text-[11px] text-stone-400 pt-3">
              คลิกตรงนี้อีกครั้งเพื่อทดสอบรอบต่อไป
            </p>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-xl flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400">
          <span className="font-sans font-medium">สถิติล่าสุด:</span>
          <div className="flex gap-3">
            {history.map((t, idx) => (
              <span key={idx} className="tabular-nums">
                #{idx + 1}: {t}ms
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

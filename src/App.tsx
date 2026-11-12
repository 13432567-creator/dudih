import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuizCard } from './components/QuizCard';
import { ResultView } from './components/ResultView';
import { ExcuseGeneratorModal } from './components/ExcuseGeneratorModal';
import { EnergyCalculator } from './components/EnergyCalculator';
import { LazyWheel } from './components/LazyWheel';
import { ReflexChallenge } from './components/ReflexChallenge';
import { QUIZ_QUESTIONS, getProfileByScore } from './data/quizData';
import { UserAssessmentResult, QuizOption } from './types';
import { Sparkles, ArrowRight, Bed, ShieldCheck, Award, Shuffle, Coffee } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'excuses' | 'calculator' | 'wheel' | 'reflex'>('quiz');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, QuizOption>>({});
  const [assessmentResult, setAssessmentResult] = useState<UserAssessmentResult | null>(null);
  const [userName, setUserName] = useState<string>('');

  // Handle Dark Mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  // Start / Reset Quiz
  const handleStartQuiz = () => {
    setActiveTab('quiz');
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAssessmentResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (option: QuizOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [QUIZ_QUESTIONS[currentQuestionIndex].id]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Calculate final score
      const totalPossiblePoints = QUIZ_QUESTIONS.length * 4;
      let rawScore = 0;
      const answersMap: Record<number, number> = {};

      Object.entries(selectedAnswers).forEach(([qId, opt]) => {
        rawScore += opt.points;
        answersMap[Number(qId)] = opt.points;
      });

      const percentageScore = Math.round((rawScore / totalPossiblePoints) * 100);
      const profile = getProfileByScore(percentageScore);

      setAssessmentResult({
        score: percentageScore,
        rawScore,
        totalPossible: totalPossiblePoints,
        profile,
        answers: answersMap,
        timestamp: new Date().toISOString(),
        userName: userName.trim() || 'ยอดนักสลอธนิรนาม',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const currentSelectedOpt = selectedAnswers[currentQ?.id];

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Strict Top Navigation Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartQuiz={handleStartQuiz}
        isDark={isDark}
        toggleDark={toggleDark}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {activeTab === 'quiz' && (
          <>
            {/* Case A: Quiz not started yet -> Display Hero & Overview */}
            {!quizStarted && !assessmentResult && (
              <div className="space-y-16">
                {/* Hero 2-Column Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  {/* Left Column: Copy & Actions */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                    {/* Quiet Metadata Header */}
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-800 dark:text-amber-400 font-semibold uppercase tracking-wider">
                      <span>สถาบันวิจัยสลอธศาสตร์นานาชาติ</span>
                      <span aria-hidden="true">·</span>
                      <span>INTERNATIONAL SLOTHOLOGY</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15] text-balance">
                      คุณขี้เกียจระดับไหน?{' '}
                      <span className="text-amber-800 dark:text-amber-500">
                        ตรวจวัดระดับความเกียจคร้านที่แท้จริง
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                      แบบประเมินพฤติกรรมสุดแม่นยำ 10 ข้อ วิเคราะห์ระดับการรวมร่างกับที่นอน
                      อัตราการผัดวันประกันพรุ่ง สัมประสิทธิ์การประหยัดพลังงาน
                      พร้อมออกใบประกาศนียบัตรเชิดชูเกียรติคนขี้เกียจดีเด่นอย่างเป็นทางการ
                    </p>

                    {/* Clean unboxed metadata separator */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                      <span>10 สถานการณ์จำลอง</span>
                      <span aria-hidden="true">·</span>
                      <span>ประเมิน 5 สายพันธุ์สลอธ</span>
                      <span aria-hidden="true">·</span>
                      <span>มีเสียงอ่านสำหรับคนขี้เกียจ</span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={handleStartQuiz}
                        className="cursor-pointer px-6 py-3 text-sm font-semibold rounded-xl bg-amber-800 dark:bg-amber-600 text-white hover:bg-amber-900 dark:hover:bg-amber-500 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>เริ่มตรวจวัด (ใช้เวลา 2 นาที)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('excuses')}
                        className="cursor-pointer px-5 py-3 text-sm font-medium rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-colors flex items-center gap-2"
                      >
                        <Shuffle className="w-4 h-4 text-stone-500" />
                        <span>สุ่มข้ออ้างด่วน</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Hero Sloth Image */}
                  <div className="lg:col-span-5 relative flex items-center">
                    <div className="w-full h-full min-h-[320px] rounded-3xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-md relative group">
                      <img
                        src="/src/assets/images/hero_sloth_relaxation_1794458097914.jpg"
                        alt="Sloth Relaxation Master"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end p-6">
                        <div className="text-white space-y-1">
                          <p className="text-xs uppercase font-mono tracking-wider text-amber-300 font-semibold">
                            วิถีแห่งการอนุรักษ์พลังงาน
                          </p>
                          <p className="text-sm font-medium text-stone-100">
                            "การนอนนิ่งๆ บนโซฟา คือการช่วยลดการปล่อยก๊าซเรือนกระจกที่ดีที่สุด"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4-Column Proof & Statistics Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 rounded-2xl shadow-xs">
                  <div className="space-y-1 border-r border-stone-100 dark:border-stone-800 pr-4 last:border-none">
                    <p className="text-xs text-stone-500 dark:text-stone-400">อัตราเฉลี่ยการนอนพัก</p>
                    <p className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-900 dark:text-amber-400 tabular-nums">
                      94.8%
                    </p>
                    <p className="text-[11px] text-stone-400">ของเวลาใน 1 วัน</p>
                  </div>

                  <div className="space-y-1 border-r border-stone-100 dark:border-stone-800 pr-4 last:border-none">
                    <p className="text-xs text-stone-500 dark:text-stone-400">แคลอรีที่เซฟได้เฉลี่ย</p>
                    <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                      4,200+
                    </p>
                    <p className="text-[11px] text-stone-400">kcal ต่อเดือนจากการไม่ลุก</p>
                  </div>

                  <div className="space-y-1 border-r border-stone-100 dark:border-stone-800 pr-4 last:border-none">
                    <p className="text-xs text-stone-500 dark:text-stone-400">สายพันธุ์ที่ค้นพบ</p>
                    <p className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-700 dark:text-blue-400 tabular-nums">
                      5 ระดับ
                    </p>
                    <p className="text-[11px] text-stone-400">ตั้งแต่อนุบาลถึงตรัสรู้</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-stone-500 dark:text-stone-400">ค่าธรรมเนียมประเมิน</p>
                    <p className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-700 dark:text-purple-400 tabular-nums">
                      0 บาท
                    </p>
                    <p className="text-[11px] text-stone-400">ฟรีตลอดชีพ นอนทำได้เลย</p>
                  </div>
                </div>

                {/* 3 Core Highlight Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                      <Bed className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      ตรวจวัด 4 ดัชนีชีวมิติ
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      วัดค่าการหลอมรวมกับเตียงนอน อัตราการผัดวันประกันพรุ่ง ความเร็วในการคิดข้ออ้าง และสัมประสิทธิ์การประหยัดพลังงาน
                    </p>
                  </div>

                  <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      ใบประกาศนียบัตรสากล
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      ออกเอกสารเชิดชูเกียรติอย่างเป็นทางการ พร้อมตราประทับทองคำและเลขทะเบียนสลอธ สามารถพิมพ์หรือแชร์อวดเพื่อนได้ทันที
                    </p>
                  </div>

                  <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      เครื่องมือช่วยคนขี้เกียจ
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      มีทั้งคลังข้ออ้างส่งไลน์ วงล้อช่วยตัดสินใจเวลาคิดไม่ออก และเครื่องคำนวณแคลอรีที่เซฟได้เพื่อกู้โลก
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Case B: Quiz In Progress */}
            {quizStarted && !assessmentResult && (
              <QuizCard
                question={currentQ}
                currentIndex={currentQuestionIndex}
                totalQuestions={QUIZ_QUESTIONS.length}
                selectedOptionId={currentSelectedOpt?.id}
                onSelectOption={handleSelectOption}
                onNext={handleNextQuestion}
                onPrev={handlePrevQuestion}
                canGoNext={!!currentSelectedOpt}
                canGoPrev={currentQuestionIndex > 0}
              />
            )}

            {/* Case C: Quiz Completed -> Result View */}
            {assessmentResult && (
              <ResultView
                result={assessmentResult}
                onRetake={handleStartQuiz}
                userName={userName}
                onNameChange={setUserName}
              />
            )}
          </>
        )}

        {/* Tab 2: Excuse Generator */}
        {activeTab === 'excuses' && <ExcuseGeneratorModal />}

        {/* Tab 3: Energy Calculator */}
        {activeTab === 'calculator' && <EnergyCalculator />}

        {/* Tab 4: Lazy Wheel */}
        {activeTab === 'wheel' && <LazyWheel />}

        {/* Tab 5: Reflex Challenge */}
        {activeTab === 'reflex' && <ReflexChallenge />}
      </main>

      {/* Quiet Footer */}
      <footer className="w-full border-t border-amber-200/60 dark:border-stone-800 bg-amber-50/60 dark:bg-stone-900/60 py-8 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800 dark:text-stone-200">SlothMeter Thailand</span>
            <span aria-hidden="true">·</span>
            <span>สถาบันวิจัยความขี้เกียจและพฤติกรรมมนุษย์</span>
          </div>
          <p className="text-center sm:text-right text-[11px] text-stone-400">
            สร้างขึ้นเพื่อความบันเทิงและเพื่อเตือนสติให้เราพักผ่อนอย่างมีความสุข © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

import React, { useRef } from 'react';
import { LazinessProfile } from '../types';
import { Award, Printer, Copy, Check } from 'lucide-react';

interface CertificateProps {
  userName: string;
  onNameChange: (name: string) => void;
  profile: LazinessProfile;
  score: number;
}

export const Certificate: React.FC<CertificateProps> = ({
  userName,
  onNameChange,
  profile,
  score,
}) => {
  const [copied, setCopied] = React.useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const certNumber = `SLOTH-TH-${new Date().getFullYear()}-${Math.floor(10000 + (score * 87.3) % 90000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const text = `🏆 ใบประกาศนียบัตรคนขี้เกียจแห่งชาติ\nมอบให้แด่: ${userName || 'ยอดนักสลอธ'}\nระดับ: ${profile.titleTh} (${profile.titleEn})\nคะแนนความขี้เกียจ: ${score}%\nคติประจำใจ: "${profile.quote}"\nประเมินโดย SlothMeter Thailand`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Name Input Bar */}
      <div className="w-full max-w-xl mb-6 flex flex-col sm:flex-row items-center gap-3 p-4 bg-amber-100/50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl">
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 whitespace-nowrap">
          ชื่อบนใบประกาศ:
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="พิมพ์ชื่อของคุณ (เช่น ดร.นอนทั้งวัน ปล่อยวางทุกสิ่ง)"
          className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-900 border border-amber-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 font-medium"
        />
      </div>

      {/* Printable Certificate Frame */}
      <div
        ref={certRef}
        id="certificate-print-area"
        className="w-full max-w-2xl bg-amber-50/95 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-8 sm:p-12 border-8 border-double border-amber-700/60 dark:border-amber-600/50 rounded-2xl shadow-xl relative overflow-hidden transition-all print:border-amber-800 print:shadow-none print:m-0"
      >
        {/* Subtle decorative background watermark stamp */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
          <Award className="w-96 h-96" />
        </div>

        {/* Certificate Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-mono font-semibold">
            <span>ราชบัณฑิตยสลอธศาสตร์นานาชาติ</span>
            <span aria-hidden="true">·</span>
            <span>INTERNATIONAL SLOTH ACADEMY</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-950 dark:text-amber-100 font-serif">
            ใบประกาศนียบัตรเชิดชูเกียรติ
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 tracking-wider">
            CERTIFICATE OF MERITORIOUS INDOLENCE & ENERGY CONSERVATION
          </p>

          <div className="w-24 h-0.5 bg-amber-600 dark:bg-amber-500 mx-auto my-3" />
        </div>

        {/* Recipient Content */}
        <div className="text-center my-8 space-y-4 relative z-10">
          <p className="text-xs text-stone-600 dark:text-stone-400">
            ใบประกาศนียบัตรฉบับนี้ออกให้เพื่อแสดงว่า
          </p>

          <div className="border-b-2 border-stone-400/50 dark:border-stone-600 pb-2 inline-block min-w-[240px] max-w-full px-6">
            <span className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-300">
              {userName.trim() || 'ยอดนักสลอธนิรนาม'}
            </span>
          </div>

          <p className="text-sm text-stone-700 dark:text-stone-300 max-w-lg mx-auto leading-relaxed pt-2">
            ได้ผ่านการตรวจวัดประเมินพฤติกรรมความเกียจคร้านสากล และได้รับการยอมรับอย่างเป็นทางการให้ดำรงตำแหน่ง
          </p>

          <div className="py-2.5 px-5 bg-amber-100/80 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 rounded-xl inline-block max-w-md">
            <p className="text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-200">
              {profile.titleTh}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 font-mono tracking-wide mt-0.5">
              {profile.titleEn} · ดัชนีความเกียจคร้าน {score}%
            </p>
          </div>

          <p className="text-xs italic text-stone-600 dark:text-stone-400 max-w-md mx-auto pt-1">
            "{profile.quote}"
          </p>
        </div>

        {/* Certificate Footer with Seal & Signatures */}
        <div className="grid grid-cols-3 items-end pt-6 border-t border-amber-200/80 dark:border-stone-800 relative z-10">
          {/* Left: Cert number & Date */}
          <div className="text-left text-[11px] text-stone-500 dark:text-stone-400 space-y-1">
            <p className="font-mono text-[10px] text-stone-400 dark:text-stone-500">
              เลขทะเบียน: {certNumber}
            </p>
            <p>วันที่อนุมัติ: {formattedDate}</p>
            <p className="text-[10px] text-stone-400">สถานะ: มีผลผ่อนคลายตลอดชีพ</p>
          </div>

          {/* Center: Official Seal Image */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md border-2 border-amber-400/60">
              <img
                src="/src/assets/images/sloth_certificate_seal_1794458097460.jpg"
                alt="Official Sloth Seal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[9px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold mt-1">
              ตราประทับรับรองสลอธ
            </span>
          </div>

          {/* Right: Signature */}
          <div className="text-right text-xs text-stone-700 dark:text-stone-300 space-y-1">
            <div className="font-serif italic text-base sm:text-lg text-amber-900 dark:text-amber-300 font-bold tracking-tight">
              ศ.ดร. นายนอน สลอธกานต์
            </div>
            <div className="w-28 h-px bg-stone-400 dark:bg-stone-600 ml-auto" />
            <p className="text-[10px] text-stone-500 dark:text-stone-400">
              ประธานสมาคมสลอธศาสตร์นานาชาติ
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: Print & Copy */}
      <div className="flex items-center gap-3 mt-6 print:hidden">
        <button
          onClick={handlePrint}
          className="cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>พิมพ์ / บันทึก PDF</span>
        </button>
        <button
          onClick={handleCopySummary}
          className="cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg bg-amber-100 text-amber-900 dark:bg-stone-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'คัดลอกสำเร็จ!' : 'คัดลอกข้อความไปแชร์'}</span>
        </button>
      </div>
    </div>
  );
};

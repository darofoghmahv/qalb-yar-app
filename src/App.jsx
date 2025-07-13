// THIS IS A TEST
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, ChevronLeft, HeartPulse, Wind, User, Stethoscope, Pill, Clipboard, AlertTriangle, Activity, FileText, X, BrainCircuit, Calculator, Info, BookUser, ClipboardList, Eye, GaugeCircle, Waves, UserX, Footprints, TrendingDown, PowerOff, Beaker, Printer, Users, PlusCircle, Share2, Upload, Copy } from 'lucide-react';

// --- Data & Educational Content ---
const commonMedications = [ { name: 'آسپرین (Aspirin)', dosage: '81 mg روزانه' }, { name: 'آتورواستاتین (Atorvastatin)', dosage: '20-40 mg شبانه' }, { name: 'متوپرولول (Metoprolol)', dosage: '25-50 mg دو بار در روز' }, { name: 'لوزارتان (Losartan)', dosage: '25-50 mg روزانه' }, { name: 'فوروزماید (Furosemide)', dosage: '20-40 mg روزانه' }, { name: 'کلوپیدوگرل (Clopidogrel)', dosage: '75 mg روزانه' }, { name: 'نیتروگلیسرین (Nitroglycerin)', dosage: '0.4 mg زیرزبانی هنگام نیاز' }, ];
const clinicalInfo = {
  heartSounds: { title: 'راهنمای عملی سمع قلب', content: ( <div className="space-y-4 text-right"> <p><strong>نکته کلیدی:</strong> همیشه از هر دو قسمت دیافراگم (برای صداهای با فرکانس بالا) و بل (Bell) (برای صداهای با فرکانس پایین) استفاده کنید.</p> <p><strong>S1 (صدای اول):</strong> بسته شدن دریچه‌های میترال و تریکوسپید. بلندترین صدا در ناحیه اپکس (Apex) است. همزمان با نبض کاروتید لمس می‌شود.</p> <p><strong>S2 (صدای دوم):</strong> بسته شدن دریچه‌های آئورت و پولمونر. بلندترین صدا در قاعده (Base) قلب است.</p> <p><strong>S3 (گالوپ بطنی):</strong> صدایی بم در ابتدای دیاستول. با قسمت <strong>بل</strong> استتوسکوپ در اپکس بهتر شنیده می‌شود. نشانه کلاسیک <strong>نارسایی قلبی</strong> (CHF) است.</p> <p><strong>S4 (گالوپ دهلیزی):</strong> صدایی بم درست قبل از S1. با قسمت <strong>بل</strong> در اپکس بهتر شنیده می‌شود. نشانه یک بطن سفت و غیرمنعطف است (مثلاً در <strong>هیپرتروفی بطنی</strong> یا ایسکمی).</p> </div> ) },
  lungSounds: { title: 'راهنمای عملی سمع ریه', content: ( <div className="space-y-4 text-right"> <p><strong>کراکل یا رال (Crackles/Rales):</strong> صداهای کوتاه و منقطع شبیه باز کردن چسب ولکرو. اگر در <strong>قاعده هر دو ریه</strong> شنیده شود، به شدت مطرح‌کننده <strong>ادم ریوی</strong> ناشی از نارسایی قلبی است.</p> <p><strong>ویز (Wheezes):</strong> صداهای ممتد و موسیقایی. معمولاً در بازدم شنیده می‌شود و نشانه تنگی راه‌های هوایی (آسم، COPD) است. ویزینگ منتشر در یک بیمار قلبی می‌تواند نشانه "آسم قلبی" باشد.</p> </div> ) },
  cxrInterpretation: { title: 'راهنمای تفسیر CXR در بخش قلب', content: ( <div className="space-y-4 text-right"><p><strong>روش ABCDE:</strong> یک رویکرد سیستماتیک برای ارزیابی عکس قفسه سینه.</p><p><strong>A (Airway):</strong> آیا تراشه در خط وسط قرار دارد؟ انحراف آن می‌تواند نشانه پنوموتوراکس فشارنده یا آتلکتازی باشد.</p><p><strong>B (Breathing/Lungs):</strong> به دنبال علائم <strong>ادم ریوی</strong> بگردید: خطوط کرلی B (Kerley B lines)، کدر شدن پری‌هیلار (الگوی بال خفاش)، و افیوژن پلور.</p><p><strong>C (Cardiac Silhouette):</strong> آیا قلب بزرگ شده (کاردیومگالی)؟ (عرض قلب بیش از 50% عرض قفسه سینه). آیا مدیاستن پهن شده (Widened mediastinum) که می‌تواند نشانه <strong>دایسکشن آئورت</strong> باشد؟</p><p><strong>D (Diaphragm):</strong> آیا زوایای کوستوفرنیک (Costophrenic angles) محو شده‌اند؟ این نشانه <strong>افیوژن پلور</strong> است.</p><p><strong>E (Everything Else):</strong> به استخوان‌ها (شکستگی دنده)، بافت نرم و کاتترها توجه کنید.</p></div> ) },
  ecgRhythms: { title: 'راهنمای عملی ریتم‌های ECG', content: ( <div className="space-y-4 text-right"> <p><strong>ریتم سینوسی:</strong> به دنبال موج P قبل از هر QRS بگردید. فاصله RR باید تقریباً منظم باشد.</p> <p><strong>فیبریلاسیون دهلیزی (AFib):</strong> دو مشخصه اصلی دارد: ۱) فاصله RR کاملاً <strong>نامنظم</strong> است. ۲) هیچ موج P واضحی دیده نمی‌شود و به جای آن یک خط پایه لرزان (fibrillatory waves) وجود دارد.</p> <p><strong>تاکی‌کاردی بطنی (VT):</strong> سه مشخصه کلیدی: ۱) ریت سریع ({'>'}100). ۲) کمپلکس QRS <strong>پهن</strong> ({'>'}120ms). ۳) معمولاً منظم است. یک اورژانس پزشکی است.</p> </div> ) },
  prInterval: { title: 'راهنمای عملی فاصله PR', content: ( <div className="space-y-4 text-right"><p><strong>نحوه اندازه‌گیری:</strong> از ابتدای موج P تا ابتدای کمپلکس QRS.</p><p><strong>محدوده نرمال:</strong> 120 تا 200 میلی‌ثانیه (3 تا 5 خانه کوچک).</p><p><strong>اهمیت بالینی:</strong> PR طولانی ({'>'}200ms) یعنی بلوک درجه ۱ که معمولاً خوش‌خیم است اما می‌تواند نشانه بیماری زمینه‌ای باشد.</p></div> ) },
  qrsDuration: { title: 'راهنمای عملی مدت QRS', content: ( <div className="space-y-4 text-right"><p><strong>نحوه اندازه‌گیری:</strong> از ابتدای موج Q (یا R) تا انتهای موج S.</p><p><strong>محدوده نرمال:</strong> کمتر از 120 میلی‌ثانیه ({'<'}3 خانه کوچک).</p><p><strong>اهمیت بالینی:</strong> QRS <strong>پهن</strong> ({'>='}120ms) همیشه پاتولوژیک است و نیاز به بررسی دقیق برای یافتن علت (مانند بلوک شاخه‌ای یا ریتم بطنی) دارد.</p></div> ) },
  qWaves: { title: 'راهنمای عملی امواج Q پاتولوژیک', content: ( <div className="space-y-4 text-right"><p><strong>چگونه تشخیص دهیم؟</strong> یک موج Q طبیعی می‌تواند در برخی لیدها وجود داشته باشد. موج Q پاتولوژیک <strong>عمیق</strong> (بیش از 25% ارتفاع R) و <strong>پهن</strong> (بیش از 1 خانه کوچک) است.</p><p><strong>اهمیت بالینی:</strong> نشانه یک سکته قلبی قدیمی (Old MI) است. محل آن نشان‌دهنده <strong>دیواره درگیر</strong> است (مثلاً امواج Q در لیدهای II, III, aVF نشانه سکته قدیمی دیواره تحتانی است).</p></div> ) },
  morphologies: { title: 'راهنمای عملی مورفولوژی و بلوک‌ها', content: ( <div className="space-y-4 text-right">
    <p><strong>بلوک شاخه چپ (LBBB):</strong> به لیدهای V1 و V6 نگاه کنید. در V1 یک کمپلکس QS یا rS پهن (عمدتاً منفی) و در V6 یک موج R پهن و یک‌تکه (Monophasic R-wave) بدون موج Q دیده می‌شود. LBBB جدید همیشه اهمیت بالایی دارد.</p>
    <p><strong>بلوک شاخه راست (RBBB):</strong> به لیدهای V1 و V6 نگاه کنید. در V1 یک الگوی RSR' (شبیه گوش خرگوش) و در V6 یک موج S پهن و کشیده (Slurred S-wave) مشاهده می‌شود.</p>
    <p><strong>هیپرتروفی بطن چپ (LVH):</strong> به دنبال ولتاژهای بسیار بلند بگردید. <strong>معیار سوکولوف-لاین (Sokolow-Lyon):</strong> اگر (عمق موج S در V1) + (ارتفاع موج R در V5 یا V6) بزرگتر از 35 میلی‌متر باشد، مطرح‌کننده LVH است.</p>
    <p><strong>اختلال هدایت داخل بطنی (IVCD):</strong> زمانی که QRS پهن ({'>'}120ms) است اما معیارهای LBBB یا RBBB را ندارد، از این اصطلاح استفاده می‌شود.</p>
</div> ) },
  heartScoreInfo: {
      history: { title: 'راهنمای امتیازدهی شرح حال (History)', content: <p>امتیاز بر اساس میزان تطابق شرح حال بیمار با درد قفسه سینه ایسکمیک است. شرح حال بسیار مشکوک (مثلا درد فشاری مرکزی با انتشار به بازو) ۲ امتیاز، شرح حال با شک متوسط ۱ امتیاز، و شرح حال با شک کم ۰ امتیاز دارد.</p> },
      ecg: { title: 'راهنمای امتیازدهی نوار قلب (ECG)', content: <p>تغییرات چشمگیر ST-segment depression/elevation امتیاز ۲ دارد. تغییرات غیراختصاصی مانند LBBB, LVH یا T-wave inversion امتیاز ۱ دارد. نوار قلب نرمال ۰ امتیاز دارد.</p> },
      age: { title: 'راهنمای امتیازدهی سن (Age)', content: <p>سن بالای ۶۵ سال ۲ امتیاز، سن بین ۴۵ تا ۶۴ سال ۱ امتیاز، و سن کمتر از ۴۵ سال ۰ امتیاز دارد.</p> },
      risk: { title: 'راهنمای امتیازدهی عوامل خطر (Risk Factors)', content: <p>وجود ۳ عامل خطر یا بیشتر (دیابت، سیگار، فشار خون، چربی خون، سابقه خانوادگی، چاقی) یا بیماری آترواسکلروتیک شناخته‌شده (CAD, PAD, CVA) ۲ امتیاز دارد. وجود ۱ یا ۲ عامل خطر ۱ امتیاز دارد.</p> },
      troponin: { title: 'راهنمای امتیازدهی تروپونین (Troponin)', content: <p>اگر تروپونین بیش از ۳ برابر حد بالای نرمال باشد ۲ امتیاز، اگر بین ۱ تا ۳ برابر باشد ۱ امتیاز، و اگر در محدوده نرمال باشد ۰ امتیاز دارد.</p> },
  }
};
const rosSystems = { general: { label: 'عمومی', symptoms: ['تب', 'لرز', 'کاهش وزن', 'افزایش وزن', 'تعریق شبانه', 'خستگی', 'بی‌اشتهایی'] }, integumentary: { label: 'پوست و مو', symptoms: ['راش', 'خارش', 'زخم', 'تغییر رنگ', 'ریزش مو', 'تغییرات ناخن'] }, head: { label: 'سر و گردن', symptoms: ['سردرد', 'ضربه به سر', 'گلودرد', 'گرفتگی صدا', 'توده گردنی'] }, eyes: { label: 'چشم', symptoms: ['تاری دید', 'درد چشم', 'دوبینی', 'قرمزی', 'ترشح'] }, ent: { label: 'گوش، حلق، بینی', symptoms: ['کاهش شنوایی', 'وزوز گوش', 'خونریزی بینی', 'گرفتگی بینی', 'ترشح از بینی'] }, cardiovascular: { label: 'قلبی-عروقی', symptoms: ['درد قفسه سینه', 'تپش قلب', 'ارتوپنه', 'تنگی نفس حمله‌ای شبانه (PND)', 'ادم محیطی', 'لنگش متناوب', 'سنکوپ'] }, respiratory: { label: 'تنفسی', symptoms: ['سرفه', 'خلط', 'هموپتزی (خلط خونی)', 'ویزینگ', 'درد پلورتیک', 'تنگی نفس'] }, gastrointestinal: { label: 'گوارشی', symptoms: ['تهوع', 'استفراغ', 'درد شکم', 'اسهال', 'یبوست', 'زردی', 'سوزش سر دل', 'خونریزی گوارشی'] }, genitourinary: { label: 'ادراری-تناسلی', symptoms: ['سوزش ادرار', 'تکرر ادرار', 'هماچوری (خون در ادرار)', 'کاهش فشار ادرار', 'بی‌اختیاری'] }, musculoskeletal: { label: 'اسکلتی-عضلانی', symptoms: ['درد مفاصل', 'تورم مفاصل', 'درد عضلانی', 'کمردرد', 'محدودیت حرکت'] }, neurological: { label: 'عصبی', symptoms: ['سرگیجه', 'ضعف کانونی', 'تشنج', 'تغییر سطح هوشیاری', 'پارستزی (گزگز)', 'لرزش'] }, endocrine: { label: 'غدد', symptoms: ['پلی‌اوری (پرادراری)', 'پلی‌دیپسی (پرنوشی)', 'عدم تحمل گرما/سرما', 'تغییرات وزن'] }, psychiatric: { label: 'روانپزشکی', symptoms: ['اضطراب', 'افسردگی', 'اختلال خواب', 'افکار خودکشی'] }, };

const emptyPatient = {
    id: `pt_${Date.now()}`,
    createdAt: new Date().toISOString(),
    info: { name: '', age: '', gender: 'مرد' },
    chiefComplaint: '',
    hpi: {
        chestPain: { onset: '', quality: '', radiation: '', severity: '0', provocative: '', palliative: '' },
        shortnessOfBreath: { onset: '', type: [], associated: '' },
        palpitations: { onset: '', duration: '', character: '', triggers: '', associatedSymptoms: '' },
        hypertensiveSymptoms: { dizziness: false, headache: false, blurredVision: false, nausea: false, other: '' },
        syncope: { prodrome: '', position: '', precipitatingEvents: '', postEvent: '', palpitations: false },
        edema: { location: 'دوطرفه', pitting: 'نامشخص', timing: '', associated: '' },
        claudication: { location: '', character: '', distance: '', relievingFactors: '' },
        fatigue: { onset: '', pattern: '', severity: 'خفیف' }
    },
    riskFactors: {
        hypertension: false,
        diabetes: false,
        dyslipidemia: false,
        smoking: false,
        familyHistory: false,
        obesity: false,
    },
    comorbidities: {
        knownCAD: false,
        ckd: false,
        copd: false,
        other: '',
    },
    pastMedicalHistory: '',
    pastSurgicalHistory: '',
    allergies: '',
    ros: Object.keys(rosSystems).reduce((acc, key) => ({ ...acc, [key]: [] }), {}),
    medications: [{ name: '', dosage: '', isCustom: true }],
    paraclinical: { troponin: 'منفی', bnp: '', cxr: { findings: [], other: '' } },
    physicalExam: { general: 'هوشیار، بدون دیسترس واضح', jvp: '', heartSounds: 'S1, S2 طبیعی، بدون صدای اضافی', lungSounds: 'سمع ریه واضح', extremities: 'بدون ادم محیطی' },
    ecg: { rhythm: 'سینوسی', rate: '', axis: 'نرمال', pr: '', qrs: '', qt: '', qtc: '', stChanges: [], stLocation: [], hasQWaves: false, qWaveLocation: [], morphologies: [], other: '' },
    plan: {}
};


// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'form'
  const [patients, setPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [shareModal, setShareModal] = useState({ isOpen: false, code: '' });
  const [importModal, setImportModal] = useState({ isOpen: false });
  const [isEducationalMode, setIsEducationalMode] = useState(() => {
    const savedMode = localStorage.getItem('qalbYarEducationalMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem('qalbYarEducationalMode', JSON.stringify(isEducationalMode));
  }, [isEducationalMode]);

  // Load pako.js for compression
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  // Load patients from localStorage on initial render
  useEffect(() => {
    try {
      const savedPatients = JSON.parse(localStorage.getItem('qalbYarPatients')) || [];
      setPatients(savedPatients);
    } catch (error) {
      console.error("Failed to load patients from localStorage", error);
      setPatients([]);
    }
  }, []);
  
  const savePatientsToStorage = (updatedPatients) => {
      setPatients(updatedPatients);
      localStorage.setItem('qalbYarPatients', JSON.stringify(updatedPatients));
  };

  const handleSavePatient = (patientData) => {
    const newPatients = patients.filter(p => p.id !== patientData.id);
    const updatedPatients = [...newPatients, patientData];
    savePatientsToStorage(updatedPatients);
    setView('dashboard');
    setActivePatient(null);
  };

  const handleNewPatient = () => {
    const newPatient = {
        ...emptyPatient,
        id: `pt_${Date.now()}`,
        createdAt: new Date().toISOString(),
        hpi: JSON.parse(JSON.stringify(emptyPatient.hpi)),
        riskFactors: JSON.parse(JSON.stringify(emptyPatient.riskFactors)),
        comorbidities: JSON.parse(JSON.stringify(emptyPatient.comorbidities)),
    };
    setActivePatient(newPatient);
    setView('form');
  };
  
  const handleSelectPatient = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setActivePatient(patient);
      setView('form');
    }
  };

  const handleDeletePatient = (patientId) => {
      const updatedPatients = patients.filter(p => p.id !== patientId);
      savePatientsToStorage(updatedPatients);
  };

  const handleShareRequest = (patientId) => {
      if (typeof pako === 'undefined') {
          alert('کتابخانه فشرده‌سازی هنوز بارگذاری نشده است. لطفا چند لحظه صبر کنید.');
          return;
      }
      const patient = patients.find(p => p.id === patientId);
      if (patient) {
          const dataToShare = { ...patient };
          delete dataToShare.id;
          delete dataToShare.createdAt;

          try {
            const jsonString = JSON.stringify(dataToShare);
            const compressed = pako.deflate(jsonString);
            let binaryString = '';
            for (let i = 0; i < compressed.length; i++) {
                binaryString += String.fromCharCode(compressed[i]);
            }
            const encoded = btoa(binaryString);
            setShareModal({ isOpen: true, code: encoded });
          } catch(error) {
              console.error("Sharing failed:", error);
              alert("خطا در ایجاد کد اشتراک‌گذاری.");
          }
      }
  };

  const handleImportPatient = (code) => {
      if (typeof pako === 'undefined') {
          alert('کتابخانه فشرده‌سازی هنوز بارگذاری نشده است. لطفا چند لحظه صبر کنید.');
          return false;
      }
      try {
          const binaryString = atob(code);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
          }
          
          const decompressed = pako.inflate(bytes, { to: 'string' });
          const patientData = JSON.parse(decompressed);

          const newPatient = {
              ...emptyPatient,
              ...patientData,
              id: `pt_${Date.now()}`,
              createdAt: new Date().toISOString(),
          };

          const updatedPatients = [...patients, newPatient];
          savePatientsToStorage(updatedPatients);
          setImportModal({ isOpen: false });
          return true;
      } catch (error) {
          console.error("Failed to import patient:", error);
          alert("کد وارد شده معتبر نیست یا در حین پردازش خطا رخ داده است.");
          return false;
      }
  };


  return (
    <div dir="rtl" className="bg-slate-100 min-h-screen font-sans text-slate-800 flex flex-col items-center p-4" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
       <style>{`
         @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');
         @media print {
           .no-print-view { display: none !important; }
           .print-container { box-shadow: none !important; border: none !important; }
           .print-section { page-break-inside: avoid; }
         }
         .switch { position: relative; display: inline-block; width: 50px; height: 24px; }
         .switch input { opacity: 0; width: 0; height: 0; }
         .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px; }
         .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
         input:checked + .slider { background-color: #ef4444; }
         input:checked + .slider:before { transform: translateX(26px); }
       `}</style>
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        {view === 'dashboard' && <Dashboard patients={patients} onNew={handleNewPatient} onSelect={handleSelectPatient} onDelete={handleDeletePatient} onShare={handleShareRequest} onImportRequest={() => setImportModal({ isOpen: true })} isEducationalMode={isEducationalMode} setIsEducationalMode={setIsEducationalMode} />}
        {view === 'form' && <HistoryForm patientData={activePatient} onSave={handleSavePatient} onExit={() => setView('dashboard')} isEducationalMode={isEducationalMode} />}
      </div>
      {shareModal.isOpen && <ShareModal code={shareModal.code} onClose={() => setShareModal({ isOpen: false, code: '' })} />}
      {importModal.isOpen && <ImportModal onImport={handleImportPatient} onClose={() => setImportModal({ isOpen: false })} />}
    </div>
  );
}

// --- Dashboard Component ---
const Dashboard = ({ patients, onNew, onSelect, onDelete, onShare, onImportRequest, isEducationalMode, setIsEducationalMode }) => (
    <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-700 flex items-center gap-2"><Users className="text-red-500" />لیست بیماران</h2>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-600">حالت آموزشی</span>
                    <label className="switch">
                        <input type="checkbox" checked={isEducationalMode} onChange={() => setIsEducationalMode(prev => !prev)} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="flex gap-2">
                    <button onClick={onImportRequest} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                        <Upload size={20} /> ورود کد
                    </button>
                    <button onClick={onNew} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                        <PlusCircle size={20} /> بیمار جدید
                    </button>
                </div>
            </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            {patients.length > 0 ? (
                patients.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                        <div onClick={() => onSelect(p.id)} className="cursor-pointer flex-1">
                            <p className="font-bold text-slate-800">{p.info.name || `بیمار ${p.info.age || ''} ساله`}</p>
                            <p className="text-sm text-slate-500">شکایت اصلی: {p.chiefComplaint ? { chestPain: 'درد قفسه سینه', shortnessOfBreath: 'تنگی نفس', palpitations: 'تپش قلب', hypertensiveSymptoms: 'علائم فشار خون', syncope: 'سنکوپ', edema: 'ادم', claudication: 'لنگش', fatigue: 'خستگی' }[p.chiefComplaint] : 'نامشخص'} - تاریخ: {new Date(p.createdAt).toLocaleDateString('fa-IR')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={(e) => { e.stopPropagation(); onShare(p.id); }} className="text-gray-400 hover:text-blue-500 p-2 rounded-full" title="اشتراک‌گذاری"><Share2 size={18} /></button>
                            <button onClick={(e) => { e.stopPropagation(); onDelete(p.id); }} className="text-gray-400 hover:text-red-500 p-2 rounded-full" title="حذف"><X size={18} /></button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-slate-500 py-8">هنوز بیماری ذخیره نشده است. برای شروع روی "بیمار جدید" کلیک کنید.</p>
            )}
        </div>
    </div>
);

// --- Share and Import Modals ---
const ShareModal = ({ code, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            alert('خطا در کپی کردن کد');
        }
        document.body.removeChild(textArea);
    };

    return (
        <InfoModal title="اشتراک‌گذاری شرح حال بیمار" onClose={onClose}>
            <p className="mb-4 text-slate-600">کد زیر را کپی کرده و برای همکار خود ارسال کنید. او می‌تواند با ورود این کد، شرح حال بیمار را در اپلیکیشن خود بارگذاری کند.</p>
            <div className="relative">
                <textarea
                    readOnly
                    className="w-full h-40 p-3 font-mono text-xs bg-slate-100 border border-slate-300 rounded-lg resize-none"
                    value={code}
                />
                <button onClick={handleCopy} className="absolute top-2 left-2 bg-slate-200 text-slate-700 p-2 rounded-md hover:bg-slate-300">
                    {copied ? <span className="text-green-600">کپی شد!</span> : <Copy size={18} />}
                </button>
            </div>
        </InfoModal>
    );
};

const ImportModal = ({ onImport, onClose }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!code.trim()) {
            setError('لطفا کد را وارد کنید.');
            return;
        }
        setError('');
        const success = onImport(code);
        if (!success) {
            setError('کد وارد شده معتبر نیست. لطفا دوباره تلاش کنید.');
        }
    };

    return (
        <InfoModal title="ورود کد بیمار" onClose={onClose}>
            <p className="mb-4 text-slate-600">کدی که از همکارتان دریافت کرده‌اید را در کادر زیر وارد کرده و دکمه "بارگذاری" را بزنید.</p>
            <textarea
                className="w-full h-40 p-3 font-mono text-xs bg-slate-100 border border-slate-300 rounded-lg resize-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="کد اشتراک‌گذاری را اینجا وارد کنید..."
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="text-left mt-4">
                <button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition">
                    بارگذاری بیمار
                </button>
            </div>
        </InfoModal>
    );
};


// --- History Form Component (The Stepper) ---
const HistoryForm = ({ patientData, onSave, onExit, isEducationalMode }) => {
    const [step, setStep] = useState(1);
    const [modal, setModal] = useState({ isOpen: false, content: null, title: '' });
    const [data, setData] = useState(patientData);

    const updateData = (section, field, value) => {
        if (field) { setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
        } else { setData(prev => ({ ...prev, [section]: value })); }
    };
  
    const openModal = (title, content) => setModal({ isOpen: true, title, content });
    const closeModal = () => setModal({ isOpen: false, content: null, title: '' });

    const totalSteps = 10;
    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    const goToStep = (s) => setStep(s);

    const renderStep = () => {
        const props = { data, setData, updateData, openModal, isEducationalMode };
        switch (step) {
            case 1: return <PatientInfo {...props} />;
            case 2: return <ChiefComplaint {...props} />;
            case 3: return <RiskFactorsAndComorbidities {...props} />;
            case 4: return <MedicalHistory {...props} />;
            case 5: return <ReviewOfSystems {...props} />;
            case 6: return <Medications {...props} />;
            case 7: return <PhysicalExam {...props} />;
            case 8: return <ParaclinicalStudies {...props} />;
            case 9: return <ECGFindings {...props} />;
            case 10: return <SummaryAndPlan {...props} onSave={() => onSave(data)} goToStep={goToStep} />;
            default: return <PatientInfo {...props} />;
        }
    };

    return (
        <div className="animate-fade-in">
            <button onClick={onExit} className="text-sm text-blue-600 hover:underline mb-4 no-print-view">&larr; بازگشت به لیست بیماران</button>
            <ProgressBar currentStep={step} totalSteps={totalSteps} goToStep={goToStep} />
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-4">
                {renderStep()}
            </div>
            <NavigationButtons step={step} totalSteps={totalSteps} nextStep={nextStep} prevStep={prevStep} />
            {modal.isOpen && <InfoModal title={modal.title} onClose={closeModal}>{modal.content}</InfoModal>}
        </div>
    );
};

// --- Reusable Components (abbreviated) ---
const InfoModal = ({ title, children, onClose }) => ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in-fast"> <div dir="rtl" className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"> <header className="flex justify-between items-center p-4 border-b"> <h3 className="text-xl font-bold text-slate-800">{title}</h3> <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200"><X size={24} /></button> </header> <main className="p-6 overflow-y-auto">{children}</main> <footer className="p-4 bg-slate-50 border-t text-right"> <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">بستن</button> </footer> </div> </div> );
const QuickAddButton = ({ text, onClick }) => (<button type="button" onClick={onClick} className="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition">{text}</button>);
const InfoButton = ({ onClick, isEducationalMode }) => (isEducationalMode ? <button type="button" onClick={onClick} className="p-1 text-blue-500 hover:text-blue-700"><Info size={18} /></button> : null);
const CalculatorButton = ({ text, onClick }) => (<button type="button" onClick={onClick} className="flex items-center gap-1 text-sm text-blue-600 hover:underline"><Calculator size={14} /> {text}</button>);

// --- Step Components ---
const Header = () => ( <header className="text-center mb-6"> <div className="flex items-center justify-center gap-3"> <HeartPulse className="text-red-500 w-10 h-10" /> <h1 className="text-3xl md:text-4xl font-bold text-slate-700">قلب‌یار</h1> </div> <p className="text-slate-500 mt-2">دستیار هوشمند و آموزشی شما برای شرح حال قلب</p> </header> );
const ProgressBar = ({ currentStep, goToStep }) => {
    const steps = [ { number: 1, icon: <User />, label: 'بیمار' }, { number: 2, icon: <AlertTriangle />, label: 'شکایت' }, { number: 3, icon: <Activity />, label: 'ریسک و سوابق' }, { number: 4, icon: <BookUser />, label: 'سوابق پزشکی' }, { number: 5, icon: <ClipboardList />, label: 'ROS' }, { number: 6, icon: <Pill />, label: 'داروها' }, { number: 7, icon: <Stethoscope />, label: 'معاینه' }, { number: 8, icon: <Beaker />, label: 'پاراکلینیک' }, { number: 9, icon: <HeartPulse />, label: 'نوار قلب' }, { number: 10, icon: <Clipboard />, label: 'خلاصه و طرح' }, ];
    return (<div className="w-full overflow-x-auto pb-2"><div className="flex justify-between items-start min-w-max gap-2 sm:gap-4">{steps.map((s, i) => (<div key={s.number} className="flex flex-col items-center cursor-pointer text-center w-16" onClick={() => goToStep(s.number)}><div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${currentStep >= s.number ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{React.cloneElement(s.icon, { className: 'w-5 h-5 md:w-6 md:h-6' })}</div><p className={`mt-2 text-xs font-semibold ${currentStep >= s.number ? 'text-red-500' : 'text-slate-400'}`}>{s.label}</p></div>))}</div></div>);
};
const PatientInfo = ({ data: {info}, updateData }) => ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><User className="text-red-500"/>اطلاعات اولیه بیمار</h2> <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> <div><label className="mb-2 font-semibold text-slate-600 block">نام بیمار (اختیاری)</label><input type="text" value={info.name} onChange={e => updateData('info', 'name', e.target.value)} className="p-3 w-full border rounded-lg"/></div> <div><label className="mb-2 font-semibold text-slate-600 block">سن</label><input type="number" value={info.age} onChange={e => updateData('info', 'age', e.target.value)} className="p-3 w-full border rounded-lg"/></div> <div><label className="mb-2 font-semibold text-slate-600 block">جنسیت</label><select value={info.gender} onChange={e => updateData('info', 'gender', e.target.value)} className="p-3 w-full border bg-white rounded-lg"><option>مرد</option><option>زن</option></select></div> </div> </div> );
const ChiefComplaint = ({ data, setData, openModal, isEducationalMode }) => {
    const { chiefComplaint, hpi } = data;
    const setChiefComplaint = (value) => setData(prev => ({ ...prev, chiefComplaint: value }));
    const updateHpi = (complaint, field, value) => setData(prev => ({ ...prev, hpi: { ...prev.hpi, [complaint]: { ...prev.hpi[complaint], [field]: value } } }));
    const handleSOBTypeChange = (type) => { const currentTypes = hpi.shortnessOfBreath.type || []; const newTypes = currentTypes.includes(type) ? currentTypes.filter(t => t !== type) : [...currentTypes, type]; updateHpi('shortnessOfBreath', 'type', newTypes); };
    const handleHypertensiveSymptomChange = (symptom) => { const currentSymptoms = hpi.hypertensiveSymptoms; updateHpi('hypertensiveSymptoms', symptom, !currentSymptoms[symptom]); };
    const complaintOptions = [ { id: 'chestPain', label: 'درد قفسه سینه', icon: <HeartPulse /> }, { id: 'shortnessOfBreath', label: 'تنگی نفس', icon: <Wind /> }, { id: 'palpitations', label: 'تپش قلب', icon: <Activity /> }, { id: 'syncope', label: 'سنکوپ/غش', icon: <UserX /> }, { id: 'edema', label: 'ادم/ورم', icon: <Footprints /> }, { id: 'claudication', label: 'لنگش', icon: <TrendingDown /> }, { id: 'fatigue', label: 'خستگی', icon: <PowerOff /> }, { id: 'hypertensiveSymptoms', label: 'علائم فشار خون', icon: <GaugeCircle /> }, ];
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><AlertTriangle className="text-red-500"/>شکایت اصلی</h2>
            <div className="mb-6">
                <p className="mb-3 font-semibold text-slate-600">شایع‌ترین شکایت اصلی بیمار را انتخاب کنید:</p>
                <div className="flex flex-wrap gap-3">
                    {complaintOptions.map(opt => (<button key={opt.id} onClick={() => setChiefComplaint(opt.id)} className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${chiefComplaint === opt.id ? 'bg-red-500 text-white border-red-500' : 'bg-white text-slate-700 border-slate-300 hover:border-red-400'}`}>{opt.icon} {opt.label}</button>))}
                </div>
            </div>
            {chiefComplaint === 'chestPain' && <div className="p-4 bg-red-50 rounded-lg border border-red-200 animate-fade-in">
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-red-800">جزئیات درد قفسه سینه (OPQRST)</h3><CalculatorButton text="محاسبه HEART Score" onClick={() => openModal('محاسبه‌گر HEART Score', <HeartScoreCalculator data={data} isEducationalMode={isEducationalMode} openModal={openModal} />)} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.chestPain.onset} onChange={e => updateHpi('chestPain', 'onset', e.target.value)} placeholder="شروع و زمان‌بندی (Onset)" className="p-2 border rounded-md" /><input type="text" value={hpi.chestPain.quality} onChange={e => updateHpi('chestPain', 'quality', e.target.value)} placeholder="کیفیت (Quality) - مثلا فشاری، تیز" className="p-2 border rounded-md" /><input type="text" value={hpi.chestPain.radiation} onChange={e => updateHpi('chestPain', 'radiation', e.target.value)} placeholder="انتشار (Radiation)" className="p-2 border rounded-md" /><div className="flex flex-col"><label className="text-sm text-slate-600 mb-1">شدت (Severity): {hpi.chestPain.severity}/10</label><input type="range" min="0" max="10" value={hpi.chestPain.severity} onChange={e => updateHpi('chestPain', 'severity', e.target.value)} className="w-full" /></div><input type="text" value={hpi.chestPain.provocative} onChange={e => updateHpi('chestPain', 'provocative', e.target.value)} placeholder="عوامل تشدید کننده" className="p-2 border rounded-md" /><input type="text" value={hpi.chestPain.palliative} onChange={e => updateHpi('chestPain', 'palliative', e.target.value)} placeholder="عوامل تسکین دهنده" className="p-2 border rounded-md" /></div>
            </div>}
            {chiefComplaint === 'shortnessOfBreath' && <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-blue-800">جزئیات تنگی نفس</h3><div className="space-y-4"><input type="text" value={hpi.shortnessOfBreath.onset} onChange={e => updateHpi('shortnessOfBreath', 'onset', e.target.value)} placeholder="شروع و مدت زمان" className="p-2 border rounded-md w-full" /><div><p className="font-semibold mb-2">نوع تنگی نفس:</p><div className="flex flex-wrap gap-2">{['در حالت استراحت', 'هنگام فعالیت (DOE)', 'در حالت درازکش (Orthopnea)', 'حمله‌ای شبانه (PND)'].map(type => (<label key={type} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={(hpi.shortnessOfBreath.type || []).includes(type)} onChange={() => handleSOBTypeChange(type)} className="form-checkbox text-blue-500" />{type}</label>))}</div></div><input type="text" value={hpi.shortnessOfBreath.associated} onChange={e => updateHpi('shortnessOfBreath', 'associated', e.target.value)} placeholder="علائم همراه (مثلا سرفه، ورم پا)" className="p-2 border rounded-md w-full" /></div></div>}
            {chiefComplaint === 'palpitations' && <div className="p-4 bg-pink-50 rounded-lg border border-pink-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-pink-800">جزئیات تپش قلب</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.palpitations.onset} onChange={e => updateHpi('palpitations', 'onset', e.target.value)} placeholder="شروع (ناگهانی، تدریجی)" className="p-2 border rounded-md" /><input type="text" value={hpi.palpitations.duration} onChange={e => updateHpi('palpitations', 'duration', e.target.value)} placeholder="مدت و فرکانس" className="p-2 border rounded-md" /><input type="text" value={hpi.palpitations.character} onChange={e => updateHpi('palpitations', 'character', e.target.value)} placeholder="کیفیت (کوبنده، لرزشی، ...)" className="p-2 border rounded-md" /><input type="text" value={hpi.palpitations.triggers} onChange={e => updateHpi('palpitations', 'triggers', e.target.value)} placeholder="عوامل محرک (ورزش، استرس)" className="p-2 border rounded-md" /><div className="md:col-span-2"><input type="text" value={hpi.palpitations.associatedSymptoms} onChange={e => updateHpi('palpitations', 'associatedSymptoms', e.target.value)} placeholder="علائم همراه (سرگیجه، تنگی نفس)" className="p-2 border rounded-md w-full" /></div></div></div>}
            {chiefComplaint === 'syncope' && <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-indigo-800">جزئیات سنکوپ (ارزیابی 5P)</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.syncope.prodrome} onChange={e => updateHpi('syncope', 'prodrome', e.target.value)} placeholder="علائم پیش‌درآمد (Prodrome)" className="p-2 border rounded-md" /><input type="text" value={hpi.syncope.position} onChange={e => updateHpi('syncope', 'position', e.target.value)} placeholder="وضعیت بیمار (Position)" className="p-2 border rounded-md" /><input type="text" value={hpi.syncope.precipitatingEvents} onChange={e => updateHpi('syncope', 'precipitatingEvents', e.target.value)} placeholder="عوامل شروع‌کننده (Precipitants)" className="p-2 border rounded-md" /><input type="text" value={hpi.syncope.postEvent} onChange={e => updateHpi('syncope', 'postEvent', e.target.value)} placeholder="وقایع بعد از حمله (Post-event)" className="p-2 border rounded-md" /><label className="flex items-center gap-2 p-2 cursor-pointer"><input type="checkbox" checked={hpi.syncope.palpitations} onChange={e => updateHpi('syncope', 'palpitations', e.target.checked)} className="form-checkbox text-indigo-500" />آیا قبل از حمله تپش قلب داشت؟ (Palpitations)</label></div></div>}
            {chiefComplaint === 'edema' && <div className="p-4 bg-teal-50 rounded-lg border border-teal-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-teal-800">جزئیات ادم</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><select value={hpi.edema.location} onChange={e => updateHpi('edema', 'location', e.target.value)} className="p-2 border rounded-md bg-white"><option>دوطرفه</option><option>یک‌طرفه (چپ)</option><option>یک‌طرفه (راست)</option></select><select value={hpi.edema.pitting} onChange={e => updateHpi('edema', 'pitting', e.target.value)} className="p-2 border rounded-md bg-white"><option>نامشخص</option><option>گوده‌گذار (Pitting)</option><option>غیر گوده‌گذار (Non-pitting)</option></select><input type="text" value={hpi.edema.timing} onChange={e => updateHpi('edema', 'timing', e.target.value)} placeholder="زمان‌بندی (مثلا بدتر در عصر)" className="p-2 border rounded-md" /><input type="text" value={hpi.edema.associated} onChange={e => updateHpi('edema', 'associated', e.target.value)} placeholder="علائم همراه (تنگی نفس، درد پا)" className="p-2 border rounded-md" /></div></div>}
            {chiefComplaint === 'claudication' && <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-orange-800">جزئیات لنگش</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.claudication.location} onChange={e => updateHpi('claudication', 'location', e.target.value)} placeholder="محل درد (ساق، ران)" className="p-2 border rounded-md" /><input type="text" value={hpi.claudication.character} onChange={e => updateHpi('claudication', 'character', e.target.value)} placeholder="کیفیت درد (کرامپی، فشاری)" className="p-2 border rounded-md" /><input type="text" value={hpi.claudication.distance} onChange={e => updateHpi('claudication', 'distance', e.target.value)} placeholder="مسافت شروع درد (متر)" className="p-2 border rounded-md" /><input type="text" value={hpi.claudication.relievingFactors} onChange={e => updateHpi('claudication', 'relievingFactors', e.target.value)} placeholder="عوامل تسکین‌دهنده (استراحت)" className="p-2 border rounded-md" /></div></div>}
            {chiefComplaint === 'fatigue' && <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-gray-800">جزئیات خستگی</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.fatigue.onset} onChange={e => updateHpi('fatigue', 'onset', e.target.value)} placeholder="شروع و مدت" className="p-2 border rounded-md" /><input type="text" value={hpi.fatigue.pattern} onChange={e => updateHpi('fatigue', 'pattern', e.target.value)} placeholder="الگو (مداوم، متناوب)" className="p-2 border rounded-md" /><div className="md:col-span-2"><label className="text-sm text-slate-600 mb-1">شدت: {hpi.fatigue.severity}</label><select value={hpi.fatigue.severity} onChange={e => updateHpi('fatigue', 'severity', e.target.value)} className="p-2 border rounded-md bg-white w-full"><option>خفیف</option><option>متوسط</option><option>شدید</option></select></div></div></div>}
            {chiefComplaint === 'hypertensiveSymptoms' && <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-purple-800">جزئیات علائم مرتبط با فشار خون</h3><div className="grid grid-cols-2 gap-4"><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.dizziness} onChange={() => handleHypertensiveSymptomChange('dizziness')} className="form-checkbox text-purple-500" />سرگیجه</label><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.headache} onChange={() => handleHypertensiveSymptomChange('headache')} className="form-checkbox text-purple-500" />سردرد</label><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.blurredVision} onChange={() => handleHypertensiveSymptomChange('blurredVision')} className="form-checkbox text-purple-500" />تاری دید</label><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.nausea} onChange={() => handleHypertensiveSymptomChange('nausea')} className="form-checkbox text-purple-500" />تهوع/استفراغ</label></div><input type="text" value={hpi.hypertensiveSymptoms.other} onChange={e => updateHpi('hypertensiveSymptoms', 'other', e.target.value)} placeholder="سایر علائم..." className="p-2 border rounded-md w-full mt-4" /></div>}
        </div>
    );
};
const RiskFactorsAndComorbidities = ({ data, updateData }) => {
    const { riskFactors, comorbidities } = data;

    const riskFactorItems = [
        { id: 'hypertension', label: 'فشار خون بالا' },
        { id: 'diabetes', label: 'دیابت' },
        { id: 'dyslipidemia', label: 'چربی خون بالا' },
        { id: 'smoking', label: 'مصرف سیگار (فعلی یا در 6 ماه اخیر)' },
        { id: 'familyHistory', label: 'سابقه خانوادگی بیماری قلبی زودرس' },
        { id: 'obesity', label: 'چاقی (BMI > 30)' },
    ];
    
    const comorbidityItems = [
        { id: 'knownCAD', label: 'بیماری عروق کرونر شناخته‌شده' },
        { id: 'ckd', label: 'بیماری مزمن کلیوی (CKD)' },
        { id: 'copd', label: 'بیماری مزمن انسدادی ریه (COPD)' },
    ];

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-700 flex items-center gap-2"><Activity className="text-red-500"/>عوامل خطر قلبی-عروقی</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {riskFactorItems.map(item => (
                        <label key={item.id} className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                            <input type="checkbox" checked={!!riskFactors[item.id]} onChange={e => updateData('riskFactors', item.id, e.target.checked)} className="form-checkbox h-5 w-5 text-red-500 rounded border-slate-300 focus:ring-red-500" />
                            <span className="mr-3 text-slate-700 font-medium">{item.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-700 flex items-center gap-2"><ClipboardList className="text-red-500"/>بیماری‌های زمینه‌ای (Comorbidities)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {comorbidityItems.map(item => (
                        <label key={item.id} className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                            <input type="checkbox" checked={!!comorbidities[item.id]} onChange={e => updateData('comorbidities', item.id, e.target.checked)} className="form-checkbox h-5 w-5 text-red-500 rounded border-slate-300 focus:ring-red-500" />
                            <span className="mr-3 text-slate-700 font-medium">{item.label}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-4">
                    <label className="font-semibold text-slate-600 block mb-2">سایر بیماری‌های زمینه‌ای</label>
                    <input type="text" value={comorbidities.other} onChange={e => updateData('comorbidities', 'other', e.target.value)} className="p-3 w-full border rounded-lg" placeholder="مثلا هیپوتیروئیدی، آرتریت روماتوئید و..."/>
                </div>
            </div>
        </div>
    );
};
const MedicalHistory = ({ data, updateData }) => { return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><BookUser className="text-red-500" />سوابق پزشکی و حساسیت</h2> <div className="space-y-6"> <div> <label className="font-semibold text-slate-600 block mb-2">سوابق پزشکی گذشته (PMH)</label> <textarea rows="3" value={data.pastMedicalHistory} onChange={(e) => updateData('pastMedicalHistory', null, e.target.value)} className="p-3 w-full border rounded-lg" placeholder="بیماری‌های مزمن دیگر مانند بیماری‌های تیروئید، کلیوی و..."/> </div> <div> <label className="font-semibold text-slate-600 block mb-2">سوابق جراحی (PSH)</label> <textarea rows="3" value={data.pastSurgicalHistory} onChange={(e) => updateData('pastSurgicalHistory', null, e.target.value)} className="p-3 w-full border rounded-lg" placeholder="جراحی‌های گذشته مانند CABG, PCI, آپاندکتومی و..."/> </div> <div> <label className="font-semibold text-slate-600 block mb-2">حساسیت‌ها (Allergies)</label> <input type="text" value={data.allergies} onChange={(e) => updateData('allergies', null, e.target.value)} className="p-3 w-full border rounded-lg" placeholder="حساسیت‌های دارویی یا غذایی. در صورت عدم وجود بنویسید 'ندارد'."/> </div> </div> </div> ); };
const ReviewOfSystems = ({ data: {ros}, updateData }) => { const handleCheckboxChange = (system, symptom) => { const currentSymptoms = ros[system] || []; const newSymptoms = currentSymptoms.includes(symptom) ? currentSymptoms.filter(s => s !== symptom) : [...currentSymptoms, symptom]; updateData('ros', system, newSymptoms); }; return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><ClipboardList className="text-red-500" />مرور سیستم‌ها (ROS)</h2> <p className="text-slate-500 mb-6 -mt-4">علائم مثبتی که بیمار در هر سیستم گزارش می‌کند را انتخاب کنید.</p> <div className="space-y-4"> {Object.entries(rosSystems).map(([systemKey, systemValue]) => ( <details key={systemKey} className="bg-slate-50 rounded-lg p-3 border" open> <summary className="font-bold text-slate-800 cursor-pointer">{systemValue.label}</summary> <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4"> {systemValue.symptoms.map(symptom => ( <label key={symptom} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-white"> <input type="checkbox" checked={(ros[systemKey] || []).includes(symptom)} onChange={() => handleCheckboxChange(systemKey, symptom)} className="form-checkbox h-4 w-4 text-red-500 rounded border-slate-300 focus:ring-red-500" /> <span className="text-slate-700 text-sm">{symptom}</span> </label> ))} </div> </details> ))} </div> </div> ); };
const Medications = ({ data: {medications}, setData }) => { const handleMedChange = (index, field, value) => { const newMeds = [...medications]; if (field === 'name' && !newMeds[index].isCustom) { const selectedMed = commonMedications.find(m => m.name === value); newMeds[index].name = value; newMeds[index].dosage = selectedMed ? selectedMed.dosage : ''; } else { newMeds[index][field] = value; } setData(prev => ({ ...prev, medications: newMeds })); }; const toggleCustom = (index) => { const newMeds = [...medications]; newMeds[index].isCustom = !newMeds[index].isCustom; newMeds[index].name = ''; newMeds[index].dosage = ''; setData(prev => ({ ...prev, medications: newMeds })); }; const addMed = () => setData(prev => ({ ...prev, medications: [...prev.medications, { name: '', dosage: '', isCustom: true }] })); const removeMed = (index) => setData(prev => ({ ...prev, medications: medications.filter((_, i) => i !== index) })); return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><Pill className="text-red-500"/>تاریخچه دارویی</h2> <div className="space-y-4"> {medications.map((med, index) => ( <div key={index} className="p-3 bg-slate-50 rounded-lg border space-y-2"> <div className="flex flex-col md:flex-row gap-2 items-center"> {med.isCustom ? ( <> <input type="text" value={med.name} onChange={e => handleMedChange(index, 'name', e.target.value)} placeholder="نام داروی سفارشی" className="p-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-red-300"/> <input type="text" value={med.dosage} onChange={e => handleMedChange(index, 'dosage', e.target.value)} placeholder="دوز مصرفی" className="p-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-red-300"/> </> ) : ( <> <select value={med.name} onChange={e => handleMedChange(index, 'name', e.target.value)} className="p-2 border border-slate-300 rounded-lg w-full bg-white focus:ring-2 focus:ring-red-300"> <option value="">یک دارو انتخاب کنید...</option> {commonMedications.map(m => <option key={m.name} value={m.name}>{m.name}</option>)} </select> <input type="text" value={med.dosage} onChange={e => handleMedChange(index, 'dosage', e.target.value)} placeholder="دوز پیشنهادی" className="p-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-red-300"/> </> )} <button onClick={() => removeMed(index)} className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100 hover:bg-red-200 transition"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> </button> </div> <button onClick={() => toggleCustom(index)} className="text-sm text-blue-600 hover:underline"> {med.isCustom ? 'انتخاب از لیست داروها' : 'ورود داروی سفارشی'} </button> </div> ))} </div> <button onClick={addMed} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> افزودن دارو </button> </div> ); };
const PhysicalExam = ({ data: {physicalExam}, updateData, openModal, isEducationalMode }) => { const handleQuickAdd = (field, text) => { const currentText = physicalExam[field] || ''; const newText = currentText ? `${currentText}, ${text}` : text; updateData('physicalExam', field, newText); }; const fields = [ { id: 'general', label: 'وضعیت عمومی', quickAdds: ['هوشیار', 'بی‌قرار', 'رنگ‌پریده'] }, { id: 'jvp', label: 'فشار ورید ژوگولار (JVP)', quickAdds: ['طبیعی', 'برجسته (Elevated)'] }, { id: 'heartSounds', label: 'صداهای قلبی', quickAdds: ['S1, S2 نرمال', 'سوفل سیستولیک', 'S3'], info: clinicalInfo.heartSounds }, { id: 'lungSounds', label: 'صداهای ریوی', quickAdds: ['سمع واضح', 'کراکل (Rales)', 'ویزینگ'], info: clinicalInfo.lungSounds }, { id: 'extremities', label: 'معاینه اندام‌ها', quickAdds: ['بدون ادم', 'ادم گوده‌گذار +1', 'نبض‌ها قرینه'] }, ]; return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><Stethoscope className="text-red-500"/>یافته‌های معاینه فیزیکی</h2> <div className="space-y-6"> {fields.map(field => ( <div key={field.id}> <label className="mb-2 font-semibold text-slate-600 flex items-center gap-2">{field.label} {field.info && <InfoButton onClick={() => openModal(field.info.title, field.info.content)} isEducationalMode={isEducationalMode} />}</label> <textarea rows="2" value={physicalExam[field.id]} onChange={e => updateData('physicalExam', field.id, e.target.value)} className="p-3 w-full border rounded-lg" placeholder={`یافته‌های مربوط به ${field.label}...`}/> <div className="flex flex-wrap gap-2 mt-2"> {field.quickAdds.map(qa => <QuickAddButton key={qa} text={qa} onClick={() => handleQuickAdd(field.id, qa)} />)} </div> </div> ))} </div> </div> ); };
const ParaclinicalStudies = ({ data: {paraclinical}, updateData, openModal, isEducationalMode }) => {
    const cxrFindingsOptions = ['کاردیومگالی', 'ادم ریوی', 'افیوژن پلور', 'مدیاستن پهن', 'پنوموتوراکس'];
    const handleCxrCheckboxChange = (finding) => {
        const currentFindings = paraclinical.cxr.findings || [];
        const newFindings = currentFindings.includes(finding) ? currentFindings.filter(f => f !== finding) : [...currentFindings, finding];
        updateData('paraclinical', 'cxr', { ...paraclinical.cxr, findings: newFindings });
    };
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><Beaker className="text-red-500"/>بررسی‌های پاراکلینیک</h2>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="font-semibold text-slate-600 block mb-2">تروپونین (Troponin)</label>
                        <select value={paraclinical.troponin} onChange={(e) => updateData('paraclinical', 'troponin', e.target.value)} className="p-3 w-full border rounded-lg bg-white">
                            <option>منفی</option>
                            <option>مثبت (۱ تا ۳ برابر نرمال)</option>
                            <option>مثبت (بیش از ۳ برابر نرمال)</option>
                        </select>
                    </div>
                    <div> <label className="font-semibold text-slate-600 block mb-2">BNP / Pro-BNP</label> <input type="text" value={paraclinical.bnp} onChange={(e) => updateData('paraclinical', 'bnp', e.target.value)} className="p-3 w-full border rounded-lg" placeholder="مقدار BNP..."/> </div>
                </div>
                <div>
                    <label className="font-semibold text-slate-600 flex items-center gap-2 mb-2">یافته‌های عکس قفسه سینه (CXR) <InfoButton onClick={() => openModal(clinicalInfo.cxrInterpretation.title, clinicalInfo.cxrInterpretation.content)} isEducationalMode={isEducationalMode} /></label>
                    <div className="p-4 bg-slate-50 rounded-lg border">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {cxrFindingsOptions.map(finding => (
                                <label key={finding} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-white">
                                    <input type="checkbox" checked={(paraclinical.cxr.findings || []).includes(finding)} onChange={() => handleCxrCheckboxChange(finding)} className="form-checkbox h-4 w-4 text-red-500 rounded border-slate-300"/>
                                    <span className="text-slate-700 text-sm">{finding}</span>
                                </label>
                            ))}
                        </div>
                        <textarea rows="3" value={paraclinical.cxr.other} onChange={(e) => updateData('paraclinical', 'cxr', { ...paraclinical.cxr, other: e.target.value })} className="p-3 w-full border rounded-lg mt-4" placeholder="سایر یافته‌های مهم در CXR..."/>
                    </div>
                </div>
            </div>
        </div>
    );
};
const ECGFindings = ({ data: {ecg}, updateData, openModal, isEducationalMode }) => {
    const handleMultiCheckboxChange = (field, value) => { const currentValues = ecg[field] || []; const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value]; updateData('ecg', field, newValues); };
    const showRateCalculator = () => openModal('محاسبه‌گر ریت قلبی', <RateCalculator onSubmit={(rate) => updateData('ecg', 'rate', rate)} />);
    const showQTcCalculator = () => openModal('محاسبه‌گر QTc', <QTcCalculator rate={ecg.rate} onSubmit={(qtc, qt) => { updateData('ecg', 'qtc', qtc); updateData('ecg', 'qt', qt); }} />);
    const showAxisCalculator = () => openModal('محاسبه‌گر محور قلب', <AxisCalculator onSubmit={(axis) => updateData('ecg', 'axis', axis)} />);
    const morphologyOptions = ['LBBB', 'RBBB', 'IVCD', 'LVH', 'RVH'];
    const leadGroups = ['Anterior (V1-V4)', 'Inferior (II, III, aVF)', 'Lateral (I, aVL, V5-V6)'];

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><HeartPulse className="text-red-500"/>یافته‌های نوار قلب (ECG)</h2>
            <div className="space-y-6">
                {/* Group 1: Rhythm & Rate */}
                <details className="bg-slate-50 rounded-lg p-3 border" open><summary className="font-bold text-slate-800 cursor-pointer">ریتم، ریت و محور</summary><div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div> <label className="font-semibold text-slate-600 flex items-center gap-2">ریتم <InfoButton onClick={() => openModal(clinicalInfo.ecgRhythms.title, clinicalInfo.ecgRhythms.content)} isEducationalMode={isEducationalMode}/></label> <select value={ecg.rhythm} onChange={e => updateData('ecg', 'rhythm', e.target.value)} className="w-full p-2 mt-1 border rounded-md bg-white"> <option>سینوسی</option><option>فیبریلاسیون دهلیزی</option><option>فلوتر دهلیزی</option><option>SVT</option><option>VT</option> </select> </div>
                    <div> <label className="font-semibold text-slate-600">ریت (Rate)</label> <div className="flex items-center gap-2"><input type="number" value={ecg.rate} onChange={e => updateData('ecg', 'rate', e.target.value)} placeholder="bpm" className="w-full p-2 mt-1 border rounded-md" /><CalculatorButton text="" onClick={showRateCalculator} /></div> </div>
                    <div> <label className="font-semibold text-slate-600">محور (Axis)</label> <div className="flex items-center gap-2"><select value={ecg.axis} onChange={e => updateData('ecg', 'axis', e.target.value)} className="w-full p-2 mt-1 border rounded-md bg-white"><option>نرمال</option><option>انحراف به چپ</option><option>انحراف به راست</option><option>نامشخص</option></select><CalculatorButton text="" onClick={showAxisCalculator} /></div> </div>
                </div></details>

                {/* Group 2: Intervals */}
                <details className="bg-slate-50 rounded-lg p-3 border" open><summary className="font-bold text-slate-800 cursor-pointer">فواصل (Intervals)</summary><div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div> <label className="font-semibold text-slate-600 flex items-center gap-2">فاصله PR <InfoButton onClick={() => openModal(clinicalInfo.prInterval.title, clinicalInfo.prInterval.content)} isEducationalMode={isEducationalMode} /></label> <input type="number" value={ecg.pr} onChange={e => updateData('ecg', 'pr', e.target.value)} placeholder="ms" className="w-full p-2 mt-1 border rounded-md" /> </div>
                    <div> <label className="font-semibold text-slate-600 flex items-center gap-2">مدت QRS <InfoButton onClick={() => openModal(clinicalInfo.qrsDuration.title, clinicalInfo.qrsDuration.content)} isEducationalMode={isEducationalMode} /></label> <input type="number" value={ecg.qrs} onChange={e => updateData('ecg', 'qrs', e.target.value)} placeholder="ms" className="w-full p-2 mt-1 border rounded-md" /> </div>
                    <div> <label className="font-semibold text-slate-600">فاصله QTc</label> <div className="flex items-center gap-2"><input type="number" value={ecg.qtc} onChange={e => updateData('ecg', 'qtc', e.target.value)} placeholder="ms" className="w-full p-2 mt-1 border rounded-md" /><CalculatorButton text="" onClick={showQTcCalculator} /></div> </div>
                </div></details>

                {/* Group 3: Ischemia & Infarction */}
                <details className="bg-slate-50 rounded-lg p-3 border" open><summary className="font-bold text-slate-800 cursor-pointer">ایسکمی و انفارکتوس</summary><div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div><p className="font-semibold mb-2">تغییرات قطعه ST:</p><div className="space-y-2">{['ST Elevation', 'ST Depression', 'T Wave Inversion'].map(opt => ( <label key={opt} className="flex items-center gap-2"><input type="checkbox" checked={ecg.stChanges.includes(opt)} onChange={() => handleMultiCheckboxChange('stChanges', opt)} className="form-checkbox text-red-500" />{opt}</label> ))}</div></div>
                    <div><p className="font-semibold mb-2">محل تغییرات ST:</p><div className="space-y-2">{leadGroups.map(opt => ( <label key={opt} className="flex items-center gap-2"><input type="checkbox" checked={ecg.stLocation.includes(opt)} onChange={() => handleMultiCheckboxChange('stLocation', opt)} className="form-checkbox text-red-500" />{opt}</label>))}</div></div>
                    <div className="md:col-span-2"><label className="font-semibold flex items-center gap-2">امواج Q پاتولوژیک <InfoButton onClick={() => openModal(clinicalInfo.qWaves.title, clinicalInfo.qWaves.content)} isEducationalMode={isEducationalMode} /></label><div className="flex items-center gap-4 mt-2"><label className="flex items-center gap-2"><input type="checkbox" checked={ecg.hasQWaves} onChange={(e) => updateData('ecg', 'hasQWaves', e.target.checked)} className="form-checkbox text-red-500" />وجود دارد</label> {ecg.hasQWaves && (<select multiple value={ecg.qWaveLocation} onChange={(e) => updateData('ecg', 'qWaveLocation', Array.from(e.target.selectedOptions, option => option.value))} className="w-full p-2 border rounded-md bg-white text-sm"><option value="">انتخاب محل...</option>{leadGroups.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>)}</div></div>
                </div></details>

                {/* Group 4: Morphology */}
                <details className="bg-slate-50 rounded-lg p-3 border" open>
                    <summary className="font-bold text-slate-800 cursor-pointer flex items-center justify-between">
                        <span>مورفولوژی و بلوک‌ها</span>
                        <InfoButton onClick={() => openModal(clinicalInfo.morphologies.title, clinicalInfo.morphologies.content)} isEducationalMode={isEducationalMode} />
                    </summary>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                        {morphologyOptions.map(opt => (<label key={opt} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-white"><input type="checkbox" checked={ecg.morphologies.includes(opt)} onChange={() => handleMultiCheckboxChange('morphologies', opt)} className="form-checkbox text-red-500" />{opt}</label>))}
                    </div>
                </details>

                <textarea value={ecg.other} onChange={e => updateData('ecg', 'other', e.target.value)} rows="3" placeholder="سایر توضیحات و یافته‌های مهم ECG..." className="w-full p-2 mt-1 border rounded-md"></textarea>
            </div>
        </div>
    );
};
const SummaryAndPlan = ({ data, onSave, goToStep, isEducationalMode }) => {
  const ddx = useMemo(() => generateDDx(data), [data]);
  const planSuggestions = useMemo(() => generatePlan(ddx), [ddx]);
  
  const handlePrint = () => { window.print(); };

  const summaryText = useMemo(() => {
    const { info, chiefComplaint, pastMedicalHistory, pastSurgicalHistory, allergies, ros, medications, physicalExam, paraclinical, ecg } = data;
    let text = `** اطلاعات بیمار **\nشناسه: ${info.name || info.id}, سن: ${info.age || '---'} ساله, جنسیت: ${info.gender}\n\n`;
    const complaints = { chestPain: 'درد قفسه سینه', shortnessOfBreath: 'تنگی نفس', palpitations: 'تپش قلب', hypertensiveSymptoms: 'علائم فشار خون', syncope: 'سنکوپ/غش', edema: 'ادم/ورم', claudication: 'لنگش', fatigue: 'خستگی' };
    text += `** شکایت اصلی **\n${complaints[chiefComplaint] || 'ثبت نشده'}\n\n`;
    
    text += `** تاریخچه بیماری فعلی (HPI) **\n${formatHpi(data)}\n\n`;
    
    text += `** سوابق پزشکی، جراحی و دارویی **\n- PMH: ${pastMedicalHistory || 'ندارد'}\n- PSH: ${pastSurgicalHistory || 'ندارد'}\n- DH: ${medications.filter(m=>m.name).map(m => m.name).join(', ') || 'ندارد'}\n\n`;
    text += `** حساسیت‌ها **\n${allergies || 'ندارد'}\n\n`;
    text += `** مرور سیستم‌ها (ROS) **\n${Object.entries(ros).map(([sys, syms]) => syms.length > 0 ? `- ${rosSystems[sys].label}: ${syms.join(', ')}` : null).filter(Boolean).join('\n') || 'نکته مثبتی ذکر نشد.'}\n\n`;
    text += `** معاینه فیزیکی **\n- عمومی: ${physicalExam.general}\n- JVP: ${physicalExam.jvp}\n- قلب: ${physicalExam.heartSounds}\n- ریه: ${physicalExam.lungSounds}\n- اندام‌ها: ${physicalExam.extremities}\n\n`;
    text += `** پاراکلینیک **\n- تروپونین: ${paraclinical.troponin || '---'}\n- BNP: ${paraclinical.bnp || '---'}\n- CXR: ${paraclinical.cxr.findings?.join(', ') || '---'}. ${paraclinical.cxr.other || ''}\n\n`;
    text += `** نوار قلب (ECG) **\n- ریتم: ${ecg.rhythm}, ریت: ${ecg.rate || '---'} bpm, محور: ${ecg.axis}\n- فواصل: PR=${ecg.pr || '---'}ms, QRS=${ecg.qrs || '---'}ms, QTc=${ecg.qtc || '---'}ms\n${ecg.stChanges.length > 0 ? `- تغییرات ST/T: ${ecg.stChanges.join(', ')}\n` : ''}${ecg.morphologies.length > 0 ? `- مورفولوژی: ${ecg.morphologies.join(', ')}\n` : ''}\n`;
    
    if (isEducationalMode) {
        text += `** تشخیص‌های افتراقی (DDx) **\n${ddx.length > 0 ? ddx.map((d, i) => `${i + 1}. ${d.name}`).join('\n') : '---'}`;
    }
    return text;
  }, [data, ddx, isEducationalMode]);

  return (
    <div className="animate-fade-in">
        <div id="print-area" className="print-container">
            <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2 print-section"><Clipboard className="text-red-500"/>خلاصه و تشخیص</h2>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-wrap font-mono text-sm leading-relaxed print-section">{summaryText}</div>
            
            {isEducationalMode && (
                <>
                    <div className="mt-8 print-section">
                        <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2"><BrainCircuit className="text-red-500" />دستیار تشخیص افتراقی</h3>
                        <div className="mt-4 space-y-3">
                        {ddx.length > 0 ? ( ddx.map(d => ( <div key={d.name} className="p-3 bg-yellow-50 border-r-4 border-yellow-400"> <p className="font-bold text-yellow-800">{d.name}</p> <p className="text-sm text-yellow-700">{d.reason}</p> </div> )) ) : ( <p className="text-slate-500">اطلاعات کافی برای پیشنهاد تشخیص وجود ندارد.</p> )}
                        </div>
                    </div>

                    <div className="mt-8 print-section">
                        <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2"><FileText className="text-red-500" />طرح و برنامه درمانی پیشنهادی</h3>
                        <div className="mt-4 space-y-3">
                        {planSuggestions.length > 0 ? ( planSuggestions.map(p => ( <div key={p.title} className="p-3 bg-blue-50 border-r-4 border-blue-400"> <p className="font-bold text-blue-800">{p.title}</p> <ul className="list-disc list-inside mt-2 text-sm text-blue-700"> {p.actions.map(action => <li key={action}>{action}</li>)} </ul> </div> )) ) : ( <p className="text-slate-500">برنامه درمانی مشخصی بر اساس داده‌ها پیشنهاد نمی‌شود.</p> )}
                        </div>
                    </div>
                </>
            )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 no-print-view">
            <button onClick={onSave} className="flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">ذخیره بیمار</button>
            <button onClick={handlePrint} className="flex-1 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"><Printer size={20} /> چاپ / ذخیره PDF</button>
        </div>
    </div>
  );
};

const NavigationButtons = ({ step, totalSteps, nextStep, prevStep }) => ( <div className="flex justify-between mt-8 no-print-view"> <button onClick={prevStep} disabled={step === 1} className="bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-400 transition disabled:bg-slate-200 disabled:cursor-not-allowed flex items-center gap-2"><ChevronRight />قبلی</button> <button onClick={nextStep} disabled={step === totalSteps} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition disabled:bg-red-300 disabled:cursor-not-allowed flex items-center gap-2">بعدی<ChevronLeft /></button> </div> );

// --- Calculators & Logic ---
const HeartScoreCalculator = ({ data, isEducationalMode, openModal }) => {
    const [history, setHistory] = useState(0);
    const [ecg, setEcg] = useState(0);
    const [age, setAge] = useState(0);
    const [risk, setRisk] = useState(0);
    const [troponin, setTroponin] = useState(0);

    useEffect(() => {
        const patientAge = parseInt(data.info.age, 10);
        if (!isNaN(patientAge)) {
            if (patientAge >= 65) setAge(2);
            else if (patientAge >= 45) setAge(1);
            else setAge(0);
        }

        const riskFactorCount = Object.values(data.riskFactors).filter(Boolean).length + Object.values(data.comorbidities).filter(c => typeof c === 'boolean' && c).length;
        if (riskFactorCount >= 3) setRisk(2);
        else if (riskFactorCount >= 1) setRisk(1);
        else setRisk(0);
        
        const { ecg: ecgData } = data;
        if (ecgData.stChanges.includes('ST Elevation') || ecgData.stChanges.includes('ST Depression')) {
            setEcg(2);
        } else if (ecgData.morphologies.includes('LBBB') || ecgData.morphologies.includes('LVH') || ecgData.stChanges.includes('T Wave Inversion')) {
            setEcg(1);
        } else {
            setEcg(0);
        }
        
        const tropStatus = data.paraclinical.troponin;
        if (tropStatus === 'مثبت (بیش از ۳ برابر نرمال)') setTroponin(2);
        else if (tropStatus === 'مثبت (۱ تا ۳ برابر نرمال)') setTroponin(1);
        else setTroponin(0);

    }, [data]);

    const totalScore = history + ecg + age + risk + troponin;
    let interpretationText = '';
    let interpretationColor = 'text-slate-700';
    if (totalScore <= 3) {
        interpretationText = 'ریسک پایین (MACE ریسک 1.7%): بیمار احتمالا برای ترخیص ایمن است.';
        interpretationColor = 'text-green-700';
    } else if (totalScore <= 6) {
        interpretationText = 'ریسک متوسط (MACE ریسک 16.6%): بیمار باید جهت بررسی بیشتر بستری شود.';
        interpretationColor = 'text-yellow-700';
    } else {
        interpretationText = 'ریسک بالا (MACE ریسک 50.1%): نیاز به مداخله فوری و ارجاع به متخصص.';
        interpretationColor = 'text-red-700';
    }

    const RadioGroup = ({ label, value, setValue, options, infoKey }) => (
        <div>
            <label className="font-semibold text-slate-700 block mb-2 flex items-center gap-2">
                {label}
                <InfoButton onClick={() => openModal(clinicalInfo.heartScoreInfo[infoKey].title, clinicalInfo.heartScoreInfo[infoKey].content)} isEducationalMode={isEducationalMode} />
            </label>
            <div className="space-y-2">
                {options.map(opt => (
                    <label key={opt.value} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer">
                        <input type="radio" name={label} value={opt.value} checked={value === opt.value} onChange={(e) => setValue(parseInt(e.target.value))} className="form-radio text-red-500"/>
                        <span>{opt.label} <span className="text-xs text-slate-500">({opt.value} امتیاز)</span></span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <RadioGroup label="شرح حال (History)" value={history} setValue={setHistory} options={[ { value: 0, label: 'کمی مشکوک' }, { value: 1, label: 'متوسط مشکوک' }, { value: 2, label: 'بسیار مشکوک' } ]} infoKey="history"/>
            <RadioGroup label="نوار قلب (ECG)" value={ecg} setValue={setEcg} options={[ { value: 0, label: 'نرمال' }, { value: 1, label: 'تغییرات غیراختصاصی' }, { value: 2, label: 'تغییرات چشمگیر ST' } ]} infoKey="ecg"/>
            <RadioGroup label="سن (Age)" value={age} setValue={setAge} options={[ { value: 0, label: 'کمتر از ۴۵' }, { value: 1, label: '۴۵ تا ۶۴' }, { value: 2, label: 'بیشتر یا مساوی ۶۵' } ]} infoKey="age"/>
            <RadioGroup label="عوامل خطر (Risk Factors)" value={risk} setValue={setRisk} options={[ { value: 0, label: 'بدون عامل خطر' }, { value: 1, label: '۱ تا ۲ عامل خطر' }, { value: 2, label: '۳ عامل خطر یا بیشتر' } ]} infoKey="risk"/>
            <RadioGroup label="تروپونین (Troponin)" value={troponin} setValue={setTroponin} options={[ { value: 0, label: 'کمتر از حد نرمال' }, { value: 1, label: '۱ تا ۳ برابر حد نرمال' }, { value: 2, label: 'بیشتر از ۳ برابر حد نرمال' } ]} infoKey="troponin"/>

            <div className="p-4 bg-red-50 border-t-4 border-red-500 rounded-b-lg text-center">
                <p className="text-lg font-bold text-slate-800">امتیاز نهایی HEART: <span className="text-2xl text-red-600">{totalScore}</span></p>
                {isEducationalMode && <p className={`mt-2 font-semibold ${interpretationColor}`}>{interpretationText}</p>}
            </div>
        </div>
    );
};
const RateCalculator = ({ onSubmit }) => { const [rr, setRr] = useState(''); const rate = rr ? Math.round(1500 / rr) : 0; return ( <div><p className="text-sm text-slate-600">فاصله بین دو موج R را بر حسب تعداد خانه‌های کوچک (mm) وارد کنید.</p><label className="block font-semibold mt-2">فاصله RR (تعداد خانه‌های کوچک):</label> <input type="number" value={rr} onChange={e => setRr(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 20" /> {rate > 0 && <p className="mt-2 font-bold">ریت محاسبه شده: {rate} bpm</p>} <button onClick={() => onSubmit(rate)} className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg">استفاده از این عدد</button> </div> ); };
const QTcCalculator = ({ rate, onSubmit }) => { const [qt, setQt] = useState(''); const [localRate, setLocalRate] = useState(rate || ''); const rr = localRate ? 60 / localRate : 0; const qtc = (qt && rr) ? Math.round((qt/1000) / Math.sqrt(rr) * 1000) : 0; return ( <div className="space-y-4"> <div> <label className="block font-semibold">ضربان قلب (Rate):</label> <input type="number" value={localRate} onChange={e => setLocalRate(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="ریت بیمار" /> </div> <div> <label className="block font-semibold">فاصله QT (به میلی‌ثانیه):</label> <input type="number" value={qt} onChange={e => setQt(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 400ms" /> </div> {qtc > 0 && <p className="mt-2 font-bold">QTc محاسبه شده (فرمول Bazett): {qtc} ms</p>} <button onClick={() => onSubmit(qtc, qt)} className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg">استفاده از این عدد</button> </div> ); };
const AxisCalculator = ({ onSubmit }) => { const [lead1, setLead1] = useState(''); const [avf, setAvf] = useState(''); let axis = 'نامشخص'; if(lead1 !== '' && avf !== '') { const l1 = parseInt(lead1); const a = parseInt(avf); if (l1 >= 0 && a >= 0) axis = 'نرمال'; else if (l1 >= 0 && a < 0) axis = 'انحراف به چپ'; else if (l1 < 0 && a >= 0) axis = 'انحراف به راست'; else axis = 'انحراف شدید'; } return ( <div className="space-y-4"> <p className="text-sm text-slate-600">دامنه خالص کمپلکس QRS را در لیدهای I و aVF وارد کنید (مثبت یا منفی).</p> <div> <label className="block font-semibold">لید I (mm)</label> <input type="number" value={lead1} onChange={e => setLead1(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 5"/> </div> <div> <label className="block font-semibold">لید aVF (mm)</label> <input type="number" value={avf} onChange={e => setAvf(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 8"/> </div> {axis !== 'نامشخص' && <p className="mt-2 font-bold">محور محاسبه شده: {axis}</p>} <button onClick={() => onSubmit(axis)} className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg">استفاده از این محور</button> </div> ); };

function formatHpi(data) {
    const { info, chiefComplaint, hpi, riskFactors, comorbidities } = data;
    if (!chiefComplaint || !hpi[chiefComplaint]) {
        return 'ثبت نشده';
    }

    let narrative = `بیمار ${info.gender === 'مرد' ? 'آقا' : 'خانم'} ${info.age || '---'} ساله`;

    const knownConditions = [];
    if (riskFactors.hypertension) knownConditions.push('فشار خون بالا');
    if (riskFactors.diabetes) knownConditions.push('دیابت');
    if (riskFactors.dyslipidemia) knownConditions.push('چربی خون بالا');
    if (comorbidities.knownCAD) knownConditions.push('بیماری عروق کرونر');
    if (comorbidities.ckd) knownConditions.push('بیماری مزمن کلیوی');
    if (comorbidities.copd) knownConditions.push('بیماری مزمن انسدادی ریه');
    if (comorbidities.other) knownConditions.push(comorbidities.other);
    
    if (knownConditions.length > 0) {
        narrative += `، K/C ${knownConditions.join(' و ')}`;
    }

    const complaints = { chestPain: 'درد قفسه سینه', shortnessOfBreath: 'تنگی نفس', palpitations: 'تپش قلب', hypertensiveSymptoms: 'علائم فشار خون', syncope: 'سنکوپ', edema: 'ادم', claudication: 'لنگش', fatigue: 'خستگی' };
    narrative += ` با شکایت ${complaints[chiefComplaint] || 'شکایت نامشخص'} مراجعه کرده است. `;

    const details = hpi[chiefComplaint];
    let hpiDetailsText = '';

    switch (chiefComplaint) {
        case 'chestPain':
            const cpParts = [];
            if (details.onset) cpParts.push(`درد از ${details.onset} شروع شده است`);
            if (details.quality) cpParts.push(`کیفیت آن ${details.quality} می‌باشد`);
            if (details.radiation) cpParts.push(`و به ${details.radiation} انتشار دارد`);
            if (details.severity && details.severity !== '0') cpParts.push(`شدت آن ${details.severity}/10 است`);
            if (details.provocative) cpParts.push(`این درد با ${details.provocative} تشدید می‌شود`);
            if (details.palliative) cpParts.push(`و با ${details.palliative} تسکین می‌یابد`);
            hpiDetailsText = cpParts.join('. ').replace(/ \./g, '.').replace(/\.+$/, "") + ".";
            break;
        case 'shortnessOfBreath':
            const sobParts = [];
            if (details.onset) sobParts.push(`تنگی نفس از ${details.onset} شروع شده است`);
            if (details.type?.length > 0) sobParts.push(`و از نوع ${details.type.join('، ')} می‌باشد`);
            if (details.associated) sobParts.push(`علائم همراه شامل ${details.associated} است`);
            hpiDetailsText = sobParts.join('. ').replace(/ \./g, '.').replace(/\.+$/, "") + ".";
            break;
        case 'palpitations':
            const palpParts = [];
            if (details.onset) palpParts.push(`تپش قلب با شروع ${details.onset} بوده`);
            if (details.duration) palpParts.push(`و به مدت ${details.duration} ادامه داشته است`);
            if (details.character) palpParts.push(`کیفیت آن به صورت ${details.character} توصیف می‌شود`);
            if (details.triggers) palpParts.push(`و با عواملی چون ${details.triggers} تحریک می‌شود`);
            if (details.associatedSymptoms) palpParts.push(`علائم همراه شامل ${details.associatedSymptoms} بوده است`);
            hpiDetailsText = palpParts.join('. ').replace(/ \./g, '.').replace(/\.+$/, "") + ".";
            break;
        case 'syncope':
            const syncopeParts = [];
            if (details.prodrome) syncopeParts.push(`بیمار علائم پیش‌درآمدی مانند ${details.prodrome} داشته است`);
            if (details.position) syncopeParts.push(`سنکوپ در وضعیت ${details.position} رخ داده است`);
            if (details.precipitatingEvents) syncopeParts.push(`عوامل شروع‌کننده شامل ${details.precipitatingEvents} بوده است`);
            if (details.postEvent) syncopeParts.push(`و پس از حمله، بیمار ${details.postEvent} بوده است`);
            if (details.palpitations) syncopeParts.push(`همچنین بیمار قبل از حمله دچار تپش قلب شده است`);
            hpiDetailsText = syncopeParts.join('. ').replace(/ \./g, '.').replace(/\.+$/, "") + ".";
            break;
        case 'edema':
            const edemaParts = [];
            if (details.location) edemaParts.push(`ادم به صورت ${details.location} است`);
            if (details.pitting && details.pitting !== 'نامشخص') edemaParts.push(`از نوع ${details.pitting} می‌باشد`);
            if (details.timing) edemaParts.push(`که زمان‌بندی آن به صورت ${details.timing} است`);
            if (details.associated) edemaParts.push(`علائم همراه شامل ${details.associated} می‌باشد`);
            hpiDetailsText = edemaParts.join('. ').replace(/ \./g, '.').replace(/\.+$/, "") + ".";
            break;
        case 'claudication':
             const claudParts = [];
             if (details.location) claudParts.push(`بیمار از درد در ناحیه ${details.location} شاکی است`);
             if (details.character) claudParts.push(`که کیفیت آن ${details.character} است`);
             if (details.distance) claudParts.push(`این درد پس از طی مسافت تقریبی ${details.distance} متر شروع می‌شود`);
             if (details.relievingFactors) claudParts.push(`و با ${details.relievingFactors} بهبود می‌یابد`);
             hpiDetailsText = claudParts.join('. ').replace(/ \./g, '.').replace(/\.+$/, "") + ".";
             break;
        case 'fatigue':
             const fatigueParts = [];
             if (details.onset) fatigueParts.push(`خستگی بیمار از ${details.onset} شروع شده است`);
             if (details.pattern) fatigueParts.push(`الگوی آن ${details.pattern} است`);
             if (details.severity) fatigueParts.push(`و شدت آن ${details.severity} توصیف می‌شود`);
             hpiDetailsText = fatigueParts.join('. ').replace(/ \./g, '.').replace(/\.+$/, "") + ".";
             break;
        case 'hypertensiveSymptoms':
            const symptoms = Object.entries(details)
                .filter(([key, value]) => value === true)
                .map(([key]) => {
                    if (key === 'dizziness') return 'سرگیجه';
                    if (key === 'headache') return 'سردرد';
                    if (key === 'blurredVision') return 'تاری دید';
                    if (key === 'nausea') return 'تهوع';
                    return null;
                })
                .filter(Boolean);
            if (details.other) {
                symptoms.push(details.other);
            }
            if (symptoms.length > 0) {
                hpiDetailsText = `علائم بیمار شامل ${symptoms.join('، ')} می‌باشد.`;
            }
            break;
        default:
            hpiDetailsText = '';
    }
    
    if (hpiDetailsText.replace(/\./g, '').trim() !== '') {
        narrative += hpiDetailsText;
    }

    return narrative.trim();
}


function generateDDx(data) {
    const ddx = [];
    const { chiefComplaint, hpi, riskFactors, comorbidities, physicalExam, ecg, paraclinical } = data;
    const allRisks = {...riskFactors, ...comorbidities};

    if (chiefComplaint === 'chestPain') {
        if (ecg.stChanges.includes('ST Elevation') || paraclinical.troponin.startsWith('مثبت')) { ddx.push({ name: 'سکته قلبی حاد (MI)', reason: 'درد قفسه سینه به همراه تغییرات ECG یا تروپونین مثبت.' }); }
        else if (hpi.chestPain.quality?.includes('تیز')) { ddx.push({ name: 'پریکاردیت یا آمبولی ریه', reason: 'ماهیت تیز و پلورتیک درد.' }); }
    }
    if (chiefComplaint === 'shortnessOfBreath') {
        if (physicalExam.lungSounds?.includes('کراکل') || (paraclinical.bnp && parseFloat(paraclinical.bnp) > 400) || paraclinical.cxr?.findings?.includes('ادم ریوی')) { ddx.push({ name: 'نارسایی احتقانی قلب (CHF)', reason: 'تنگی نفس به همراه یافته‌های CHF (کراکل، BNP بالا، ادم ریوی در CXR).' }); }
    }
    if (chiefComplaint === 'edema' && hpi.edema.location?.includes('یک‌طرفه')) {
        ddx.push({ name: 'ترومبوز ورید عمقی (DVT)', reason: 'ادم یک‌طرفه اندام تحتانی.' });
    }
    if (chiefComplaint === 'claudication') {
        ddx.push({ name: 'بیماری عروق محیطی (PAD)', reason: 'درد پا هنگام فعالیت (لنگش).' });
    }
    if (chiefComplaint === 'syncope' && hpi.syncope.palpitations) {
        ddx.push({ name: 'آریتمی قلبی منجر به سنکوپ', reason: 'سنکوپ به همراه تپش قلب.' });
    }
    if (ddx.length === 0 && (Object.values(allRisks).some(v => v) || data.info.age > 40) && chiefComplaint === 'chestPain') {
        ddx.push({ name: 'بیماری عروق کرونر (آنژین)', reason: 'درد قفسه سینه در بیمار با عوامل خطر قلبی.' });
    }
    return ddx;
}

function generatePlan(ddx) {
    const plans = [];
    const diagnoses = ddx.map(d => d.name);
    if (diagnoses.includes('سکته قلبی حاد (MI)')) {
        plans.push({ title: 'برنامه درمانی پیشنهادی برای ACS/MI', actions: ['فعال‌سازی کت لب (در صورت امکان)', 'تجویز آسپرین 324mg و کلوپیدوگرل', 'شروع هپارین یا انوکساپارین', 'کنترل درد با نیترات یا مورفین', 'تجویز بتابلاکر و استاتین با دوز بالا'] });
    }
    if (diagnoses.includes('نارسایی احتقانی قلب (CHF)')) {
        plans.push({ title: 'برنامه درمانی پیشنهادی برای CHF', actions: ['تجویز دیورتیک (مانند فوروزماید) وریدی', 'محدودیت مایعات و سدیم', 'بررسی عملکرد کلیه و الکترولیت‌ها', 'شروع یا تنظیم داروهای CHF (ACEi/ARB, بتابلاکر)'] });
    }
    if (diagnoses.includes('ترومبوز ورید عمقی (DVT)')) {
        plans.push({ title: 'برنامه درمانی پیشنهادی برای DVT', actions: ['شروع داروی ضدانعقاد (انوکساپارین یا DOACs)', 'درخواست سونوگرافی داپلر وریدی', 'بررسی علل زمینه‌ای'] });
    }
    return plans;
}

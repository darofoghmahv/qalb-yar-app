import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft, HeartPulse, Wind, User, Stethoscope, Pill, Clipboard, AlertTriangle, Activity, FileText, X, BrainCircuit, Calculator, Info, BookUser, ClipboardList, Eye, GaugeCircle, Waves, UserX, Footprints, TrendingDown, BatteryWarning } from 'lucide-react';

// --- Data & Educational Content ---
const commonMedications = [
  { name: 'آسپرین (Aspirin)', dosage: '81 mg روزانه' },
  { name: 'آتورواستاتین (Atorvastatin)', dosage: '20-40 mg شبانه' },
  { name: 'متوپرولول (Metoprolol)', dosage: '25-50 mg دو بار در روز' },
  { name: 'لوزارتان (Losartan)', dosage: '25-50 mg روزانه' },
  { name: 'فوروزماید (Furosemide)', dosage: '20-40 mg روزانه' },
  { name: 'کلوپیدوگرل (Clopidogrel)', dosage: '75 mg روزانه' },
  { name: 'نیتروگلیسرین (Nitroglycerin)', dosage: '0.4 mg زیرزبانی هنگام نیاز' },
];

const clinicalInfo = {
  heartSounds: { title: 'راهنمای عملی سمع قلب', content: ( <div className="space-y-4 text-right"> <p><strong>نکته کلیدی:</strong> همیشه از هر دو قسمت دیافراگم (برای صداهای با فرکانس بالا) و بل (Bell) (برای صداهای با فرکانس پایین) استفاده کنید.</p> <p><strong>S1 (صدای اول):</strong> بسته شدن دریچه‌های میترال و تریکوسپید. بلندترین صدا در ناحیه اپکس (Apex) است. همزمان با نبض کاروتید لمس می‌شود.</p> <p><strong>S2 (صدای دوم):</strong> بسته شدن دریچه‌های آئورت و پولمونر. بلندترین صدا در قاعده (Base) قلب است.</p> <p><strong>S3 (گالوپ بطنی):</strong> صدایی بم در ابتدای دیاستول. با قسمت **بل** استتوسکوپ در اپکس بهتر شنیده می‌شود. نشانه کلاسیک **نارسایی قلبی** (CHF) است.</p> <p><strong>S4 (گالوپ دهلیزی):</strong> صدایی بم درست قبل از S1. با قسمت **بل** در اپکس بهتر شنیده می‌شود. نشانه یک بطن سفت و غیرمنعطف است (مثلاً در **هیپرتروفی بطنی** یا ایسکمی).</p> </div> ) },
  lungSounds: { title: 'راهنمای عملی سمع ریه', content: ( <div className="space-y-4 text-right"> <p><strong>کراکل یا رال (Crackles/Rales):</strong> صداهای کوتاه و منقطع شبیه باز کردن چسب ولکرو. اگر در **قاعده هر دو ریه** شنیده شود، به شدت مطرح‌کننده **ادم ریوی** ناشی از نارسایی قلبی است.</p> <p><strong>ویز (Wheezes):</strong> صداهای ممتد و موسیقایی. معمولاً در بازدم شنیده می‌شود و نشانه تنگی راه‌های هوایی (آسم، COPD) است. ویزینگ منتشر در یک بیمار قلبی می‌تواند نشانه "آسم قلبی" باشد.</p> </div> ) },
  ecgRhythms: { title: 'راهنمای عملی ریتم‌های ECG', content: ( <div className="space-y-4 text-right"> <p><strong>ریتم سینوسی:</strong> به دنبال موج P قبل از هر QRS بگردید. فاصله RR باید تقریباً منظم باشد.</p> <p><strong>فیبریلاسیون دهلیزی (AFib):</strong> دو مشخصه اصلی دارد: ۱) فاصله RR کاملاً **نامنظم** است. ۲) هیچ موج P واضحی دیده نمی‌شود و به جای آن یک خط پایه لرزان (fibrillatory waves) وجود دارد.</p> <p><strong>تاکی‌کاردی بطنی (VT):</strong> سه مشخصه کلیدی: ۱) ریت سریع ({'>'}100). ۲) کمپلکس QRS **پهن** ({'>'}120ms). ۳) معمولاً منظم است. یک اورژانس پزشکی است.</p> </div> ) },
  prInterval: { title: 'راهنمای عملی فاصله PR', content: ( <div className="space-y-4 text-right"><p><strong>نحوه اندازه‌گیری:</strong> از ابتدای موج P تا ابتدای کمپلکس QRS.</p><p><strong>محدوده نرمال:</strong> 120 تا 200 میلی‌ثانیه (3 تا 5 خانه کوچک).</p><p><strong>اهمیت بالینی:</strong> PR طولانی ({'>'}200ms) یعنی بلوک درجه ۱ که معمولاً خوش‌خیم است اما می‌تواند نشانه بیماری زمینه‌ای باشد.</p></div> ) },
  qrsDuration: { title: 'راهنمای عملی مدت QRS', content: ( <div className="space-y-4 text-right"><p><strong>نحوه اندازه‌گیری:</strong> از ابتدای موج Q (یا R) تا انتهای موج S.</p><p><strong>محدوده نرمال:</strong> کمتر از 120 میلی‌ثانیه ({'<'}3 خانه کوچک).</p><p><strong>اهمیت بالینی:</strong> QRS پهن ({'>='}120ms) همیشه پاتولوژیک است و نیاز به بررسی دقیق برای یافتن علت (مانند بلوک شاخه‌ای یا ریتم بطنی) دارد.</p></div> ) },
  qWaves: { title: 'راهنمای عملی امواج Q پاتولوژیک', content: ( <div className="space-y-4 text-right"><p><strong>چگونه تشخیص دهیم؟</strong> یک موج Q طبیعی می‌تواند در برخی لیدها وجود داشته باشد. موج Q پاتولوژیک **عمیق** (بیش از 25% ارتفاع R) و **پهن** (بیش از 1 خانه کوچک) است.</p><p><strong>اهمیت بالینی:</strong> نشانه یک سکته قلبی قدیمی (Old MI) است. محل آن نشان‌دهنده دیواره درگیر است (مثلاً امواج Q در لیدهای II, III, aVF نشانه سکته قدیمی دیواره تحتانی است).</p></div> ) },
  morphologies: { title: 'راهنمای عملی مورفولوژی‌های QRS', content: ( <div className="space-y-4 text-right"><p><strong>بلوک شاخه چپ (LBBB):</strong> به لیدهای V1 و V6 نگاه کنید. در V1 یک کمپلکس QS پهن (عمدتاً منفی) و در V6 یک موج R پهن و یک‌تکه (بدون موج Q) دیده می‌شود. LBBB جدید همیشه اهمیت بالایی دارد.</p><p><strong>هیپرتروفی بطن چپ (LVH):</strong> به دنبال ولتاژهای بسیار بلند بگردید. **معیار سوکولوف-لاین (Sokolow-Lyon):** اگر (عمق موج S در V1) + (ارتفاع موج R در V5 یا V6) بزرگتر از 35 میلی‌متر باشد، مطرح‌کننده LVH است.</p></div> ) },
};

const rosSystems = {
  general: { label: 'عمومی', symptoms: ['تب', 'لرز', 'کاهش وزن', 'افزایش وزن', 'تعریق شبانه', 'خستگی', 'بی‌اشتهایی'] },
  integumentary: { label: 'پوست و مو', symptoms: ['راش', 'خارش', 'زخم', 'تغییر رنگ', 'ریزش مو', 'تغییرات ناخن'] },
  head: { label: 'سر و گردن', symptoms: ['سردرد', 'ضربه به سر', 'گلودرد', 'گرفتگی صدا', 'توده گردنی'] },
  eyes: { label: 'چشم', symptoms: ['تاری دید', 'درد چشم', 'دوبینی', 'قرمزی', 'ترشح'] },
  ent: { label: 'گوش، حلق، بینی', symptoms: ['کاهش شنوایی', 'وزوز گوش', 'خونریزی بینی', 'گرفتگی بینی', 'ترشح از بینی'] },
  cardiovascular: { label: 'قلبی-عروقی', symptoms: ['درد قفسه سینه', 'تپش قلب', 'ارتوپنه', 'تنگی نفس حمله‌ای شبانه (PND)', 'ادم محیطی', 'لنگش متناوب', 'سنکوپ'] },
  respiratory: { label: 'تنفسی', symptoms: ['سرفه', 'خلط', 'هموپتزی (خلط خونی)', 'ویزینگ', 'درد پلورتیک', 'تنگی نفس'] },
  gastrointestinal: { label: 'گوارشی', symptoms: ['تهوع', 'استفراغ', 'درد شکم', 'اسهال', 'یبوست', 'زردی', 'سوزش سر دل', 'خونریزی گوارشی'] },
  genitourinary: { label: 'ادراری-تناسلی', symptoms: ['سوزش ادرار', 'تکرر ادرار', 'هماچوری (خون در ادرار)', 'کاهش فشار ادرار', 'بی‌اختیاری'] },
  musculoskeletal: { label: 'اسکلتی-عضلانی', symptoms: ['درد مفاصل', 'تورم مفاصل', 'درد عضلانی', 'کمردرد', 'محدودیت حرکت'] },
  neurological: { label: 'عصبی', symptoms: ['سرگیجه', 'ضعف کانونی', 'تشنج', 'تغییر سطح هوشیاری', 'پارستزی (گزگز)', 'لرزش'] },
  endocrine: { label: 'غدد', symptoms: ['پلی‌اوری (پرادراری)', 'پلی‌دیپسی (پرنوشی)', 'عدم تحمل گرما/سرما', 'تغییرات وزن'] },
  psychiatric: { label: 'روانپزشکی', symptoms: ['اضطراب', 'افسردگی', 'اختلال خواب', 'افکار خودکشی'] },
};


// --- Main App Component ---
export default function App() {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, content: null, title: '' });
  
  const [patientData, setPatientData] = useState({
    info: { id: '', age: '', gender: 'مرد' },
    chiefComplaint: '',
    hpi: {
      chestPain: { onset: '', quality: '', radiation: '', severity: '5', palliative: '', provocative: '' },
      shortnessOfBreath: { onset: '', type: [], associated: '' },
      palpitations: { frequency: '', duration: '', triggers: '' },
      hypertensiveSymptoms: { dizziness: false, headache: false, blurredVision: false, nausea: false, other: '' },
      syncope: { prodrome: '', position: '', palpitations: false, precipitatingEvents: '', postEvent: '' },
      edema: { location: 'دوطرفه', timing: '', pitting: 'نامشخص', associated: '' },
      claudication: { location: '', character: '', distance: '', relievingFactors: '' },
      fatigue: { onset: '', pattern: '', severity: 'متوسط' },
    },
    riskFactors: { hypertension: false, diabetes: false, dyslipidemia: false, smoking: false, familyHistory: false, obesity: false },
    pastMedicalHistory: '',
    pastSurgicalHistory: '',
    allergies: '',
    ros: {
        general: [], integumentary: [], head: [], eyes: [], ent: [], cardiovascular: [], respiratory: [], gastrointestinal: [], genitourinary: [], musculoskeletal: [], neurological: [], endocrine: [], psychiatric: [],
    },
    medications: [{ name: '', dosage: '', isCustom: true }],
    physicalExam: {
      general: 'هوشیار، بدون دیسترس واضح', jvp: '', heartSounds: 'S1, S2 طبیعی، بدون صدای اضافی', lungSounds: 'سمع ریه واضح', extremities: 'بدون ادم محیطی',
    },
    ecg: {
      rhythm: 'سینوسی', rate: '', axis: 'نرمال', pr: '', qrs: '', qt: '', qtc: '',
      stChanges: [], stLocation: [], hasQWaves: false, qWaveLocation: [], morphologies: [], other: ''
    }
  });

  const updateData = (section, field, value) => {
    if (field) { setPatientData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    } else { setPatientData(prev => ({ ...prev, [section]: value })); }
  };
  
  const openModal = (title, content) => setModal({ isOpen: true, title, content });
  const closeModal = () => setModal({ isOpen: false, content: null, title: '' });

  const totalSteps = 9;
  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const goToStep = (s) => setStep(s);

  const renderStep = () => {
    const props = { data: patientData, setData: setPatientData, updateData, openModal };
    switch (step) {
      case 1: return <PatientInfo {...props} />;
      case 2: return <ChiefComplaint {...props} />;
      case 3: return <RiskFactors {...props} />;
      case 4: return <MedicalHistory {...props} />;
      case 5: return <ReviewOfSystems {...props} />;
      case 6: return <Medications {...props} />;
      case 7: return <PhysicalExam {...props} />;
      case 8: return <ECGFindings {...props} />;
      case 9: return <Summary {...props} goToStep={goToStep} />;
      default: return <PatientInfo {...props} />;
    }
  };

  return (
    <div dir="rtl" className="bg-slate-100 min-h-screen font-sans text-slate-800 flex flex-col items-center p-4" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
       <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');`}</style>
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <ProgressBar currentStep={step} totalSteps={totalSteps} goToStep={goToStep} />
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-4">
          {renderStep()}
        </div>
        <NavigationButtons step={step} totalSteps={totalSteps} nextStep={nextStep} prevStep={prevStep} />
        {modal.isOpen && <InfoModal title={modal.title} onClose={closeModal}>{modal.content}</InfoModal>}
      </div>
    </div>
  );
}

// --- Reusable Components ---
const InfoModal = ({ title, children, onClose }) => ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in-fast"> <div dir="rtl" className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"> <header className="flex justify-between items-center p-4 border-b"> <h3 className="text-xl font-bold text-slate-800">{title}</h3> <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200"><X size={24} /></button> </header> <main className="p-6 overflow-y-auto">{children}</main> <footer className="p-4 bg-slate-50 border-t text-right"> <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">بستن</button> </footer> </div> </div> );
const QuickAddButton = ({ text, onClick }) => (<button type="button" onClick={onClick} className="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition">{text}</button>);
const InfoButton = ({ onClick }) => (<button type="button" onClick={onClick} className="p-1 text-blue-500 hover:text-blue-700"><Info size={18} /></button>);
const CalculatorButton = ({ text, onClick }) => (<button type="button" onClick={onClick} className="flex items-center gap-1 text-sm text-blue-600 hover:underline"><Calculator size={14} /> {text}</button>);

// --- Step Components ---
const Header = () => ( <header className="text-center mb-6"> <div className="flex items-center justify-center gap-3"> <HeartPulse className="text-red-500 w-10 h-10" /> <h1 className="text-3xl md:text-4xl font-bold text-slate-700">قلب‌یار</h1> </div> <p className="text-slate-500 mt-2">دستیار هوشمند و آموزشی شما برای شرح حال قلب</p> </header> );
const ProgressBar = ({ currentStep, goToStep }) => {
    const steps = [ { number: 1, icon: <User />, label: 'بیمار' }, { number: 2, icon: <AlertTriangle />, label: 'شکایت' }, { number: 3, icon: <Activity />, label: 'ریسک' }, { number: 4, icon: <BookUser />, label: 'سوابق' }, { number: 5, icon: <ClipboardList />, label: 'ROS' }, { number: 6, icon: <Pill />, label: 'داروها' }, { number: 7, icon: <Stethoscope />, label: 'معاینه' }, { number: 8, icon: <HeartPulse />, label: 'نوار قلب' }, { number: 9, icon: <Clipboard />, label: 'خلاصه' }, ];
    return (<div className="w-full overflow-x-auto pb-2"><div className="flex justify-between items-start min-w-max gap-2 sm:gap-4">{steps.map((s, i) => (<div key={s.number} className="flex flex-col items-center cursor-pointer text-center w-16" onClick={() => goToStep(s.number)}><div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${currentStep >= s.number ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{React.cloneElement(s.icon, { className: 'w-5 h-5 md:w-6 md:h-6' })}</div><p className={`mt-2 text-xs font-semibold ${currentStep >= s.number ? 'text-red-500' : 'text-slate-400'}`}>{s.label}</p></div>))}</div></div>);
};
const PatientInfo = ({ data: {info}, updateData }) => ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><User className="text-red-500"/>اطلاعات اولیه بیمار</h2> <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> <div><label className="mb-2 font-semibold text-slate-600 block">کد/شناسه</label><input type="text" value={info.id} onChange={e => updateData('info', 'id', e.target.value)} className="p-3 w-full border rounded-lg"/></div> <div><label className="mb-2 font-semibold text-slate-600 block">سن</label><input type="number" value={info.age} onChange={e => updateData('info', 'age', e.target.value)} className="p-3 w-full border rounded-lg"/></div> <div><label className="mb-2 font-semibold text-slate-600 block">جنسیت</label><select value={info.gender} onChange={e => updateData('info', 'gender', e.target.value)} className="p-3 w-full border bg-white rounded-lg"><option>مرد</option><option>زن</option></select></div> </div> </div> );
const ChiefComplaint = ({ data, setData }) => {
    const { chiefComplaint, hpi } = data;
    const setChiefComplaint = (value) => setData(prev => ({ ...prev, chiefComplaint: value }));
    const updateHpi = (complaint, field, value) => setData(prev => ({ ...prev, hpi: { ...prev.hpi, [complaint]: { ...prev.hpi[complaint], [field]: value } } }));
    const handleSOBTypeChange = (type) => { const currentTypes = hpi.shortnessOfBreath.type || []; const newTypes = currentTypes.includes(type) ? currentTypes.filter(t => t !== type) : [...currentTypes, type]; updateHpi('shortnessOfBreath', 'type', newTypes); };
    const handleHypertensiveSymptomChange = (symptom) => { const currentSymptoms = hpi.hypertensiveSymptoms; updateHpi('hypertensiveSymptoms', symptom, !currentSymptoms[symptom]); };
    const complaintOptions = [
        { id: 'chestPain', label: 'درد قفسه سینه', icon: <HeartPulse /> },
        { id: 'shortnessOfBreath', label: 'تنگی نفس', icon: <Wind /> },
        { id: 'palpitations', label: 'تپش قلب', icon: <Activity /> },
        { id: 'syncope', label: 'سنکوپ/غش', icon: <UserX /> },
        { id: 'edema', label: 'ادم/ورم', icon: <Footprints /> },
        { id: 'claudication', label: 'لنگش', icon: <TrendingDown /> },
        { id: 'fatigue', label: 'خستگی', icon: <BatteryWarning /> },
        { id: 'hypertensiveSymptoms', label: 'علائم فشار خون', icon: <GaugeCircle /> },
    ];
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><AlertTriangle className="text-red-500"/>شکایت اصلی</h2>
            <div className="mb-6">
                <p className="mb-3 font-semibold text-slate-600">شایع‌ترین شکایت اصلی بیمار را انتخاب کنید:</p>
                <div className="flex flex-wrap gap-3">
                    {complaintOptions.map(opt => (<button key={opt.id} onClick={() => setChiefComplaint(opt.id)} className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${chiefComplaint === opt.id ? 'bg-red-500 text-white border-red-500' : 'bg-white text-slate-700 border-slate-300 hover:border-red-400'}`}>{opt.icon} {opt.label}</button>))}
                </div>
            </div>
            {chiefComplaint === 'chestPain' && <div className="p-4 bg-red-50 rounded-lg border border-red-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-red-800">جزئیات درد قفسه سینه (OPQRST)</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.chestPain.onset} onChange={e => updateHpi('chestPain', 'onset', e.target.value)} placeholder="شروع و زمان‌بندی (Onset)" className="p-2 border rounded-md" /><input type="text" value={hpi.chestPain.quality} onChange={e => updateHpi('chestPain', 'quality', e.target.value)} placeholder="کیفیت (Quality) - مثلا فشاری، تیز" className="p-2 border rounded-md" /><input type="text" value={hpi.chestPain.radiation} onChange={e => updateHpi('chestPain', 'radiation', e.target.value)} placeholder="انتشار (Radiation)" className="p-2 border rounded-md" /><div className="flex flex-col"><label className="text-sm text-slate-600 mb-1">شدت (Severity): {hpi.chestPain.severity}/10</label><input type="range" min="0" max="10" value={hpi.chestPain.severity} onChange={e => updateHpi('chestPain', 'severity', e.target.value)} className="w-full" /></div><input type="text" value={hpi.chestPain.provocative} onChange={e => updateHpi('chestPain', 'provocative', e.target.value)} placeholder="عوامل تشدید کننده" className="p-2 border rounded-md" /><input type="text" value={hpi.chestPain.palliative} onChange={e => updateHpi('chestPain', 'palliative', e.target.value)} placeholder="عوامل تسکین دهنده" className="p-2 border rounded-md" /></div></div>}
            {chiefComplaint === 'shortnessOfBreath' && <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-blue-800">جزئیات تنگی نفس</h3><div className="space-y-4"><input type="text" value={hpi.shortnessOfBreath.onset} onChange={e => updateHpi('shortnessOfBreath', 'onset', e.target.value)} placeholder="شروع و مدت زمان" className="p-2 border rounded-md w-full" /><div><p className="font-semibold mb-2">نوع تنگی نفس:</p><div className="flex flex-wrap gap-2">{['در حالت استراحت', 'هنگام فعالیت (DOE)', 'در حالت درازکش (Orthopnea)', 'حمله‌ای شبانه (PND)'].map(type => (<label key={type} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={(hpi.shortnessOfBreath.type || []).includes(type)} onChange={() => handleSOBTypeChange(type)} className="form-checkbox text-blue-500" />{type}</label>))}</div></div><input type="text" value={hpi.shortnessOfBreath.associated} onChange={e => updateHpi('shortnessOfBreath', 'associated', e.target.value)} placeholder="علائم همراه (مثلا سرفه، ورم پا)" className="p-2 border rounded-md w-full" /></div></div>}
            {chiefComplaint === 'syncope' && <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-indigo-800">جزئیات سنکوپ (ارزیابی 5P)</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.syncope.prodrome} onChange={e => updateHpi('syncope', 'prodrome', e.target.value)} placeholder="علائم پیش‌درآمد (Prodrome)" className="p-2 border rounded-md" /><input type="text" value={hpi.syncope.position} onChange={e => updateHpi('syncope', 'position', e.target.value)} placeholder="وضعیت بیمار (Position)" className="p-2 border rounded-md" /><input type="text" value={hpi.syncope.precipitatingEvents} onChange={e => updateHpi('syncope', 'precipitatingEvents', e.target.value)} placeholder="عوامل شروع‌کننده (Precipitants)" className="p-2 border rounded-md" /><input type="text" value={hpi.syncope.postEvent} onChange={e => updateHpi('syncope', 'postEvent', e.target.value)} placeholder="وقایع بعد از حمله (Post-event)" className="p-2 border rounded-md" /><label className="flex items-center gap-2 p-2 cursor-pointer"><input type="checkbox" checked={hpi.syncope.palpitations} onChange={e => updateHpi('syncope', 'palpitations', e.target.checked)} className="form-checkbox text-indigo-500" />آیا قبل از حمله تپش قلب داشت؟ (Palpitations)</label></div></div>}
            {chiefComplaint === 'edema' && <div className="p-4 bg-teal-50 rounded-lg border border-teal-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-teal-800">جزئیات ادم</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><select value={hpi.edema.location} onChange={e => updateHpi('edema', 'location', e.target.value)} className="p-2 border rounded-md bg-white"><option>دوطرفه</option><option>یک‌طرفه (چپ)</option><option>یک‌طرفه (راست)</option></select><select value={hpi.edema.pitting} onChange={e => updateHpi('edema', 'pitting', e.target.value)} className="p-2 border rounded-md bg-white"><option>نامشخص</option><option>گوده‌گذار (Pitting)</option><option>غیر گوده‌گذار (Non-pitting)</option></select><input type="text" value={hpi.edema.timing} onChange={e => updateHpi('edema', 'timing', e.target.value)} placeholder="زمان‌بندی (مثلا بدتر در عصر)" className="p-2 border rounded-md" /><input type="text" value={hpi.edema.associated} onChange={e => updateHpi('edema', 'associated', e.target.value)} placeholder="علائم همراه (تنگی نفس، درد پا)" className="p-2 border rounded-md" /></div></div>}
            {chiefComplaint === 'claudication' && <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-orange-800">جزئیات لنگش</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.claudication.location} onChange={e => updateHpi('claudication', 'location', e.target.value)} placeholder="محل درد (ساق، ران)" className="p-2 border rounded-md" /><input type="text" value={hpi.claudication.character} onChange={e => updateHpi('claudication', 'character', e.target.value)} placeholder="کیفیت درد (کرامپی، فشاری)" className="p-2 border rounded-md" /><input type="text" value={hpi.claudication.distance} onChange={e => updateHpi('claudication', 'distance', e.target.value)} placeholder="مسافت شروع درد (متر)" className="p-2 border rounded-md" /><input type="text" value={hpi.claudication.relievingFactors} onChange={e => updateHpi('claudication', 'relievingFactors', e.target.value)} placeholder="عوامل تسکین‌دهنده (استراحت)" className="p-2 border rounded-md" /></div></div>}
            {chiefComplaint === 'fatigue' && <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-gray-800">جزئیات خستگی</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" value={hpi.fatigue.onset} onChange={e => updateHpi('fatigue', 'onset', e.target.value)} placeholder="شروع و مدت" className="p-2 border rounded-md" /><input type="text" value={hpi.fatigue.pattern} onChange={e => updateHpi('fatigue', 'pattern', e.target.value)} placeholder="الگو (مداوم، متناوب)" className="p-2 border rounded-md" /><div className="md:col-span-2"><label className="text-sm text-slate-600 mb-1">شدت: {hpi.fatigue.severity}</label><select value={hpi.fatigue.severity} onChange={e => updateHpi('fatigue', 'severity', e.target.value)} className="p-2 border rounded-md bg-white w-full"><option>خفیف</option><option>متوسط</option><option>شدید</option></select></div></div></div>}
            {chiefComplaint === 'hypertensiveSymptoms' && <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 animate-fade-in"><h3 className="text-lg font-bold mb-4 text-purple-800">جزئیات علائم مرتبط با فشار خون</h3><div className="grid grid-cols-2 gap-4"><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.dizziness} onChange={() => handleHypertensiveSymptomChange('dizziness')} className="form-checkbox text-purple-500" />سرگیجه</label><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.headache} onChange={() => handleHypertensiveSymptomChange('headache')} className="form-checkbox text-purple-500" />سردرد</label><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.blurredVision} onChange={() => handleHypertensiveSymptomChange('blurredVision')} className="form-checkbox text-purple-500" />تاری دید</label><label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"><input type="checkbox" checked={hpi.hypertensiveSymptoms.nausea} onChange={() => handleHypertensiveSymptomChange('nausea')} className="form-checkbox text-purple-500" />تهوع/استفراغ</label></div><input type="text" value={hpi.hypertensiveSymptoms.other} onChange={e => updateHpi('hypertensiveSymptoms', 'other', e.target.value)} placeholder="سایر علائم..." className="p-2 border rounded-md w-full mt-4" /></div>}
        </div>
    );
};
const RiskFactors = ({ data: {riskFactors}, updateData }) => { const riskFactorItems = [ { id: 'hypertension', label: 'فشار خون بالا' }, { id: 'diabetes', label: 'دیابت' }, { id: 'dyslipidemia', label: 'چربی خون بالا' }, { id: 'smoking', label: 'مصرف سیگار' }, { id: 'familyHistory', label: 'سابقه خانوادگی' }, { id: 'obesity', label: 'چاقی' } ]; return (<div className="animate-fade-in"><h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><Activity className="text-red-500"/>عوامل خطر</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{riskFactorItems.map(item => (<label key={item.id} className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition"><input type="checkbox" checked={riskFactors[item.id]} onChange={e => updateData('riskFactors', item.id, e.target.checked)} className="form-checkbox h-5 w-5 text-red-500 rounded border-slate-300 focus:ring-red-500" /><span className="mr-3 text-slate-700 font-medium">{item.label}</span></label>))}</div></div>); };
const MedicalHistory = ({ data, updateData }) => { return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><BookUser className="text-red-500" />سوابق پزشکی و حساسیت</h2> <div className="space-y-6"> <div> <label className="font-semibold text-slate-600 block mb-2">سوابق پزشکی گذشته (PMH)</label> <textarea rows="3" value={data.pastMedicalHistory} onChange={(e) => updateData('pastMedicalHistory', null, e.target.value)} className="p-3 w-full border rounded-lg" placeholder="بیماری‌های مزمن دیگر مانند بیماری‌های تیروئید، کلیوی و..."/> </div> <div> <label className="font-semibold text-slate-600 block mb-2">سوابق جراحی (PSH)</label> <textarea rows="3" value={data.pastSurgicalHistory} onChange={(e) => updateData('pastSurgicalHistory', null, e.target.value)} className="p-3 w-full border rounded-lg" placeholder="جراحی‌های گذشته مانند CABG, PCI, آپاندکتومی و..."/> </div> <div> <label className="font-semibold text-slate-600 block mb-2">حساسیت‌ها (Allergies)</label> <input type="text" value={data.allergies} onChange={(e) => updateData('allergies', null, e.target.value)} className="p-3 w-full border rounded-lg" placeholder="حساسیت‌های دارویی یا غذایی. در صورت عدم وجود بنویسید 'ندارد'."/> </div> </div> </div> ); };
const ReviewOfSystems = ({ data: {ros}, updateData }) => { const handleCheckboxChange = (system, symptom) => { const currentSymptoms = ros[system] || []; const newSymptoms = currentSymptoms.includes(symptom) ? currentSymptoms.filter(s => s !== symptom) : [...currentSymptoms, symptom]; updateData('ros', system, newSymptoms); }; return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><ClipboardList className="text-red-500" />مرور سیستم‌ها (ROS)</h2> <p className="text-slate-500 mb-6 -mt-4">علائم مثبتی که بیمار در هر سیستم گزارش می‌کند را انتخاب کنید.</p> <div className="space-y-4"> {Object.entries(rosSystems).map(([systemKey, systemValue]) => ( <details key={systemKey} className="bg-slate-50 rounded-lg p-3 border" open> <summary className="font-bold text-slate-800 cursor-pointer">{systemValue.label}</summary> <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4"> {systemValue.symptoms.map(symptom => ( <label key={symptom} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-white"> <input type="checkbox" checked={(ros[systemKey] || []).includes(symptom)} onChange={() => handleCheckboxChange(systemKey, symptom)} className="form-checkbox h-4 w-4 text-red-500 rounded border-slate-300 focus:ring-red-500" /> <span className="text-slate-700 text-sm">{symptom}</span> </label> ))} </div> </details> ))} </div> </div> ); };
const Medications = ({ data: {medications}, setData }) => { const handleMedChange = (index, field, value) => { const newMeds = [...medications]; if (field === 'name' && !newMeds[index].isCustom) { const selectedMed = commonMedications.find(m => m.name === value); newMeds[index].name = value; newMeds[index].dosage = selectedMed ? selectedMed.dosage : ''; } else { newMeds[index][field] = value; } setData(prev => ({ ...prev, medications: newMeds })); }; const toggleCustom = (index) => { const newMeds = [...medications]; newMeds[index].isCustom = !newMeds[index].isCustom; newMeds[index].name = ''; newMeds[index].dosage = ''; setData(prev => ({ ...prev, medications: newMeds })); }; const addMed = () => setData(prev => ({ ...prev, medications: [...prev.medications, { name: '', dosage: '', isCustom: true }] })); const removeMed = (index) => setData(prev => ({ ...prev, medications: medications.filter((_, i) => i !== index) })); return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><Pill className="text-red-500"/>تاریخچه دارویی</h2> <div className="space-y-4"> {medications.map((med, index) => ( <div key={index} className="p-3 bg-slate-50 rounded-lg border space-y-2"> <div className="flex flex-col md:flex-row gap-2 items-center"> {med.isCustom ? ( <> <input type="text" value={med.name} onChange={e => handleMedChange(index, 'name', e.target.value)} placeholder="نام داروی سفارشی" className="p-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-red-300"/> <input type="text" value={med.dosage} onChange={e => handleMedChange(index, 'dosage', e.target.value)} placeholder="دوز مصرفی" className="p-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-red-300"/> </> ) : ( <> <select value={med.name} onChange={e => handleMedChange(index, 'name', e.target.value)} className="p-2 border border-slate-300 rounded-lg w-full bg-white focus:ring-2 focus:ring-red-300"> <option value="">یک دارو انتخاب کنید...</option> {commonMedications.map(m => <option key={m.name} value={m.name}>{m.name}</option>)} </select> <input type="text" value={med.dosage} onChange={e => handleMedChange(index, 'dosage', e.target.value)} placeholder="دوز پیشنهادی" className="p-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-red-300"/> </> )} <button onClick={() => removeMed(index)} className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100 hover:bg-red-200 transition"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> </button> </div> <button onClick={() => toggleCustom(index)} className="text-sm text-blue-600 hover:underline"> {med.isCustom ? 'انتخاب از لیست داروها' : 'ورود داروی سفارشی'} </button> </div> ))} </div> <button onClick={addMed} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> افزودن دارو </button> </div> ); };
const PhysicalExam = ({ data: {physicalExam}, updateData, openModal }) => { const handleQuickAdd = (field, text) => { const currentText = physicalExam[field] || ''; const newText = currentText ? `${currentText}, ${text}` : text; updateData('physicalExam', field, newText); }; const fields = [ { id: 'general', label: 'وضعیت عمومی', quickAdds: ['هوشیار', 'بی‌قرار', 'رنگ‌پریده'] }, { id: 'jvp', label: 'فشار ورید ژوگولار (JVP)', quickAdds: ['طبیعی', 'برجسته (Elevated)'] }, { id: 'heartSounds', label: 'صداهای قلبی', quickAdds: ['S1, S2 نرمال', 'سوفل سیستولیک', 'S3'], info: clinicalInfo.heartSounds }, { id: 'lungSounds', label: 'صداهای ریوی', quickAdds: ['سمع واضح', 'کراکل (Rales)', 'ویزینگ'], info: clinicalInfo.lungSounds }, { id: 'extremities', label: 'معاینه اندام‌ها', quickAdds: ['بدون ادم', 'ادم گوده‌گذار +1', 'نبض‌ها قرینه'] }, ]; return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><Stethoscope className="text-red-500"/>یافته‌های معاینه فیزیکی</h2> <div className="space-y-6"> {fields.map(field => ( <div key={field.id}> <label className="mb-2 font-semibold text-slate-600 flex items-center gap-2">{field.label} {field.info && <InfoButton onClick={() => openModal(field.info.title, field.info.content)} />}</label> <textarea rows="2" value={physicalExam[field.id]} onChange={e => updateData('physicalExam', field.id, e.target.value)} className="p-3 w-full border rounded-lg" placeholder={`یافته‌های مربوط به ${field.label}...`}/> <div className="flex flex-wrap gap-2 mt-2"> {field.quickAdds.map(qa => <QuickAddButton key={qa} text={qa} onClick={() => handleQuickAdd(field.id, qa)} />)} </div> </div> ))} </div> </div> ); };
const ECGFindings = ({ data: {ecg}, updateData, openModal }) => { const handleMultiCheckboxChange = (field, value) => { const currentValues = ecg[field] || []; const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value]; updateData('ecg', field, newValues); }; const showRateCalculator = () => openModal('محاسبه‌گر ریت قلبی', <RateCalculator onSubmit={(rate) => updateData('ecg', 'rate', rate)} />); const showQTcCalculator = () => openModal('محاسبه‌گر QTc', <QTcCalculator rate={ecg.rate} onSubmit={(qtc, qt) => { updateData('ecg', 'qtc', qtc); updateData('ecg', 'qt', qt); }} />); const showAxisCalculator = () => openModal('محاسبه‌گر محور قلب', <AxisCalculator onSubmit={(axis) => updateData('ecg', 'axis', axis)} />); const morphologyOptions = ['LBBB', 'RBBB', 'IVCD', 'LVH', 'RVH']; const leadGroups = ['Anterior (V1-V4)', 'Inferior (II, III, aVF)', 'Lateral (I, aVL, V5-V6)']; return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><HeartPulse className="text-red-500"/>یافته‌های نوار قلب (ECG)</h2> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6"> <div> <label className="font-semibold text-slate-600 flex items-center gap-2">ریتم <InfoButton onClick={() => openModal(clinicalInfo.ecgRhythms.title, clinicalInfo.ecgRhythms.content)}/></label> <select value={ecg.rhythm} onChange={e => updateData('ecg', 'rhythm', e.target.value)} className="w-full p-2 mt-1 border rounded-md bg-white"> <option>سینوسی</option><option>فیبریلاسیون دهلیزی</option><option>فلوتر دهلیزی</option><option>SVT</option><option>VT</option> </select> </div> <div> <label className="font-semibold text-slate-600">ریت (Rate)</label> <div className="flex items-center gap-2"><input type="number" value={ecg.rate} onChange={e => updateData('ecg', 'rate', e.target.value)} placeholder="bpm" className="w-full p-2 mt-1 border rounded-md" /><CalculatorButton text="" onClick={showRateCalculator} /></div> </div> <div> <label className="font-semibold text-slate-600">محور (Axis)</label> <div className="flex items-center gap-2"><select value={ecg.axis} onChange={e => updateData('ecg', 'axis', e.target.value)} className="w-full p-2 mt-1 border rounded-md bg-white"><option>نرمال</option><option>انحراف به چپ</option><option>انحراف به راست</option><option>نامشخص</option></select><CalculatorButton text="" onClick={showAxisCalculator} /></div> </div> <div> <label className="font-semibold text-slate-600 flex items-center gap-2">فاصله PR <InfoButton onClick={() => openModal(clinicalInfo.prInterval.title, clinicalInfo.prInterval.content)} /></label> <input type="number" value={ecg.pr} onChange={e => updateData('ecg', 'pr', e.target.value)} placeholder="ms" className="w-full p-2 mt-1 border rounded-md" /> </div> <div> <label className="font-semibold text-slate-600 flex items-center gap-2">مدت QRS <InfoButton onClick={() => openModal(clinicalInfo.qrsDuration.title, clinicalInfo.qrsDuration.content)} /></label> <input type="number" value={ecg.qrs} onChange={e => updateData('ecg', 'qrs', e.target.value)} placeholder="ms" className="w-full p-2 mt-1 border rounded-md" /> </div> <div> <label className="font-semibold text-slate-600">فاصله QTc</label> <div className="flex items-center gap-2"><input type="number" value={ecg.qtc} onChange={e => updateData('ecg', 'qtc', e.target.value)} placeholder="ms" className="w-full p-2 mt-1 border rounded-md" /><CalculatorButton text="" onClick={showQTcCalculator} /></div> </div> <div className="lg:col-span-3"> <label className="font-semibold text-slate-600">تغییرات قطعه ST</label> <div className="flex flex-col sm:flex-row gap-4 mt-2 p-3 bg-slate-50 rounded-md"> <div className="flex-1 space-y-2"> <p className="font-medium text-sm">نوع تغییرات:</p> {['ST Elevation', 'ST Depression', 'T Wave Inversion'].map(opt => ( <label key={opt} className="flex items-center gap-2"><input type="checkbox" checked={ecg.stChanges.includes(opt)} onChange={() => handleMultiCheckboxChange('stChanges', opt)} className="form-checkbox text-red-500" />{opt}</label> ))} </div> <div className="flex-1 space-y-2"> <p className="font-medium text-sm">محل تغییرات:</p> {leadGroups.map(opt => ( <label key={opt} className="flex items-center gap-2"><input type="checkbox" checked={ecg.stLocation.includes(opt)} onChange={() => handleMultiCheckboxChange('stLocation', opt)} className="form-checkbox text-red-500" />{opt}</label> ))} </div> </div> </div> <div className="lg:col-span-3"> <label className="font-semibold text-slate-600 flex items-center gap-2">مورفولوژی و یافته‌های دیگر <InfoButton onClick={() => openModal(clinicalInfo.morphologies.title, clinicalInfo.morphologies.content)} /></label> <div className="flex flex-col sm:flex-row gap-4 mt-2 p-3 bg-slate-50 rounded-md"> <div className="flex-1 space-y-2"> <p className="font-medium text-sm">مورفولوژی‌های خاص:</p> {morphologyOptions.map(opt => ( <label key={opt} className="flex items-center gap-2"><input type="checkbox" checked={ecg.morphologies.includes(opt)} onChange={() => handleMultiCheckboxChange('morphologies', opt)} className="form-checkbox text-red-500" />{opt}</label> ))} </div> <div className="flex-1 space-y-2"> <label className="font-semibold text-slate-600 flex items-center gap-2">امواج Q پاتولوژیک <InfoButton onClick={() => openModal(clinicalInfo.qWaves.title, clinicalInfo.qWaves.content)} /></label> <div className="flex flex-col gap-2"> <label className="flex items-center gap-2"><input type="checkbox" checked={ecg.hasQWaves} onChange={(e) => updateData('ecg', 'hasQWaves', e.target.checked)} className="form-checkbox text-red-500" />وجود دارد</label> {ecg.hasQWaves && ( <select multiple value={ecg.qWaveLocation} onChange={(e) => updateData('ecg', 'qWaveLocation', Array.from(e.target.selectedOptions, option => option.value))} className="w-full p-2 mt-1 border rounded-md bg-white text-sm"> {leadGroups.map(opt => <option key={opt} value={opt}>{opt}</option>)} </select> )} </div> </div> </div> </div> <div className="lg:col-span-3"> <label className="font-semibold text-slate-600">سایر توضیحات ECG</label> <textarea value={ecg.other} onChange={e => updateData('ecg', 'other', e.target.value)} rows="3" placeholder="سایر یافته‌های مهم مانند آریتمی‌های دیگر، Poor R wave progression و ..." className="w-full p-2 mt-1 border rounded-md"></textarea> </div> </div> </div> ); };
const Summary = ({ data, goToStep }) => {
  const [copied, setCopied] = useState(false);
  const ddx = useMemo(() => generateDDx(data), [data]);
  
  const summaryText = useMemo(() => {
    const { info, chiefComplaint, hpi, riskFactors, pastMedicalHistory, pastSurgicalHistory, allergies, ros, medications, physicalExam, ecg } = data;

    let text = `** اطلاعات بیمار **\n`;
    text += `شناسه: ${info.id || 'ثبت نشده'}, سن: ${info.age || '---'} ساله, جنسیت: ${info.gender}\n\n`;

    const complaints = { chestPain: 'درد قفسه سینه', shortnessOfBreath: 'تنگی نفس', palpitations: 'تپش قلب', hypertensiveSymptoms: 'علائم مرتبط با فشار خون بالا', syncope: 'سنکوپ/غش', edema: 'ادم/ورم', claudication: 'لنگش', fatigue: 'خستگی' };
    const chiefComplaintText = complaints[chiefComplaint] || 'ثبت نشده';
    text += `** شکایت اصلی (Chief Complaint) **\n${chiefComplaintText}\n\n`;

    text += `** تاریخچه بیماری فعلی (HPI) **\n`;
    const riskFactorLabels = { hypertension: 'فشار خون بالا', diabetes: 'دیابت', dyslipidemia: 'چربی خون بالا' };
    const knownDiseases = Object.entries(riskFactors).filter(([key, value]) => value && riskFactorLabels[key]).map(([key]) => riskFactorLabels[key]).join('، ');
    const genderPronoun = info.gender === 'زن' ? 'خانم' : 'آقای';
    let hpiIntro = `بیمار ${genderPronoun} ${info.age || '---'} ساله`;
    if (knownDiseases) { hpiIntro += `، شناخته شده با ${knownDiseases} (K/C)،`; }
    hpiIntro += ` با شکایت اصلی "${chiefComplaintText}" مراجعه کرده است. `;
    text += hpiIntro;
    if (chiefComplaint === 'chestPain') { const cp = hpi.chestPain; text += `درد بیمار از ${cp.onset || '---'} شروع شده، کیفیت آن ${cp.quality || '---'} بوده و به ${cp.radiation || '---'} انتشار دارد. شدت درد ${cp.severity}/10 گزارش شده است...\n\n`; }
    else if (chiefComplaint === 'shortnessOfBreath') { const sob = hpi.shortnessOfBreath; text += `تنگی نفس بیمار از ${sob.onset || '---'} شروع شده و از نوع ${sob.type.join(', ') || '---'} می‌باشد...\n\n`; }
    else if (chiefComplaint === 'palpitations') { const palp = hpi.palpitations; text += `تپش قلب بیمار با تکرار ${palp.frequency || '---'} و مدت زمان ${palp.duration || '---'} در هر بار اتفاق می‌افتد...\n\n`; }
    else if (chiefComplaint === 'hypertensiveSymptoms') { const hs = hpi.hypertensiveSymptoms; const positiveSymptoms = Object.entries(hs).filter(([key, value]) => value && key !== 'other').map(([key]) => ({dizziness: 'سرگیجه', headache: 'سردرد', blurredVision: 'تاری دید', nausea: 'تهوع/استفراغ'}[key])); text += `بیمار علائم ${positiveSymptoms.join('، ')} را ذکر می‌کند. ${hs.other ? 'سایر علائم: ' + hs.other : ''}\n\n`; }
    else if (chiefComplaint === 'syncope') { const s = hpi.syncope; text += `بیمار یک اپیزود سنکوپ در وضعیت ${s.position || '---'} داشته است. علائم پیش‌درآمد شامل ${s.prodrome || '---'} بوده و وقایع پس از حمله ${s.postEvent || '---'} گزارش شده است.\n\n`; }
    else if (chiefComplaint === 'edema') { const e = hpi.edema; text += `بیمار ادم ${e.location} و از نوع ${e.pitting} را گزارش می‌دهد. زمان‌بندی آن ${e.timing || '---'} بوده و با ${e.associated || '---'} همراه است.\n\n`; }
    else if (chiefComplaint === 'claudication') { const c = hpi.claudication; text += `بیمار درد کرامپی در ناحیه ${c.location || '---'} پس از طی مسافت حدود ${c.distance || '---'} متر را ذکر می‌کند که با ${c.relievingFactors || '---'} بهبود می‌یابد.\n\n`; }
    else { text += '\n\n'; }

    text += `** سوابق پزشکی، جراحی و دارویی **\n- PMH: ${pastMedicalHistory || 'موردی ذکر نشده'}\n- PSH: ${pastSurgicalHistory || 'موردی ذکر نشده'}\n`;
    const activeMeds = medications.filter(med => med.name);
    text += `- DH: ${activeMeds.length > 0 ? activeMeds.map(m => `${m.name} (${m.dosage || 'دوز نامشخص'})`).join('، ') : 'دارویی مصرف نمی‌کند.'}\n\n`;

    text += `** حساسیت‌ها (Allergies) **\n${allergies || 'موردی ذکر نشده'}\n\n`;

    text += `** مرور سیستم‌ها (ROS) **\n`;
    const positiveRos = Object.entries(ros).map(([systemKey, symptoms]) => (symptoms.length > 0) ? `- ${rosSystems[systemKey].label}: ${symptoms.join('، ')}` : null).filter(Boolean);
    text += positiveRos.length > 0 ? positiveRos.join('\n') + '\n\n' : 'در سایر سیستم‌ها نکته مثبتی ذکر نشد.\n\n';

    text += `** معاینه فیزیکی (Physical Exam) **\n- وضعیت عمومی: ${physicalExam.general}\n- JVP: ${physicalExam.jvp}\n- سمع قلب: ${physicalExam.heartSounds}\n- سمع ریه: ${physicalExam.lungSounds}\n- اندام‌ها: ${physicalExam.extremities}\n\n`;

    text += `** بررسی نوار قلب (ECG) **\n`;
    text += `- ریتم: ${ecg.rhythm}, ریت: ${ecg.rate || '---'} bpm, محور: ${ecg.axis}\n`;
    text += `- فواصل: PR=${ecg.pr || '---'}ms, QRS=${ecg.qrs || '---'}ms, QTc=${ecg.qtc || '---'}ms\n`;
    if (ecg.stChanges.length > 0) { text += `- تغییرات ST/T: ${ecg.stChanges.join(', ')} در نواحی ${ecg.stLocation.join(', ') || 'نامشخص'}\n`; }
    if (ecg.hasQWaves) { text += `- امواج Q پاتولوژیک در نواحی: ${ecg.qWaveLocation.join(', ') || 'نامشخص'}\n`; }
    if (ecg.morphologies.length > 0) { text += `- مورفولوژی: ${ecg.morphologies.join(', ')}\n`; }
    if (ecg.other) { text += `- سایر: ${ecg.other}\n`; }
    text += '\n';

    text += `** تشخیص‌های افتراقی (DDx) **\n`;
    text += ddx.length > 0 ? ddx.map((d, i) => `${i + 1}. ${d.name}`).join('\n') : 'تشخیص افتراقی مشخصی پیشنهاد نمی‌شود.';

    return text;
  }, [data, ddx]);

  const copyToClipboard = () => { const textarea = document.createElement('textarea'); textarea.value = summaryText; document.body.appendChild(textarea); textarea.select(); try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (err) { console.error('Failed to copy text: ', err); } document.body.removeChild(textarea); };

  return ( <div className="animate-fade-in"> <h2 className="text-2xl font-bold mb-6 text-slate-700 flex items-center gap-2"><Clipboard className="text-red-500"/>خلاصه و خروجی</h2> <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-wrap font-mono text-sm leading-relaxed">{summaryText}</div> <button onClick={copyToClipboard} className="mt-6 w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2">{copied ? 'کپی شد!' : 'کپی کردن خلاصه'}<Clipboard /></button> <div className="mt-8"> <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2"><BrainCircuit className="text-red-500" />دستیار تشخیص افتراقی</h3> <div className="mt-4 space-y-3"> {ddx.length > 0 ? ( ddx.map(d => ( <div key={d.name} className="p-3 bg-yellow-50 border-r-4 border-yellow-400"> <p className="font-bold text-yellow-800">{d.name}</p> <p className="text-sm text-yellow-700">{d.reason}</p> </div> )) ) : ( <p className="text-slate-500">اطلاعات کافی برای پیشنهاد تشخیص وجود ندارد.</p> )} </div> </div> </div> );
};

const NavigationButtons = ({ step, totalSteps, nextStep, prevStep }) => ( <div className="flex justify-between mt-8"> <button onClick={prevStep} disabled={step === 1} className="bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-400 transition disabled:bg-slate-200 disabled:cursor-not-allowed flex items-center gap-2"><ChevronRight />قبلی</button> <button onClick={nextStep} disabled={step === totalSteps} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition disabled:bg-red-300 disabled:cursor-not-allowed flex items-center gap-2">بعدی<ChevronLeft /></button> </div> );

// --- Calculators ---
const RateCalculator = ({ onSubmit }) => { const [rr, setRr] = useState(''); const rate = rr ? Math.round(1500 / rr) : 0; return ( <div><p className="text-sm text-slate-600">فاصله بین دو موج R را بر حسب تعداد خانه‌های کوچک (mm) وارد کنید.</p><label className="block font-semibold mt-2">فاصله RR (تعداد خانه‌های کوچک):</label> <input type="number" value={rr} onChange={e => setRr(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 20" /> {rate > 0 && <p className="mt-2 font-bold">ریت محاسبه شده: {rate} bpm</p>} <button onClick={() => onSubmit(rate)} className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg">استفاده از این عدد</button> </div> ); };
const QTcCalculator = ({ rate, onSubmit }) => { const [qt, setQt] = useState(''); const [localRate, setLocalRate] = useState(rate || ''); const rr = localRate ? 60 / localRate : 0; const qtc = (qt && rr) ? Math.round((qt/1000) / Math.sqrt(rr) * 1000) : 0; return ( <div className="space-y-4"> <div> <label className="block font-semibold">ضربان قلب (Rate):</label> <input type="number" value={localRate} onChange={e => setLocalRate(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="ریت بیمار" /> </div> <div> <label className="block font-semibold">فاصله QT (به میلی‌ثانیه):</label> <input type="number" value={qt} onChange={e => setQt(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 400ms" /> </div> {qtc > 0 && <p className="mt-2 font-bold">QTc محاسبه شده (فرمول Bazett): {qtc} ms</p>} <button onClick={() => onSubmit(qtc, qt)} className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg">استفاده از این عدد</button> </div> ); };
const AxisCalculator = ({ onSubmit }) => { const [lead1, setLead1] = useState(''); const [avf, setAvf] = useState(''); let axis = 'نامشخص'; if(lead1 !== '' && avf !== '') { const l1 = parseInt(lead1); const a = parseInt(avf); if (l1 >= 0 && a >= 0) axis = 'نرمال'; else if (l1 >= 0 && a < 0) axis = 'انحراف به چپ'; else if (l1 < 0 && a >= 0) axis = 'انحراف به راست'; else axis = 'انحراف شدید'; } return ( <div className="space-y-4"> <p className="text-sm text-slate-600">دامنه خالص کمپلکس QRS را در لیدهای I و aVF وارد کنید (مثبت یا منفی).</p> <div> <label className="block font-semibold">لید I (mm)</label> <input type="number" value={lead1} onChange={e => setLead1(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 5"/> </div> <div> <label className="block font-semibold">لید aVF (mm)</label> <input type="number" value={avf} onChange={e => setAvf(e.target.value)} className="w-full p-2 mt-1 border rounded-md" placeholder="مثلا 8"/> </div> {axis !== 'نامشخص' && <p className="mt-2 font-bold">محور محاسبه شده: {axis}</p>} <button onClick={() => onSubmit(axis)} className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg">استفاده از این محور</button> </div> ); };

// --- DDx Logic ---
function generateDDx(data) {
    const ddx = [];
    const { chiefComplaint, hpi, riskFactors, physicalExam, ecg } = data;
    const hasRiskFactors = Object.values(riskFactors).some(v => v);

    if (chiefComplaint === 'chestPain') {
        if (ecg.stChanges.includes('ST Elevation')) { ddx.push({ name: 'سکته قلبی حاد با صعود قطعه ST (STEMI)', reason: 'درد قفسه سینه به همراه ST Elevation در ECG.' }); }
        if (ecg.stChanges.includes('ST Depression') || ecg.stChanges.includes('T Wave Inversion')) { ddx.push({ name: 'سندروم کرونری حاد بدون صعود قطعه ST (NSTE-ACS)', reason: 'درد قفسه سینه به همراه تغییرات ایسکمیک در ECG.' }); }
        if (hpi.chestPain.quality.includes('تیز')) { ddx.push({ name: 'پریکاردیت یا آمبولی ریه', reason: 'ماهیت تیز و پلورتیک درد قفسه سینه.' }); }
    }
    if (chiefComplaint === 'shortnessOfBreath') {
        if (physicalExam.lungSounds.includes('کراکل') || physicalExam.jvp.includes('برجسته') || hpi.shortnessOfBreath.type.includes('ارتوپنه')) { ddx.push({ name: 'نارسایی احتقانی قلب (CHF)', reason: 'تنگی نفس به همراه یافته‌های CHF (کراکل، JVP برجسته، ارتوپنه).' }); }
    }
    if (chiefComplaint === 'palpitations' && ecg.rhythm === 'فیبریلاسیون دهلیزی') {
        ddx.push({ name: 'فیبریلاسیون دهلیزی (Atrial Fibrillation)', reason: 'شکایت تپش قلب و ریتم AFib در ECG.' });
    }
    if (chiefComplaint === 'syncope' && hpi.syncope.palpitations) {
        ddx.push({ name: 'آریتمی قلبی منجر به سنکوپ', reason: 'سنکوپ به همراه تپش قلب.' });
    }
    if (chiefComplaint === 'edema' && hpi.edema.location === 'دوطرفه' && hpi.edema.pitting === 'گوده‌گذار') {
        ddx.push({ name: 'نارسایی احتقانی قلب (CHF)', reason: 'ادم گوده‌گذار دوطرفه.' });
    }
     if (chiefComplaint === 'edema' && hpi.edema.location.includes('یک‌طرفه')) {
        ddx.push({ name: 'ترومبوز ورید عمقی (DVT)', reason: 'ادم یک‌طرفه اندام تحتانی.' });
    }
    if (chiefComplaint === 'claudication') {
        ddx.push({ name: 'بیماری عروق محیطی (PAD)', reason: 'درد پا هنگام فعالیت (لنگش).' });
    }
    if (chiefComplaint === 'hypertensiveSymptoms' && riskFactors.hypertension) {
        ddx.push({ name: 'اورژانس/فوریت فشار خون (Hypertensive Urgency/Emergency)', reason: 'علائم سیستمیک (سرگیجه، سردرد) در بیمار با سابقه فشار خون بالا.' });
    }
    if (ddx.length === 0 && hasRiskFactors && chiefComplaint === 'chestPain') {
        ddx.push({ name: 'بیماری عروق کرونر (آنژین)', reason: 'درد قفسه سینه در بیمار با عوامل خطر قلبی.' });
    }
    return ddx;
}

import { useState } from 'react'

const Controls = ({ onIncrease, onDecrease, onChangeName, onReset, type }) => {
      // inputValue: يحفظ نص حقل الإدخال

  const [inputValue, setInputValue] = useState('')

  const handleChange = () => {
    // التأكد من أن text مش فاضي 
    if (inputValue.trim()) {
      onChangeName(inputValue)  //  تغيير الاسم
      setInputValue('')//  // تفريغ 
    }
  }

  return (
    <div className="controls">
      <h3>الأزرار</h3>
      {/* === مجموعة أزرار الزيادة والنقصان === */}
      <div>
        <button onClick={onIncrease}>
        {/* إذا كان النوع person: يظهر "زيادة العمر" وإلا "زيادة السعر" */}
          {type === 'person' ? 'زيادة العمر' : 'زيادة السعر'}
        </button>
        <button onClick={onDecrease}>
          {type === 'person' ? 'تقليل العمر' : 'تقليل السعر'}
        </button>
      </div>

      <div>
        <input
          type="text"
          value={inputValue} // القيمة 
          onChange={(e) => setInputValue(e.target.value)} // حديدد القيمة عن الكتابة 
          placeholder={type === 'person' ? 'اسم جديد' : 'عنوان جديد'}
        />

         {/* زر تغيير الاسم - ينفذ handleChange عند النقر */}
        <button onClick={handleChange}>
          {type === 'person' ? 'تغيير الاسم' : 'تغيير العنوان'}
        </button>
      </div>
    {/* زر إعادة التعيين */}
      <button onClick={onReset}>إعادة التعيين</button>
    </div>
  )
}
// عملنا export عشين نقدر نستخدمه في ملفات ثثانية 
export default Controls
import { useState } from 'react'
import ItemCard from './components/ItemCard'
import Controls from './components/Controls'
import './App.css'

function App() {
  const [profileType, setProfileType] = useState('person')

  // يحفظ بيانات الشخص 
  const [person, setPerson] = useState({
      name: 'عادل بسام',
        age: 23,
        major: 'علم حاسوب'
  })

  // يحفظ بيانات المنتج
  const [product, setProduct] = useState({
   title: 'لابتوب',
        price: 600,
        specifications: 'ذاكرة 16 جيجابايت'
  })

// functions 1
// هون resetitem بترجع للقيمة الاصلية يلي محفوضة فوق 

  const resetItem = () => {
    if (profileType === 'person') {
      setPerson({
        name: 'عادل بسام',
        age: 21,
        major: 'علم حاسوب'
      })
    } else {
      setProduct({
        title: 'لابتوب',
        price: 600,
        specifications: 'ذاكرة 16 جيجابايت'
      })
    }
  }

// functions 2
// تزيد العمر او السعر 

  const increaseValue = () => {
    if (profileType === 'person') {
      setPerson({...person, age: person.age + 1})   // نسخ بيانات القديمة + تغيير العمر 
    } else {
      setProduct({...product, price: product.price + 50})
    }
  }

// functions 3
// بتنقص العمر او السعر 


  const decreaseValue = () => {
    if (profileType === 'person') {
      setPerson({...person, age: person.age - 1})
    } else {
      setProduct({...product, price: product.price - 50})
    }
  }


// functions 4
// تغيير الاسماو العنوان 

  const changeName = (newName) => {
    if (profileType === 'person') {
      setPerson({...person, name: newName})
    } else {
      setProduct({...product, title: newName})
    }
  }


// functions 5
    //  تبديل النوع بين شخص ومنتج
  const toggleType = () => {
    setProfileType(profileType === 'person' ? 'product' : 'person')
  }




  // هون بنعمل استدعاء للعناصر 
  return (
    <div className="app">
      <h1>ملف تعريف العنصر</h1>
      <button onClick={toggleType}>تبديل</button> {/*زر التبديل */} 
      
      <div className="content">
        <ItemCard item={profileType === 'person' ? person : product} type={profileType} />
        <Controls 
          onIncrease={increaseValue} // الزيادة
          onDecrease={decreaseValue} // النقصان
          onChangeName={changeName} // تغيير الاسم 
          onReset={resetItem} // reset 
          type={profileType} // نوع الحالي 
        />
      </div>
    </div>
  )
}

export default App
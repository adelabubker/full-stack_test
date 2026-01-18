const ItemCard = ({ item, type }) => {
  return (
    <div className="item-card">
        {/*جملة if type : person 
            else item  */}
      {type === 'person' ? (
        <div>
          <h2>الطالب</h2>
          <p><strong>الاسم:</strong> {item.name}</p>
          <p><strong>العمر:</strong> {item.age}</p>
          <p><strong>التخصص:</strong> {item.major}</p>
        </div>
      ) : (
        <div>
          <h2>المنتج</h2>
          <p><strong>العنوان:</strong> {item.title}</p>
          <p><strong>السعر:</strong> {item.price} دينار</p>
          <p><strong>المواصفات:</strong> {item.specifications}</p>
        </div>
      )}
    </div>
  )
}
// عملنا export عشين نقدر نستخدمه في ملفات ثثانية 
export default ItemCard
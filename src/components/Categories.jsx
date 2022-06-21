import React from "react";

export function Categories({ categoriesValue, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoriesValue === index ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

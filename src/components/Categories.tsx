import React from "react";

type CategoriesProps = {
  categoriesValue: number;
  onClickCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = ({
  categoriesValue,
  onClickCategory,
}) => {
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
};

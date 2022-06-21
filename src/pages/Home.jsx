import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

export function Home() {
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fetchData = async () => {
    setIsLoading(true);

    const search = searchValue ? `&search=${searchValue}` : "";

    let response = await axios.get(
      `https://629b292ecf163ceb8d15202c.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sortProperty.replace("-", "")}&order=${
        sort.sortProperty.includes("-") ? "ask" : "desc"
      }${search}`
    );
    let result = response.data;

    setPizzas(result);
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
  }, [categoryId, searchValue, currentPage, sort.sortProperty]);

  const SkeletonItem = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzasItems = pizzas.map((pizza) => (
    <PizzaBlock
      key={pizza.id}
      title={pizza.title}
      price={pizza.price}
      imageUrl={pizza.imageUrl}
      sizes={pizza.sizes}
      types={pizza.types}
      id={pizza.id}
    />
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          CategoriesValue={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? SkeletonItem : pizzasItems}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

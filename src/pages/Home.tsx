import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { setCategoryId, setCurrentPage } from "../redux/filter/filterSlice";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination";
import { fetchPizzas } from "../redux/pizza/pizzaSlice";
import { Status } from "../redux/pizza/types";
import { selectPizza } from "../redux/pizza/selectors";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";

export function Home() {
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";
    const order = sort.sortProperty.includes("-") ? "ask" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    dispatch(
      fetchPizzas({
        search,
        order,
        category,
        sortBy,
        currentPage,
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    // eslint-disable-next-line
  }, [categoryId, searchValue, currentPage, sort.sortProperty]);

  const SkeletonItem = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzasItems = items.map((pizza) => (
    <PizzaBlock
      title={pizza.title}
      price={pizza.price}
      imageUrl={pizza.imageUrl}
      sizes={pizza.sizes}
      types={pizza.types}
      id={pizza.id}
    />
  ));
  console.log(status);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoriesValue={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort value={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === Status.LOADING ? SkeletonItem : pizzasItems}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

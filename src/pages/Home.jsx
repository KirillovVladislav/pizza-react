import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination";
import { Link } from "react-router-dom";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";

export function Home() {
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector(selectPizza);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
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
  }, [categoryId, searchValue, currentPage, sort.sortProperty]);

  const SkeletonItem = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzasItems = items.map((pizza) => (
    <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
      <PizzaBlock
        title={pizza.title}
        price={pizza.price}
        imageUrl={pizza.imageUrl}
        sizes={pizza.sizes}
        types={pizza.types}
        id={pizza.id}
      />
    </Link>
  ));
  console.log(status);
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
        {status === "laoding" ? SkeletonItem : pizzasItems}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

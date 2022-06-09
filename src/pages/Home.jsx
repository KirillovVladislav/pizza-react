import React, { useState, useEffect } from "react"

import { Skeleton } from "../components/PizzaBlock/Skeleton"
import { PizzaBlock } from "../components/PizzaBlock"
import { Categories } from "../components/Categories"
import { Sort } from "../components/Sort"

export function Home() {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      let response = await fetch(
        "https://629b292ecf163ceb8d15202c.mockapi.io/items"
      )
      let result = await response.json()

      setPizzas(result)
      setIsLoading(false)
    }

    fetchData()
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => (
              <PizzaBlock
                key={pizza.id}
                title={pizza.title}
                price={pizza.price}
                imageUrl={pizza.imageUrl}
                sizes={pizza.sizes}
                types={pizza.types}
              />
            ))}
      </div>
    </div>
  )
}

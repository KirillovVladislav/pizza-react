import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://629b292ecf163ceb8d15202c.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "loading...";
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='pizza' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

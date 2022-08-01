import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type ItemPizza = {
  imageUrl: string;
  title: string;
  price: number;
};

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<ItemPizza>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://629b292ecf163ceb8d15202c.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='pizza' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

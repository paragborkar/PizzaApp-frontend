import React from 'react';
import { useDispatch } from 'react-redux';
import '../../styles/card.scss';

const Card = ({itemNum,pizzaScr,price,title}) => {
  const dispatch = useDispatch();
  const handler = (e) =>{
    e.preventDefault();
    const item=itemNum;
    console.log(item);
        switch(item)
        {
            case 1:
        dispatch({ type: "paneerPizzaIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 2:
        dispatch({ type: "cheesePizzaIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 3:
        dispatch({ type: "capsicumPizzaIncrement" });
        dispatch({ type: "calculatePrice" });
        break;

      default:
        dispatch({ type: "paneerPizzaIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
        }
  }
  return (
    <div className='card'>
      <div>ITEM {itemNum}</div>
      <main>
        <img src={pizzaScr} alt={itemNum} />
        <h5>₹{price}</h5>
        <p>{title}</p>
        <button onClick={handler}>Add To Cart</button>
      </main>
    </div>
  )
}

export default Card;

import React, { useEffect } from 'react';
import '../styles/cart.scss';
import Pizza1 from '../assets/Pizza1.jpg';
import Pizza2 from '../assets/Pizza2.jpg';
import Pizza3 from '../assets/Pizza3.jpeg';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CartItem = ({value,title,img,increment,decrement}) =>(
<div className='cartItem'>
<div>
    <h4>
        {title}
    </h4>
    <img src={img}  alt='Item'/>
</div>
<div>
    <button onClick={decrement}>-</button>
    <input type="number"  readOnly value={value}/>
    <button onClick={increment}>+</button>
</div>
</div>
)

const Cart = () => {
  const { cartItems: orderItems } = useSelector((state) => state.cart);
    const {
        cartItems: {
          paneerPizza: { quantity: paneerPizza },
          cheesePizza: { quantity: cheesePizza},
          capsicumPizza: { quantity:capsicumPizza },
        },
        subTotal,
        tax,
        shippingCharges,
        total,
      } = useSelector((state) => state.cart);
      const dispatch = useDispatch();
    const increment = (item) =>{
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
    const decrement = (item) =>{
        switch(item){

            case 1:
            if (paneerPizza === 0) break;
            dispatch({ type: "paneerPizzaDecrement" });
            dispatch({ type: "calculatePrice" });
            break;
          case 2:
            if (cheesePizza === 0) break;
            dispatch({ type: "cheesePizzaDecrement" });
            dispatch({ type: "calculatePrice" });
            break;
          case 3:
            if (capsicumPizza === 0) break;
            dispatch({ type: "capsicumPizzaDecrement" });
            dispatch({ type: "calculatePrice" });
            break;
    
          default:
            if (paneerPizza === 0) break;
            dispatch({ type: "paneerPizzaDecrement" });
            dispatch({ type: "calculatePrice" });
            break;
        }
        
    }

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(orderItems));
      localStorage.setItem(
        "cartPrices",
        JSON.stringify({
          subTotal,
          tax,
          shippingCharges,
          total,
        })
      );
    }, [orderItems, subTotal, tax, shippingCharges, total]);
    
  return (
   <section className='cart'>
    <main>
        <CartItem title={"Paneer Pizza"} img={Pizza1} value={paneerPizza} increment={() =>increment(1)} decrement={() =>decrement(1)} />
        <CartItem title={"Cheese Pizza"} img={Pizza2} value={cheesePizza} increment={() =>increment(2)} decrement={() =>decrement(2)} />
        <CartItem title={"Capsicum Pizza"} img={Pizza3} value={capsicumPizza} increment={() =>increment(3)} decrement={() =>decrement(3)} />

        <article>
            <div>
                <h4>Sub Total</h4>
                <p>₹{subTotal}</p>
            </div>
            <div>
                <h4>Tax</h4>
                <p>₹{tax}</p>
            </div>
            <div>
                <h4>Shipping Charges</h4>
                <p>₹{shippingCharges}</p>
            </div>
            <div>
                <h4>Total</h4>
                <p>₹{total}</p>
            </div>
            <Link to='/shipping'>Checkout</Link>
        </article>
    </main>
   </section>
  )
}

export default Cart;


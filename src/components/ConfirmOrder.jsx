import React, { useEffect, useState } from 'react';
import '../styles/confirmOrder.scss';
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createOrder, paymentVerification } from '../redux/actions/order';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ConfirmOrder = () => {

  const user =localStorage.getItem("userId");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } =
  useSelector((state) => state.cart);
  const { message, error } = useSelector((state) => state.order);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) =>{
    e.preventDefault();
    setDisableBtn(true);

    if (paymentMethod === "Cod") {
      dispatch(
        createOrder(
          shippingInfo,
          cartItems,
          paymentMethod,
          subTotal,
          tax,
          shippingCharges,
          total
        )
      );
    } else {
      const {
        data: { order, orderOptions },
      } = await axios.post(
        "https://pizzaapp-backend-ycpz.onrender.com/api/v1/createorderonline",
        {
          shippingInfo,
          orderItems: cartItems,
          paymentMethod,
          itemsPrice: subTotal,
          taxPrice: tax,
          shippingCharges,
          totalAmount: total,
          user,
        }
      );

      const options = {
        key: "rzp_test_7RaAIogKviDUBl",
        amount: order.amount,
        currency: "INR",
        name: "Parag Borkar",
        description: "Pizza App",
        order_id: order.id,
        handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          dispatch(
            paymentVerification(
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOptions
            )
          );
        },

        theme: {
          color: "#9c003c",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch({ type: "emptyState" });
      navigate("/paymentsuccess");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
      setDisableBtn(false);
    }
  }, [dispatch, message, error, navigate]);

  return (
   <section className='confirmOrder' >
    <main>
      <h1>Confirm Order</h1>
      <form onSubmit={submitHandler} >
        <div>
          <label>Cash On Delivery</label>
          <input type="radio" name='payment'  onChange={() => setPaymentMethod("Cod")}
              required />
        </div>
        <div>
          <label>Online</label>
          <input type="radio" name='payment' onChange={() => setPaymentMethod("Online")} required />
        </div>
       <button type='submit' disabled={disableBtn} >Place Order</button>
      </form>
    </main>
   </section>
  )
}

export default ConfirmOrder;

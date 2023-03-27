import axios from "axios";




export const createOrder =
  (
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "createOrderRequest",
      });
      const user =localStorage.getItem("userId");
      const { data } = await axios.post(
        "https://pizzaapp-backend-ycpz.onrender.com/api/v1/createorder",
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
          user,
        }
      );

      dispatch({
        type: "createOrderSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "createOrderFail",
        payload: error.response.data.message,
      });
    }
  };

  export const paymentVerification =
  (razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "paymentVerificationRequest",
      });

      const { data } = await axios.post(
        "https://pizzaapp-backend-ycpz.onrender.com/api/v1/paymentverification",
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderOptions,
        }
      );

      dispatch({
        type: "paymentVerificationSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "paymentVerificationFail",
        payload: error.response.data.message,
      });
    }
  };

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "getMyOrdersRequest" });
    const user =localStorage.getItem("userId");
    const { data } = await axios.get(`https://pizzaapp-backend-ycpz.onrender.com/api/v1/myorders/${user}`);
    dispatch({ type: "getMyOrdersSuccess", payload: data.orders });
  } catch (error) {
    dispatch({ type: "getMyOrdersFail", payload: error.response.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getOrderDetailsRequest" });

    const { data } = await axios.get(`https://pizzaapp-backend-ycpz.onrender.com/api/v1/order/${id}`);

    dispatch({ type: "getOrderDetailsSuccess", payload: data.order });
  } catch (error) {
    dispatch({
      type: "getOrderDetailsFail",
      payload: error.response.data.message,
    });
  }
};


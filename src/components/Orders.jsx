import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tables.scss';
import {AiOutlineEye}  from 'react-icons/ai';
import {GiArmoredBoomerang} from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders, processOrder } from '../redux/actions/admin';
import { toast } from 'react-hot-toast';

const Orders = () => {

  const dispatch = useDispatch();
  const { orders, message, error } = useSelector(
    (state) => state.admin
  );

  const processOrderHandler = (id) => {
    dispatch(processOrder(id));
    if(message==="Food Delivered")
    alert(message+",Cannot Change Status");
  };

  useEffect(() => {
    if (message) {
        toast.success(message);
        dispatch({ type: "clearMessage" });
    }
    if(message==="Food Delivered")
    {
      alert(message+",Cannot Change Status");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(getAdminOrders());
  }, [dispatch, error, message]);
  return (
    <section  className='tableClass'>
       {  orders !== undefined  &&
        ( <main>
          <table>
              <thead>
                  <tr>
                      <th>Order Id</th>
                      <th>Status</th>
                      <th>Item Qty</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>User</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                {
                  orders &&
                  orders.map((i) => (
                    <tr key={i}>
                      <td>#{i._id}</td>
                      <td>{i.orderStatus}</td>
                      <td>
                        {i.orderItems.paneerPizza.quantity +
                          i.orderItems.cheesePizza.quantity +
                          i.orderItems.capsicumPizza.quantity}
                      </td>
                      <td>₹{i.totalAmount}</td>
                      <td>{i.paymentMethod}</td>
                      <td>{i.user.name}</td>
                      <td>
                        <Link to={`/order/${i._id}`}>
                          <AiOutlineEye />
                        </Link>
                        <button onClick={() => processOrderHandler(i._id)}><GiArmoredBoomerang/></button>
                          </td>
                  </tr>
                  ))
                }
              </tbody>
          </table>
      </main>)
       }
   </section>
  )
}

export default Orders

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductTableInCart from "../card/ProductTableInCart";
import { Button } from "react-bootstrap";
//function
import { userCart } from "../functions/users";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleSaveOrder = () => {
    //code
    alert("CheckOut Order!!");
    userCart(user.token, cart)
      .then((res) => {
        console.log(res);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCartItem = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <td>Image</td>
          <td>title</td>
          <td>price</td>
          <td>count</td>
          <td>remove</td>
        </tr>
      </thead>
      {cart.map((item) => (
        <ProductTableInCart key={item._id} item={item} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} product</h4>
          {!cart.length ? <p>No Product in Cart</p> : showCartItem()}
        </div>

        <div className="col-md-4">
          <h4>Summary</h4>
          <hr />
          {cart.map((item, index) => (
            <p key={index}>
              {item.title} x {item.count} = {item.price * item.count}
            </p>
          ))}
          <hr />
          Total : <b> {getTotal()} </b>
          <hr />
          {user ? (
            <button
              className="btn btn-success"
              onClick={handleSaveOrder}
              disabled={!cart.length}
            >
              Check Out
            </button>
          ) : (
            <Link to="/login" state="cart">
              <Button variant="warning">Login to Checkout</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
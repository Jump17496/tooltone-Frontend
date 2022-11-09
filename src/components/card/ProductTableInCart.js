import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import {AiTwotoneDelete} from 'react-icons/ai'

const ProductTableInCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value <1 ? 1 : e.target.value;

    if( count > item.quantity){
      Swal.fire('warning!!','Max avialable Quantity: '+item.quantity,'warning')
      return;
    }

    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(cart);
    cart.map((product, i) => {
      if (product._id === item._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleRemove = () =>{
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(cart);
    cart.map((product, i) => {
      if (product._id === item._id) {
        cart.splice(i,1)
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  }

  return (
    <tbody>
      <tr>
        <td>
          <img src={item.images[0].url} width="100" />
        </td>
        <td>{item.title}</td>
        <td>{item.price}</td>

        <td>
          <input
            onChange={handleChangeCount}
            className="form-control"
            value={item.count}
            type="number"
          />
        </td>

        <td>
          <Button variant="danger"
          onClick={handleRemove}
          >
            <AiTwotoneDelete/>
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductTableInCart;
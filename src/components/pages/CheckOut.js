import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//function
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../functions/users";
import { Link, useNavigate } from "react-router-dom";
import { getAddress } from "../functions/users";

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [addressSave, setAddressSave] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // console.log("address", address);
  const loadData = () => {
    getAddress(user.token).then((res) => {
      setAddress(res.data.address);
      console.log("addresschekout");
    });
    getUserCart(user.token).then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  };

  const handleAddress = (addressId) => {
    // setAddressSaved(!addressSave);
    if(addressSave===false){
      setAddressSave(true)
      setAddressId(addressId)
      console.log("addressId:", addressId);
    }else{
      setAddressSave(false)
      setAddressId("")
      console.log("addressId:", addressId);
    }
  };

  console.log("Check!", addressSave);

  const handleCreateOrder = () => {
    //code
    saveOrder(user.token,addressId).then((res) => {
      console.log(res.data);
      //clear DB
      emptyCart(user.token);
      //clear store
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      //clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }

      Swal.fire("Complete!", "Order Saved", "success");
      navigate("/user/history");
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h4>Address</h4>
          <br />
          <Link to="/user/address" state="checkout">เพิ่มที่อยู่จัดส่ง</Link>
          {addressSave ? (
            <>
              {address.map((adr, index) => (
                <>
                  {addressId === adr._id ? (
                      <div key={index} className="alert alert-primary">
                        <div className="form-check">
                          <input
                            onChange={() => handleAddress(adr._id)}
                            // disabled={addressSave}
                            defaultChecked={true}
                            className="form-check-input"
                            type="checkbox"
                            value="checkbox"
                            id={index}
                          />
                          <label class="form-check-label" for="defaultCheck1">
                            เลือกที่อยู่นี้
                          </label>
                        </div>
                        <h1>{adr.title}</h1>
                        <h4>{adr.tel}</h4>
                        <p>
                          {adr.address} {adr.amphure} {adr.district}{" "}
                          {adr.province} {adr.postcode}
                        </p>
                      </div>   
                  ) : null}
                </>
              ))}
            </>
          ) : (
            <>
              {address.map((adr, index) => (
                <div key={index} className="alert alert-primary">
                  <div className="form-check">
                    <input
                      onChange={() => handleAddress(adr._id)}
                      // disabled={addressSave}
                      className="form-check-input"
                      type="checkbox"
                      value="checkbox"
                      id={index}
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      เลือกที่อยู่นี้
                    </label>
                  </div>
                  <h1>{adr.title}</h1>
                  <h4>{adr.tel}</h4>
                  <p>
                    {adr.address} {adr.amphure} {adr.district} {adr.province}{" "}
                    {adr.postcode}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>
            Product <b>{products.length}</b>
          </p>
          <hr />
          <p>list of Product</p>
          {products.map((item, i) => (
            <div key={i}>
              <p>
                {item.product.title} x {item.count} = {item.price * item.count}
              </p>
            </div>
          ))}
          <hr />
          Total : <b>{total}</b>
          <br />
          <Button
            variant="primary mt-3"
            disabled={!addressSave || !products.length}
            onClick={handleCreateOrder}
          >
            CheckOut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

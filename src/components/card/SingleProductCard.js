import React from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//ant
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-bootstrap/Carousel";

//function
import { addToWishlist } from "../functions/users";
//Sweetalrt
import Swal from "sweetalert2";
// lodash
import _ from "lodash";

const SingleProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  console.log(product);
  const { _id, title, description, images, price, sold, quantity, category } =
    product;

  const handleAddtoCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });
    let unique = _.uniqWith(cart, _.isEqual);

    localStorage.setItem("cart", JSON.stringify(unique));

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  const handleAddToWishList = (e) => {
    if (user) {
      addToWishlist(user.token, _id)
        .then((res) => {
          console.log(res.data);
          Swal.fire("Success!", "add " + title + " to wishlist!", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire("Warning", "please login to add wishlist", "warning");
    }
  };

  return (
    <>
      <div className="col-md-2"></div>
      <div className="col-md-5 mt-2">
        {/* <Carousel autoPlay showArrows={true} infiniteLoop dynamicHeight={true}>
          {images &&
            images.map((item) => <img src={item.url} key={item.public_id} />)}
        </Carousel> */}
        {/* code */}
        <Carousel a>
        {images &&
            images.map((item) =>
            <Carousel.Item interval={2500}>
              <img src={item.url} key={item.public_id}/>
            </Carousel.Item>
            )}
          
        </Carousel>
        {/* code */}

        <Tabs>
          <Tabs.TabPane tab="Description" key="1">
            {description}
          </Tabs.TabPane>
          <Tabs.TabPane tab="More.." key="2">
            More..
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-dark text-white p-3">{title}</h1>
        <Card
          actions={[
            <a onClick={handleAddToWishList}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </a>,
            <>
              <a onClick={handleAddtoCart}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                Add to Cart
              </a>
            </>,
          ]}
        >
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="text-start">price:{price}</span>
            </li>
            <li className="list-group-item">
              
              <span className="text-start">Quantity:{quantity}</span>
            </li>
            <li className="list-group-item">
              
              <span className="text-start">Sold:{sold}</span>
            </li>
            {category && (
              <li className="list-group-item">
                
                <span className="text-start">Category:{category.name}</span>
              </li>
            )}
          </ul>
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//bootstrab-react
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {BsCartFill} from 'react-icons/bs'
import {RiSearchEyeLine} from 'react-icons/ri'


//ant
// import { Card } from "antd";
// import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

// lodash
import _ from "lodash";

// const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { _id, title, description, images, price } = product;

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

  return (
    // <Card
    //   style={{width:"auto"}}
    //   hoverable
    //   cover={
    //     <img
    //       className="p-1"
    //       style={{ height: "600px", objectFit: "cover" }}
    //       alt="example"
          
    //       src={images && images.length ? images[0].url : ""}
    //       width="200"
    //     />
    //   }
    //   actions={[
    //     <Link to={"/product/" + _id}>
    //       <EyeOutlined className="text-warning" />
    //     </Link>,
    //     <ShoppingCartOutlined
    //       onClick={handleAddtoCart}
    //       className="text-danger"
    //     />,
    //   ]}
    // >
    //   <Meta title={title} description={description} />
    // </Card>
    <div>
      <Card style={{ width: "auto"}}>
        <Card.Img
          variant="top"
          src={images && images.length ? images[0].url : ""}
        />
        <Card.Body>
          <Card.Title><p>{title}</p></Card.Title>
          <Card.Text>{price}.-</Card.Text>
          <Link to={"/product/" + _id}><Button variant="light"><RiSearchEyeLine/></Button></Link>{' '}
          <Button variant="danger" onClick={handleAddtoCart}><BsCartFill/></Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;

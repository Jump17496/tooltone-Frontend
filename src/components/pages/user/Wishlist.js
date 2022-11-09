import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layout/MenubarUser";
import Swal from "sweetalert2";
import { getWishlist, removeWishlist } from "../../functions/users";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getWishlist(user.token).then((res) => {
      setWishList(res.data.wishlist);
      console.log(res.data);
    });
  };

  const handleRemove = (productId) => {
    removeWishlist(user.token, productId).then((res) => {
      console.log(res.data);
      loadData();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <h1>{user.username} Wishlist</h1>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <td>Image</td>
                <td>title</td>
                <td>price</td>
                <td>checkout</td>
                <td>remove</td>
              </tr>
            </thead>
            {wishlist.map((item, index) => (
              <tbody>
                <tr>
                  <td>
                    <img src={item.images[0].url} width="100" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>

                  <td>
                    <Link to={"/product/" + item._id}>
                      <Button variant="success">
                        <BsCartFill />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleRemove(item._id)}
                      variant="danger"
                    >
                      <AiTwotoneDelete />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
//redux
import { useSelector } from "react-redux";
//function
import { updateStatusOrder, getOrdersAdmin } from "../../functions/admin";
//sweetalert2
import Swal from "sweetalert2";

const Order = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getOrdersAdmin(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      console.log(res.data);
      Swal.fire("Update!!", res.data.orderstatus, "info");
      loadData();
    });
  };
  console.log("order", orders);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col text-center">
          {orders.map((item, index) => {
            return (
              <div key={index} className="card m-3">
                <p>
                  Order by <b>{item.orderdBy.username}</b>
                  <br />
                  {" " + item.orderstatus}
                </p>
                {/* select */}
                <select
                  value={item.orderstatus}
                  onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                  style={{ width: "200px", alignSelf: "center" }}
                  className="form form-control"
                >
                  <option value="Not Process">Not Process</option>
                  <option value="paid">Paid</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
                {/* address */}
                <p className="text-start">
                  ชื่อ:{item.address.title}
                  <br />
                  เบอร์:{item.address.tel}
                  <br />
                  ที่อยู่จัดส่ง:{item.address.address} {item.address.district}{" "}
                  {item.address.amphure} {item.address.province}{" "}
                  {item.address.postcode}
                  <br />
                </p>

                {/* table */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>title</td>
                      <td>Price</td>
                      <td>Count</td>
                    </tr>
                  </thead>
                  {/* 2 Loop table */}
                  {item.products.map((p, i) => (
                    <tr>
                      <td>{p.product.title}</td>
                      <td>{p.price}</td>
                      <td>{p.count}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3}>
                      Sum:<b>{item.cartTotal}</b>{" "}
                    </td>
                  </tr>
                  <tr>
                    {item.orderstatus === "paid" && (
                      <tbody>
                        <td>สลิปที่แนบ :</td>
                        <td>
                          <img
                            src={item.slipImage[0].url}
                            className="img-thumbnail"
                            alt=""
                          />
                        </td>
                      </tbody>
                    )}
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layout/MenubarUser";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
//function
import { getOrders } from "../../functions/users";

import { PDFDownloadLink } from "@react-pdf/renderer";

import Invoice from "../../order/Invoice";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  console.log("test", orders);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <h1>History Page</h1>
          {/* 1 Loop Order Card */}
          {orders.map((item, index) => {
            console.log("item", item);
            return (
              <div key={index} className="card m-3">
                <p>Order {" " + item.orderstatus}</p>
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
                </table>
                {/* PDF */}
                <div className="row">
                  <div className="col">
                    <PDFDownloadLink
                      document={<Invoice order={item} />}
                      fileName="Tooltone_Invoice.pdf"
                      className="btn btn-primary m-1"
                    >
                      pdf Download
                    </PDFDownloadLink>

                    {item.orderstatus === "Not Process" && (
                      <Link to={"/formslip/" + item._id}>
                        <Button variant="warning">ชำระเงิน</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;

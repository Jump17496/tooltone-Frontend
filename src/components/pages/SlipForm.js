import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { readOrder,updateSlipOrder } from "../functions/users";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

import { Avatar, Badge } from "antd";
import { updateStatusOrder } from "../functions/admin";

import Swal from "sweetalert2"
import "../CSS/SlipForm.css";

const SlipForm = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readOrder(param.id)
      .then((res) => {
        setOrder(res.data);
        setAddress(res.data.address);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      let allfileUpload = image; //[]
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          540,
          540,
          "JPEG",
          50,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                allfileUpload.push(res.data);
                console.log("allfileupload in then", allfileUpload);
                setImage(allfileUpload);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleRemove = (public_id) => {
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setImage([]);
        window.location.reload(false);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      console.log(res.data);
    });
  };

  const handleSubmit = () => {
    handleChangeStatus(param.id,"paid");
    updateSlipOrder(param.id,image)
    .then(res=>{
      console.log(res);
      Swal.fire("Transaction Slip Added!!","แจ้งชำระเงินสำเร็จ","success")
      navigate("/")
    })


  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="container container-box ">
          <h5>การชำระเงิน</h5>
          <div className="container box">
            <Form onCheck>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ยอดชำระ: {order.cartTotal}</Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  ที่อยู่จัดส่ง:
                  <br />
                  {address.title}
                  <br />
                  {address.tel}
                  <br />
                  {address.address} {address.district} {address.amphure}{" "}
                  {address.province} {address.postcode}
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  ธนาคาร:
                  <br />
                  ธนาคาร กสิกรไทย 0605412288
                  <br />
                  ธนาคาร ไทยพาณิชย์ 0305612244
                  <br />
                  ธนาคาร กรุงเทพ 0502452211
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>หลักฐานการชำระเงิน</Form.Label>
                <hr />
                {image &&
                  image.map((item) => (
                    <span className="avatar-item">
                      <Badge
                        onClick={() => handleRemove(item.public_id)}
                        style={{ cursor: "pointer" }}
                        count="x"
                      >
                        <Avatar
                          className="m-3"
                          src={item.url}
                          shape="square"
                          size={120}
                        />
                      </Badge>
                    </span>
                  ))}

                <br />
                <div className="form-group">
                  <label className="btn btn-primary">
                    Choose File...
                    <input
                      onChange={handleChangeFile}
                      className="form-control"
                      type="file"
                      hidden
                      multiple
                      accept="images/*"
                      name="file"
                    />
                  </label>
                </div>
              </Form.Group>
            </Form>

            <Button
              variant="success"
              type="submit"
              className="container submit-button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default SlipForm;

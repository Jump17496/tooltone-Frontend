import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../CSS/HowToPaid.css";

const HowToPaid = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <Card style={{ width: "40rem" }}>
            <Card.Body>
              <Card.Title>วิธีการชำระเงิน</Card.Title>
              <Card.Text>
                ชำระค่าสินค้าด้วยการโอนเงินผ่านบัญชีธนาคารที่ระบุไว้ด้านล่าง
                โดยคุณสามารถทำธุรกรรมผ่านตู้ ATM หรือช่องทางการชำระเงินอื่นๆ
                ของธนาคารที่คุณสะดวก
                กรุณาทำการโอนและแจ้งการชำระเงินภายในเวลาที่ร้านค้ากำหนด
                เพื่อไม่ให้สินค้าที่คุณสั่งซื้อหลุดไป
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <Card.Title>เลือกธนาคาร</Card.Title>
              <ListGroup.Item>
                ธนาคารกสิกรไทย นาย ธนัท 1001628360
              </ListGroup.Item>
              <ListGroup.Item>
                ธนาคารไทยพาณิชย์ นางสาว สุกัญญา 4210996590
              </ListGroup.Item>
              <ListGroup.Item>
                ธนาคารกรุงไทย นาย ธนภัทร 6609543062
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default HowToPaid;

import React from "react";
import { Link } from "react-router-dom";

import {AiTwotoneDelete} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const AdminProductCard = ({ product, handleRemove }) => {
  console.log(product);
  const { _id, title, description, images } = product;

  return (
    // <Card
    //   hoverable
    //   cover={
    //     <img
    //       className="p-1"
    //       style={{ height: "150px", objectFit: "cover" }}
    //       alt="example"
    //       src={images && images.length ? images[0].url : ""}
    //     />
    //   }
    //   actions={[
    //     <Link to={"/admin/update-product/"+_id}>
    //     <EditOutlined className="text-warning" />
    //     </Link>
    //     ,
    //     <DeleteOutlined
    //     onClick={()=>handleRemove(_id)}
    //     className="text-danger" />
    //   ]}
    // >
    //   <Meta title={title} description={description} />
    // </Card>
    <div>
      <Card style={{ width: "auto" }}>
        <Card.Img
          variant="top"
          src={images && images.length ? images[0].url : ""}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Link to={"/admin/update-product/"+_id}>
            <Button variant="warning">
              <FiEdit />
            </Button>
          </Link>{" "}
          <Button variant="danger" onClick={handleRemove}>
            <AiTwotoneDelete/>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminProductCard;

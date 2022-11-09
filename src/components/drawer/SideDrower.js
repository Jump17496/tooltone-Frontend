import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";

const SideDrower = () => {
    const dispatch = useDispatch()
    const { cart,drawer } = useSelector((state)=>({...state}))

    const handleClose = () =>{
        dispatch({
            type:"SET_VISIBLE",
            payload:false 
        })
    }; 

  return (
    <Offcanvas show={drawer} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{"Cart "+cart.length+" product "}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.map((item)=>
            <div className="row">
                <div className="col">
                    <img 
                        src={item.images[0].url} 
                        style={{width:"100%",height:'50px',objectFit:'cover'}} 
                    />
                    <p className="text-center bg-secondary text-light">
                        {item.title} x {item.count}
                    </p>
                </div>
            </div>
        )}
        <Link to="/cart">
            <Button
            onClick={handleClose} 
            variant="primary">Go to Cart</Button>
        </Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideDrower;

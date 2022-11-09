import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenubarUser from "../../layout/MenubarUser";
import { getAddress } from "../../functions/users";

const ListAddress = () => {
  const [address, setAddress] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getAddress(user.token)
    .then(res=>{
        setAddress(res.data.address)
        console.log(address);
    })
  };

  console.log(address);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <div className="row">
            <h1>ที่อยู่จัดส่ง</h1>
            <Link to={"/user/address"}>เพิมที่อยู่จัดส่ง</Link>
            {address.map((item, index) => (
              <div key={index} className="alert alert-primary">
                <h1>{item.title}</h1>
                <h4>{item.tel}</h4>
                <p>{item.address} {item.amphure} {item.district} {item.province} {item.postcode}</p>    
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAddress;

import React from "react";
import MenubarUser from "../../layout/MenubarUser";
import { useSelector } from "react-redux";

const Homeuser = () => {
  const { user } = useSelector((state)=>({...state}))
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <div className="row">
            <h1>Member</h1>
            <h2>Welcome {user.username}</h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Homeuser;

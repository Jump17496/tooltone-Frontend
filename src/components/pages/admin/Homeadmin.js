import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
//fuction
import { listProduct, removeProduct } from "../../functions/product";
//card
import AdminProductCard from "../../card/AdminProductCard";
//redux
import { useSelector } from "react-redux";
//sweetalert2
import Swal from 'sweetalert2'

const Homeadmin = () => {
  const { user } = useSelector((state)=>({...state}));
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //
    LoadData(100);
  }, []);

  const LoadData = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id) =>{
    // console.log(id)
    if(window.confirm("Delete ?")){
      removeProduct(user.token,id)
      .then(res=>{
        Swal.fire("Deleted!","deleted "+res.data.title+" Complete","success")
        console.log(res);
        LoadData(100);
      }).catch(err=>{
        console.log(err);
      })
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading ? <h1>Loading...</h1> : <h1>Homeadmin</h1>}

          <div className="row pb-4 pt-10">
            {product.map((item) => (
              <div key={item._id} className="col-md-4 mt-3">
                <AdminProductCard 
                handleRemove={()=>handleRemove(item._id)}
                product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeadmin;

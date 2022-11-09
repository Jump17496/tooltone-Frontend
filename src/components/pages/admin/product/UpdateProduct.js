import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import FileUpload from "./FileUpload";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//function
import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

const initialstate = {
  title: "guitar",
  description: "Descript",
  categories: [],
  category: "",
  price: "5000",
  quantity: "5",
  images: [],
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setValues({...values,...res.data});
      })
      .catch((err) => {
        console.log(err);
      });
    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log('product',values);
  console.log('category',category);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    updateProduct(user.token,values._id,values)
    .then(res=>{

      Swal.fire("Updated!!",res.data.title+" has been updated!","success")
      setLoading(false)
      console.log(res);
      navigate('/admin/index')
    }).catch(err=>{
      setLoading(false)
      console.log(err);
    })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading
          ? <h1>Loading...</h1>
          : <h1>Product Update</h1>
        }

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>quantity</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
                value={values.category._id}
                required
              >
                <option>Please Select</option>
                {category.length > 0 &&
                  category.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <FileUpload 
            loading={loading}
            setLoading={setLoading}
            values={values} 
            setValues={setValues}
            />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default UpdateProduct;

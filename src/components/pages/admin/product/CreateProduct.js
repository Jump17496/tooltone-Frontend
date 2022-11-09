import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import Swal from "sweetalert2";
//redux
import { useSelector } from "react-redux";
//function
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";
//
import FileUpload from "./FileUpload";

const initialstate = {
  title: "guitar",
  description: "Descript",
  categories: [],
  category: "",
  price: "5000",
  quantity: "5",
  images: [],
};

const Homeadmin = () => {
  const [values, setValues] = useState(initialstate);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        console.log(res.data);
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("value", values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Created!!",
          res.data.title + " created complete!",
          "success"
        );
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Insert Error!", err.response.data, "error");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading
          ?<h1>Loading...</h1>
          :<h1>CreateProduct Page</h1>
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
                required
              >
                <option>Please Select</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
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

export default Homeadmin;

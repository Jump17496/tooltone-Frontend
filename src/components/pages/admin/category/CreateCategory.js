//rafce
import { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
//function
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    name: "",
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    console.log("send token",authtoken);
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    deleteCategory(user.token,id)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        Swal.fire('Remove!',res.data.name+" has been remove!!",'success')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("data", category);

  const handleChangeCategory = (e) => {
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(user.token,values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        Swal.fire('Inserted!',res.data.name+" has been Add!",'success')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>CreateCategory</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่สินค้า</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChangeCategory}
                className="form-control"
              />
              <button className="btn btn-outline-primary">เพิ่ม</button>
            </div>
          </form>
          <hr />
          <ul className="list-group">
            {category.map((item) => (
              <li class="list-group-item">
                {item.name}
                <span
                  style={{ float: "right" }}
                  class="badge bg-primary rounded-pill"
                  onClick={() => handleRemove(item._id)}
                >
                  x
                </span>

                <span
                  style={{ float: "right" }}
                  class="badge bg-primary rounded-pill"
                >
                  <Link to={`/admin/update-category/${item._id}`}>Edit</Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;

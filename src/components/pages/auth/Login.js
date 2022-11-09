import { useState } from "react";
//function
import { login } from "../../functions/auth";
//redux
import { useDispatch } from "react-redux";
//react-router-dom v6
import { useNavigate, useLocation } from "react-router-dom";
//sweealert2
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("lo", location);

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    let intended = location.state;
    if (intended) {
      navigate('../'+intended);
    } else {
      if (role === "admin") {
        navigate("/admin/index");
      } else {
        navigate("/user/wishlist");
      }
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);

    //code
    login(value)
      .then((res) => {
        // console.log(res.data);
        // alert(res.data);
        Swal.fire(
          "Login !",
          res.data.payload.user.username + " has been Login!!!",
          "success"
        );

        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });

        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire("Warning !", err.response.data, "error");
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col md-6 offset-md-3">
          <h1>Login Page</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>password</label>
              <input
                className="form-control"
                type="text"
                name="password"
                onChange={handleChange}
              />
            </div>
            <br />
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

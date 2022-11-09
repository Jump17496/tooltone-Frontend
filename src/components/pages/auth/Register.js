import { useState } from "react";
//functions
import { register } from "../../functions/auth";
//sweealert2
import Swal from "sweetalert2";

const Register = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if (value.password !== value.password1) {
      // alert("Password not match");
      Swal.fire('แจ้งเตือน !',"Password not match",'error')
    } else {
      //code
      register(value)
        .then((res) => {
          console.log(res.data);
          Swal.fire('Register!',res.data,'success')
        })
        .catch((err) => {
          console.log(err.response.data);
          Swal.fire('แจ้งเตือน !',err.response.data,'error')
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col md-6 offset-md-3">
          <h1>Register Page</h1>

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

            <div className="form-group">
              <label>Confirm password</label>
              <input
                className="form-control"
                type="text"
                name="password1"
                onChange={handleChange}
              />
            </div>

            <br />
            <button 
            className="btn btn-success"
            disabled={value.password.length < 6}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

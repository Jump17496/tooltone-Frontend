import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import MenubarUser from "../../layout/MenubarUser";
//function
import {
  listProvince,
  listAumphre,
  listDistrict,
  createLocation
} from "../../functions/location";

import {  saveAddress } from '../../functions/users'
import Swal from "sweetalert2";

const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const [province, setProvince] = useState([]);
  const [amphure, setAmphure] = useState([]);
  const [district, setDistrict] = useState([]);

  const [data, setData] = useState({
    title: "",
    tel:"",
    address: "",
    province: "",
    amphure: "",
    district: "",
    postcode: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const Redirect = () => {
    let intended = location.state;
    if (intended) {
      navigate('../'+intended);
    } else {
      navigate(-1);
    }
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    createLocation(data)
    .then(res =>{
      handleAddToAddress(res.data._id);
      Swal.fire('UpdatedAddress!!','เพิ่มที่อยู่สำเร็จ','success')
      Redirect();
    }).catch(err=>{
      console.log(err);
    })
  }

  const handleAddToAddress =(_id)=>{
    // console.log('handleadd',user.token,id);
    saveAddress(user.token,_id)
    .then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  const loadData = () => {
    listProvince()
      .then((res) => {
        setProvince(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeProvince = (e) => {
    //get label
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setData({ ...data, [e.target.name]: label });

    listAumphre(e.target.value)
      .then((res) => {
        setAmphure(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeAumPhure = (e) => {
    //get label
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setData({ ...data, [e.target.name]: label });

    listDistrict(e.target.value)
      .then((res) => {
        setDistrict(res.data);
        console.log("postcode", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeDistrict = (e) => {
    //get label
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    let postcode = e.target.value;
    setData({ ...data, [e.target.name]: label, postcode: postcode });
  };

  console.log("data", data);

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col-md-1">
        </div>

        <div className="col-md-6">
          <div className="row">
            <h1 className="text-center">เพิ่มที่อยู่สำหรับจัดส่ง</h1>
            {/* test form control 12/10/2022 */}
            <br/>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">ชื่อ-นามสกุล</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={(e) => onChangeData(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">เบอร์ติดต่อ</label>
                <input
                  className="form-control"
                  type="text"
                  name="tel"
                  onChange={(e) => onChangeData(e)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">ที่อยู่</label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  onChange={(e) => onChangeData(e)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">จังหวัด</label>
                <select className="form-select" name="province" onChange={(e) => onChangeProvince(e)}>
                  <option>please select</option>
                  {province.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name_th}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">อำเภอ/แขวง</label>
                <select className="form-select" name="amphure" onChange={(e) => onChangeAumPhure(e)}>
                  <option>please select</option>
                  {amphure.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name_th}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">ตำบล/เขต</label>
                <select className="form-select" name="district" onChange={(e) => onChangeDistrict(e)}>
                  <option>please select</option>
                  {district.map((item, index) => (
                    <option key={index} value={item.zip_code}>
                      {item.name_th}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">รหัสไปรษณีย์ : {data.postcode}</label>
              </div>

              <input className="btn btn-success" type="submit" value="บันทึกข้อมูล"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

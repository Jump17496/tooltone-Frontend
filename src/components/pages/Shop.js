import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../card/ProductCard";
//function
import { listProduct, searchFilters } from "../functions/product";
import { listCategory } from "../functions/category";
//ant
import { Slider, Checkbox } from "antd";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOK] = useState(false);

  //Category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  //text

  //1. load all data
  useEffect(() => {
    //
    loadData();
    listCategory().then((res) => setCategory(res.data));
  }, []);

  const loadData = () => {
    setLoading(true);
    //
    listProduct(12)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  //2.load data on user filter
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  //filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //3.load on sliceder
  useEffect(() => {
    fetchDataFilter({ price }); //[0,0]
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOK(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    //ค่า Check ปัจจุบัน
    let inCheck = e.target.value;
    //ค่าเดิมของ Check
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    fetchDataFilter({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            Filter / Search
            <hr />
            <h4>Filter by Price</h4>
            <Slider
              value={price}
              onChange={handlePrice}
              range
              min={4000}
              max={100000}
            />
            <hr />
            <h4>Search by Category</h4>
            {category.map((item, index) => (
              <Checkbox onChange={handleCheck} value={item._id}>
                {item.name}
              </Checkbox>
            ))}
          </div>

          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danegr">Loading</h4>
            ) : (
              <h4 className="text-info">Product</h4>
            )}
            {product.length < 1 && <p>No Product found</p>}

            <div className="row pb-4 pt-10">
              {product.map((item, index) => (
                  <div key={index} className="col-md-4 mt-3">
                    <ProductCard product={item} />
                  </div>
              ))}
            </div>
          </div>

          {/* <div className="col-md-2">
            <div className="row pb-5">
              <div className="col-md-4 mt-3">
                <h1 className="text-danger">more Row</h1>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Shop;

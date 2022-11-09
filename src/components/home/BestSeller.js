import React, { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import LodingCard from "../card/LodingCard";
//function
import { listProductBy } from "../functions/product";

const BestSeller = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    //
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("sold", "desc", 3)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <LodingCard count={3}/>
        ) : (
          <div className="row">
            {product.map((item, index) => (
              <div key={index} className="col-md-4">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default BestSeller
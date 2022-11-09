import React from "react";
import BestSeller from "../home/BestSeller";
import NewProduct from "../home/NewProduct";
import Promotionbar from "../card/PromotionBar";


const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col mt-5">
          {/* Promotionbar */}
          <Promotionbar />

          {/* New Product */}
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotorn">
            New Arrivals
          </h4>
          <NewProduct />

          {/* best seller */}
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotorn">
            Best Seller
          </h4>
          <BestSeller />

        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
// import "../CSS/MenubarUser.css";

const MenubarUser = () => {
  return (
    <nav>
      <ul className="list-group mt-2">
        {/* <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/user/index">
            Home-user
          </Link>
        </li> */}

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/user/wishlist">
            Wishlist
          </Link>
        </li>

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/user/history">
            Buy History
          </Link>
        </li>

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/user/address">
            จัดการที่อยู่
          </Link>
        </li>

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/user/list-address">
            ที่อยู่จัดส่งของฉัน
          </Link>
        </li>
      </ul>
    </nav>

    // <div>
    //   <nav class="main-nav">
    //     <ul class="main-nav-ul">
    //       <li>
    //         <Link className="text-dark" to="/user/index">
    //           Home-user
    //         </Link>
    //       </li>

    //       <li>
    //         <a href="#">
    //           Products
    //           <span class="sub-arrow" />
    //         </a>
    //         <ul>
    //           <li>
    //             <a href="#">Item 1</a>
    //           </li>
    //           <li>
    //             <a href="#">Item 2</a>
    //           </li>
    //           <li>
    //             <a href="#">Item 3</a>
    //           </li>
    //           <li>
    //             <a href="#">Item 4</a>
    //           </li>
    //         </ul>
    //       </li>

    //       <li>
    //         <a href="#">Services</a>
    //       </li>
    //       <li>
    //         <a href="#">About</a>
    //       </li>
    //       <li>
    //         <a href="#">Contact</a>
    //       </li>
    //       <li>
    //         <a href="#">dropdown</a>
    //         <ul>
    //           <li>
    //             <a href="#">Item 1</a>
    //           </li>
    //           <li>
    //             <a href="#">Item 2</a>
    //           </li>
    //           <li>
    //             <a href="#">Item 3</a>
    //           </li>
    //           <li>
    //             <a href="#">Item 4</a>
    //           </li>
    //         </ul>
    //       </li>
    //     </ul>
    //     <ul />
    //   </nav>
    // </div>
  );
};

export default MenubarUser;

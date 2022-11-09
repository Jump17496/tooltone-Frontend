import React from "react";
import { Link } from "react-router-dom";

const MenubarAdmin = () => {
  return (
    <nav>
      <ul className="list-group mt-2">
        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/admin/index">
            แดชบอร์ด
          </Link>
        </li>

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/admin/manage-admin">
            จัดการผู้ใช้งาน
          </Link>
        </li>

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/admin/create-category">
            เพิ่มหมวดหมู่สินค้า
          </Link>
        </li>

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/admin/create-product">
            เพิ่มสินค้า
          </Link>
        </li>

        <li className="list-group-item list-group-item-action list-group-item-light">
          <Link className="text-dark" to="/admin/orders">
            จัดการ order
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenubarAdmin;

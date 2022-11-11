import React, { useState } from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  Form,
  NavDropdown,
  Badge,
} from "react-bootstrap";

import { BsCart3 } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { TiHome } from "react-icons/ti";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//sweealert2
import Swal from "sweetalert2";
//card
import Search from "../card/Search";

const Navigatebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  console.log("user Navber:", user);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    Swal.fire("Logout !", "Logout-success", "success");
    navigate("/");
  };

  return (
  //  new navbar
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <TiHome />
            Tooltone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/shop">
                <AiOutlineShopping />
                Store
              </Nav.Link>
              <Nav.Link href="/cart">
                <BsCart3 />
                Cart{cart.length > 0 && <Badge bg="info">{cart.length}</Badge>}
              </Nav.Link>
              <Nav.Link href="/howtopaid">
                วิธีการชำระเงิน
              </Nav.Link>

              {!user && (
                <>
                  <Nav.Link href="/login">login</Nav.Link>
                  <Nav.Link href="/register">register</Nav.Link>
                </>
              )}

              {user && (
                <>
                  <NavDropdown
                    title={user.username}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="#" onClick={logout}>
                      <div>logout</div>
                    </NavDropdown.Item>
                    {user.role === "admin" && (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/admin/index">
                          home-admin
                        </NavDropdown.Item>
                      </>
                    )}
                    {user.role === "user" && (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/user/wishlist">
                          home-user
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                </>
              )}
            </Nav>
            <Search />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigatebar;

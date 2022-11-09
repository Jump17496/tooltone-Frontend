import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    // console.log((e.target.value));
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shop?" + text);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input onChange={handleChange} type="search" className="form-control" />
    // </form>
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleChange}
      />
      {/* <Button variant="outline-success" onClick={handleSubmit}>Search</Button> */}
    </Form>
  );
};

export default Search;

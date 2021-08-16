import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Category.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

const Category = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  return (
    <div>
      <a href="#" onClick={toggle}>
        Category
      </a>
      <Modal
        isOpen={modal}
        onRequestClose={toggle}
        contentLabel="Shopping Categories"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="mymodal_title">
          <h1>Shopping Categories</h1>
        </div>
        <br />
        <ul>
          <li className="mymodal_link">
            <NavLink
              onClick={toggle}
              to="/category/Vegetarian"
              
            >
              Vegetarian
            </NavLink>
          </li>
          <li className="mymodal_link">
            <NavLink
              onClick={toggle}
              to="/category/Non-Vegetarian"
              
            >
              Non-Vegetarian
            </NavLink>
          </li>
        </ul>
      </Modal>
    </div>
  );
};
export default Category;

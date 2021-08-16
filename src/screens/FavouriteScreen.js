import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listFavourite, removeFavourite, } from "../Redux/Actions/userActions";

import { Link, NavLink, } from "react-router-dom";

// icons
import { Icon } from "react-icons-kit";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { heartO } from "react-icons-kit/fa/heartO";
import { heart } from "react-icons-kit/fa/heart";

const FavouriteScreen = (props) => {
    const userFavourite = useSelector((state) => state.userFavourite);
    const { products, loading, success, error } = userFavourite;
    const userRemoveFavourite = useSelector((state) => state.userRemoveFavourite);
    const { loading: loadingRemove, success: successRemove, error: errorRemove } = userRemoveFavourite;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const [hover, setHover] = useState(true);
  
    useEffect(() => {
      if (!(userInfo)) {props.history.push("/signin?redirect=favourite");};
      dispatch(listFavourite());
      return () => {};
    }, [successRemove, userInfo]);

    const handleRemove = (id) => {
      dispatch(removeFavourite(id));
    }
  
    const handleBack = (e) => {
      e.preventDefault();
      props.history.goBack();
    };

    const handleAddtoCart = (id) => {
      props.history.push("/cart/" + id + "?qty=1");
    };
  
    return (
      <div className="shop_outta">
        {/* pages path for every single pages which is not Homepage  */}
        <div className="pages_path">
          <NavLink to="/" className="pages_path_links">
            Home
          </NavLink>
          <h4>|</h4>
          <NavLink to={window.location.pathname} className="pages_path_links">
            Favourite
          </NavLink>
        </div>
        {/* for mobile ver */}
        <div className="back-to-result">
          <Link onClick={handleBack} to="#" className="pages_path_BackToResult ">
            <h3>Previous Page </h3>
          </Link>
        </div>
        {/* end of pages path */}

        <div className="show_products_outta">
          <div className="show_products">
          {products ? products[0] ?
            (<>
              <div className="Error_div">
                <h1>Favourite Item</h1>
              </div>
            </>):
            (<>
              <div className="Error_div">
                <h1>You Don't Have Any Favourite Item</h1>
              </div>
            </>) : ""}
          {loading ? (
            <div className="Error_div">Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : products ? products[0] ? (
              products.map((product) => (
                <div key={product._id} className="card Cart_showProduct">
                  <Link to={"/product/" + product._id} className="productLink_1">
                    <div className="div_hover">
                      <img
                        className="product-img hoverImg"
                        src={product.image[0]}
                        alt="product"
                      />
                      <div className="divHover">
                        <div className="hoverInner_btn">
                          <div
                            className="cartProduct_detailBtn btn"
                            type="button"
                          >
                            <Icon
                              size={27}
                              icon={iosSearchStrong}
                              style={{ color: "#fd7e14" }}
                              className="filter_icon"
                            />
                          </div>
                          <div
                            onClick={(e) => {e.preventDefault();handleRemove(product._id);}}
                            className="cartProduct_detailBtn btn"
                            type="button"
                          >
                            <Icon
                              size={27}
                              icon={hover? heart: heartO}
                              onMouseEnter={()=>setHover(false)}
                              onMouseLeave={()=>setHover(true)}
                              style={{ color: "#fd7e14" }}
                              className="filter_icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="card-body CartProduct_cardBody">
                    <h3>{product.name}</h3>
                    {/* <div className="product-brand">{product.brand}</div> */}
                    <h4 className="product-price">$ {product.price}</h4>{" "}
                    {/* <div className="product-price">Standard Price:{product.price}</div>
                                  <div className="product-bprice">Bundle Price:{product.bprice}</div> */}
                  </div>
                  <div>
                    {product.countInStock > 0 && (
                      <button
                        onClick={() => handleAddtoCart(product._id)}
                        className="button primary Product_addCartBtn"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))): ""
              :""}
              <div className="Error_div">
                <h1><Link to="/shop">Visit Our Shop For More...</Link></h1>
              </div>
          </div>
        </div>
      </div>
    );
  };
  export default FavouriteScreen;
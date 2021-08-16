import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../Redux/Actions/productActions";
import { addFavourite, removeFavourite } from "../Redux/Actions/userActions";
import SelectList from "react-widgets/lib/SelectList";
import DropdownList from "react-widgets/lib/DropdownList";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationManager } from "react-notifications";
// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isTablet, isMobile } from "react-device-detect";

import "../Components/HomePageComponent/OurMenu_slider/OurMenu_slider_main/ourMenu_slider.css";
// import "../Components/HomepageComponent/OurMenu_slider/OurMenu_slider.css";
import "./HomeScreen.css";
// icons
import { Icon } from "react-icons-kit";
import { sortAmountDesc } from "react-icons-kit/icomoon/sortAmountDesc";
import { filter } from "react-icons-kit/fa/filter";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { heartO } from "react-icons-kit/fa/heartO";
import { heart } from "react-icons-kit/fa/heart";
// REMARK !! IMPORTANT !!
// Page here set for OpenKitchen Menu

const HomeScreen = (props) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const type = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const [productsRef, setProductsRef] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [categoryOption, setCategoryOption] = useState("");
  const [category, setCategory] = useState(userInfo ? userInfo.preference : "");
  const [typeOption, setTypeOption] = useState("");
  const [menuOption, setMenuOption] = useState("");
  const userAddFavourite = useSelector((state) => state.userAddFavourite);
  const {
    loading: loadingAdd,
    success: successAdd,
    error: errorAdd,
  } = userAddFavourite;
  const userRemoveFavourite = useSelector((state) => state.userRemoveFavourite);
  const {
    loading: loadingRemove,
    success: successRemove,
    error: errorRemove,
  } = userRemoveFavourite;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/tags/category`)
      .then((result) => {
        setCategoryOption(result.data);
      });
    dispatch(listProducts(category, type, searchKeyword, sortOrder));
    return () => {};
  }, [category]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/tags/type`)
      .then((result) => {
        setTypeOption(result.data.map((x) => x.name));
        let a = result.data;
        let b = [];
        for (let i = 0; i < a.length; i++) {
          if (a[i].name !== type) {
            b.push(a[i]);
          }
        }
        setMenuOption(b);
      });
    dispatch(listProducts(category, type, searchKeyword, sortOrder));
    return () => {};
  }, [type]);

  useEffect(() => {
    dispatch(listProducts(category, type, searchKeyword, sortOrder));
    return () => {};
  }, [successAdd, successRemove]);

  useEffect(() => {
    setProductsRef(products ? products.slice(0, 10) : []);
    setHasMore(true);
    return () => {};
  }, [products]);

  const fetchMoreData = () => {
    if (productsRef.length >= products.length) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 10 more records in .5 secs
    setTimeout(() => {
      let temp1 = productsRef.length;
      setProductsRef(products.slice(0, temp1 + 10));
    }, 500);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, type, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    // setSortOrder(e.target.value);
    // dispatch(listProducts(category, type, searchKeyword, e.target.value));
    setSortOrder(e);
    dispatch(listProducts(category, type, searchKeyword, e));
  };
  const handleAddtoCart = (id) => {
    props.history.push("/cart/" + id + "?qty=1");
  };
  const handleType = (value) => {
    props.history.push("/type/" + value);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleBack = (e) => {
    e.preventDefault();
    props.history.goBack();
  };

  const handleFavourite = (product) => {
    userInfo
      ? product.favourite
        ? dispatch(removeFavourite(product._id))
        : dispatch(addFavourite(product._id))
      : NotificationManager.info("Please Login", "Login Required");
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 375 },
      items: 10,
    },
  };
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";
  const SortHover = ({ onHover, children }) => (
    <div className="sortHover">
      <div className="hover__no-hover">{children}</div>
      <div className="hover__hover">{onHover}</div>
    </div>
  );
  const CategoryHover = ({ onHover, children }) => (
    <div className="categoryHover">
      <div className="hover__no-hover">{children}</div>
      <div className="hover__hover">{onHover}</div>
    </div>
  );
  return (
    <div className="shop_outta">
      {/* pages path for every single pages which is not Homepage  */}
      <div className="pages_path">
        <NavLink to="/" className="pages_path_links">
          Home
        </NavLink>
        <h4>|</h4>
        <NavLink to={window.location.pathname} className="pages_path_links">
          OpenKitchen Menu
        </NavLink>
      </div>
      {/* for mobile ver */}
      <div className="back-to-result">
        <Link onClick={handleBack} to="#" className="pages_path_BackToResult ">
          <h3>Previous Page #</h3>
        </Link>
      </div>
      {/* end of pages path */}
      <div className="filterDiv_btn">
        <filter1>
          <h1>OpenKitchen Menu </h1>
          {typeOption ? (
            <DropdownList
              className="filter_dropdown"
              placeholder="Menu Type"
              data={typeOption}
              value={type}
              onChange={handleType}
            />
          ) : (
            <DropdownList
              busy
              className="filter_dropdown"
              placeholder="Menu Type"
            />
          )}
        </filter1>
        <btnoption className="" style={{ fontFamily: "Helvetica" }}>
          <SortHover
            onHover={
              <div>
                <sort className="filter_Btn btn ">
                  <Icon
                    size={27}
                    icon={sortAmountDesc}
                    style={{ color: "#fd7e14" }}
                    className="filter_icon"
                  />
                  <p>Sort</p>
                </sort>
                <div className="sortSelect">
                  <SelectList
                    data={["Newest", "Lowest", "Highest"]}
                    value={sortOrder}
                    onChange={sortHandler}
                  />
                </div>
              </div>
            }
          >
            <sort className="filter_Btn btn ">
              <Icon
                size={27}
                icon={sortAmountDesc}
                style={{ color: "#e65100" }}
                className="filter_icon"
              />
              <p>Sort</p>
            </sort>
          </SortHover>
          <CategoryHover
            onHover={
              <div>
                <category className="filter_Btn btn ">
                  <Icon
                    size={27}
                    icon={filter}
                    style={{ color: "#fd7e14" }}
                    className="filter_icon"
                  />
                  <p>Category</p>
                </category>
                {categoryOption ? (
                  <div className="categorySelect">
                    <SelectList
                      className="category_div"
                      multiple
                      data={["All"]}
                      onChange={(e) => {
                        console.log(e);
                        if (e.length) {
                          setCategory(categoryOption);
                        }
                      }}
                    />
                    <SelectList
                      className="category_div"
                      multiple
                      data={categoryOption}
                      value={category}
                      onChange={(e) => setCategory(e)}
                    />
                  </div>
                ) : (
                  <SelectList busy />
                )}
              </div>
            }
          >
            <category className="filter_Btn btn ">
              <Icon
                size={27}
                icon={filter}
                style={{ color: "#e65100" }}
                className="filter_icon"
              />
              <p>Category</p>
            </category>
          </CategoryHover>
        </btnoption>
      </div>

      <div className="show_products_outta">
        {loading ? (
          <div className="Error_div">Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <InfiniteScroll
            className="show_products"
            dataLength={productsRef.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              products && products.length === 0 ? (
                <div
                  className="filter_div_outta"
                  style={{
                    flexBasis: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "3rem",
                    textAlign: "center",
                  }}
                >
                  <h3>
                    No Matching Result. Please Consider A New Search Criteria.
                  </h3>
                </div>
              ) : (
                <div
                  className="filter_div_outta"
                  style={{
                    flexBasis: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem",
                  }}
                >
                  <Icon
                    size={27}
                    icon={spinner3}
                    style={{ color: "#fd7e14" }}
                    className="spinning_icon"
                  />
                  Loading...
                </div>
              )
            }
            // scrollThreshold="3000px"
            // endMessage={
            //   <p style={{ textAlign: "center" }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
          >
            {productsRef.map((product) => (
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
                          className="cartProduct_detailBtn btn"
                          type="button"
                        >
                          <Icon
                            size={27}
                            icon={product.favourite ? heart : heartO}
                            onClick={(e) => {
                              e.preventDefault();
                              handleFavourite(product);
                            }}
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
                <div style={{ display: "none" }}>
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
            ))}
          </InfiniteScroll>
        )}
      </div>
      <div className="ourMenu_outta">
        <div className="ourMenu_content">
          <h2>You might also like </h2>
        </div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="ourMenu_Carousel"
          dotListClass=""
          focusOnSelect={false}
          infinite={false}
          itemClass="ourMenu_itemEach"
          keyBoardControl
          minimumTouchDrag={300}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 3,
              partialVisibilityGutter: 30,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          draggable={false}
          swipeable={false}
        >
          {menuOption
            ? menuOption.map((menu, index) => (
                <div key={index} className="card menu_item">
                  <Link to={`/type/${menu.name}`}>
                    <div className="pfl_ourMenu">
                      <img
                        className="pflimage_ourMenu"
                        src={menu.image}
                        style={{ borderRadius: "1rem" }}
                      />
                      <div className="pflhover_ourMenu">
                        <div
                          className="pflhover_each_type_btn btn"
                          type="button"
                        >
                          {menu.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="card-body body_HomeScreen">
                    <Link
                      to={`/type/${menu.name}`}
                      className="ourMenu_each_type_btn "
                      type="button"
                    >
                      <p>{menu.name}</p>
                    </Link>
                  </div>
                </div>
              ))
            : ""}
        </Carousel>
      </div>
    </div>
  );
};
export default HomeScreen;

// for searching machine
{
  /* <Form onSubmit={submitHandler} className="filter_search_btn  ">
            <Form.Label className="filterInput_label">
              Search Product{" "}
            </Form.Label>
            <Form.Control
              size="lg"
              className="filter_inputFeild"
              placeholder="Input product name"
              type="text"
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          <Button variant="primary" type="submit" >
            Search
          </Button>
          // </Form> */
}
{
  /*  <div className="filter_search_btn text-center"> */
}
{
  /* <div>
          <Form.Label className="filterInput_label"> Sort By </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="sortOrder"
            onChange={sortHandler}
            className="filter_inputFeild"
          >
            <option>Newest</option>
            <option>Lowest</option>
            <option>Highest</option>
          </Form.Control>
        </div>
        <div className="preference_outtadiv">
          <label className="filterInput_label">Category</label>
          {categoryOption ? (
            <>
              <SelectList
                className="category_div"
                multiple
                data={categoryOption}
                value={category}
                onChange={(e) => setCategory(e)}
              />
              <button
                className="btn-lg btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setCategory(categoryOption);
                }}
              >
                Check all
              </button>
            </>
          ) : (
            <SelectList busy />
          )}
        </div>{" "} */
}
{
  /* </div>{" "} */
}

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  NavLink,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, listProducts, } from "../Redux/Actions/productActions";
import Rating from "../Components/Rating";
import {
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";

// import Product Details with Delivery
import ProductScreenDetailOption from "./ProductScreen_detailOption/ProductScreenDetailOption";

// package react-image-gallery
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./ProductScreen.css";

// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isTablet, isMobile } from "react-device-detect";

// below: import icon
import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/entypo/facebook";
import { LineIcon } from "react-share";
import { linkedin } from "react-icons-kit/entypo/linkedin";
import { pinterest } from "react-icons-kit/entypo/pinterest";
import { twitter } from "react-icons-kit/entypo/twitter";

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productList = useSelector((state) => state.productList);
  const { products, loading: loadingList, error: errorList } = productList;
  const dispatch = useDispatch();
  const shareUrl = window.location.href;
  const [menuOption, setMenuOption] = useState("");

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      // cleanup
    };
  }, [props.match.params.id]);
  useEffect(() => {
    if (product) {
      dispatch(listProducts("", product.type));
    }
    return () => {
      // cleanup
    };
  }, [product]);
  useEffect(() => {
    if (products && product) {
      let b = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].name !== product.name) {
          b.push({_id: products[i]._id, name: products[i].name, image: products[i].image[0]});
        }
      }
      setMenuOption(b);
    }
    return () => {
      // cleanup
    };
  }, [products]);

  const handleAddtoCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  const handleBack = (e) => {
    e.preventDefault();
    props.history.goBack();
  };

  const handlePlus = (e) => {
    e.preventDefault();
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };
  const handleMinus = (e) => {
    e.preventDefault();
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // for react-image-gallery
  const images = product ? product.image
    ? product.image.map( x => x.includes("youtube") ? 
      Object.assign({
        original: '/android-chrome-512x512.png',
        thumbnail: '/android-chrome-512x512.png',
        renderItem: () => {return <iframe width="350vw" allowFullScreen src={x}></iframe>},
      })
      :
      Object.assign({
        //   originalClass: "GalleryOriginal",
        //   thumbnailClass: "GalleryThumbnail",
        original: x,
        thumbnail: x,
      }) )
    : [] : [];

  // console.log(props.match.params.id)
  // const product = data.products.find(x=> x._id ===props.match.params.id)
  return (
    <div className="productDetail-outta">
      {/* pages path for every single pages which is not Homepage  */}
      <div className="pages_path">
        <NavLink to="/" className="pages_path_links">
          Home
        </NavLink>
        <h4>|</h4>
        <Link to={product?`/type/${product.type}`:'#'}>
          &nbsp;OpenKitchen Menu&nbsp;
        </Link>
        <h4>|</h4>
        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <h4>&nbsp;{product.name}&nbsp;</h4>
        )}
      </div>
      {/* for mobile ver */}
      <div className="back-to-result">
        <Link onClick={handleBack} className="pages_path_BackToResult ">
          <h3>Previous Page </h3>
        </Link>
      </div>
      {/* end of pages path */}
      {loading ? (
        <div className="Error_div">Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="productDetail_content">
            <div className="productDetail_top">
              <ImageGallery
                items={images}
                infinite={false}
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                showBullets={false}
                isRTL={true}
                thumbnailPosition={"left"}
              />
              {/* below for sharing to social media */}

              <social className="shareDiv">
                <h2>
                  <span>Share:</span>
                </h2>
                <FacebookShareButton
                  url={shareUrl}
                  style={{ color: "#3b5998" }}
                >
                  <Icon size={25} icon={facebook} />
                </FacebookShareButton>{" "}
                <LineShareButton url={shareUrl}>
                  <LineIcon size={25} round={true} />
                </LineShareButton>{" "}
                <LinkedinShareButton
                  url={shareUrl}
                  style={{ color: "#0e76a8" }}
                >
                  <Icon size={25} icon={linkedin} />
                </LinkedinShareButton>{" "}
                <PinterestShareButton
                  url={shareUrl}
                  media={product.image ? product.image[0] : null}
                  style={{ color: "#c8232c" }}
                >
                  <Icon size={25} icon={pinterest} />
                </PinterestShareButton>{" "}
                <TwitterShareButton url={shareUrl} style={{ color: "#00acee" }}>
                  <Icon size={25} icon={twitter} />
                </TwitterShareButton>{" "}
              </social>
            </div>
            <div className="details-action productDetail_top_right">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <h2>Price:{product.price}</h2>
                </li>
                {/* <li>
                                        Bundle Price:{product.price}
                                    </li> */}
                <li>
                  <h2>
                    Status:{" "}
                    {product.countInStock > 0 ? "Available" : "Unavailable."}
                  </h2>
                </li>
                <li>
                  <h2>Quantity: </h2>
                </li>
                <li>
                  <div className="productAct_btnGroup">
                    <div className="btnGroup_counter">
                      <button className="button productAct_btn" onMouseDown={handlePlus}>

                        <p>+</p>
                      </button>
                      <h1>{qty}</h1>
                      <button
                        className="button productAct_btn"
                        onMouseDown={handleMinus}
                      >
                        <p>-</p>
                      </button>
                    </div>
                    {product.countInStock > 0 && (
                      <button
                        onClick={handleAddtoCart}
                        className="button primary"
                      >
                        <h1> Add to Cart</h1>
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            </div>
            {product.name ? <ProductScreenDetailOption product={product}/> : ""}
          </div>
        </>
      )}
      {loadingList ? (
        <div className="specialMenu_outta">
          <div className="specialMenu_content">
            <h2>Loading...</h2>
          </div>
        </div>
      ) : errorList ? (
        <div className="specialMenu_outta">
          <div className="specialMenu_content">
            <h2>Related Dishes</h2>
          </div>
        </div>
      ) : (
        <div className="specialMenu_outta">
        <div className="specialMenu_content">
          <h2>Related Dishes</h2>
        </div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={4500}
          centerMode={false}
          className="specialMenu_Carousel"
          dotListClass=""
          focusOnSelect={false}
          infinite={false}
          itemClass="specialMenu_itemEach"
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
        {menuOption ? 
          menuOption.map((item, index) => (
              <div key={index} className="card specialmenu_item">
                <Link to={`/product/${item._id}`}>
                  <div className="pfl_special ">
                    <img className="pflimage_special" src={item.image} />
                    <div className="pflhover_special">
                      <div
                        className="pflhover_special_btn btn "
                        type="button"
                      >
                        <h4>{item.name}</h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : ""}
        </Carousel>
      </div>
      )}
    </div>
  );
};
export default ProductScreen;

{
  /* <div className="productDetail_top_Right">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <h4>Type:{product.type}</h4>
                </li>
                <li>
                  <h4>
                    Category:
                    {product.category
                      ? product.category.map((x) => (
                          <>
                            {x}
                            <br />
                          </>
                        ))
                      : ""}
                  </h4>
                </li>
                <li>
                  <h4>Serving: For {product.countInStock}</h4>
                </li>
                <li>
                                        <h4>{product.brand}</h4>
                                    </li>
                <li>
                  <h4>Standard Price:{product.price}</h4>
                </li>
                <li>
                  <h4>Cooking Difficulties:{product.difficulty}</h4>
                </li>
                <li>
                  <h4>Cooking Time:{product.c_time}</h4>
                </li>
                <li>
                  <h4>Calories:{product.calories}</h4>
                </li>
                <li>
                                        <h4>Bundle Price:{product.bprice}</h4>
                                    </li>
                <li>
                  <h4>
                    Description:
                    <div>{product.description}</div>
                  </h4>
                </li>
                <li>
                  <h4>
                    Share this:
                    <div>
                      <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                    </div>
                  </h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + "reviews"}
                    />
                  </a>
                </li>
              </ul>
            </div> */
}
{
  /* Qty:
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select> */
}

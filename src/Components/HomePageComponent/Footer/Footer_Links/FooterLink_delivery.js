import React from "react";

import "./FooterLink_delivery.css";

const FooterLink_delivery = () => {
  return (
    <div className="delivery__outta ">
      <header className="delivery_header"></header>
      <h1>Delivery From Source To Home</h1>
      <section className="delivery__outta_secondary">
        <h2>Free for order over $500. Arrives soonest by tomorrow</h2>
        <h4>$80 delivery fee for orders below $500. Minimum order of $100.</h4>
        <div className="delivery__content">
          <div className="col-sm-12 col-md-4 col-lg-4 delivery_detail">
            <div className="delivery_img_div">
              <img
                src="https://www.jousun.com/images/200617_JS-update-image-03.svg"
                className="delivery_img"
              />
            </div>
            <h4>Direct from Source</h4>
            <hr></hr>
            <br></br>
            <p>
              Delivered soonest within 12 hours from harvest. Order are placed
              directly to farms and importers. 100% traceable.
            </p>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 delivery_detail">
            <div className="delivery_img_div">
              <img
                src="https://www.jousun.com/images/200617_JS-update-image-01.svg"
                className="delivery_img"
              />
            </div>
            <h4>Temperature Regulated for Maximum Freshness </h4>
            <hr></hr>
            <br></br>
            <p>
              Need us to leave groceries at your doorstep? Want us to knock only
              so we don't wake the baby? Let us know and we'll follow through.
            </p>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 delivery_detail">
            <div className="delivery_img_div">
              <img
                src="https://www.jousun.com/images/200617_JS-update-image-02.svg"
                className="delivery_img"
              />
            </div>
            <h4>Add Delivery Instructions</h4>
            <hr></hr>
            <br></br>
            <p>
              We carefully monitor the conditions in which your products are
              packed and transported, right up until the moment they are
              delivered, so that fresh items stay chilled and frozen items
              remain frozen.
            </p>
          </div>
        </div>
        <div className="delivery__content_secondary">
          <p>
            <span>Cutoff time :</span> 8pm , delivered soonest by tomorrow
            <br></br> <span>Monday - Saturday :</span> 1-5pm on-time delivery<br></br> Get
            1-hour slot estimate on the morning of delivery day
          </p>
          <small>
            Delivery time estimate will be sent to your WhatsApp/ SMS the
            evening before delivery.<br></br>
            To request a change, just respond and we will be in touch in the
            morning.
          </small>
          <br></br>
          <div className="delivery_text_bottom">
            <p>Free delivery above $500.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FooterLink_delivery;

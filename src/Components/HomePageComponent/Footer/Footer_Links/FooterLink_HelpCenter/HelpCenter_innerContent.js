import React from "react";
import HelpCenter_btn from "./HelpCenter_btn";

import "./HelpCenter_innerContent.css";

export default class MenuWeeklyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequentlyAskQs: [
        {
          id: 1,
          title: "Why do you charge a concierge fee?",
          content:
            "MealKit is different than other online grocery services because multiple vendors and drivers may be involved in a single order. Also, to help operate MealKit platform, including customer services and credit card processing. The concierge fee is used to pay all units to help ensure that they are compensated fairly and competitively.",
        },
        {
          id: 2,
          title: "How are products priced on MealKit?",
          content:
            "When you shop on MealKit, you are buying directly from approved Merchants on our platform. Product pricing, inventory, description and even packaging is determined by individual merchants. If you have any questions, feel free to contact MealKit via email or web-chat service, and we will direct your questions to the merchants for follow up.",
        },
        {
          id: 3,
          title: "What if I want to add products after the payment?",
          content:
            "we are happy to help. Please email us the item’s full name, weight and quantity via ask@jousun.com or our web-chat service during office hours (09:00 am - 06:00 pm). Please note that payment for these additional products needs to be completed before the cut-off time.",
        },
      ],
      accountReferral: [
        {
          aR_id: 1,
          title: "What is Jou Sun’s referral program?",
          content:
            "Invite friends to join Jou Sun and earn stamps. You can earn up to $90 credits for every friend who signs up or places an order. Every 3 stamps you’ve collected and they will automatically become referral credits. Then you are free to apply them in the checkout page. ",
        },
        {
          aR_id: 2,
          title: "Forget my password !",
          content:
            "Enter your email address on our Reset Password page and you’ll receive an email to reset your password.",
        },
        {
          aR_id: 3,
          title: "How do I change and check my account details ?",
          content:
            "By logging in to your account using your email address and password, you will be able to access your account details. You will also have the option to modify your delivery addresses stored against your account but unfortunately, we aren't able to change the delivery address on an active order, so please ensure you select the right details.",
        },
      ],
      shoppingAssis: [
        {
          sA_id: 1,
          title: "How are products priced on MealKit ?",
          content:
            "When shopping in MealKit, you are buying directly from approved Merchants on our platform. Product pricing, inventory, description and even packaging are determined by individual merchants. If you have any questions, feel free to contact MealKit via email or web-chat service, and we will direct your questions to the merchants for follow up.",
        },
        {
          sA_id: 2,
          title: "How can I save my shopping cart?",
          content:
            "MealKit is designed for on-the-go customers who shop on multiple devices, so any item you add to your shopping is automatically saved as long as you are logged into your profile. To pull up your shopping cart from another device, simply “log in” before resuming shopping.",
        },
        {
          sA_id: 3,
          title: "When is the cut-off time for delivery?",
          content:
            "Signature delivery: The cut-off time for next day delivery is 08:00 pm. Green delivery: The cut-off time for the day after tomorrow delivery is 08:00 pm.",
        },
        {
          sA_id: 4,
          title: "I want to give my friend a surprise present!",
          content:
            "We can do that for you! Before checking out, there will be a “Is this a gift?” section. You can enter the address of the recipient and leave your blessings. Rest assured that the receipt will not be included in the delivery.",
        },
        {
          sA_id: 5,
          title:
            "The item I put in my shopping basket recently are now sold out - what happened ?",
          content:
            "MealKit works hard to limit out-of-stock situations as much as possible, but shipment delays and shift in harvest seasons contribute to stock level fluctuations. In the occasion where MealKit receives an out-of-stock notification for merchandise that customers have ordered, we will send you an email detailing the out of stock items and fully refund the purchase price to you as soon as possible, and within 2 business days. The rest of your order will still be delivered on time according to their your originally chosen schedule.",
        },
        {
          sA_id: 6,
          title: "Having a problem with your order?",
          content:
            "When you receive your order, please check the contents immediately and let us know of any problems. If there are damages with your grocery, please take a picture and send it to us at mealkit@gmail.com or contact us via web-chat service. With missing items, please let us know the day you receive your order. * The earlier you let us know, the faster and easier we can identify the problem and communicate with the responsible parties. * We can only refund orders that have been disputed on the day of delivery.",
        },
      ],
      paymentRefund: [
        {
          pR_id: 1,
          title: "What payment methods do you accept?",
          content: "We can accept the following cards online: CreditCard ",
        },
        {
          pR_id: 2,
          title: "How to check out?",
          content:
            "After you have completed your shopping, you can click the button “shopping cart” at the top right-hand corner to proceed to the payment section. Select the “delivery method”. Select “attended” or “doorstep”. Enter your address. Then, please select the delivery date and time slot. If you need any special requirements or blessing words, please select the suitable option at the bottom of the payment page. After confirming the order, you will receive a confirmation email from us. We will start preparing your order!",
        },
        {
          pR_id: 3,
          title: "Is my credit card information safe?",
          content:
            "Your credit card information is secured by Stripe - a technology company that builds economic infrastructure for the internet. All card numbers are encrypted on disk with AES-256 and stored on separate machines.",
        },
        {
          pR_id: 4,
          title: "How to use Promotion Code?",
          content:
            "Please enter the coupon code at the 'Coupon' box in your Shopping Cart or during Checkout. If you are not able to use the coupon, it may be due to several reasons; Your coupon code was used at the same address or it has expired. If you have any questions, please email us at mealkit@gmail.com or contact us on web-chat service.",
        },
        {
          pR_id: 5,
          title: "Why isn’t my voucher code working?",
          content:
            "There may be several reasons why the promo code doesn't work:The promo code has been used by the same account. The promo code has been expired.If you need help, please contact us at mealkit@gmail.com or through web-chat service within office hours.",
        },
        {
          pR_id: 6,
          title: "Has my order been successful?",
          content:
            "Once your order's gone through, you should receive an email with an order number. If you don't receive an email, double check that you've spelt your email address correctly. Or, go check the junk mail box. If you've checked and you're still unsure, send us an email via meakit@gmail.con within office hours.",
        },
        {
          pR_id: 7,
          title: "What is your order cancellation policy?",
          content:
            "If you need to change or cancel your order, please contact us at mealkit@gmail.com or web-chat service as soon as possible. We allow cancellations as long as merchants have not processed your order, and will refund your order payment minus a 5% handling charge.",
        },
        {
          pR_id: 8,
          title: "When will I receive my refund?",
          content:
            "If any items that you have ordered is out-of-stock, we will email you with a notification that will give you two refund options (“MealKit credit” or original form of payment). If we do not hear from you by the next morning, we will automatically refund you via your original form of payment. Refunds typically take between 3 to 5 business days to process, depending on your bank or credit card company. If you don't see the refund reflect within that time frame, please contact your financial institution directly regarding their policies on refunds as in some cases, it may take up to 2-3 weeks.",
        },
      ],
      aboutDelivery: [
        {
          aD_id: 1,
          title: "How does the delivery work?",
          content:
            "Signature delivery: Your order is placed directly to food producers. Every morning, farmers and importers freshly harvest and prepare your order for delivery that afternoon.",
        },
        {
          aD_id: 2,
          title: "What are your delivery charges?",
          content:
            "Delivery charges are HKD 60. Standard Delivery: Purchase over HKD 400 for free delivery. ",
        },
        {
          aD_id: 3,
          title: "What if I have a special delivery request?",
          content:
            "You can specify your special requirements at the last step of the Checkout page. Under “Special Attended Delivery Arrangement(s)”, please select the corresponding option(s).",
        },
        {
          aD_id: 4,
          title:
            "What if I want to add special delivery requests after the payment is made?",
          content:
            "To leave detailed instructions about how to access your address or the name of your doorman whom we should leave your delivery with: 1.Go to jousun.com and make sure that you are logged in 2.At the top right of the page, click Profile 3.Click Address 4.Find the address you want to add instructions to and click Edit 5.Enter your notes in the Delivery Instructions box and click Confirm",
        },
        {
          aD_id: 5,
          title: "What if I'm not home to receive my order?",
          content:
            "Signature delivery: Our doorstep delivery is specially designed for you! Choose this delivery option to authorize us to leave your order with a doorman or front desk person or even at your front door. If you selected the “attended” delivery type, please notify the doorman of your mansion to ensure that we can deliver the order at your door.",
        },
        {
          aD_id: 6,
          title: "Can I change the delivery day or time?",
          content:
            "We are happy to help! Please contact our staff via email mealkit@gmail.com or web-chat within our office hours. You can modify the delivery date and time before the delivery date. While we work closely with the drivers to accommodate customer needs within delivery windows, we can not guarantee a successful modification as the drivers are unable to satisfy more specific requests as they usually run on a tight delivery schedule",
        },
      ],
    };
  }
  render() {
    const FrequentlyAskQs = this.state.frequentlyAskQs.map((item, index) => (
      <HelpCenter_btn key={item.id} title={item.title} content={item.content} />
    ));
    const accountReferral = this.state.accountReferral.map((item, index) => (
      <HelpCenter_btn
        key={item.aR_id}
        title={item.title}
        content={item.content}
      />
    ));
    const shoppingAssis = this.state.accountReferral.map((item, index) => (
      <HelpCenter_btn
        key={item.sA_id}
        title={item.title}
        content={item.content}
      />
    ));
    const paymentRefund = this.state.paymentRefund.map((item, index) => (
      <HelpCenter_btn
        key={item.pR_id}
        title={item.title}
        content={item.content}
      />
    ));
    const aboutDelivery = this.state.aboutDelivery.map((item, index) => (
      <HelpCenter_btn
        key={item.aD_id}
        title={item.title}
        content={item.content}
      />
    ));
    return (
      <div className="innerContent__outta">
        <div className="help_title">
          <h1>Help Center</h1>
        </div>
        <div>
          <div className="qa_div">
            <h2>frequently asked questions</h2>
            {FrequentlyAskQs}
          </div>
          <div className="qa_div">
            <h2>ACCOUNT &amp; REFERRALS</h2>
            {accountReferral}
          </div>
          <div className="qa_div">
            <h2>SHOPPING ASSISTANCE</h2>
            {shoppingAssis}
          </div>
          <div className="qa_div">
            <h2>PAYMENT &amp; REFUND</h2>
            {paymentRefund}
          </div>
          <div className="qa_div">
            <h2>About Delivery</h2>
            {aboutDelivery}
          </div>
        </div>
      </div>
    );
  }
}

export default class {
    constructor (cart = { cartItems: [] }, 
      planList = { bulkQty: [], bulkAmount: [], bulkCeiling: [] } , 
      coupon = undefined, 
      country = "HK") 
      {
        const { cartItems } = cart;
        const { bulkQty, bulkAmount, bulkCeiling } = planList;
        const itemsQty = cartItems.reduce((a, c) => a + Number(c.qty), 0);
        const originalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
        let priceStack = [];
        let excludedStack = [];
        for (let i = 0; i < bulkQty.length; i++) {
          priceStack.push([]);
          excludedStack.push([]);
          for (let j = 0; j < cartItems.length; j++) {
            for (let k = 0; k < cartItems[j].qty; k++) {
              if (cartItems[j].price <= bulkCeiling[i]) {
                priceStack[i].push(cartItems[j].price);
              } else {
                excludedStack[i].push(cartItems[j].price);
              }
            }
          }
        }
        for (let i = 0; i < bulkQty.length; i++) {
          priceStack[i].sort((a, b) => b - a);
          excludedStack[i].sort((a, b) => b - a);
        }
        const bulkPrice = bulkQty
          .map(
            (x, i) =>
              bulkAmount[i] * Math.floor(priceStack[i].length / bulkQty[i]) +
              priceStack[i]
                .slice(0, priceStack[i].length % bulkQty[i])
                .reduce((a, c) => a + c, 0) +
              excludedStack[i].reduce((a, c) => a + c, 0)
          )
          .sort((a, b) => a - b);
        const itemsPrice =
          bulkPrice[0] && bulkPrice[0] < originalPrice ? bulkPrice[0] : originalPrice;
        const shippingPrice = (country !== "HK") && (country !== "KLN") ? 80 : 0;
        // const shippingPrice = itemsPrice >= 500 ? 0 : itemsPrice >= 200 ? 20 : 60;
        // const taxPrice = 0.15 * itemsPrice;
        // const totalPrice = itemsPrice + shippingPrice + taxPrice;
        const fullPrice = itemsPrice + shippingPrice;
        const redemptionPrice = coupon
          ? coupon.valid
            ? coupon.balance
              ? coupon.balance > fullPrice
                ? fullPrice
                : coupon.balance
              : coupon.amount_off
              ? coupon.amount_off > fullPrice
                ? fullPrice
                : coupon.amount_off
              : coupon.percent_off
              ? Math.round((fullPrice * coupon.percent_off) / 100)
              : coupon.unit_type
              ? shippingPrice
              : 0
            : 0
          : 0;
        const totalPrice = itemsPrice + shippingPrice - redemptionPrice;
        
        this.itemsQty = itemsQty;
        this.originalPrice = originalPrice;
        this.bulkPrice = bulkPrice;
        this.itemsPrice = itemsPrice;
        this.shippingPrice = shippingPrice;
        this.fullPrice = fullPrice;
        this.redemptionPrice = redemptionPrice;
        this.totalPrice = totalPrice;
    };
};
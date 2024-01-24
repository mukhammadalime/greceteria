const items = ["Product", "Price", "Quantity", "Subtotal"];

const CartHeader = () => {
  return (
    <div className="wishlist__head cart__head">
      {items.map((item, i) => (
        <div className="head-title" key={i}>
          <h5>{item}</h5>
        </div>
      ))}
    </div>
  );
};

export default CartHeader;

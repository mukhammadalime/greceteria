const items = ["Product", "Price", "Quantity", "Subtotal", "Remove"];

const CartHeader = () => {
  return (
    <div className="cart__head">
      {items.map((item) => (
        <div className="cart__head--textbox" key={item}>
          <h5>{item}</h5>
        </div>
      ))}
    </div>
  );
};

export default CartHeader;

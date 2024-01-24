const CartItem = () => {
  return (
    <div className="cart-modal__item">
      <div className="cart-modal__item--main">
        <img src="/assets/images/products/almond-1.jpeg" alt="" />
        <div className="cart-modal__item--info">
          <span className="cart-modal__item--name">Almond California</span>
          <p>2 x $10.00</p>
          <h5>Total: $20.00</h5>
        </div>
      </div>
      <div className="delete-item">
        <img src="/assets/icons/delete-icon.svg" alt="" />
      </div>
    </div>
  );
};

export default CartItem;

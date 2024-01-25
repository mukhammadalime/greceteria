const OrderedItemsTable = () => {
  return (
    <div className="table">
      <div className="table__header">
        <h4>Product</h4>
        <h4>Price</h4>
        <h4>Quantity</h4>
        <h4>Subtotal</h4>
      </div>
      <div className="table__item">
        <div className="table__item--img">
          <img src="/assets/images/products/almond-1.jpeg" alt="" />
          <h5>Almond</h5>
        </div>
        <p>$14.00</p>
        <p>x5</p>
        <p>$70.00</p>
      </div>
      <div className="table__item">
        <div className="table__item--img">
          <img src="/assets/images/products/almond-1.jpeg" alt="" />
          <h5>Almond</h5>
        </div>
        <p>$14.00</p>
        <p>x5</p>
        <p>$70.00</p>
      </div>
    </div>
  );
};

export default OrderedItemsTable;

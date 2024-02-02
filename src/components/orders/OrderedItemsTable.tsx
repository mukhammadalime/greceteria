const OrderedItemsTable = () => {
  return (
    <div className="order-details__table">
      <table>
        <thead>
          <tr className="table__header">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table__item">
            <td className="table__item--img">
              <img src="/assets/images/products/almond-1.jpeg" alt="" />
              <h5>Beef California</h5>
            </td>
            <td>$14.00</td>
            <td>x5</td>
            <td>$70.00</td>
          </tr>
          <tr className="table__item">
            <td className="table__item--img">
              <img src="/assets/images/products/almond-1.jpeg" alt="" />
              <h5>Beef California</h5>
            </td>
            <td>$14.00</td>
            <td>x5</td>
            <td>$70.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderedItemsTable;

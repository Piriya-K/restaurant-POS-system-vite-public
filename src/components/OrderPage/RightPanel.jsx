import React from "react";

const RightPanel = React.forwardRef(({ itemlist, onQuantityClick }, ref) => {
  const setQuantity = (index, newQuantity) => {
    onQuantityClick(index, newQuantity);
  };

  const removeItemFromList = (index) => {
    onQuantityClick(index);
  };

  const sumValue = itemlist.reduce((value, item) => {
    return value + item.value;
  }, 0);

  return (
    <div className="rpanel-div1">
      <div className="rpanel-div2">
        <span>Total: ${sumValue.toFixed(2)}</span>
      </div>
      <div className="rpanel-div3">
        <p className="rpanel-p1">Item</p>
        <p>Quantity</p>
        <p className="rpanel-price">Price</p>
        <p>Value</p>
      </div>
      <div>
        <ul className="rpanel-ul1">
          {itemlist.map((item, index) =>
            item.quantity >= 1 ? (
              <li
                className="rpanel-li1"
                key={index}
              >
                <div className="rpanel-p1">{item.name}</div>
                <div className="rpanel-div4">
                  <button
                    className="rpanel-btn"
                    onClick={() => {
                      let newQuantity = item.quantity - 1;
                      if (newQuantity > 0) {
                        setQuantity(index, newQuantity);
                      } else removeItemFromList(index);
                    }}
                  >
                    -
                  </button>
                  <span className="rpanel-btn">{item.quantity}</span>
                  <button
                    className="rpanel-btn"
                    onClick={() => {
                      let newQuantity = item.quantity + 1;
                      if (newQuantity > 0) {
                        setQuantity(index, newQuantity);
                      } else removeItemFromList(index);
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="rpanel-price">${item.price}</div>
                <div>${item.value}</div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
});

export default RightPanel;

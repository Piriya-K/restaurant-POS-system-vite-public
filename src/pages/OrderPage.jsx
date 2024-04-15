import LeftPanel from "../components/OrderPage/LeftPanel";
import RightPanel from "../components/OrderPage/RightPanel";
import CenterPanel from "../components/OrderPage/CenterPanel";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ItemListPrinting from "../components/ItemListPrinting";

const OrderPage = ({ clickBack, table, tableItem }) => {
  //list of items that have been selected in CenterPanel.jsx
  const [itemlist, setItemList] = useState(table.itemlist);

  //The selected menu in LeftPanel.jsx to populate the item selections in CenterPanel.jsx
  const [selectedMenu, setSelectedMenu] = useState(null);

  //React-to-Print
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Table${table.tableNum}_OrderedItems-${Date()}}`,
    removeAfterPrint: true,
  });

  const handleItemClick = (item) => {
    setItemList([
      ...itemlist,
      {
        name: item.itemName,
        price: item.itemPrice,
        quantity: 1,
        value: item.itemPrice,
      },
    ]);
  };

  const handleMenuClick = (menuType) => {
    setSelectedMenu(menuType);
  };

  const handleQuantityClick = (index, newQuantity) => {
    const updatedItemList = [...itemlist];
    if (index >= 0 && index < updatedItemList.length && newQuantity >= 1) {
      updatedItemList[index].quantity = newQuantity;
      updatedItemList[index].value = newQuantity * updatedItemList[index].price;
      setItemList(updatedItemList);
    } else {
      setItemList((itemList) =>
        index >= 0 && index < itemList.length
          ? itemlist.filter((_, i) => i !== index)
          : itemList
      );
    }
  };

  const handleBackBtn = () => {
    clickBack();
  };

  const saveItemList = (itemlist, table) => {
    tableItem(itemlist, table);
    alert(`Order saved for table ${table.tableNum}. Table is occupied.`);
  };

  const handleCheckout = (itemlist, table) => {
    itemlist.splice(0, itemlist.length);
    setItemList(itemlist);
    tableItem(itemlist, table);
    alert(
      `Customer successfully checkout for table ${table.tableNum}. Table is available.`
    );
  };

  return (
    <>
      <div className="text-xs h-5/6">
        <div className="pt-4 pl-4">
          <span>{`TABLE: ${table.tableNum}`}</span>
          <button
            className="border border-blue-400 p-1 mx-1 mt-1 rounded-md"
            onClick={() => handleBackBtn()}
          >
            BACK
          </button>
          <button
            className="border border-green-300 p-1 mx-1 mt-1 rounded-md"
            onClick={() => saveItemList(itemlist, table)}
          >
            Save Order
          </button>
          <button
            className="border border-red-300 p-1 mx-1 mt-1 rounded-md"
            onClick={() => handlePrint(null, () => contentToPrint.current)}
          >
            Print to Kitchen
          </button>
          <button
            className="border border-yellow-300 p-1 mx-1 mt-1 rounded-md"
            onClick={() => handleCheckout(itemlist, table)}
          >
            Checkout
          </button>
        </div>
        <div className="grid grid-cols-3 flex-1 gap-8 p-5">
          <LeftPanel onCategoryClick={handleMenuClick} />
          <CenterPanel
            selectedMenu={selectedMenu}
            onItemClick={handleItemClick}
          />
          <RightPanel
            itemlist={itemlist}
            onQuantityClick={handleQuantityClick}
            saveItemList={saveItemList}
          />
          <div style={{ display: "none" }}>
            <ItemListPrinting
              ref={contentToPrint}
              itemlist={itemlist}
              table={table}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

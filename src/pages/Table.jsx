import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TableSection from "../components/TablePage/TableSection";
import OrderPage from "../pages/OrderPage";
import { Appcontext } from "../App";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const navigate = useNavigate();
  const [tableOpened, settableOpened] = useState(false);
  const [selectedTable, setSelectedTable] = useState({
    tableNum: null,
    itemlist: [],
  });
  const { table1, setTable1 } = useContext(Appcontext);
  const { table2, setTable2 } = useContext(Appcontext);
  const { userToken } = useContext(Appcontext);

  const clickTable = (clickedTable) => {
    settableOpened(!tableOpened);
    setSelectedTable(clickedTable == "T1" ? table1 : table2);
  };

  const clickBack = () => {
    settableOpened(!tableOpened);
  };

  const tableItem = (list, selectedTable) => {
    selectedTable.tableNum == 1
      ? setTable1({ ...table1, itemlist: list })
      : setTable2({ ...table2, itemlist: list });
  };

  useEffect(() => {
    userToken ? null : navigate(`/login`);
  }, []);

  return (
    <>
      <div className="h-screen">
        <NavBar />
        {tableOpened ? (
          <OrderPage
            clickBack={clickBack}
            table={selectedTable}
            tableItem={tableItem}
          />
        ) : (
          <TableSection
            table1={table1}
            table2={table2}
            clickTable={clickTable}
          />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Table;

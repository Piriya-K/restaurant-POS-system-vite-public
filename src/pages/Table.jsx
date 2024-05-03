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
  const { tables, setTables } = useContext(Appcontext);

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
      ? setTable1((prevTable1) => {
          const updatedTable1 = { ...prevTable1, itemlist: list };
          console.log(`table1 is ${updatedTable1}`);
          setTables((prevTables) => {
            const updatedTables = { ...prevTables, table1: updatedTable1 };
            console.log(`updatedTables is ${updatedTables}`);
            localStorage.setItem("tables", JSON.stringify(updatedTables));
            return updatedTables;
          });
          return updatedTable1;
        })
      : setTable2((prevTable2) => {
          const updatedTable2 = { ...prevTable2, itemlist: list };
          console.log(`table2 is ${updatedTable2}`);
          setTables((prevTables) => {
            const updatedTables = { ...prevTables, table2: updatedTable2 };
            console.log(`updatedTables is ${updatedTables}`);
            localStorage.setItem("tables", JSON.stringify(updatedTables));
            return updatedTables;
          });
          return updatedTable2;
        });

    console.log(
      `Inside local storage, tables is ${JSON.parse(localStorage.tables)}`
    );
  };

  useEffect(() => {
    userToken ? null : navigate(`/login`);
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-[76dvh] bg-slate-500">
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
      </div>
      <Footer />
    </>
  );
};

export default Table;

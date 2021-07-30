import React, { useEffect, useState } from "react";
import useHttp from "./hooks/useHttp";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import Section from "./components/Section/Section";
import classes from "./App.module.css";

export var ASCENDING = "asc";
const orderRadioOptions = [
  { value: "asc", label: "Earliest first" },
  { value: "desc", label: "Latest first" },
];
const formatDateTime = (input) => {
  const epoch = new Date(0);
  epoch.setSeconds(parseInt(input));
  let date = epoch.toISOString();
  date = date.replace("T", " ");
  return (
    date.split(".")[0].split(" ")[0] +
    " " +
    epoch.toLocaleTimeString().split(" ")[0]
  );
};

function App() {
  const [workOrders, setWorkOrders] = useState([]);
  const [workOrdersBySearch, setWorkOrdersBySearch] = useState([]);
  const [workerIdList, setWorkerIdList] = useState([]);
  const [workOrdersLoaded, setWorkOrdersLoaded] = useState(false);
  const [listOrder, setListOrder] = useState(ASCENDING);

  const { isLoading, error, sendRequest } = useHttp();

  const searchTermChangeHandler = (value) => {
    setWorkOrdersBySearch(
      workOrders.filter((x) =>
        x.workerName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const transformWorkOrders = ({ orders }) => {
      const workerIds = [];
      const loadedWorkOrders = orders.sort(
        (a, b) => parseInt(a.deadline) - parseInt(b.deadline)
      );
      loadedWorkOrders.forEach((order) => {
        order.deadline = formatDateTime(order.deadline);  
        !workerIds.includes(order.workerId) && workerIds.push(order.workerId);
      });
      setWorkerIdList(workerIds);
      setWorkOrders(loadedWorkOrders);
      setWorkOrdersLoaded(true);
    };

    sendRequest(
      { url: "https://api.hatchways.io/assessment/work_orders" },
      transformWorkOrders
    );
    return () => {
      setWorkOrdersLoaded(false);
    };
  }, [sendRequest]);

  useEffect(() => {
    const transformWorkerData = ({ worker }) => {
      const loadedWorkOrders = [...workOrders];
      loadedWorkOrders.forEach((order) => {
        if (order.workerId === worker.id) {
          order.companyName = worker.companyName;
          order.workerName = worker.name;
          order.email = worker.email;
          order.image = worker.image;
        }
      });

      setWorkOrders(loadedWorkOrders);
      setWorkOrdersBySearch(loadedWorkOrders);
    };

    if (workerIdList.length > 0 && workOrdersLoaded) {
      workerIdList.forEach((id) => {
        sendRequest(
          { url: "https://api.hatchways.io/assessment/workers/" + id },
          transformWorkerData
        );
      });
    }
  }, [workerIdList, workOrdersLoaded, sendRequest]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.body}>
      <Filter
        onSearchTermChange={searchTermChangeHandler}
        onOrderChange={(value) => setListOrder(value)}
        options={orderRadioOptions}
        value={listOrder}
      />
      {!isLoading && !error && workOrdersBySearch.length !== 0 && (
        <Table
          items={workOrdersBySearch}
          order={listOrder}
        />
      )}
      {error && (
        <Section>
          <h2>{error}</h2>
        </Section>
      )}
      {isLoading && (
        <Section>
          <h2>Loading work orders...</h2>
        </Section>
      )}
      {!isLoading && !error && workOrdersBySearch.length === 0 && (
        <Section>
          <h2>No work orders found.</h2>
        </Section>
      )}
    </div>
  );
}

export default App;

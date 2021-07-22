import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import Filter from "./components/Filter";
import Table from "./components/Table";
import Section from "./UI/Section";
import classes from "./App.module.css"

function App() {
  const [workOrders, setWorkOrders] = useState([]);
  const [workOrdersBySearch, setWorkOrdersBySearch] = useState([]);
  const [workerIdList, setWorkerIdList] = useState([]);
  const [workOrdersLoaded, setWorkOrdersLoaded] = useState(false);
  const [listOrder, setListOrder] = useState("asc");

  const { isLoading, error, sendRequest } = useHttp();

  const orderRadioOptions = [
    { value: "asc", label: "Earliest first" },
    { value: "dsc", label: "Latest first" },
  ];

  const listOrderChangeHandler = (value) => {
    setListOrder(value);
  };

  const searchTermChangeHandler = (value) => {
    const loadedWorkOrders = [...workOrders];
    function filterByWorkerName(item) {
      if (item.workerName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      return false;
    }

    if (value !== "") {
      setWorkOrdersBySearch(loadedWorkOrders.filter(filterByWorkerName));
    } else {
      setWorkOrdersBySearch(loadedWorkOrders);
    }
  };

  useEffect(() => {
    const transformWorkOrders = ({ orders }) => {
      const loadedWorkOrders = [];
      const workerIds = [];

      for (const item in orders) {
        const utcSeconds = orders[item].deadline;
        const deadline = new Date(0);
        deadline.setUTCSeconds(utcSeconds);
        const deadlineString = deadline.toLocaleString();

        loadedWorkOrders.push({
          id: orders[item].id,
          name: orders[item].name,
          description: orders[item].description,
          deadline: deadlineString,
          workerId: orders[item].workerId,
        });

        if (!workerIds.includes(orders[item].workerId)) {
          workerIds.push(orders[item].workerId);
        }
      }

      loadedWorkOrders.sort(
        (a, b) => parseInt(a.deadline) - parseInt(b.deadline)
      );

      setWorkerIdList(workerIds);
      setWorkOrders(loadedWorkOrders);
      setWorkOrdersLoaded(true);
    };

    sendRequest(
      { url: "https://api.hatchways.io/assessment/work_orders" },
      transformWorkOrders
    );
  }, [sendRequest]);

  useEffect(() => {
    const transformWorkerData = ({ worker }) => {
      const loadedWorkOrders = [...workOrders];

      for (const item in loadedWorkOrders) {
        if (loadedWorkOrders[item].workerId === worker.id) {
          loadedWorkOrders[item].companyName = worker.companyName;
          loadedWorkOrders[item].workerName = worker.name;
          loadedWorkOrders[item].email = worker.email;
          loadedWorkOrders[item].image = worker.image;
        }
      }
      setWorkOrders(loadedWorkOrders);
      setWorkOrdersBySearch(loadedWorkOrders);
    };
    if (workerIdList.length > 0) {
      workerIdList.forEach((id) => {
        sendRequest(
          { url: "https://api.hatchways.io/assessment/workers/" + id },
          transformWorkerData
        );
      });
    }
  }, [workOrdersLoaded, sendRequest]);

  return (
    <div className={classes.body}>
      <Filter
        onSearchTermChange={searchTermChangeHandler}
        onOrderChange={listOrderChangeHandler}
        options={orderRadioOptions}
      />
      {!isLoading && !error && (
        <Table
          items={workOrdersBySearch}
          order={listOrder}
          loading={isLoading}
          error={error}
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
      )}{" "}
    </div>
  );
}

export default App;

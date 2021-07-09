import React, { useEffect, useState } from "react";
import List from "./components/List";

import useHttp from "./hooks/use-http";

function App() {
  const [workOrders, setWorkOrders] = useState([]);
  const [workerIdList, setWorkerIdList] = useState([]);
  const [workOrdersLoaded, setWorkOrdersLoaded] = useState([]);

  const { isLoading, error, sendRequest: fetchWorkOrders } = useHttp();

  console.log("App Running");

  useEffect(() => {
    const transformWorkOrders = ({ orders }) => {
      const loadedWorkOrders = [];
      const workOrdersWithWorkers = [];
      const workerIds = [];
      const workOrdersLoaded = false;

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
          companyName: "",
          workerName: "",
          email: "",
          image: "",
        });

        if (!workerIds.includes(orders[item].workerId)) {
          workerIds.push(orders[item].workerId);
        }
      }
      console.log(workerIds + 'work order Ids from first effect');
      setWorkerIdList(workerIds);
      setWorkOrders(loadedWorkOrders);
      setWorkOrdersLoaded(true);

    };

    fetchWorkOrders(
      { url: "https://api.hatchways.io/assessment/work_orders" },
      transformWorkOrders
    );
  }, [fetchWorkOrders]);

  useEffect(() => {
    console.log("useEffect 2 running");
    if (workOrders.length === 0) {
      console.log("nothing to process");
    }
    const transformWorkerData = ({ worker }) => {
      const loadedWorkOrders = [...workOrders];
      console.log(worker);
      for (const item in loadedWorkOrders) {
        console.log(loadedWorkOrders[item].workerId + "and" + worker.id);
        if (loadedWorkOrders[item].workerId === worker.id) {
          console.log("found match");
          loadedWorkOrders[item].companyName = worker.companyName;
          loadedWorkOrders[item].name = worker.name;
          loadedWorkOrders[item].email = worker.email;
          loadedWorkOrders[item].image= worker.image;
        }
      }
      // loadedWorkOrders.forEach((workOrder) => {

      //   if (loadedWorkOrders[workOrder].workerId === workerData.id) {
      //     console.log('found pair');
      //     loadedWorkOrders[workOrder].companyName = workerData.companyName;
      //   }
      // });
      setWorkOrders(loadedWorkOrders);
      if(workOrders[1].companyName === '') { console.log('set work orders from effect 2')}
    };
    if (workerIdList.length > 0) {
      workerIdList.forEach((id) => {
        console.log(id);
        fetchWorkOrders(
          { url: "https://api.hatchways.io/assessment/workers/" + id },
          transformWorkerData
        );
      });
    }
  }, [workOrdersLoaded, fetchWorkOrders]);

  return (
    <React.Fragment>
      <List
        items={workOrders}
        loading={isLoading}
        error={error}
        onFetch={fetchWorkOrders}
      />
    </React.Fragment>
  );
}

export default App;

import React from "react";
import WorkOrderDetails from "../WorkOrderDetails/WorkOrderDetails";
import classes from "./Table.module.css";

const Table = (props) => {
  let { order, items } = props;

  let workOrders = order === "asc" ? items : items.slice(0).reverse();
  
  return (
    <React.Fragment>
      <div className={classes.container}>
        <table className={classes["custom-responsive"]}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Deadline</th>
              <th scope="col">Description</th>
              <th scope="col">Submitted by</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((workOrder) => (
              <WorkOrderDetails
                key={workOrder.id}
                details={workOrder}
              ></WorkOrderDetails>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;

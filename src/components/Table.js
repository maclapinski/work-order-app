import React from "react";
import Section from "../UI/Section";
import WorkOrderDetails from "./WorkOrderDetails";
import classes from "./Table.module.css";
import { Responsive } from "./Responsive";

const Table = (props) => {
  let workOrderList = "";
  if (props.items.length > 0) {
    if (props.order === "asc") {
      workOrderList = (
        <tbody className={classes.tbody}>
          {props.items.map((workOrder) => (
            <WorkOrderDetails
              key={workOrder.id}
              details={workOrder}
            ></WorkOrderDetails>
          ))}
        </tbody>
      );
    } else {
      workOrderList = (
        <tbody className={classes.tbody}>
          {props.items
            .slice(0)
            .reverse()
            .map((workOrder) => (
              <WorkOrderDetails
                key={workOrder.id}
                details={workOrder}
              ></WorkOrderDetails>
            ))}
        </tbody>
      );
    }
  }
  let content = workOrderList;
  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }
  return (
    <React.Fragment>
      <div className={classes.container}>
        <table>
          <Responsive displayIn={["Laptop", "IPadPro"]}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Deadline</th>
                <th scope="col">Description</th>
                <th scope="col">Submitted by</th>
              </tr>
            </thead>
          </Responsive>
          {content}
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;

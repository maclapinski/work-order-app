import Section from "../UI/Section";
import WorkOrderDetails from "./WorkOrderDetails";
import classes from "./List.module.css";

const List = (props) => {
  let workOrderList = <h2>No work orders found.</h2>;
  if (props.items.length > 0) {
    workOrderList = (
      <ul>
        {props.items.map((workOrder) => (
          <WorkOrderDetails
            key={workOrder.id}
            details={workOrder}
          ></WorkOrderDetails>
        ))}
      </ul>
    );
  }

  let content = workOrderList;
//  console.log(props.error)
//   if (props.error) {
//     content = <button onClick={props.onFetch}>Try again</button>;
//   }

  if (props.loading) {
    content = "Loading tasks...";
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default List;

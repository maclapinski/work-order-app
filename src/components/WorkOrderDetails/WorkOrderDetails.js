import classes from "./WorkOrderDetails.module.css";

const WorkOrderDetails = ({ details }) => {
  return (
    <tr>
      <td className={classes.fixed}>
        <span className={classes["table-mobile"]}>ID</span>
        {details.name}
      </td>
      <td className={classes.fixed}>
        <span className={classes["table-mobile"]}>Deadline</span>
        {details.deadline}
      </td>
      <td>
        <span className={classes["table-mobile"]}>Description</span>
        {details.description}
      </td>
      <td>
        <span className={classes["table-mobile"]}>Submitted by</span>
        <div className={classes["worker-details"]}>
          <img alt={details.workerName + " image"} src={details.image}></img>
          <ul>
            <li>{details.workerName}</li>
            <li>{details.companyName}</li>
            <li>{details.email}</li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default WorkOrderDetails;

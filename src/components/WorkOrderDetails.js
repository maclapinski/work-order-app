import classes from "./WorkOrderDetails.module.css";

const TaskItem = ({ details }) => {
  return (
    <li className={classes.task}>
      <h1>{details.name}</h1>
      <p>Details: {details.description}</p>
      <p>Deadline: {details.deadline}</p>
      <p>Worker ID: {details.workerId}</p>
      <p>Name: {details.name}</p>
      <p>Company: {details.companyName}</p>
      <p>Email: {details.email}</p>
      <img style={{width:'50px'}} src={details.image}></img>
    </li>
  );
};

export default TaskItem;

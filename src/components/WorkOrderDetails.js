import { Fragment } from "react";
import classes from "./WorkOrderDetails.module.css";
import Section from "../UI/Section";
import { Responsive } from "./Responsive";

const WorkOrderDetails = ({ details }) => {
  return (
    <Fragment>
      <Responsive displayIn={["Laptop", "IPadPro"]}>
        {" "}
        <tr>
          <th className={classes.fixed} scope="row">
            {details.name}
          </th>
          <td className={classes.fixed}>{details.deadline}</td>
          <td>{details.description}</td>
          <td className={classes["worker-details"]}>
            <img src={details.image}></img>
            <ul>
              <li>{details.workerName}</li>
              <li>{details.companyName}</li>
              <li>{details.email}</li>
            </ul>
          </td>
        </tr>
      </Responsive>
      <Responsive displayIn={["mobile", "Tablet"]}>
        <Section>
          <tr>
            <th>ID</th>
            <th colspan="2">Deadline</th>
          </tr>
          <td className={classes.fixed} scope="row">
            {details.name}
          </td>
          <td className={classes.fixed}>{details.deadline}</td> <tr></tr>
          <tr>
            <th colspan="2">Description</th>
          </tr>
          <tr>
            <td colspan="2">{details.description}</td>
          </tr>
          <tr>
            <th colspan="2">Submited by</th>
          </tr>
          
          <div colspan="2" className={classes["worker-details"]}>
            <img src={details.image}></img>
            <ul>
              <li>{details.workerName}</li>
              <li>{details.companyName}</li>
              <li>{details.email}</li>
            </ul>
          </div>
        </Section>

        {/* <tr></tr>
        <tr>
         
        </tr>
        <tr>
         
        </tr>
         */}
      </Responsive>
    </Fragment>
  );
};

export default WorkOrderDetails;

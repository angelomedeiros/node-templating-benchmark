import { Context } from "koa";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { employees } from "../data/employees";

const renderEmployee = (employee) => (
  <tr key={employee.uuid}>
    <td>{employee.uuid}</td>
    <td>{employee.name}</td>
    <td>{employee.address}</td>
    <td>{employee.age}</td>
  </tr>
);

const Employees = ({ employees }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>UUID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Age</th>
        </tr>
        {employees.map(renderEmployee)}
      </tbody>
    </table>
  </div>
);

export default async (context: Context) => {
  if (typeof context.request.query.stream == "undefined") {
    context.body = ReactDOMServer.renderToStaticMarkup(<Employees employees={employees} />);
  } else {
    context.set('content-type','text/html');
    context.body = ReactDOMServer.renderToStaticNodeStream(<Employees employees={employees} />);
  }
};

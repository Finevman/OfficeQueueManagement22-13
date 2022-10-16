import { Table } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Admin(props) {
  return (
    <>
      <div style={{ fontSize: 45, width: "100%" }}>Admin Page</div>
      <UserList users={props.users} changeRole={props.changeRole} />
    </>
  );
}

function UserList(props) {  // list of user take by props
  return (
    <>
      <div style={{ fontSize: 35, width: "100%" }}>All Users</div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>Actual Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.map((u) =>
            (
              <UserRow
                user={u}
                key={u.code}
                changeRole={props.changeRole}
              />
            ))
          }
        </tbody>
      </Table> </>
  );
}

function UserRow(props) {
  return (
    <>
      <tr>
        <UserActions user={props.user} changeRole={props.changeRole} />
        <UserData user={props.user} />
      </tr>
    </>
  );
}

function UserData(props) {
  return (
    <>
      <td className={"col-3"}>
        {props.user.name}
      </td>
      <td className="col-3">
        {props.user.lastname}
      </td>
      <td className={"col-3"}>
        {props.user.role}
      </td>
    </>
  );
}

function UserActions(props) {
  const [role, setRole] = useState(props.user.role);
  return (
    <td className="col-3">
      <DropdownButton id="dropdown-basic-button" title="Change Role" onSelect={ev => setRole(ev)}>
        <Dropdown.Item eventKey="option-1">Officer</Dropdown.Item>
        <Dropdown.Item eventKey="option-2">Manager</Dropdown.Item>
      </DropdownButton>
    </td>
  );
}

export { Admin };

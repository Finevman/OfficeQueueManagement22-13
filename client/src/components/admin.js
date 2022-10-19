import { Table } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import newUserForm from './newUserForm';

function Admin(props) {
  return (
    <>
      <div style={{ fontSize: 45, width: "100%" }}>Admin Page</div>
      <UserList users={props.users} changeRole={props.changeRole} addUser={props.addUser} deleteUser={props.deleteUser} />
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
                deleteUser={props.deleteUser}
              />
            ))
          }
        </tbody>
      </Table>
      <newUserForm addUser={props.addUser}/> </>
  );
}

function UserRow(props) {
  return (
    <>
      <tr>
        <UserActions user={props.user} changeRole={props.changeRole} deleteUser={props.deleteUser} />
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
    <>
      <td className="col-2">
        <DropdownButton id="dropdown-basic-button" title="Change Role" onSelect={ev => setRole(ev)}>
          <Dropdown.Item eventKey="option-1">Officer</Dropdown.Item>
          <Dropdown.Item eventKey="option-2">Manager</Dropdown.Item>
        </DropdownButton>
      </td>
      <td className="col-1">
        <DeleteIcon onDelete={() => props.deleteUser(props.user)} />
      </td>
    </>
  );
}

const OPACITY_WHEN_MOUSE_INTERACT = 0.6;
const NORMAL_OPACITY = 0.85;

const DeleteIcon = (props) => {
  /*const [opacity, setOpacity] = useState(NORMAL_OPACITY);
  return (
    /*<Trash3
      fontSize={17}
      style={{ marginBottom: 2 }}
      onClick={props.onDelete}
      opacity={opacity}
      onMouseOver={() => setOpacity(OPACITY_WHEN_MOUSE_INTERACT)}
      onMouseLeave={() => setOpacity(NORMAL_OPACITY)}
      onMouseDown={() => setOpacity(1)}
      onMouseUp={() => setOpacity(OPACITY_WHEN_MOUSE_INTERACT)}
    />
  );*/
};

export { Admin };

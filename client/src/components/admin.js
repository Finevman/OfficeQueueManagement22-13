import { Table, Collapse } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import API from "../API";
import { Trash3, PlusCircleFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";

function Admin() {
  const [users, setUsers] = useState([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    API.getAllUsers()
      .then((users) => {
        setUsers(users);
        setDirty(false);
      }).catch(err => handleError(err));
  }, [dirty]);

  function handleError(err) {
    toast.error(
      err.error,
      { position: "top-center" },
      { toastId: 12 }
    );
  }

  async function addUser(user) {
    try {
      await API.addUser(user);
      setUsers((oldUsers) => [...oldUsers, user]);
      setDirty(true);
      toast.success("User added", { position: "top-center" }, { toastId: 3 });
    } catch (err) { handleError(err) }
  }

  async function deleteUser(user) {
    try {
      await API.deleteUser(user);
      setUsers(users.filter((u) => u.id !== user.id));
      setDirty(true);
      toast.success("User deleted", { position: "top-center" }, { toastId: 3 });
    } catch (err) { handleError(err) }
  }

  async function changeRole(user, newRole) {
    let userToUpdate = users.find((u) => u.id === user.id);
    try {
      await API.updateUserRole(user, newRole);
      setUsers((users) =>
        users.map((u) =>
          u.id === userToUpdate.id
            ? Object.assign({}, userToUpdate)
            : u
        )
      );
      setDirty(true);
      toast.success(
        "User succesfully modified",
        { position: "top-center" },
        { toastId: 3 }
      );
    } catch (err) { handleError(err) }
  }

  return (
    <>
      <div style={{ fontSize: 45, width: "100%" }}>Admin Page</div>
      <UserList users={users} changeRole={changeRole} deleteUser={deleteUser} addUser={addUser} />
    </>
  );
}

function UserList(props) {  // list of user take by props
  const [showInfo, setShowInfo] = useState(false);
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
      <PlusCircleFill variant="info" /*fill={"#0d6efd"}*/ onClick={() => setShowInfo(!showInfo)}>Add New User</PlusCircleFill>
      <Collapse in={showInfo}>
        <newUserForm addUser={props.addUser} />
      </Collapse> </>
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
  return (
    <>
      <td className="col-2">
        <DropdownButton id="dropdown-basic-button" title="Change Role" onSelect={ev => props.changeRole(props.user, ev)}>
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
  const [opacity, setOpacity] = useState(NORMAL_OPACITY);
  return (
    <Trash3
      fontSize={17}
      style={{ marginBottom: 2 }}
      onClick={props.onDelete}
      opacity={opacity}
      onMouseOver={() => setOpacity(OPACITY_WHEN_MOUSE_INTERACT)}
      onMouseLeave={() => setOpacity(NORMAL_OPACITY)}
      onMouseDown={() => setOpacity(1)}
      onMouseUp={() => setOpacity(OPACITY_WHEN_MOUSE_INTERACT)}
    />
  );
};

export { Admin };

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  editPassword,
  getUsers,
  editUser,
} from "../actions/users.action";
import { selectUsers } from "../reducers/users.reducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserInfo, setEditedUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });
  const [editPasswordId, setEditPasswordId] = useState(null);
  const [editedPassword, setEditedPassword] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function handleDelete(id) {
    const formData = new FormData();
    formData.append("user_id", id);
    dispatch(deleteUser(formData));
  }

  function handleShowEditUser(id) {
    setEditUserId(id);
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
      setEditedUserInfo({
        firstname: selectedUser.firstname,
        lastname: selectedUser.lastname,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    }
  }

  function handleEditUser(id) {
    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("firstname", editedUserInfo["firstname"]);
    formData.append("lastname", editedUserInfo["lastname"]);
    formData.append("email", editedUserInfo["email"]);
    formData.append("role", editedUserInfo["role"]);
    dispatch(editUser(formData));
    setEditUserId(null);
    setEditedUserInfo({
      firstname: "",
      lastname: "",
      email: "",
      role: "",
    });
  }

  function handleChange(event, field) {
    setEditedUserInfo({
      ...editedUserInfo,
      [field]: event.target.value,
    });
  }

  function handleShowEditPass(id) {
    setEditPasswordId(id);
  }

  function handleEditPass(id) {
    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("password", editedPassword);
    dispatch(editPassword(formData));
    setEditPasswordId(null);
    setEditedPassword("");
  }

  return (
    <>
      <div className="container">
        <h2>Assmats</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#ID</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Edit</th>
              <th>Edit Password</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    {editUserId === item.id ? (
                      <input
                        type="text"
                        value={editedUserInfo.firstname}
                        onChange={(e) => handleChange(e, "firstname")}
                        placeholder={item.firstname}
                      />
                    ) : (
                      item.firstname
                    )}
                  </td>
                  <td>
                    {editUserId === item.id ? (
                      <input
                        type="text"
                        value={editedUserInfo.lastname}
                        onChange={(e) => handleChange(e, "lastname")}
                        placeholder={item.lastname}
                      />
                    ) : (
                      item.lastname
                    )}
                  </td>
                  <td>
                    {editUserId === item.id ? (
                      <input
                        type="text"
                        value={editedUserInfo.email}
                        onChange={(e) => handleChange(e, "email")}
                        placeholder={item.email}
                      />
                    ) : (
                      item.email
                    )}
                  </td>
                  <td>
                    {editUserId === item.id ? (
                      <select
                        value={editedUserInfo.role}
                        onChange={(e) => handleChange(e, "role")}
                      >
                        {[
                          "parent",
                          "assmat",
                          "creche_privee",
                          "creche_public",
                          "babysitting",
                          "admin",
                        ].map((role) => (
                          <option
                            key={role}
                            value={role}
                            selected={role === item.role}
                          >
                            {role}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item.role
                    )}
                  </td>
                  <td>
                    {editUserId === item.id ? (
                      <button onClick={() => handleEditUser(item.id)}>
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleShowEditUser(item.id)}>
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    {editPasswordId === item.id ? (
                      <div>
                        <input
                          type="text"
                          value={editedPassword}
                          onChange={(e) => setEditedPassword(e.target.value)}
                          placeholder="New Password"
                        />
                        <button onClick={() => handleEditPass(item.id)}>
                          Save
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleShowEditPass(item.id)}>
                        Edit
                      </button>
                    )}
                  </td>
                  <td onClick={() => handleDelete(item.id)}>Delete</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Users;

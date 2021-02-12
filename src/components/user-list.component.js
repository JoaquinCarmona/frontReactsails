import React, { useState, useEffect } from "react";
import userService from "../services/userService";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        userService.getAll()
            .then(response => {
                console.log(response.data);
                response.data.forEach(reg => {
                    reg.gender_id = reg.gender_id.name;
                });
                setUsers(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };




    const setActiveUser = (tutorial, index) => {
        setCurrentUser(tutorial);
        setCurrentIndex(index);
    };

    const deleteUser = id => {
        userService.remove(id)
            .then(() => {
                retrieveUsers();
            })
            .catch(e => {
                console.log(e);
            });
    };




    return (
        <div className="list row">

            <div className="col-md-6">
                <h4>Users List</h4>


                <table>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Password</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users &&
                    users.map((user, index) => (
                        <tr onClick={() => setActiveUser(user, index)}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.password}</td>
                            <td>{user.birthday}</td>
                            <td>{user.gender_id}</td>
                        </tr>
                    ))}


                    </tbody>
                </table>


            </div>
            <div className="col-md-6">
                {currentUser ? (
                    <div>
                        <h4>Usuario</h4>
                        <div>
                            <label>
                                <strong>First Name:</strong>
                            </label>{" "}
                            {currentUser.first_name}
                        </div>
                        <div>
                            <label>
                                <strong>Last Name:</strong>
                            </label>{" "}
                            {currentUser.last_name}
                        </div>
                        <div>
                            <label>
                                <strong>Birthday:</strong>
                            </label>{" "}
                            {currentUser.birthday}
                        </div>
                        <div>
                            <label>
                                <strong>Gender:</strong>
                            </label>{" "}
                            {currentUser.gender}
                        </div>

                        <div>

                            <Link to={`/editUser/${currentUser.id}`} className="btn btn-info">
                                Editar Usuario
                            </Link>

                        </div>

                        <div>

                            <button className="btn btn-danger"

                                    onClick={() => {if(window.confirm('Delete the item?')){deleteUser(currentUser.id)}}}
                            >
                                Delete User
                            </button>

                        </div>

                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;

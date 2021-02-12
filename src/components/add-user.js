import React, { useState, useEffect } from "react";
import userService from "../services/userService";
import GenderService from "../services/gender.service";

const AddUser = () => {

    const initialUserState = {

        first_name: "",
        last_name: "",
        birthday : "",
        password : "",
        gender_id : ""
    };
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        retrieveGenders();
    }, []);

    const retrieveGenders = () => {
        GenderService.getAll()
            .then(response => {
                console.log(response.data);
                setGenders(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };


    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        var data = {
            first_name : user.first_name,
            last_name : user.last_name,
            birthday : user.birthday,
            password : user.password,
            gender_id : user.gender_id
        };

        userService.create(data)
            .then(response => {
                setUser({
                    id: response.data.id,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    birthday: response.data.birthday,
                    password: response.data.password,
                    gender_id: response.data.gender_id,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };


    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            required
                            value={user.first_name}
                            onChange={handleInputChange}
                            name="first_name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            required
                            value={user.last_name}
                            onChange={handleInputChange}
                            name="last_name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={user.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Birthday</label>
                        <input
                            type="date"
                            className="form-control"
                            id="birthday"
                            required
                            value={user.birthday}
                            onChange={handleInputChange}
                            name="birthday"
                        />
                    </div>

                    <div className="form-group">

                        <div className="input-field col s12">
                            <select
                                id="gender_id"
                                value={user.gender_id}
                                onChange={handleInputChange}
                                name="gender_id"
                                className="browser-default"
                                required
                            >
                                <option value="" disabled selected>Gender</option>
                                {genders &&
                                genders.map((gender, index) => (
                                    <option value={gender.id}>{gender.name}</option>
                                ))}

                            </select>
                        </div>
                    </div>

                    <button onClick={saveUser} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddUser;

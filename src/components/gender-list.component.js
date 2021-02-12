import React, { useState, useEffect } from "react";
import GenderService from '../services/gender.service';
import { Link } from "react-router-dom";

const GenderList = () => {
    const [genders, setGenders] = useState([]);
    const [currentGender, setCurrentGender] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveGenders();
    }, []);

    const retrieveGenders = () => {
        GenderService.getAll()
            .then(response => {
                setGenders(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setActiveGender = (tutorial, index) => {
        setCurrentGender(tutorial);
        setCurrentIndex(index);
    };

    const editUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };


    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    aqui no
                </div>
            </div>
            <div className="col-md-6">
                <h4>Tutorials List</h4>

                <ul className="list-group">
                    {genders &&
                    genders.map((gender, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveGender(gender, index)}
                            key={index}
                        >
                            {gender.name}
                        </li>
                    ))}
                </ul>


            </div>
            <div className="col-md-6">
                {currentGender ? (
                    <div>
                        <h4>Gender</h4>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {currentGender.name}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentGender.name}
                        </div>
                        <div>
                            <label>
                                <button className="btn btn-success" onClick={editUser}>
                                    Editar
                                </button>
                            </label>{" "}
                            {currentGender.name}
                        </div>

                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenderList;

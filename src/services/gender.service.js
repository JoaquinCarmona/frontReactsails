import http from "../http-common";

const getAll = () => {
    return http.get("/genders");
};

export default {
    getAll
};

import axios from "axios";

const authAxios = axios.create ({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
});

const actions = {
    async registerUser(_, model)
    {
        const response = await authAxios.post("auth/register", model);
        return response;
    }
}
export default{
    actions
}
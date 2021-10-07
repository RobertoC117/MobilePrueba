import { createContext } from "react";

const authContext = createContext({
    auth: undefined,
    options: undefined,
    login: () => null,
    logout: () => null,
    configure: () => null,
})

export default authContext
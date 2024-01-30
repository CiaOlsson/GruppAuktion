import {createContext, useState, useContext} from 'react'

export const UserContext = createContext(null);
const UserContextProvider = ({children}) => {
    const [user, setUser] = useState("");

    //const {user} = useUserContext();
    //<button disabled={user.length === 0} /> 
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider")
    }
    return context;
}


export default UserContextProvider
import AuthContext from "./AuthContext";
import { useState } from "react";

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

  return (  <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
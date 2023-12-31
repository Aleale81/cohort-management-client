import React, { useState, useEffect } from "react";
import authService from "../services/auth.services";

const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  

  const storeToken = (token) => {      
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      authService.verify()  
      .then((response) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(response.data);  
      })
      .catch((error) => {        
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }
 

  const removeToken = () => { 
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }
 
 
  const logOutUser = () => {   
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  



  useEffect(() => {                                 
    authenticateUser();
  }, []);



  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };
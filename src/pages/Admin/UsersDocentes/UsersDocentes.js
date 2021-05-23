import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getUserDocentesActive } from "../../../api/user";
import ListUserDoc from "../../../components/Admin/Users/ListUserDocentes";
// import { notification } from "antd";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
// import Pagination from "../../../components/Pagination"
import "./UsersDocentes.scss";
// import {Pagination} from "antd"
 function Users(props) {
   const {location, history } = props
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const token = getAccessToken();
  const [reloadUsers, setReloadUsers] = useState(false);
 const {page = 1  } = queryString.parse(location.search)

 
  useEffect(() => {
    
    getUserDocentesActive(token, true,  page, 5)
      .then(response => {
       
        setUsersActive(response.user);
      
      });
      getUserDocentesActive(token, false,   page, 5)
      .then(response => {
        
        setUsersInactive(response.user);
        // setReloadUsers(false)
      });
      setReloadUsers(false)
  }, [page, token, reloadUsers]);
  
  return (
    <div className="users">
      <ListUserDoc
       location={location}
       history={history}
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
      
    
    </div>
  );
}

export default withRouter(Users)
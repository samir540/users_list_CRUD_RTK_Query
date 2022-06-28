import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers, deleteUser } from "../redux/usersSlice";
import { usersApi } from "../services/usersService";

import { Link, useParams } from "react-router-dom";
import "../styles/users.scss";
import { UserI } from "../modelTypesUser/model";

const Users = () => {

  const {data: users, isLoading, error} = usersApi.useFetchAllusersQuery(100);
  const [deleteUser]= usersApi.useDeleteUserMutation();
  // const dispatch = useAppDispatch();
  

  // const usersState = useAppSelector((state) => state.users);

  //   const [users, setUsers] = useState( usersState.users);

  // const localUsers = "users";
  // if (usersState.users.length > 0) {
  //   localStorage.setItem(localUsers, JSON.stringify(usersState.users));
  // }

  // useEffect(() => {
  //   dispatch(fetchUsers());
 
  // }, [dispatch]);

  // deleting
  const deleteHandler = (user:UserI) => {
    deleteUser(user);
   
  };
  return (
    <>
      {isLoading && <h3 style={{ fontWeight: 700 }}>Loading...</h3>}
      {error && <h3>Something went wrong!</h3>}
      <div className="users__page">
        {!isLoading  && users  && (
          <Link to="/new-user">
            <button>Create user</button>
          </Link>
        )}

        <div className="users">
          {users  &&
            users?.map((user) => (
              <div key={user.id}>
                <Link to={`users/${user.id}`}>
                  <div>
                    <div className="users__user">
                      <p className="name">
                        {" "}
                        <span>Name: </span> {user.first_name}
                      </p>
                      <p className="surname">
                        {" "}
                        <span>Surname: </span> {user.last_name}
                      </p>
                      <p className="birth-data">
                        <span>Birth_date: </span> {user.birth_date.toString()}
                      </p>
                      <p className="gender">
                        {" "}
                        <span>Gender: </span> {user.gender}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="delete" onClick={ ()=> deleteHandler(user)}>
                  Delete user
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Users;

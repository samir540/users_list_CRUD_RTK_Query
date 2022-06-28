import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/user.scss";
import { usersApi } from "../services/usersService";
import { UserI } from "../modelTypesUser/model";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import "../styles/form.scss";

const User = () => {
  const [update, setUpdate] = useState(false);
  const [deleteUser] = usersApi.useDeleteUserMutation();
  const [updateUser] = usersApi.useUpdateUserMutation();

  let { userId } = useParams<any>();
  const navigate = useNavigate();
  const {
    data: user,
    isFetching,
    isLoading,
    error,
  } = usersApi.useFetchUserQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [checkboxVal, setCheckboxVal] = useState(user?.is_active);
  const deleteHandler = (user: UserI) => {
    deleteUser(user);
    navigate("/");
  };
  const editHandler = (user: UserI) => {
    setUpdate(true);
  };
  //  submit update user form;
  const { register, handleSubmit, watch, reset, control } = useForm<UserI>();
  const val = watch("is_active");

  const onSubmit: SubmitHandler<UserI> = (data) => {
    data.id = user?.id;
 
    updateUser(data);
    navigate("/");
    console.log(data);
  };

  return (
    <div>
      {update && (
        <>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input
              className="fname"
              placeholder="First name"
              defaultValue={user?.first_name}
              {...register("first_name", { required: true, maxLength: 256 })}
            />
            <input
              defaultValue={user?.last_name}
              className="lname"
              placeholder="Last name"
              {...register("last_name", { required: true, maxLength: 256 })}
            />
            <input
              defaultValue={user?.birth_date.toString()}
              className="date"
              type="date"
              placeholder="date"
              {...register("birth_date", { required: true })}
            />

            <select {...register("gender")} defaultValue={user?.gender}>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
            <textarea
              defaultValue={user?.biography}
              placeholder="input biography"
              {...register("biography", { required: true, maxLength: 1024 })}
            />
            <input
              defaultValue={user?.job}
              className="job"
              placeholder="job"
              {...register("job", { required: true, maxLength: 256 })}
            />

            <input
              checked={user?.is_active}
              className="ckeckbox"
              type="checkbox"
              {...register("is_active", { required: true })}
            />
            {/* <input
              type="checkbox"
              checked={checkboxVal}
              onChange={(e) => setCheckboxVal(e.target.checked)}
            /> */}
            <input className="button" type="submit" />
          </form>
        </>
      )}
      {!update && (
        <>
          {isLoading && <h3>Loading...</h3>}
          {error && <h3>Something went wrong. Please, try again.</h3>}
          {user && (
            <div className="user__info">
              <div className="details" key={user.id}>
                <p className="name">
                  {" "}
                  <span>Name: </span> {user.first_name}
                </p>
                <p className="surname">
                  {" "}
                  <span>Surname: </span> {user.last_name}
                </p>
                <p className="surname">
                  {" "}
                  <span>Surname: </span> {user.birth_date.toString()}
                </p>
                <p className="gender">
                  {" "}
                  <span>Gender: </span> {user.gender}
                </p>
                <p className="biography">
                  {" "}
                  <span>Biography: </span> {user.biography}
                </p>

                <p className="job">
                  {" "}
                  <span>Job: </span> {user.job}
                </p>
                <p className="active">
                  <span>Activity status: </span>
                  <input type="checkbox" checked={user.is_active} />
                </p>
              </div>
              <div className="buttons">
                <div className="delete" onClick={() => deleteHandler(user)}>
                  Delete user
                </div>
                <div className="edit" onClick={() => editHandler(user)}>
                  Edit user
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default User;

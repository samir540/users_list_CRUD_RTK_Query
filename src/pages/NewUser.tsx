import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { UserI } from "../modelTypesUser/model";

import { usersApi } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import "../styles/form.scss";

const NewUser = () => {
  const [createUser] = usersApi.useCreateUserMutation();
  const { register, handleSubmit, reset } = useForm<UserI>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UserI> = async (data) => {

  data.id = Math.floor(1000 + Math.random() * 1000);
  createUser(data);
    reset();
    navigate("/");
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        className="fname"
        placeholder="First name"
       
        {...register("first_name", { required: true, maxLength: 256 })}
      />
      <input
        
        className="lname"
        placeholder="Last name"
        {...register("last_name", { required: true, maxLength: 256 })}
      />
      <input
        
        className="date"
        type="date"
        placeholder="date"
        {...register("birth_date", { required: true })}
      />

      <select {...register("gender")} >
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <textarea
       
        placeholder="input biography"
        {...register("biography", { required: true, maxLength: 1024 })}
      />
      <input
       
        className="job"
        placeholder="job"
        {...register("job", { required: true, maxLength: 256 })}
      />
      <input
        
        className="ckeckbox"
        type="checkbox"
        {...register("is_active", { required: true })}
      />
      <input className="button" type="submit" />
    </form>
  );
};

export default NewUser;

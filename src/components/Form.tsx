import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { UserI } from "../modelTypesUser/model";

import { usersApi } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import "../styles/form.scss";

interface Props {
  onUpdateSubmit: boolean;
  user: UserI | undefined;
  onUpdateUser: (a: UserI) => void;
}
const Form = ({ onUpdateSubmit, user, onUpdateUser }: Props) => {
  const [createUser] = usersApi.useCreateUserMutation();
  const { register, handleSubmit, reset } = useForm<UserI>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UserI> = async (data) => {
    

    if (onUpdateSubmit) {
      data.id = user?.id;
      await onUpdateUser(data);
    } else {
      data.id = Math.floor(1000 + Math.random() * 1000);
      createUser(data);
    }

   

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
      <input className="button" type="submit" />
    </form>
  );
};

export default Form;

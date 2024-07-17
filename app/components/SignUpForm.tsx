"use client";

import { useFormState } from "react-dom";
import { actionSignUp } from "@/app/actions/authActions";
import React from "react";

type Props = {};

const initialState = {
  message: "",
  errors: {},
};

const SignUpForm = (props: Props) => {
  const [state, formAction] = useFormState(actionSignUp, initialState);

  return (
    <div>
      {state.message && (
        <div className="notification p-2 mb-4">{state.message}</div>
      )}
      <form action={formAction} className="p-4 flex flex-col gap-y-2">
        <input name="name" type="text" placeholder="Full Name" required />
        {state.errors?.name && (
          <p className="text-red-500">{state.errors.name.join(", ")}</p>
        )}
        <input name="email" type="email" placeholder="Email" required />
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email.join(", ")}</p>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {state.errors?.password && (
          <p className="text-red-500">{state.errors.password.join(", ")}</p>
        )}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />
        {state.errors?.confirmPassword && (
          <p className="text-red-500">
            {state.errors.confirmPassword.join(", ")}
          </p>
        )}
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
        <button className="btn-primary" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

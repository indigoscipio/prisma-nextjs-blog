import React from "react";
import { actionSignIn } from "../actions/authActions";

type Props = {};

const SignInForm = (props: Props) => {
  return (
    <form action={actionSignIn} className="p-4 flex flex-col gap-y-2">
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;

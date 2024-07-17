"use server";

import { signIn } from "next-auth/react";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(3, { message: "Must be 3 characters or long..." }),
    email: z.string().email({ message: "Invalid email address..." }),
    password: z.string().min(3, { message: "must be 3 characters long..." }),
    confirmPassword: z.string().min(3),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const actionSignUp = async (prevState: any, formData: FormData) => {
  const validatedFields = schema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return {
      message: "Sign up successful!",
    };
  } catch (error) {
    return {
      message: error.message || "Failed to sign up. Please try again later.",
    };
  }
};

const actionSignIn = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await fetch("http://localhost:3000/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export { actionSignUp, actionSignIn };

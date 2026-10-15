import zod from "zod";
import { regex } from "../utils/regex";
import { getAge } from "../utils/helpers";

export const signUpSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .regex(regex.email, "Enter valid Email"),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        regex.password,
        "Your password must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters.",
      ),

    rePassword: zod.string().nonempty("Re-enter password is required"),

    dateOfBirth: zod
      .string()
      .nonempty("Date of birth is required")
      .refine((date) => getAge(date) >= 18, "Age must be at least 18"),

    gender: zod
      .string()
      .nonempty("Gender is required")
      .regex(regex.gender, "Gender must be male or female"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Confirm password must match password",
    path: ["rePassword"],
  });

import zod from "zod";
import { regex } from "../utils/regex";

export const signInSchema = zod.object({
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
});

import { object, number } from "yup";
export const TokenValid = object({
  Token: number("just number")
    .integer("Decimals are not allowed")
    .typeError("Amount must be a number")
    .required("is required")
    .min(1, "less than one"),
});

import { object, number } from "yup";
export const EtherValid = object({
  Ether: number("just number")
    // .integer("Decimals are not allowed")
    .typeError("Amount must be a number")
    .required("is required")
    .min(0, "less than Zero"),
});

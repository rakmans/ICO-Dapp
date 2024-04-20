import { object, number, string } from "yup";
export const MadeValid = object({
  address: string().required("is required").max(45, "More than 45 characters"),
  maxAirdropAmount: number("just number")
    .integer("Decimals are not allowed")
    .typeError("Amount must be a number")
    .required("is required")
    .min(1, "less than one"),
  holderAirdropAmount: number("just number")
    .integer("Decimals are not allowed")
    .typeError("Amount must be a number")
    .required("is required")
    .min(1, "less than one"),
  tokenRate: number("just number")
    .typeError("Amount must be a number")
    .required("is required")
    .min(1, "less than one"),
});

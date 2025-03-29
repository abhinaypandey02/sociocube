import { getAge, MAX_AGE, MIN_AGE } from "@/constants/age";

export const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

export const ageValidation = (v: unknown) => {
  const age = getAge(new Date(v as string));
  if (age < MIN_AGE) return `Minimum age is ${MIN_AGE}`;
  if (age > MAX_AGE) return "Invalid date";
};

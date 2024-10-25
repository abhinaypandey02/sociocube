import type { PropsWithChildren } from "react";
import React from "react";
import { type FieldValues, FormProvider } from "react-hook-form";
import type { FormProps } from "./types";

function Form<T extends FieldValues>({
  form,
  ...rest
}: PropsWithChildren<FormProps<T>>) {
  return (
    <FormProvider {...form}>
      <form {...rest} />
    </FormProvider>
  );
}

export default Form;

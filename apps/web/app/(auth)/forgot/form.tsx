"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { getRoute } from "../../../constants/routes";
import AuthLayout from "../components/auth-layout";
import { SEND_RESET_PASSWORD_EMAIL } from "../../../lib/mutations";
import { handleGQLErrors } from "../../../lib/apollo-client";

const defaultValues = {
  email: "",
};

export default function ForgotPasswordForm() {
  const form = useForm({ defaultValues });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [forgotPassword] = useMutation(SEND_RESET_PASSWORD_EMAIL);
  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    setIsLoading(true);
    forgotPassword({
      variables: {
        email: data.email.toLowerCase(),
      },
    })
      .then(() => {
        toast.success(
          "An email with further details sent if an account exists with this email",
        );
        setSuccess(true);
      })
      .catch(handleGQLErrors)
      .finally(() => {
        form.reset();
        router.push(getRoute("Home"));
      });
  };

  return (
    <AuthLayout
      bottomHeading={{
        question: "Create a new account instead?",
        answer: "Get started now!",
        link: getRoute("SignUp"),
      }}
      title="Forgot password?"
    >
      <Form
        className="space-y-4"
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          className="block"
          label="Email"
          name="email"
          placeholder="Enter your email"
          rules={{ required: true }}
        />
        <Button
          className="w-full"
          loading={isLoading}
          success={success}
          type="submit"
        >
          Send reset email
        </Button>
      </Form>
    </AuthLayout>
  );
}

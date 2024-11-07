import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FormProps = {
  children: React.ReactNode | React.ReactElement;
  submitHandler: SubmitHandler<any>;
  isDefaultValueResetable?: boolean;
} & FormConfig &
  React.HTMLAttributes<HTMLDivElement>;

export default function Form({
  children,
  submitHandler,
  defaultValues,
  resolver,
  isDefaultValueResetable = false,
  ...props
}: FormProps) {
  const formConfig: FormConfig = {};
  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  const methods = useForm<FormProps>(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => {
    if (isDefaultValueResetable) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, methods, isDefaultValueResetable]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={props?.className}>
        {children}
      </form>
    </FormProvider>
  );
}

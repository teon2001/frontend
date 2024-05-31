// TopUsersForm.types.ts

import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
} from "react-hook-form";

export type TopUsersFormModel = {
    email: string;
    password: string;
    name?: string;
    role?: string;
};

export type TopUsersFormState = {
    errors: FieldErrorsImpl<DeepRequired<TopUsersFormModel>>;
};

export type TopUsersFormActions = {
    register: UseFormRegister<TopUsersFormModel>;
    handleSubmit: UseFormHandleSubmit<TopUsersFormModel>;
    submit: (body: TopUsersFormModel) => void;
};
export type TopUsersFormComputed = {
    defaultValues: TopUsersFormModel,
    isSubmitting: boolean
};

export type TopUsersFormController = FormController<TopUsersFormState, TopUsersFormActions, TopUsersFormComputed>;
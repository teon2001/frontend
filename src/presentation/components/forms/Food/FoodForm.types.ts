import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
} from "react-hook-form";

export type FoodFormModel = {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    kcalPer100g: number;
    quantity: number;
};

export type FoodFormState = {
    errors: FieldErrorsImpl<DeepRequired<FoodFormModel>>;
};

export type FoodFormActions = {
    register: UseFormRegister<FoodFormModel>;
    handleSubmit: UseFormHandleSubmit<FoodFormModel>;
    submit: (body: FoodFormModel) => void;
};
export type FoodFormComputed = {
    defaultValues: FoodFormModel,
    isSubmitting: boolean
};

export type FoodFormController = FormController<FoodFormState, FoodFormActions, FoodFormComputed>;
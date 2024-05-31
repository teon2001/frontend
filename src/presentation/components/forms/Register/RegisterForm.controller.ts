import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useIntl } from "react-intl";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { RegisterFormModel, RegisterFormController } from "./RegisterForm.types";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { useRegisterApi } from "@infrastructure/apis/api-management";

const useInitRegisterForm = () => {
    const intl = useIntl(); // Rename for clarity
    const defaultValues: RegisterFormModel = {
        email: "",
        username: "",
        password: "",
        role: UserRoleEnum.Admin, // Set a default valid enum if needed
    };

    const schema = yup.object().shape({
        username: yup.string()
            .required(intl.formatMessage({ id: "globals.validations.requiredField" }, { fieldName: intl.formatMessage({ id: "globals.name" }) })),
        email: yup.string()
            .required(intl.formatMessage({ id: "globals.validations.requiredField" }, { fieldName: intl.formatMessage({ id: "globals.email" }) }))
            .email(intl.formatMessage({ id: "globals.validations.invalidEmail" })),
        password: yup.string()
            .required(intl.formatMessage({ id: "globals.validations.requiredField" }, { fieldName: intl.formatMessage({ id: "globals.password" }) })),
        role: yup.string()
            .oneOf(Object.values(UserRoleEnum))
            .required(intl.formatMessage({ id: "globals.validations.requiredField" }, { fieldName: intl.formatMessage({ id: "globals.role" }) }))
    });

    return { defaultValues, resolver: yupResolver(schema) };
};

export const useRegisterFormController = (): RegisterFormController => {
    const { defaultValues, resolver } = useInitRegisterForm();
    const { redirectToHome } = useAppRouter();
    const { registerMutation } = useRegisterApi(); // Destructure mutate method correctly

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormModel>({ resolver, defaultValues });

    const onSubmit: SubmitHandler<RegisterFormModel> = useCallback(async (formData) => {
        registerMutation.mutation(formData);
    }, [registerMutation, redirectToHome]);


    return {
        state: {
            errors
        },
        actions: {
            register,
            handleSubmit,
            submit: onSubmit
        },
        computed: {
            defaultValues,
            isSubmitting
        }
    };
};

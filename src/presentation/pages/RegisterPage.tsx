// src/presentation/pages/RegisterPage.tsx

import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { RegisterForm } from "@presentation/components/forms/Register/RegisterForm"; // Make sure to import the RegisterForm

export const RegisterPage = memo(() => {
    return (
        <Fragment>
            <Seo title="MobyLab Web App | Register" />
                <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                    <RegisterForm />  {/* This is the registration form component */}
                </Box>
        </Fragment>
    );
});

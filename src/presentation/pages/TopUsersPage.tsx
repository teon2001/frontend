import { Web } from "@mui/icons-material";
import { TopUsersForm } from "@presentation/components/forms/TopUsers/TopUsersForm";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";

export const TopUsersPage = () => {
    return (
        <WebsiteLayout>
            <TopUsersForm />
        </WebsiteLayout>
    );
}


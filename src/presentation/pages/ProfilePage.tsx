import { Web } from "@mui/icons-material";
import { FoodForm } from "@presentation/components/forms/Food/FoodForm";
import ProfileForm from "@presentation/components/forms/Profile/Profile";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";

export const ProfilePage = () => {
    return (
        <WebsiteLayout>
            <ProfileForm />
        </WebsiteLayout>
    );
}
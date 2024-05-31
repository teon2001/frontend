import { Web } from "@mui/icons-material";
import { FoodForm } from "@presentation/components/forms/Food/FoodForm";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";

export const MenuPage = () => {
    return (
        <WebsiteLayout>
            <FoodForm />
        </WebsiteLayout>
    );
}
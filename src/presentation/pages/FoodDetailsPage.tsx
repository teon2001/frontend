import FoodDetailsForm from "@presentation/components/forms/FoodDetails/FoodDetailsForm";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";

export const FoodDetailsPage = () => {
    return (
        <WebsiteLayout>
            <FoodDetailsForm />
        </WebsiteLayout>
    );
}
import { Payment } from "@mui/icons-material";
import FoodDetails from "@presentation/components/forms/FoodDetails/FoodDetailsForm";

/**
 * Here you can add more routes as constant to be used for routing within the application.
 */
export enum AppRoute {
    // Index = "/",
    Authetication = "/",
    Login = "/login",
    Register = '/register',
    Users = "/users",
    UserFiles = "/user-files",
    Menu = "/menu",
    TopUsers = "/top-users",
    AllAvailableMeals = "/all-available-meals",
    FoodDetails = "/food/:id",
    Payment = "/payment",
    Review = "/food/:foodId/review",
    Articles = "/articles",
    Profile = "/profile",
}

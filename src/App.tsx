import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { AuthenticationPage } from "@presentation/pages/AuthenticationPage";
// import { Appp } from "@presentation/pages/AuthenticationPage";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { MenuPage } from "@presentation/pages/MenuPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { TopUsersPage } from "@presentation/pages/TopUsersPage";
import { AllAvailableMealsPage } from "@presentation/pages/AllAvailableMealsPage";
import { FoodDetailsPage } from "@presentation/pages/FoodDetailsPage";
import { ProfilePage } from "@presentation/pages/ProfilePage";
import { ArticlesPage } from "@presentation/pages/ArticlesPage"; // Import the missing component
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FoodDetails from "@presentation/components/forms/FoodDetails/FoodDetailsForm";
import PaymentPage from "@presentation/pages/PaymentPage";
import ReviewForm from "@presentation/components/forms/Review/ReviewForm";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        {/* <Route path={AppRoute.Index} element={<HomePage />} /> Add a new route with a element as the page. */}
        
        {/* <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />  */}
        <Route path={AppRoute.Authetication} element={<AuthenticationPage />} />
        <Route path={AppRoute.Menu} element={<MenuPage/>}/>
        <Route path={AppRoute.TopUsers} element={<TopUsersPage />} />
        <Route path={AppRoute.AllAvailableMeals} element={<AllAvailableMealsPage />} />
        <Route path={AppRoute.Payment} element={<PaymentPage />} />
        <Route path={AppRoute.Review} element={<ReviewForm />} />
        <Route path={AppRoute.Articles} element={<ArticlesPage />} />
        <Route path={AppRoute.FoodDetails} element={<FoodDetailsPage />} />
        <Route path={AppRoute.Profile} element={<ProfilePage />} />
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
      </Routes>
    </AppIntlProvider>
}

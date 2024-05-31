import { useAppSelector } from "@application/store";
import { UserAddDTO, UserApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const registerMutation = "registerMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useRegisterApi = () => {
    // const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    // const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const registerUser = (user: UserAddDTO) => new UserApi().apiUserAddPost({ userAddDTO: user });

    return {
        registerMutation: { // Return the mutation object.
            key: registerMutation, // Add the key to identify the mutation.
            mutation: registerUser // Add the mutation callback.
        }
    }
}
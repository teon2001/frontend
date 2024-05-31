import { useAppSelector } from "@application/store";
import { ReviewAddDTO, ReviewApi, ReviewDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
/**
 * Use constants to identify mutations and queries.
 */
const addReviewMutation = "addReviewMutation";
const getReviewMutation = "getReviewMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case just to login the user.
 */
export const useReviewApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.
    
    
    const addReview = (r : ReviewAddDTO) => new ReviewApi(config).apiReviewPost({reviewAddDTO : r});
    const getReviews = (search: string, page: number, pageSize: number) => new ReviewApi(config).apiReviewGet({search: search, page: page, pageSize: pageSize});
   
    return {
        addReviewMutation: {
            key: addReviewMutation, 
            mutation: addReview 
        },
        getReviewMutation: {
            key: getReviewMutation, 
            mutation: getReviews 
        }
    }
}
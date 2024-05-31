import { useAppSelector } from "@application/store";
import { ApiFoodDownloadImgIdGetRequest, ApiFoodGetPageGetRequest, FoodApi, FoodDTO, UserAddDTO, FoodUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { ca, de } from "date-fns/locale";

/**
 * Use constants to identify mutations and queries.
 */
const addFoodMutation = "addFood";
const getAllFoodsMutation = "getAllFoods";
const downloadFoodImageMutation = "downloadFoodImage";
const recommandedFoodMutation = "recommandedFood";
const updateFoodMutation = "updateFood";
const deleteFoodMutation = "deleteFood";
const getFoodPageMutation = "getFoodPage";
const getFoodByIdMutation = "getFoodById";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useFoodApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const addFood = (foodName: string, 
                    foodDesc: string, 
                    foodPrice: number, 
                    foodKcal: number, 
                    foodQuantity: number, 
                    foodImg: Blob) => new FoodApi().apiFoodUploadPost({ 
        name: foodName,
        description: foodDesc,
        price: foodPrice,
        kcalPer100g: foodKcal,
        quantity: foodQuantity,
        img: foodImg});


    const updateFood = (_foodDTO : FoodUpdateDTO) => new FoodApi().apiFoodUpdatePut({foodUpdateDTO : _foodDTO});
    const recommandedFood = (calories: number) => new FoodApi(config).apiFoodGetRecommendationGet({ maxCalories: calories });
    const getAllFoods = () => new FoodApi(config).apiFoodGetAllGet();
    const downloadFoodImage = (foodId: string) => new FoodApi(config).apiFoodDownloadImgIdGet({ id: foodId });
    const deleteFood = (foodId: string) => new FoodApi(config).apiFoodDeleteIdDelete({ id: foodId });
    const getFoodPage = (r: ApiFoodGetPageGetRequest) => new FoodApi(config).apiFoodGetPageGet(r);
    const getFoodById = (foodId: string) => new FoodApi(config).apiFoodGetByIdIdGet({ id: foodId });

    return {
        addFood: { 
            key: addFoodMutation, 
            mutation: addFood 
        },
        getAllFoods: { 
            key: getAllFoodsMutation, 
            mutation: getAllFoods 
        },
        downloadFoodImage: { 
            key: downloadFoodImageMutation,
            mutation: downloadFoodImage 
        },
        recommandedFood: {
            key: recommandedFoodMutation,
            mutation: recommandedFood
        },
        updateFood: {
            key: updateFoodMutation,
            mutation: updateFood
        },
        deleteFood: {
            key: deleteFoodMutation,
            mutation: deleteFood
        },
        getFoodPage: {
            key: getFoodPageMutation,
            mutation: getFoodPage
        }, 
        getFoodById: {
            key: getFoodByIdMutation,
            mutation: getFoodById
        }
    }
}
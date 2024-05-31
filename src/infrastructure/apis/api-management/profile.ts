import { useAppSelector } from "@application/store";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { ProfileApi, ProfileDTO } from "../client";

const addProfileMutation = "addProfileMutation";
const updateProfileMutation = "updateProfileMutation";
const getProfileMutation = "getProfileMutation";

export const useProfileApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);  
    const config = getAuthenticationConfiguration(token);
    
    
    const addProfile = (p : ProfileDTO) => new ProfileApi(config).apiProfileAddPost({ profileDTO : p});
    const updateProfile = (p : ProfileDTO) => new ProfileApi(config).apiProfileUpdatePut({ profileDTO : p});
    const getProfile = (u : string) => new ProfileApi(config).apiProfileGetProfileByUserIdUserIdGet({userId : u});
    return {
        addProfileMutation : {
            key: addProfileMutation, 
            mutation: addProfile 
        },
        updateProfileMutation : {
            key: updateProfileMutation, 
            mutation: updateProfile 
        }, 
        getProfileMutation : {
            key: getProfileMutation, 
            mutation: getProfile 
        }
    }
}
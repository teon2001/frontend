import { useAppSelector } from "@application/store";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { ArticleApi, ArticleDTO } from "../client";

const addArticleMutation = "addArticleMutation";
const getArticlesMutation = "getArticlesMutation";
const getArticleMutation = "getArticleMutation";
const deleteArticleMutation = "deleteArticleMutation";

export const useArticleApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.
    
    
    const addArticle = (a : ArticleDTO) => new ArticleApi(config).apiArticlePost({articleDTO : a});
    const getArticles = (search : string, page : number, pageSize : number) => new ArticleApi(config).apiArticleGet({search, page, pageSize});
    const getArticle = (id : string) => new ArticleApi(config).apiArticleIdGet({id});
    const deleteArticle = (id : string) => new ArticleApi(config).apiArticleIdDelete({id});
    return {
        addArticleMutation : {
            key: addArticleMutation, 
            mutation: addArticle 
        },
        getArticlesMutation : {
            key: getArticlesMutation, 
            mutation: getArticles 
        },
        getArticleMutation : {
            key: getArticleMutation, 
            mutation: getArticle 
        },
        deleteArticleMutation : {
            key: deleteArticleMutation, 
            mutation: deleteArticle 
        }

    }
}
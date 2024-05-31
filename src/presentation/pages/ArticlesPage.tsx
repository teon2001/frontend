import ArticleForm from "@presentation/components/forms/Article/ArticleForm";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";

export const ArticlesPage = () => {
    return (
        <WebsiteLayout>
            < ArticleForm/>
        </WebsiteLayout>
    );
}

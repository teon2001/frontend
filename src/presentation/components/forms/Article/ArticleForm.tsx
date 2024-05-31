import React, { useEffect, useState } from 'react';
import { useArticleApi } from '../../../../infrastructure/apis/api-management/article';
import { Box, Button, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';
import { ArticleDTO } from '@infrastructure/apis/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArticleForm = () => {
    const { getArticlesMutation, addArticleMutation } = useArticleApi();
    const [articles, setArticles] = useState<ArticleDTO[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchArticles();
    }, [search, page]);

    const fetchArticles = async () => {
        try {
            const response = await getArticlesMutation.mutation(search, page, pageSize);
            if (response.response) {
                setArticles(response.response.data || []);
            } else {
                toast.error("Failed to fetch articles.");
            }
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            toast.error("An error occurred while fetching articles.");
        }
    };

    const handleAddArticle = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const article: Omit<ArticleDTO, 'id'> = {
            title,
            content,
        };

        try {
            await addArticleMutation.mutation(article);
            toast.success("Article added successfully!");
            setTitle('');
            setContent('');
            fetchArticles(); // Refresh the list of articles
        } catch (error) {
            toast.error("Failed to add article.");
            console.error('Failed to add article:', error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset the page to 1 when performing a new search
    };

    const handleSearchButtonClick = () => {
        fetchArticles(); // Fetch articles based on the current search term
    };

    return (
        <Box sx={{ width: '80%', mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Știi ce Mănânci?
            </Typography>
            <Box component="form" onSubmit={handleAddArticle} sx={{ mb: 4 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Article
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Search Articles"
                    value={search}
                    onChange={handleSearch}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2, mt: 1 }}
                    onClick={handleSearchButtonClick}
                >
                    Search
                </Button>
            </Box>
            <List>
                {articles.map((article) => (
                    <ListItem key={article.id}>
                        <ListItemText
                            primary={article.title}
                            secondary={`${article.content?.substring(0, 100)}...`}
                        />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                    variant="contained"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default ArticleForm;

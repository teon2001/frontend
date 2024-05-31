import React, { useState } from 'react';
import { useReviewApi } from '../../../../infrastructure/apis/api-management/review';
import { Box, Button, Rating, TextField } from '@mui/material';
import { useAppSelector } from "@application/store";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import { getAuthenticationConfiguration } from '../../../../infrastructure/authentication';

const ReviewForm = () => {
    const { foodId } = useParams<{ foodId: string }>();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { addReviewMutation } = useReviewApi();
    const { userId } = useAppSelector(state => state.profileReducer); // Adjust this based on your actual state

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Creare obiect ReviewDTO
        const review = {
            userId: userId || undefined, // Ensure userId is of type string
            foodId : foodId || undefined, // Presupunem că există un camp foodId în DTO
            rating,
            comment,
        };
        // Apelarea mutației pentru adăugare review
        try {
            await addReviewMutation.mutation(review);
            toast.success('Review submitted successfully!');
        } catch (error) {    
            toast.error('Failed to submit review. Please try again.');
        }    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, mx: 'auto', mt: 2 }}>
            <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue || 0);
                }}
                precision={1}
                size="large"
            />
            <TextField
                label="Comment"
                multiline
                fullWidth
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit Review
            </Button>
            <ToastContainer />
        </Box>
    );
};

export default ReviewForm;

import { useFoodApi } from "@infrastructure/apis/api-management";
import { FoodDTO } from "@infrastructure/apis/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FoodDetailsStyle.scss";
import { Button } from "@mui/material";

const FoodDetailsForm: React.FC = () => {
    const { id } = useParams<Record<string, string | undefined>>(); 
    const { getFoodById, downloadFoodImage } = useFoodApi();
    const navigate = useNavigate(); // Folosim useNavigate

    const [food, setFood] = useState<FoodDTO | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('default.jpg');

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await getFoodById.mutation(id ?? '');
                setFood(response.response ?? null);
                if (response.response?.id) {
                    fetchImage(response.response.id);
                }
            } catch (error) {
                console.error('Failed to fetch food details:', error);
            }
        };

        const fetchImage = async (foodId: string) => {
            try {
                const imageBlob = await downloadFoodImage.mutation(foodId);
                const imageUrlString = URL.createObjectURL(imageBlob);
                setImageUrl(imageUrlString);
            } catch (error) {
                console.error('Failed to download food image:', error);
            }
        };

        fetchFood();
    }, [id, getFoodById, downloadFoodImage]);
    
    const handleBackClick = () => {
        navigate(-1); // Navighează înapoi la pagina anterioară
    };

    const handleReviewClick = () => {
        navigate(`/food/${id}/review`);
    };


    return (
        <div className="food-details-container">
            <h1>{food?.name}</h1>
            <img src={imageUrl || 'default.jpg'} alt={food?.name || ''} className="food-details-image" />
            <p>{food?.description}</p>
            <p>{`Calories: ${food?.kcalPer100g}`}</p>
            <p>{`Price: $${food?.price}`}</p>
            <Button onClick={handleBackClick}>Back</Button>
            <Button onClick={handleReviewClick} variant="contained" color="primary" sx={{ ml: 2 }}>
                Leave a Review
            </Button>
        </div>
    );
};

export default FoodDetailsForm;
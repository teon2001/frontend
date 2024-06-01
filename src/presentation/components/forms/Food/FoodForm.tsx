import React, { useEffect, useState, useRef, Component } from 'react';
import { FoodDTO, FoodDTOListRequestResponse, UserRoleEnum } from "@infrastructure/apis/client";
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useFoodApi } from '@infrastructure/apis/api-management';
import avatar4 from '@presentation/assets/img/9334407.jpg';
import "./FoodStyle.scss";
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

interface CarouselProps {
  items: Order[];
  images: { [key: string]: string };
}

const Carousel: React.FC<CarouselProps> = ({ items, images }) => {
  const [active, setActive] = useState(2);
  const [direction, setDirection] = useState('right');

  const moveLeft = () => {
    setActive(prev => prev - 1 >= 0 ? prev - 1 : items.length - 1);
    setDirection('left');
  };

  const moveRight = () => {
    setActive(prev => (prev + 1) % items.length);
    setDirection('right');
  };

  const generateItems = () => {
    return items.map((item, index) => {
      const levelDiff = active - index;
      const level = levelDiff > 2 ? 'inactive' : `level${levelDiff}`; // Folosește 'inactive' pentru item-urile departate
      return (
        <CSSTransition key={item.food.id} timeout={500} classNames={direction}>
          <Item food={item.food} level={level} img={images[item.food.id!]}/>
        </CSSTransition>
      );
    });
  };

return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={moveLeft}>&lt;</div>
      <TransitionGroup component={null}>
        {generateItems()}
      </TransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}>&gt;</div>
    </div>
  );
};


export default Carousel;
  
  interface ItemProps {
    food: FoodDTO;
    level: string; 
    img: string;
  }
  
  const Item: React.FC<ItemProps> = ({ food, level, img}) => {
    const levelNumber = parseInt(level.replace('level', ''), 10); 
    const isVisible = Math.abs(levelNumber) <= 2; 
    const className = `item ${level} ${!isVisible ? 'hidden' : ''}`;
  return (
    <div className={className}>
      <CSSTransition key={food.id} timeout={500} classNames="item-transition">
        <div>
          <img src={img} alt={''} style={{ width: '100px', height: '100px' }} />
          <h1 style={{ fontSize: '0.8rem' }}>{food.name}</h1> Ajustează mărimea titlului
        </div>
      </CSSTransition>
    </div>
  );
  };

  interface Order {
    order: number;
    food: FoodDTO;
    state: 'active' | 'inactive';
    
  }

export const FoodForm = () => {
    const { getAllFoods, downloadFoodImage, recommandedFood } = useFoodApi();
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [orders, setOrders] = useState<Order[]>([]);
    const queryClient = new QueryClient();

    useEffect(() => {
      const fetchFoods = async () => {
        try {
          const foodListResponse = await getAllFoods.mutation();
          if (foodListResponse.response) {
            const newOrders = foodListResponse.response.map((food: FoodDTO, index: number) => ({
              order: index + 1,
              food, 
              state: 'inactive' as 'inactive'  
            }));
            setOrders(newOrders);

          }
        } catch (error) {
          console.error('Failed to fetch foods:', error);
        }
      };
      fetchFoods();
    }, [getAllFoods]);

    useEffect(() => {
      const fetchImageUrls = async () => {
          const urls: { [key: string]: string } = {};
          for (const food of orders || []) {
              try {
                  if (food.food.id !== undefined) {
                      const imageUrl = await downloadFoodImage.mutation(food.food.id);
                      const imageUrlString = URL.createObjectURL(imageUrl);
                      urls[food.food.id] = imageUrlString;
                  }
              } catch (error) {
                  console.error('Failed to download food image:', error);
              }
          }
          setImageUrls(urls);
      };
      if (orders.length) {
          fetchImageUrls();
      }
      
    }, [orders, downloadFoodImage]);

    return (
      <QueryClientProvider client={queryClient}>
        <div className='container'> {/* Simplificare: ca un container */}
          <Carousel items={orders} images={imageUrls}/>
        </div>
      </QueryClientProvider>
    );

  };
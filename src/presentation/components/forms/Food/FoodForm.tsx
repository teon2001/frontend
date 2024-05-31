import React, { useEffect, useState, useRef, Component } from 'react';
import { FoodDTO, FoodDTOListRequestResponse, UserRoleEnum } from "@infrastructure/apis/client";
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useFoodApi } from '@infrastructure/apis/api-management';

import "./FoodStyle.scss";

interface CarouselProps {
  items: FoodDTO[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState('');

  const moveLeft = () => {
    const newActive = active - 1 < 0 ? items.length - 1 : active - 1;
    setActive(newActive);
    setDirection('left');
  };

  const moveRight = () => {
    const newActive = (active + 1) % items.length;
    setActive(newActive);
    setDirection('right');
  };

  const generateItems = () => {
    const itemsToShow = [];
    let level;

    for (let i = active - 2; i < active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = items.length + i; 
      } else if (i >= items.length) {
        index = i %  items.length; 
      }

      level = active - i;
      itemsToShow.push(<Item key={index} food={items[index]} level={level} direction={direction} />)
    }
    return itemsToShow;
  }
  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={moveLeft}><i className="fi-arrow-left"></i></div>
      <TransitionGroup component={null}>
        {generateItems()}
      </TransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}><i className="fi-arrow-right"></i></div>
    </div>
  );
};

export default Carousel;
  
  interface ItemProps {
    key: number;
    food: FoodDTO;
    level: number; 
    direction: string;
  }
  
  const Item: React.FC<ItemProps> = ({ key, food, level, direction }) => {
    const className = 'item level' + level
    return (
      <div className={className}>
        <CSSTransition key={food.id} timeout={500} classNames={direction}>
            <p>{`${food.quantity} - $${food.price}`}</p>
        </CSSTransition>
      </div>
    );
  };
  
  // export default Carousel;
                {/* <img src={this.props.food.imageUrl || 'default.jpg'} alt={this.props.food.name || ''} className="food-image"/> */}

// interface FoodGalleryProps {
//     foods: FoodDTO[];
//     imageUrls: { [key: string]: string };
// }

// const FoodGallery: React.FC<FoodGalleryProps> = ({ foods, imageUrls }) => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const navigate = useNavigate();
//     const galleryRef = useRef(null);

//     // Function to calculate the class based on index
//     const getItemLevel = (index: number) => {
//         const diff = index - activeIndex;
//         if (diff < 0) return `level${diff}`;
//         return `level${diff}`;
//     };

//     const scrollLeft = () => {
//         setActiveIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : foods.length - 1);
//     };

//     const scrollRight = () => {
//         setActiveIndex(prevIndex => (prevIndex + 1) % foods.length);
//     };

//     const handleFoodClick = (id: string | undefined) => {
//         navigate(`/food/${id}`);
//     };

//     return (
//         <div id="carousel" className="noselect">
//             <div className="arrow arrow-left" onClick={scrollLeft}>&lt;</div>
//             <TransitionGroup component={null}>
//                 {foods.map((food, index) => (
//                     <CSSTransition key={food.id} timeout={500} classNames="item">
//                         <div className={`item ${getItemLevel(index)}`} onClick={() => handleFoodClick(food.id)}>
//                             <img src={imageUrls[food.id!] || 'default.jpg'} alt={food.name || ''} className="food-image"/>
//                             <div className="food-info">
//                                 <h2>{food.name}</h2>
//                                 <p>{`${food.quantity} - $${food.price}`}</p>
//                             </div>
//                         </div>
//                     </CSSTransition>
//                 ))}
//             </TransitionGroup>
//             <div className="arrow arrow-right" onClick={scrollRight}>&gt;</div>
//         </div>
//     );

    //     <div id="carousel" className="noselect">
    //     <div className="arrow arrow-left" onClick={this.leftClick}><i className="fi-arrow-left"></i></div>
    //     <ReactCSSTransitionGroup 
    //         transitionName={this.state.direction}>
    //         {this.generateItems()}
    //     </ReactCSSTransitionGroup>
    //     <div className="arrow arrow-right" onClick={this.rightClick}><i className="fi-arrow-right"></i></div>
    // </div>

        // <div className="main-container" ref={galleryRef}>
        //     <div className="gallery-wrapper">
        //         <div className="arrow arrow-left" onClick={scrollLeft}>{"<"}</div>
        //         <div className="gallery-container">
        //             {foods.map((food, index) => (
        //                 <div key={food.id}
        //                      className={`item ${getItemLevel(index)}`}
        //                      onClick={() => handleFoodClick(food.id)}>
        //                     <img src={imageUrls[food.id!] || 'default.jpg'} alt={food.name || ''} className="food-image"/>
        //                     <div className="food-info">
        //                         <h2>{food.name}</h2>
        //                         <p>{`${food.quantity} - $${food.price}`}</p>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //         <div className="arrow arrow-right" onClick={scrollRight}>{">"}</div>
        //     </div>
        // </div>
    // );
// };

export const FoodForm = () => {
    const { getAllFoods, downloadFoodImage, recommandedFood } = useFoodApi();
    const [foods, setFoods] = useState<FoodDTOListRequestResponse>();
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [recommendedFood, setRecommendedFood] = useState<FoodDTO | null>(null);
    const [recommendedImageUrl, setRecommendedImageUrl] = useState<string>('');
    const [maxCalories, setMaxCalories] = useState<number>(600); // Default value

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const foodList = await getAllFoods.mutation();
                setFoods(foodList);
            } catch (error) {
                console.error('Failed to fetch foods:', error);
            }
        };
        fetchFoods();
    }, []);

    // useEffect(() => {
    //     const fetchImageUrls = async () => {
    //         const urls: { [key: string]: string } = {};
    //         for (const food of foods?.response || []) {
    //             try {
    //                 if (food.id !== undefined) {
    //                     const imageUrl = await downloadFoodImage.mutation(food.id);
    //                     const imageUrlString = URL.createObjectURL(imageUrl);
    //                     urls[food.id] = imageUrlString;
    //                 }
    //             } catch (error) {
    //                 console.error('Failed to download food image:', error);
    //             }
    //         }
    //         setImageUrls(urls);
    //     };
    //     if (foods?.response?.length) {
    //         fetchImageUrls();
    //     }
    // }, [foods, downloadFoodImage]);

    // const fetchRecommendedFood = async () => {
    //     try {
    //         const response = await recommandedFood.mutation(maxCalories);
    //         const food = response.response;
    //         setRecommendedFood(food || null); // Set default value of null if food is undefined
    //         const imageUrl = await downloadFoodImage.mutation(food?.id || ''); // Add null check and provide default value
    //         const imageUrlString = URL.createObjectURL(imageUrl);
    //         setRecommendedImageUrl(imageUrlString);
    //     } catch (error) {
    //         console.error('Failed to fetch recommended food:', error);
    //     }
    // };
    
  
    return (
        <Carousel items={foods?.response || []}/>
    );
};




{/* <Carousel items={items} active={0} /> */}
// <div className="main-container">
//     <FoodGallery foods={foods?.response || []} imageUrls={imageUrls} />
//     {/* <FoodGallery foods={foods?.response || []} imageUrls={imageUrls} /> */}
// </div>












// const FoodRecommendation: React.FC<{ food: FoodDTO, imageUrl: string}> = ({ food, imageUrl }) => {
//     const calorii = (food.kcalPer100g ?? 0) * (food.quantity ?? 0) / 100;
//     return (
//         <div className="recommendation-container">
//             <img src={imageUrl || 'default.jpg'} alt={food.name ?? ''} className="recommendation-image" />
//             <div className="recommendation-info">
//                 <h2>{food.name}</h2>
//                 <p>{`${food.quantity} - $${food.price}`}</p>
//                 <p>{`Calories: ${calorii}`}</p>
//             </div>
//         </div>
//     );
// };


// return (
//     <div className="main-container">
//         <FoodGallery foods={foods?.response || []} imageUrls={imageUrls} />
//         <FoodGallery foods={foods?.response || []} imageUrls={imageUrls} />
//         {/* <div className="recommendation-form">
//         <input
//                 type="text"
//                 value={maxCalories}
//                 onChange={(e) => setMaxCalories(Number(e.target.value))}
//                 placeholder="Enter max calories"
//                 className="calories-input"
//             />
//             <button onClick={fetchRecommendedFood}>Get Recommendation</button>
//         </div> */}
//         {/* {recommendedFood && (
//             <FoodRecommendation food={recommendedFood} imageUrl={recommendedImageUrl}/>
//         )} */}
//     </div>
// );
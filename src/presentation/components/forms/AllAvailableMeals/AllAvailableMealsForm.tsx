import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { useFoodApi } from '@infrastructure/apis/api-management/food';
import { FoodDTOListRequestResponse, FoodDTO, ApiFoodGetPageGetRequest, FoodUpdateDTO } from '@infrastructure/apis/client';
import './AllAvailableMealsForm.scss'; // Import the CSS for styling

interface AllFoodsTableProps {
    foods: FoodDTO[];
    onEdit: (food: FoodDTO) => void;
    onDelete: (id: string) => void;
}

const AllFoodsTable: React.FC<AllFoodsTableProps> = ({ foods, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Calories (per 100g)</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {foods.map((food, index) => (
                    <tr key={index}>
                        <td>{food.name}</td>
                        <td>{food.kcalPer100g}</td>
                        <td>{food.quantity}</td>
                        <td>{food.price}</td>
                        <td>
                            <Button variant="primary" onClick={() => onEdit(food)}>Edit</Button>
                            <Button variant="danger" onClick={() => onDelete(food.id || '')}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const AllAvailableMealsForm: React.FC = () => {
    const { getFoodPage, addFood, updateFood, deleteFood } = useFoodApi();
    const [state, setState] = useState({
        foods: [] as FoodDTO[],
        page: 1,
        pageSize: 10,
        totalPages: 0,
        search: '',
        showModal: false,
        editMode: false,
        currentFood: { name: '', description: '', quantity: 0, kcalPer100g: 0, price: 0, imgUrl: '' } as FoodDTO,
        selectedFile: null as Blob | null,
    });

    useEffect(() => {
        fetchFoods(state.page);
    }, [state.pageSize, state.search]);

    const fetchFoods = async (page: number) => {
        try {
            const request: ApiFoodGetPageGetRequest = {
                page,
                pageSize: state.pageSize,
                search: state.search,
            };

            const response = await getFoodPage.mutation(request);

            if (response.response) {
                setState(prevState => ({
                    ...prevState,
                    foods: response.response?.data || [],
                    totalPages: Math.ceil((response.response?.totalCount || 0) / state.pageSize),
                    page,
                }));
            } else {
                console.error('Failed to fetch foods:', response.errorMessage);
            }
        } catch (error) {
            console.error('Failed to fetch foods:', error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({ ...prevState, search: e.target.value, page: 1 }));
    };

    const handleAddOrEdit = async () => {
        try {
            if (state.editMode) {
                const foodUpdateDTO: FoodUpdateDTO = {
                    id: state.currentFood.id,
                    name: state.currentFood.name,
                    price: state.currentFood.price,
                    quantity: state.currentFood.quantity,
                    kcalPer100g: state.currentFood.kcalPer100g,
                    description: state.currentFood.description,
                    // imgUrl: state.currentFood.imageUrl,
                };
                await updateFood.mutation(foodUpdateDTO);
            } else {
                if (!state.selectedFile) {
                    console.error('No file selected');
                    return;
                }
                await addFood.mutation(
                    state.currentFood.name ?? '',
                    state.currentFood.description ?? '',
                    state.currentFood.price ?? 0,
                    state.currentFood.kcalPer100g ?? 0,
                    state.currentFood.quantity ?? 0,
                    state.selectedFile,
                );
            }
            fetchFoods(state.page);
            setState(prevState => ({
                ...prevState,
                showModal: false,
                currentFood: { name: '', description: '', quantity: 0, kcalPer100g: 0, price: 0, imgUrl: '' } as FoodDTO,
                selectedFile: null,
            }));
        } catch (error) {
            console.error('Failed to save food:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this food?')) {
            try {
                await deleteFood.mutation(id);
                fetchFoods(state.page);
            } catch (error) {
                console.error('Failed to delete food:', error);
            }
        }
    };

    const openModal = (food: FoodDTO | null = null) => {
        if (food) {
            setState(prevState => ({
                ...prevState,
                currentFood: {
                    id: food.id,
                    name: food.name,
                    quantity: food.quantity,
                    kcalPer100g: food.kcalPer100g,
                    price: food.price,
                    description: food.description,
                    imgUrl: food.imageUrl || '',
                } as FoodDTO,
                editMode: true,
                showModal: true,
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                currentFood: { name: '', description: '', quantity: 0, kcalPer100g: 0, price: 0, imgUrl: '' } as FoodDTO,
                editMode: false,
                showModal: true,
            }));
        }
    };

    const handlePageChange = (newPage: number) => {
        setState(prevState => ({ ...prevState, page: newPage }));
        fetchFoods(newPage);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setState(prevState => ({ ...prevState, selectedFile: file }));
        }
    };

    return (
        <div className="main-container">
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    value={state.search}
                    onChange={handleSearch}
                    className="search-input"
                />
                <Button className="styled-button" onClick={() => openModal()}>Add New Food</Button>
                <AllFoodsTable
                    foods={state.foods}
                    onEdit={openModal}
                    onDelete={handleDelete}
                />
                <div className="pagination">
                    <Button
                        disabled={state.page === 1}
                        onClick={() => handlePageChange(state.page - 1)}
                    >
                        Previous
                    </Button>
                    <span>{state.page} of {state.totalPages}</span>
                    <Button
                        disabled={state.page === state.totalPages}
                        onClick={() => handlePageChange(state.page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <Modal show={state.showModal} onHide={() => setState(prevState => ({ ...prevState, showModal: false }))}>
                <Modal.Header closeButton>
                    <Modal.Title>{state.editMode ? 'Edit Food' : 'Add New Food'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={state.currentFood.name || ''}
                                onChange={(e) =>
                                    setState(prevState => ({
                                        ...prevState,
                                        currentFood: { ...state.currentFood, name: e.target.value } as FoodDTO,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={state.currentFood.quantity || 0}
                                onChange={(e) =>
                                    setState(prevState => ({
                                        ...prevState,
                                        currentFood: { ...state.currentFood, quantity: Number(e.target.value) } as FoodDTO,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Calories (per 100g)</Form.Label>
                            <Form.Control
                                type="number"
                                value={state.currentFood.kcalPer100g || 0}
                                onChange={(e) =>
                                    setState(prevState => ({
                                        ...prevState,
                                        currentFood: { ...state.currentFood, kcalPer100g: Number(e.target.value) } as FoodDTO,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={state.currentFood.price || 0}
                                onChange={(e) =>
                                    setState(prevState => ({
                                        ...prevState,
                                        currentFood: { ...state.currentFood, price: Number(e.target.value) } as FoodDTO,
                                    }))
                                }
                            />
                        </Form.Group>
                        {!state.editMode && (
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        )}
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={state.currentFood.description || ''}
                                onChange={(e) =>
                                    setState(prevState => ({
                                        ...prevState,
                                        currentFood: { ...state.currentFood, description: e.target.value } as FoodDTO,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Button className="styled-button" onClick={handleAddOrEdit}>
                            {state.editMode ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AllAvailableMealsForm;

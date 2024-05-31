import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { useUserApi } from '../../../../infrastructure/apis/api-management/user';
import { ApiUserGetPageGetRequest, UserDTO, UserAddDTO, UserUpdateDTO, UserRoleEnum } from '@infrastructure/apis/client';
import './TopUsersStyle.scss'; // Importă fișierul CSS

export const TopUsersForm: React.FC = () => {
  const { getUsersPage, addUser, updateUser, deleteUser } = useUserApi();
  const [state, setState] = useState({
    users: [] as UserDTO[],
    page: 1,
    pageSize: 10,
    totalPages: 0,
    search: '',
    showModal: false,
    showConfirmModal: false,
    editMode: false,
    currentAddUser: { name: '', email: '', password: '', role: UserRoleEnum.Admin } as UserAddDTO,
    currentUpdateUser: { id: '', name: '', password: '' } as UserUpdateDTO,
    userIdToDelete: '' as string,
  });

  useEffect(() => {
    fetchUsers(state.page); // Inițializează cu pagina 1 la prima încărcare
  }, [state.pageSize, state.search]);

  const fetchUsers = async (page: number) => {
    try {
      const request: ApiUserGetPageGetRequest = {
        page,
        pageSize: state.pageSize,
        search: state.search,
      };

      const response = await getUsersPage.query(request);

      if (response.response) {
        setState(prevState => ({
          ...prevState,
          users: response.response?.data || [],
          totalPages: Math.ceil((response.response?.totalCount || 0) / state.pageSize),
          page,
        }));
      } else {
        console.error('Failed to fetch users:', response.errorMessage);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, search: e.target.value, page: 1 }));
  };

  const handleAddOrEdit = async () => {
    try {
      if (state.editMode) {
        await updateUser.mutation(state.currentUpdateUser);
      } else {
        await addUser.mutation(state.currentAddUser);
      }
      fetchUsers(state.page); // Reîncarcă pagina curentă
      setState(prevState => ({
        ...prevState,
        showModal: false,
        currentAddUser: { name: '', email: '', password: '', role: UserRoleEnum.Admin },
        currentUpdateUser: { id: '', name: '', password: '' },
      }));
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const confirmDelete = (id: string) => {
    setState(prevState => ({ ...prevState, showConfirmModal: true, userIdToDelete: id }));
  };

  const handleDelete = async () => {
    if (state.userIdToDelete) {
      try {
        await deleteUser.mutation(state.userIdToDelete);
        fetchUsers(state.page); // Reîncarcă pagina curentă
        setState(prevState => ({ ...prevState, showConfirmModal: false, userIdToDelete: '' }));
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const openModal = (user: UserDTO | null = null) => {
    if (user) {
      setState(prevState => ({
        ...prevState,
        currentUpdateUser: { id: user.id, name: user.name, password: '' },
        editMode: true,
        showModal: true,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        currentAddUser: { name: '', email: '', password: '', role: UserRoleEnum.Admin },
        editMode: false,
        showModal: true,
      }));
    }
  };

  const handlePageChange = (newPage: number) => {
    setState(prevState => ({ ...prevState, page: newPage }));
    fetchUsers(newPage);
  };

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search"
        value={state.search}
        onChange={handleSearch}
        className="search-input"
      />
      <Button className="styled-button" onClick={() => openModal()}>Add New User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user: UserDTO) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="primary" className="styled-button" onClick={() => openModal(user)}>Edit</Button>
                <Button variant="danger" className="styled-button" onClick={() => confirmDelete(user.id || '')}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
      <Modal show={state.showModal} onHide={() => setState(prevState => ({ ...prevState, showModal: false }))}>
        <Modal.Header closeButton>
          <Modal.Title>{state.editMode ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {!state.editMode ? (
              <>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.currentAddUser.name || ''}
                    onChange={(e) =>
                      setState(prevState => ({
                        ...prevState,
                        currentAddUser: { ...state.currentAddUser, name: e.target.value },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.currentAddUser.email || ''}
                    onChange={(e) =>
                      setState(prevState => ({
                        ...prevState,
                        currentAddUser: { ...state.currentAddUser, email: e.target.value },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={state.currentAddUser.password || ''}
                    onChange={(e) =>
                      setState(prevState => ({
                        ...prevState,
                        currentAddUser: { ...state.currentAddUser, password: e.target.value },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={state.currentAddUser.role || UserRoleEnum.Admin}
                    onChange={(e) =>
                      setState(prevState => ({
                        ...prevState,
                        currentAddUser: { ...state.currentAddUser, role: e.target.value as UserRoleEnum },
                      }))
                    }
                  >
                    <option value={UserRoleEnum.Admin}>Admin</option>
                    <option value={UserRoleEnum.Personnel}>Personnel</option>
                    <option value={UserRoleEnum.Client}>Client</option>
                  </Form.Control>
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.currentUpdateUser.name || ''}
                    onChange={(e) =>
                      setState(prevState => ({
                        ...prevState,
                        currentUpdateUser: { ...state.currentUpdateUser, name: e.target.value },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={state.currentUpdateUser.password || ''}
                    onChange={(e) =>
                      setState(prevState => ({
                        ...prevState,
                        currentUpdateUser: { ...state.currentUpdateUser, password: e.target.value },
                      }))
                    }
                  />
                </Form.Group>
              </>
            )}
            <Button className="styled-button" onClick={handleAddOrEdit}>
              {state.editMode ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={state.showConfirmModal} onHide={() => setState(prevState => ({ ...prevState, showConfirmModal: false }))}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setState(prevState => ({ ...prevState, showConfirmModal: false }))}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopUsersForm;


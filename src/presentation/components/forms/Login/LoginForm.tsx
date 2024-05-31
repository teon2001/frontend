import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Grid, Select, MenuItem, TextField } from "@mui/material";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from '@mui/material/Select';
import { useLoginFormController } from "./LoginForm.controller";
import { useLoginApi } from '@infrastructure/apis/api-management/authentication';
import { useRegisterApi } from '@infrastructure/apis/api-management/register';
import { useAppDispatch } from '@application/store';
import { setToken } from "@application/state-slices";
import { useIntl } from "react-intl";
import "../../../pages/AuthenticationPage.scss";
import { Mode } from './LoginForm.types';
import { toast } from 'react-toastify';
import { useAppRouter } from '@infrastructure/hooks/useAppRouter';

interface Props {
  mode: Mode;
  resetForm: () => void; // Correct the type of resetForm prop
}

export const LoginForm: React.FC<Props> = ({ mode, resetForm }) => {
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const { state, actions, computed } = useLoginFormController(); // Use the controller.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRoleEnum.Admin,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const name = event.target.name as keyof typeof formData;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { loginMutation } = useLoginApi();
  const { registerMutation } = useRegisterApi();
  const { redirectToHome } = useAppRouter();

  const registerAndLogin = async (data: typeof formData) => {
    try {
      await registerMutation.mutation(data);
      const result = await loginMutation.mutation({ email: data.email, password: data.password });
      dispatch(setToken(result.response?.token ?? ''));
      toast(formatMessage({ id: "notifications.messages.authenticationSuccess" }));
      redirectToHome();
    } catch (error) {
      toast.error(formatMessage({ id: "notifications.messages.authenticationError" }));
      console.error('Failed to register and login:', error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === 'login') {
      loginMutation.mutation(formData).then((result) => {
        dispatch(setToken(result.response?.token ?? ''));
        toast(formatMessage({ id: "notifications.messages.authenticationSuccess" }));
        redirectToHome();
      }).catch((error) => {
        toast.error(formatMessage({ id: "notifications.messages.authenticationError" }));
        console.error('Failed to login:', error);
      });
    } else {
      registerAndLogin(formData);
    }
  };

  const clearFormFields = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: UserRoleEnum.Admin,
    });
  };

  useEffect(() => {
    clearFormFields();
  }, [mode]);

  return (
    <form onSubmit={handleSubmit} onReset={resetForm}>
      <Box className="form-block__input-wrapper" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          variant="outlined"
          disabled={false}
          sx={{ bgcolor: mode === 'register' ? 'transparent' : 'transparent' }} 
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          variant="outlined"
          disabled={false}
          sx={{ bgcolor: mode === 'register' ? 'transparent' : 'transparent' }} 
        />
        {mode === 'register' && (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              sx={{ bgcolor: 'transparent' }}
            />
            <Grid item xs={12}>
              <Select
                fullWidth
                name="role"
                value={formData.role}
                onChange={(event) => handleChange(event as SelectChangeEvent)}
                required
              >
                {Object.values(UserRoleEnum).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </>
        )}
        <Button variant="contained" color="primary" fullWidth type="submit">
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </Box>
    </form>
  );
};

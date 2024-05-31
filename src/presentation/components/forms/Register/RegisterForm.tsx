import React, { useState } from 'react';
import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from '@mui/material/Select';
import { Button, TextField, Box, Select, MenuItem, Container, Paper, Grid, Typography } from '@mui/material';
import { useRegisterApi } from '@infrastructure/apis/api-management/register'; // Modificarea importului
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fr } from 'date-fns/locale';
import "../../../pages/AuthenticationPage.scss";

export const RegisterForm = () => {
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
  
  const { registerMutation } = useRegisterApi();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutation(formData);
  };

  return (
    <Paper elevation={3} className="form-block">
        <Typography variant="h6" gutterBottom className="form-block__header">
          Register New Account
        </Typography>
        <form onSubmit={handleSubmit} className="form-block__input-wrapper">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
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
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
  );
};


// interface RegisterFormProps {
//   onSwitch: () => void;
// }

// export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
//   const [formData, setFormData] = useState({
//       name: '',
//       email: '',
//       password: '',
//       role: UserRoleEnum.Admin,
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
//     const name = event.target.name as keyof typeof formData;
//     const value = event.target.value;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const { registerMutation } = useRegisterApi();
  
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     registerMutation.mutation(formData);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Sign Up</h1>
//       <input
//         type="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Password"
//         required
//       />
//       <input
//         type="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Confirm Password"
//         required
//       />
      
//       <select
//         name="role"
//         value={formData.role}
//         onChange={(event) => handleChange(event)}
//         required
//       >
//         {Object.values(UserRoleEnum).map((role) => (
//           <option key={role} value={role}>
//             {role}
//           </option>
//         ))}
//       </select>

//       <button type="submit">Sign Up</button>
//       <button type="button" onClick={onSwitch}>Have an account? Log In</button>
//     </form>
//   );
// }
// src/pages/AuthenticationPage.tsx

import React, { useRef, useState } from "react";
import { LoginForm } from "@presentation/components/forms/Login/LoginForm";
import { RegisterForm } from "@presentation/components/forms/Register/RegisterForm";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormControlLabel, FormGroup, Paper, Switch, Box, Tab, Tabs } from "@mui/material";
import "./AuthenticationPage.scss";


type Mode = 'login' | 'register';

export const AuthenticationPage = () => {
    const [tabValue, setTabValue] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

  const toggleMode = () => {
      setMode(prevMode => (prevMode === 'login' ? 'register' : 'login')); // Inversăm modul curent între login și register
      formRef.current?.reset(); 
  };

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const [mode, setMode] = useState<Mode>('login'); // Stabilim modul inițial ca 'login'

  return (
    <div className={`app app--is-${mode}`}>
    <div className={`form-block-wrapper form-block-wrapper--is-${mode}`}></div>
    <div className={`form-block form-block--is-${mode}`} >
      <header className="form-block__header">
        <h1>{mode === 'login' ? 'Welcome back!' : 'Register'}</h1>
        <div className="form-block__toggle-block">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{mode === 'login' ? "Don't" : 'Already'} have an account? Click here &#8594;</span>
            <FormControlLabel
              control={<Switch checked={mode === 'register'} onChange={toggleMode} />}
              label=""
            />                     
          </Box>
        </div>
      </header>
      <LoginForm mode={mode} resetForm={() => true}/>
    </div>
  </div>
  );
};


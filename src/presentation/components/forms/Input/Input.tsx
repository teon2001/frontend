import React from 'react';
import "../../../pages/AuthenticationPage.scss";

const Input = ({ id, type, label, disabled }: {id: string, type: string, label: string, disabled: boolean}) => (
    <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled}/>
);

export default Input;
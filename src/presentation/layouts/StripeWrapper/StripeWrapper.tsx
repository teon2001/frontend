import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PJNxkAZv7mU8Lk3qRvPevbPh3HkF5uQiPnnAaNWCu1gQ278Du5IWwb0dEnTqjZu6DuU4X2zGPwpLspixG4IQOD300FOaqwleG');

const StripeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
};

export default StripeWrapper;

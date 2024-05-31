import React from 'react';
import StripeWrapper from '../layouts/StripeWrapper/StripeWrapper';
import PaymentForm from '../components/forms/Payment/PaymentForm';

const PaymentPage: React.FC = () => {
    return (
        <StripeWrapper>
            <PaymentForm />
        </StripeWrapper>
    );
};

export default PaymentPage;

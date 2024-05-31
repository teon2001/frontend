import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, TextField, Box, Typography } from '@mui/material';
import { usePaymentApi } from '../../../../infrastructure/apis/api-management/payment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaymentFormStyle.scss';
import { PaymentIntentCreateRequest } from '@infrastructure/apis/client';

const PaymentForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { payMutation } = usePaymentApi();
    const [amount, setAmount] = useState(0);
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setPaymentProcessing(true);

        try {
            const paymentRequest: PaymentIntentCreateRequest = { amount };
            const data = await payMutation.mutation(paymentRequest);
            const clientSecret = data.clientSecret || '';

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!
                }
            });
        } catch (error) {
            console.error('Payment failed:', error);
            toast.error('Payment failed');
        } finally {
            setPaymentProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="payment-form">
            <Typography variant="h4" gutterBottom>Payment Form</Typography>
            <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                margin="normal"
            />
            <div className="card-element-container">
                <CardElement options={cardElementOptions} />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!stripe || paymentProcessing}
                sx={{ mt: 2 }}
                fullWidth
            >
                Pay
            </Button>
            <ToastContainer />
        </Box>
    );
};

export default PaymentForm;
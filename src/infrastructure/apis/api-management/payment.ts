import { PaymentApi, PaymentIntentCreateRequest } from "../client";
/**
 * Use constants to identify mutations and queries.
 */
const payMutation = "payMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case just to login the user.
 */
export const usePaymentApi = () => {
    const payment = (p : PaymentIntentCreateRequest) => new PaymentApi().apiPaymentCreatePaymentIntentCreatePaymentIntentPost({paymentIntentCreateRequest : p});

    return {
        payMutation: {
            key: payMutation, 
            mutation: payment 
        }
    }
}
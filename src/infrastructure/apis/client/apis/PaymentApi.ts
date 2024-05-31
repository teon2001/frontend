/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PaymentIntentCreateRequest,
  PaymentIntentResponse,
} from '../models';
import {
    PaymentIntentCreateRequestFromJSON,
    PaymentIntentCreateRequestToJSON,
    PaymentIntentResponseFromJSON,
    PaymentIntentResponseToJSON,
} from '../models';

export interface ApiPaymentCreatePaymentIntentCreatePaymentIntentPostRequest {
    paymentIntentCreateRequest?: PaymentIntentCreateRequest;
}

/**
 * 
 */
export class PaymentApi extends runtime.BaseAPI {

    /**
     */
    async apiPaymentCreatePaymentIntentCreatePaymentIntentPostRaw(requestParameters: ApiPaymentCreatePaymentIntentCreatePaymentIntentPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaymentIntentResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Payment/CreatePaymentIntent/create-payment-intent`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PaymentIntentCreateRequestToJSON(requestParameters.paymentIntentCreateRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaymentIntentResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiPaymentCreatePaymentIntentCreatePaymentIntentPost(requestParameters: ApiPaymentCreatePaymentIntentCreatePaymentIntentPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaymentIntentResponse> {
        const response = await this.apiPaymentCreatePaymentIntentCreatePaymentIntentPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PaymentIntentCreateRequest
 */
export interface PaymentIntentCreateRequest {
    /**
     * 
     * @type {number}
     * @memberof PaymentIntentCreateRequest
     */
    amount?: number;
}

/**
 * Check if a given object implements the PaymentIntentCreateRequest interface.
 */
export function instanceOfPaymentIntentCreateRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaymentIntentCreateRequestFromJSON(json: any): PaymentIntentCreateRequest {
    return PaymentIntentCreateRequestFromJSONTyped(json, false);
}

export function PaymentIntentCreateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentIntentCreateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
    };
}

export function PaymentIntentCreateRequestToJSON(value?: PaymentIntentCreateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'amount': value.amount,
    };
}


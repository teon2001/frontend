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
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { ReviewDTO } from './ReviewDTO';
import {
    ReviewDTOFromJSON,
    ReviewDTOFromJSONTyped,
    ReviewDTOToJSON,
} from './ReviewDTO';

/**
 * 
 * @export
 * @interface ReviewDTORequestResponse
 */
export interface ReviewDTORequestResponse {
    /**
     * 
     * @type {ReviewDTO}
     * @memberof ReviewDTORequestResponse
     */
    response?: ReviewDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ReviewDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the ReviewDTORequestResponse interface.
 */
export function instanceOfReviewDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ReviewDTORequestResponseFromJSON(json: any): ReviewDTORequestResponse {
    return ReviewDTORequestResponseFromJSONTyped(json, false);
}

export function ReviewDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : ReviewDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ReviewDTORequestResponseToJSON(value?: ReviewDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': ReviewDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


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
import type { PromotionDTO } from './PromotionDTO';
import {
    PromotionDTOFromJSON,
    PromotionDTOFromJSONTyped,
    PromotionDTOToJSON,
} from './PromotionDTO';

/**
 * 
 * @export
 * @interface PromotionDTORequestResponse
 */
export interface PromotionDTORequestResponse {
    /**
     * 
     * @type {PromotionDTO}
     * @memberof PromotionDTORequestResponse
     */
    response?: PromotionDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof PromotionDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the PromotionDTORequestResponse interface.
 */
export function instanceOfPromotionDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PromotionDTORequestResponseFromJSON(json: any): PromotionDTORequestResponse {
    return PromotionDTORequestResponseFromJSONTyped(json, false);
}

export function PromotionDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PromotionDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : PromotionDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function PromotionDTORequestResponseToJSON(value?: PromotionDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': PromotionDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

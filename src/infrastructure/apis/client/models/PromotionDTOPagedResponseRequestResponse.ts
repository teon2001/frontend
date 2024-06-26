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
import type { PromotionDTOPagedResponse } from './PromotionDTOPagedResponse';
import {
    PromotionDTOPagedResponseFromJSON,
    PromotionDTOPagedResponseFromJSONTyped,
    PromotionDTOPagedResponseToJSON,
} from './PromotionDTOPagedResponse';

/**
 * 
 * @export
 * @interface PromotionDTOPagedResponseRequestResponse
 */
export interface PromotionDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {PromotionDTOPagedResponse}
     * @memberof PromotionDTOPagedResponseRequestResponse
     */
    response?: PromotionDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof PromotionDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the PromotionDTOPagedResponseRequestResponse interface.
 */
export function instanceOfPromotionDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PromotionDTOPagedResponseRequestResponseFromJSON(json: any): PromotionDTOPagedResponseRequestResponse {
    return PromotionDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function PromotionDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PromotionDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : PromotionDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function PromotionDTOPagedResponseRequestResponseToJSON(value?: PromotionDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': PromotionDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


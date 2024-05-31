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
import type { ArticleDTOPagedResponse } from './ArticleDTOPagedResponse';
import {
    ArticleDTOPagedResponseFromJSON,
    ArticleDTOPagedResponseFromJSONTyped,
    ArticleDTOPagedResponseToJSON,
} from './ArticleDTOPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface ArticleDTOPagedResponseRequestResponse
 */
export interface ArticleDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {ArticleDTOPagedResponse}
     * @memberof ArticleDTOPagedResponseRequestResponse
     */
    response?: ArticleDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ArticleDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the ArticleDTOPagedResponseRequestResponse interface.
 */
export function instanceOfArticleDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ArticleDTOPagedResponseRequestResponseFromJSON(json: any): ArticleDTOPagedResponseRequestResponse {
    return ArticleDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function ArticleDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : ArticleDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ArticleDTOPagedResponseRequestResponseToJSON(value?: ArticleDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': ArticleDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


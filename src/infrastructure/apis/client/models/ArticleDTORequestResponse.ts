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
import type { ArticleDTO } from './ArticleDTO';
import {
    ArticleDTOFromJSON,
    ArticleDTOFromJSONTyped,
    ArticleDTOToJSON,
} from './ArticleDTO';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface ArticleDTORequestResponse
 */
export interface ArticleDTORequestResponse {
    /**
     * 
     * @type {ArticleDTO}
     * @memberof ArticleDTORequestResponse
     */
    response?: ArticleDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ArticleDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the ArticleDTORequestResponse interface.
 */
export function instanceOfArticleDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ArticleDTORequestResponseFromJSON(json: any): ArticleDTORequestResponse {
    return ArticleDTORequestResponseFromJSONTyped(json, false);
}

export function ArticleDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : ArticleDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ArticleDTORequestResponseToJSON(value?: ArticleDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': ArticleDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


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
import type { ProfileDTO } from './ProfileDTO';
import {
    ProfileDTOFromJSON,
    ProfileDTOFromJSONTyped,
    ProfileDTOToJSON,
} from './ProfileDTO';

/**
 * 
 * @export
 * @interface ProfileDTORequestResponse
 */
export interface ProfileDTORequestResponse {
    /**
     * 
     * @type {ProfileDTO}
     * @memberof ProfileDTORequestResponse
     */
    response?: ProfileDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ProfileDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the ProfileDTORequestResponse interface.
 */
export function instanceOfProfileDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProfileDTORequestResponseFromJSON(json: any): ProfileDTORequestResponse {
    return ProfileDTORequestResponseFromJSONTyped(json, false);
}

export function ProfileDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfileDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : ProfileDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ProfileDTORequestResponseToJSON(value?: ProfileDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': ProfileDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


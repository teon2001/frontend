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
 * @interface ReviewAddDTO
 */
export interface ReviewAddDTO {
    /**
     * 
     * @type {string}
     * @memberof ReviewAddDTO
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof ReviewAddDTO
     */
    foodId?: string;
    /**
     * 
     * @type {number}
     * @memberof ReviewAddDTO
     */
    rating?: number;
    /**
     * 
     * @type {string}
     * @memberof ReviewAddDTO
     */
    comment?: string | null;
}

/**
 * Check if a given object implements the ReviewAddDTO interface.
 */
export function instanceOfReviewAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ReviewAddDTOFromJSON(json: any): ReviewAddDTO {
    return ReviewAddDTOFromJSONTyped(json, false);
}

export function ReviewAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'foodId': !exists(json, 'foodId') ? undefined : json['foodId'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'comment': !exists(json, 'comment') ? undefined : json['comment'],
    };
}

export function ReviewAddDTOToJSON(value?: ReviewAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userId': value.userId,
        'foodId': value.foodId,
        'rating': value.rating,
        'comment': value.comment,
    };
}


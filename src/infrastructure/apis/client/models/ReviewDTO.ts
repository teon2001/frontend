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
 * @interface ReviewDTO
 */
export interface ReviewDTO {
    /**
     * 
     * @type {string}
     * @memberof ReviewDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ReviewDTO
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof ReviewDTO
     */
    foodId?: string;
    /**
     * 
     * @type {number}
     * @memberof ReviewDTO
     */
    rating?: number;
    /**
     * 
     * @type {string}
     * @memberof ReviewDTO
     */
    comment?: string | null;
}

/**
 * Check if a given object implements the ReviewDTO interface.
 */
export function instanceOfReviewDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ReviewDTOFromJSON(json: any): ReviewDTO {
    return ReviewDTOFromJSONTyped(json, false);
}

export function ReviewDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'foodId': !exists(json, 'foodId') ? undefined : json['foodId'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'comment': !exists(json, 'comment') ? undefined : json['comment'],
    };
}

export function ReviewDTOToJSON(value?: ReviewDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'userId': value.userId,
        'foodId': value.foodId,
        'rating': value.rating,
        'comment': value.comment,
    };
}

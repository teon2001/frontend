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
 * @interface FoodDTO
 */
export interface FoodDTO {
    /**
     * 
     * @type {string}
     * @memberof FoodDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof FoodDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FoodDTO
     */
    description?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FoodDTO
     */
    price?: number;
    /**
     * 
     * @type {string}
     * @memberof FoodDTO
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FoodDTO
     */
    kcalPer100g?: number;
    /**
     * 
     * @type {number}
     * @memberof FoodDTO
     */
    quantity?: number;
}

/**
 * Check if a given object implements the FoodDTO interface.
 */
export function instanceOfFoodDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FoodDTOFromJSON(json: any): FoodDTO {
    return FoodDTOFromJSONTyped(json, false);
}

export function FoodDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): FoodDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'price': !exists(json, 'price') ? undefined : json['price'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'kcalPer100g': !exists(json, 'kcalPer100g') ? undefined : json['kcalPer100g'],
        'quantity': !exists(json, 'quantity') ? undefined : json['quantity'],
    };
}

export function FoodDTOToJSON(value?: FoodDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'price': value.price,
        'imageUrl': value.imageUrl,
        'kcalPer100g': value.kcalPer100g,
        'quantity': value.quantity,
    };
}


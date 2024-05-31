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
import type { PromotionDTO } from './PromotionDTO';
import {
    PromotionDTOFromJSON,
    PromotionDTOFromJSONTyped,
    PromotionDTOToJSON,
} from './PromotionDTO';

/**
 * 
 * @export
 * @interface PromotionDTOPagedResponse
 */
export interface PromotionDTOPagedResponse {
    /**
     * 
     * @type {number}
     * @memberof PromotionDTOPagedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof PromotionDTOPagedResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PromotionDTOPagedResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<PromotionDTO>}
     * @memberof PromotionDTOPagedResponse
     */
    data?: Array<PromotionDTO> | null;
}

/**
 * Check if a given object implements the PromotionDTOPagedResponse interface.
 */
export function instanceOfPromotionDTOPagedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PromotionDTOPagedResponseFromJSON(json: any): PromotionDTOPagedResponse {
    return PromotionDTOPagedResponseFromJSONTyped(json, false);
}

export function PromotionDTOPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PromotionDTOPagedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'data': !exists(json, 'data') ? undefined : (json['data'] === null ? null : (json['data'] as Array<any>).map(PromotionDTOFromJSON)),
    };
}

export function PromotionDTOPagedResponseToJSON(value?: PromotionDTOPagedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'pageSize': value.pageSize,
        'totalCount': value.totalCount,
        'data': value.data === undefined ? undefined : (value.data === null ? null : (value.data as Array<any>).map(PromotionDTOToJSON)),
    };
}

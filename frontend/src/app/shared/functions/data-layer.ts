import { FormArray } from "@angular/forms";
import { ProductId } from "../utils/enums";

export enum ProductIdDataLayers {
    Travel = 'travel_local',
}

export interface DataLayerModel {
    event: string,
    product_name: ProductIdDataLayers,
    section?: string,
    choice_value?: string,
    step_name?: string
}

export function initGmt(params: DataLayerModel) {
    (globalThis as any).dataLayer.push(params)
}


export function transformProductName(productId: ProductId) {
    const sources: Record<number, string> = {
        [ProductId.Travel]: ProductIdDataLayers.Travel,
    };
    return sources[productId] || null;
}


export function getAddOnesKeys(keys: string[], controls: FormArray): string {
    let st = '';

    controls.controls.forEach(group => {
        keys.forEach(key => {
            const value = group.get(key)?.value;
            if (value) {
                st += key + ',';
            }
        });
    });
    return st || 'none'
}




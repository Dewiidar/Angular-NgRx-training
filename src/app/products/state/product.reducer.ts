import {Product} from "../product";
import * as fromRoot from "../../state/app.state";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductActions, ProductActionTypes} from "./product.actions";

export interface IProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string;
}

export interface IState extends fromRoot.IState {
    products: IProductState
}

const initialState: IProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
    error: ''
};

const getProductFeatureState = createFeatureSelector<IProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

export function reducer(state = initialState, action: ProductActions): IProductState {

    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };
        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProduct: { ...action.payload }
            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProduct: null
            };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0,
                }
            };
        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products:  action.payload,
                error: ''
            };
        case ProductActionTypes.LoadFail:
            return {
                ...state,
                products: [],
                error:  action.payload
            };

        default:
            return state;
    }

}

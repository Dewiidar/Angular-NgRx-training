import {Product} from "../product";
import {ProductActions, ProductActionTypes} from "./product.actions";

export interface IProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
    update: string;
}

const initialState: IProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: '',
    update: '',
};

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
                currentProductId: action.payload.id
            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            };

        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products: action.payload,
                error: ''
            };
        case ProductActionTypes.LoadFail:
            return {
                ...state,
                products: [],
                error: action.payload
            };
        case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts = state.products.map(
                item => action.payload.id === item.id ? action.payload : item
            );
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.payload.id,
                error: ''
            };
        case ProductActionTypes.UpdateProductFail:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }

}

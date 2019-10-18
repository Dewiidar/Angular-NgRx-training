import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {ProductService} from "../product.service";
import * as ProductActions from "./product.actions";
import {map, mergeMap} from "rxjs/operators";
import {Product} from "../product";

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {

    }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(ProductActions.ProductActionTypes.Load),
        mergeMap(
            (action: ProductActions.Load) => {
                return this.productService.getProducts().pipe(
                    map((products: Product[]) => {
                        new ProductActions.LoadSuccess(products)
                    })
                )
            }
        )
    )
}

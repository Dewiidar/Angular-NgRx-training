import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product} from '../../product';
import {ProductService} from '../../product.service';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromProduct from "../../state"
import * as productActions from "../../state/product.actions"


@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

// This component is now called a smart component (a container component)
export class ProductShellComponent implements OnInit {

    errorMessage$: Observable<string>;
    displayCode$: Observable<boolean>;
    products$: Observable<Product[]>;
    selectedProduct$: Observable<Product>;

    constructor(private productService: ProductService, private store: Store<fromProduct.IState>) {
    }

    ngOnInit(): void {
        // using an effect (we dispatches an action that triggers an effect)
        this.store.dispatch(new productActions.Load());

        this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));

        this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));

        // we listen to the store for when the products is retrieved
        this.products$ = this.store.pipe(select(fromProduct.getProducts));
        // we listen for retrieving products error
        this.errorMessage$ = this.store.pipe(select(fromProduct.getError))
    }

    checkChanged(value: boolean): void {
        this.store.dispatch(new productActions.ToggleProductCode(value))
    }

    newProduct(): void {
        this.store.dispatch(new productActions.InitializeCurrentProduct());
    }

    productSelected(product: Product): void {
        this.store.dispatch(new productActions.SetCurrentProduct(product));
    }
}

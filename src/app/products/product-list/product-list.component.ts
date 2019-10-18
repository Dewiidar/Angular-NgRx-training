import {Component, OnInit, OnDestroy} from '@angular/core';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromProduct from "../state/product.reducer"
import * as productActions from "../state/product.actions"


@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    errorMessage: string;

    displayCode: boolean;

    // Used to highlight the selected product in the list
    selectedProduct: Product | null;
    products$: Observable<Product[]>;

    constructor(private productService: ProductService, private store: Store<fromProduct.IState>) {
    }

    ngOnInit(): void {
        // without a selector
        // this.sub = this.productService.selectedProductChanges$.subscribe(
        //     selectedProduct => this.selectedProduct = selectedProduct
        // );

        // using a selector
        this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
            currentProduct => this.selectedProduct = currentProduct
        );

        // without a selector
        // this.store.pipe(select('products')).subscribe(
        //     products => {
        //         this.displayCode = products.showProductCode
        //     }
        // );

        // using a selector
        this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
            showProductCode => this.displayCode = showProductCode
        );


        // without an effect
        // this.productService.getProducts().subscribe(
        //     (products: Product[]) => this.products = products,
        //     (err: any) => this.errorMessage = err.error
        // );

        // using an effect (we dispatches an action that triggers an effect)
        this.store.dispatch(new productActions.Load());
        // we listen to the store for when the products is retrieved
        this.products$ = this.store.pipe(select(fromProduct.getProducts))
    }

    ngOnDestroy(): void {
    }

    checkChanged(value: boolean): void {
        this.store.dispatch(new productActions.ToggleProductCode(value))
    }

    newProduct(): void {
        // without a selector
        // this.productService.changeSelectedProduct(this.productService.newProduct());

        // with a selector
        this.store.dispatch(new productActions.InitializeCurrentProduct());
    }

    productSelected(product: Product): void {
        // without a selector
        // this.productService.changeSelectedProduct(product);

        // with a selector
        this.store.dispatch(new productActions.SetCurrentProduct(product));
    }

}

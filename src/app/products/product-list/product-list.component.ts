import {Component, OnInit, OnDestroy} from '@angular/core';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from "@ngrx/store";
import * as fromProduct from "../state/product.reducer"
import * as ProductActions from "../state/product.actions"


@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    errorMessage: string;

    displayCode: boolean;

    products: Product[];

    // Used to highlight the selected product in the list
    selectedProduct: Product | null;

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


        this.productService.getProducts().subscribe(
            (products: Product[]) => this.products = products,
            (err: any) => this.errorMessage = err.error
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
        )
    }

    ngOnDestroy(): void {
    }

    checkChanged(value: boolean): void {
        this.store.dispatch(new ProductActions.ToggleProductCode(value))
    }

    newProduct(): void {
        // without a selector
        // this.productService.changeSelectedProduct(this.productService.newProduct());

        // with a selector
        this.store.dispatch(new ProductActions.InitializeCurrentProduct());
    }

    productSelected(product: Product): void {
        // without a selector
        // this.productService.changeSelectedProduct(product);

        // with a selector
        this.store.dispatch(new ProductActions.SetCurrentProduct(product));
    }

}

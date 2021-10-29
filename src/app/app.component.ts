import { Component, OnInit } from '@angular/core';
import * as ProductDB from '../assets/products.json' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'problem1';
  db = JSON.parse(JSON.stringify(ProductDB))["default"];
  BASIC_TAX = 10;
  IMPORT_TAX = 5;
  
  exemptProducts = ["books","food","medical"]

  constructor(){
    console.log(this.getProductTaxes("i_bottle_perfume_2"))
  }

  getProduct(id:any){
    var product = this.db[id];
    return product;
  }

  getProductTaxes(id:any){
    var product = this.getProduct(id);
    var tax = 0;

    if(!this.exemptProducts.includes(product.category))
      tax += this.BASIC_TAX;
    if(product.imported == "true")
      tax += this.IMPORT_TAX;
    
    var productTax = ((tax*product.price)/100)
    var roundedProductTax = (Math.ceil(productTax*20)/20).toFixed(2);

    return roundedProductTax;
  }
}

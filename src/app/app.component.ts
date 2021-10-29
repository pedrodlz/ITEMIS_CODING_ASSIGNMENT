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
  BASIC_TAX = "10";
  IMPORT_TAX = "5";
  
  exemptProducts = ["books","food","medical"]

  getProduct(id:any){
    var product = this.db[id];
    return product;
  }

  getProductTaxes(id:any){
    var product = this.getProduct(id);
  }
}

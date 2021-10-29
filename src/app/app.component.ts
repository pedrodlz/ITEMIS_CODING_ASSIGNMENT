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
    var input1 = [
      {qty:1,id:"book"},
      {qty:1,id:"music_cd"},
      {qty:1,id:"chocolate_bar"}]

    var input2 = [
      {qty:1,id:"i_box_chocolates"},
      {qty:1,id:"i_bottle_perfume"}]

    var input3 = [
      {qty:1,id:"i_bottle_perfume_2"},
      {qty:1,id:"bottle_perfume"},
      {qty:1,id:"packet_headache_pill"},
      {qty:1,id:"i_box_imported_chocolates"}]

    this.printReceipt(input2)
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

    return +roundedProductTax;
  }

  printReceipt(selectedProducts:any){
    var salesTaxes = 0;
    var total = 0;

    selectedProducts.forEach((plainProduct:any)=>{
      var product = this.getProduct(plainProduct.id);
      var taxes = this.getProductTaxes(plainProduct.id);

      salesTaxes += plainProduct.qty*(+taxes);
      var productWithTaxes = (plainProduct.qty*(+product.price + taxes))
      total += +productWithTaxes;

      console.log(plainProduct.qty + " " + product.name + ": " + productWithTaxes.toFixed(2))
    })

    console.log("Sales Taxes: " + salesTaxes.toFixed(2));
    console.log("Total: " + total.toFixed(2));
  }
}

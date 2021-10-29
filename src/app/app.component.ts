import { Component, OnInit } from '@angular/core';
import * as ProductDB from '../assets/products.json' ;


export interface Product{
  id:string,
  name:string,
  price:string,
  category:string,
  imported:string
}

export interface ProductList{
  qty:number,
  id:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'problem1';
  db = JSON.parse(JSON.stringify(ProductDB))["default"];
  productsList:Array<Product> = Object.values(this.db)
  BASIC_TAX = 10;
  IMPORT_TAX = 5;
  exemptProducts = ["books","food","medical"]

  selectedItem:any = "";

  input1 = [
    {qty:1,id:"book"},
    {qty:1,id:"music_cd"},
    {qty:1,id:"chocolate_bar"}]

  input2 = [
    {qty:1,id:"i_box_chocolates"},
    {qty:1,id:"i_bottle_perfume"}]

  input3 = [
    {qty:1,id:"i_bottle_perfume_2"},
    {qty:1,id:"bottle_perfume"},
    {qty:1,id:"packet_headache_pill"},
    {qty:1,id:"i_box_imported_chocolates"}]

  customInput:Array<ProductList> = [];

  constructor(){
    //this.printReceipt(this.input2)
  }

  getProduct(id:any){
    var product = this.db[id];
    if(product == undefined) return {price:0}
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

  printReceipt(selectedProducts:any, resultIDContainer:string){
    var salesTaxes = 0;
    var total = 0;
    var result = ""

    selectedProducts.forEach((plainProduct:any)=>{
      var product = this.getProduct(plainProduct.id);
      var taxes = this.getProductTaxes(plainProduct.id);

      salesTaxes += plainProduct.qty*(+taxes);
      var productWithTaxes = (plainProduct.qty*(+product.price + taxes))
      total += +productWithTaxes;

      console.log(plainProduct.qty + " " + product.name + ": " + productWithTaxes.toFixed(2))
      result += plainProduct.qty + " " + product.name + ": " + productWithTaxes.toFixed(2) + "<br />"
    })

    console.log("Sales Taxes: " + salesTaxes.toFixed(2));
    console.log("Total: " + total.toFixed(2));

    result += "Sales Taxes: " + salesTaxes.toFixed(2) + "<br />";
    result += "Total: " + total.toFixed(2);

    var resultContainer = document.getElementById(resultIDContainer);
    if(resultContainer?.isConnected){
      resultContainer.innerHTML = result;
    }
  }

  addProduct(){
    this.customInput.push({qty:1,id:""})
  }

  updateQty(value:string,id:any){
    this.customInput[id].qty = +value;
  }

  updateSelection(value:string,id:any){
    console.log(value + id)
    this.customInput[id].id = value;
  }
}

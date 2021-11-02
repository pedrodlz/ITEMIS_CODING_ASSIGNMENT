import { Component, OnInit } from '@angular/core';
import * as ProductDB from '../assets/products.json' ;

// Interface used for the products stored in the DB
export interface Product{
  id:string,
  name:string,
  price:string,
  category:string,
  imported:string
}

// Interface used for the products stores in the shopping list
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

  db = JSON.parse(JSON.stringify(ProductDB))["default"];  // DB export
  productsList:Array<Product> = Object.values(this.db)    // Creattion of the selection list,
                                                          // used for custom shopping list
  BASIC_TAX = 10; // CONST base tax for all products except exempted ones
  IMPORT_TAX = 5; // CONST extra tax for all impoted products
  exemptProducts = ["books","food","medical"] // List of categories exempted from base tax

  // Example input 1
  input1 = [
    {qty:1,id:"book"},
    {qty:1,id:"music_cd"},
    {qty:1,id:"chocolate_bar"}]

  // Example input 2
  input2 = [
    {qty:1,id:"i_box_chocolates"},
    {qty:1,id:"i_bottle_perfume"}]

  // Example input 3
  input3 = [
    {qty:1,id:"i_bottle_perfume_2"},
    {qty:1,id:"bottle_perfume"},
    {qty:1,id:"packet_headache_pill"},
    {qty:1,id:"i_box_imported_chocolates"}]

  customInput:Array<ProductList> = [];  // Custom shopping list with the 
                                        // products selected and quantities

  constructor(){
    //this.printReceipt(this.input2)
  }

  // Given an id returns the product object
  getProduct(id:any){
    var product = this.db[id];
    if(product == undefined) return {price:0}
    return product;
  }

  // Given the id of a product return the tax associated with that product
  getProductTaxes(id:any){
    var product = this.getProduct(id);
    var tax = 0;

    if(!this.exemptProducts.includes(product.category))
      tax += this.BASIC_TAX;
    if(product.imported == "true")
      tax += this.IMPORT_TAX;
    
    var productTax = ((tax*product.price)/100)  //Base tax of product
    var roundedProductTax = (Math.ceil(productTax*20)/20).toFixed(2); // Rounded tax up to 0.05

    return +roundedProductTax;
  }

  // Given a shopping list object and a container, print the 
  // resulting output in that given container
  printReceipt(selectedProducts:any, resultIDContainer:string){
    var salesTaxes = 0;
    var total = 0;
    var result = ""

    // For each product calculate the taxes and add them to the total
    selectedProducts.forEach((plainProduct:any)=>{
      var product = this.getProduct(plainProduct.id);
      var taxes = this.getProductTaxes(plainProduct.id);

      salesTaxes += plainProduct.qty*(+taxes);
      var productWithTaxes = (plainProduct.qty*(+product.price + taxes))
      total += +productWithTaxes;

      console.debug(plainProduct.qty + " " + product.name + ": " + productWithTaxes.toFixed(2))
      result += plainProduct.qty + " " + product.name + ": " + productWithTaxes.toFixed(2) + "<br />"
    })

    console.debug("Sales Taxes: " + salesTaxes.toFixed(2));
    console.debug("Total: " + total.toFixed(2));

    result += "Sales Taxes: " + salesTaxes.toFixed(2) + "<br />";
    result += "Total: " + total.toFixed(2);

    var resultContainer = document.getElementById(resultIDContainer);
    if(resultContainer?.isConnected){
      resultContainer.innerHTML = result;
    }
  }

  // Add product to custom list
  addProduct(){
    this.customInput.push({qty:1,id:""})
  }

  // Update quantity of a product
  updateQty(value:string,id:any){
    this.customInput[id].qty = +value;
  }

  // Change product selected
  updateSelection(value:string,id:any){
    console.debug(value + id)
    this.customInput[id].id = value;
  }
}

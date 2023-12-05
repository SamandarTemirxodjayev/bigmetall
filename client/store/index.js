import { defineStore } from "pinia";

export const useCounterStore = defineStore("store", {
  state: () => ({
    count: []
  }),
  actions: {
    add(product) {
      const existingProduct = this.count.find(p => 
        p.name == product.name && 
        p.qalinligi == product.qalinligi &&
        p.qalinligi_ortasi == product.qalinligi_ortasi && 
        p.olchamlari == product.olchamlari && 
        p.category == product.category &&
        p.holati == product.holati && 
        p.uzunligi == product.uzunligi &&
        p.uzunligi_y == product.uzunligi_y && 
        p.uzunligi_x == product.uzunligi_x &&
        p.sklad == product.sklad &&
        p.price == product.price && 
        p.saledPrice == product.saledPrice
      );
    
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.count.push({...product, quantity: 1});
      }
    },
    deleteProduct(product) {
      const existingProduct = this.count.find(p => 
        p.name == product.name && 
        p.qalinligi == product.qalinligi &&
        p.qalinligi_ortasi == product.qalinligi_ortasi && 
        p.olchamlari == product.olchamlari && 
        p.category == product.category &&
        p.holati == product.holati && 
        p.uzunligi == product.uzunligi &&
        p.uzunligi_y == product.uzunligi_y && 
        p.uzunligi_x == product.uzunligi_x &&
        p.sklad == product.sklad &&
        p.price == product.price && 
        p.saledPrice == product.saledPrice
      );
      if (existingProduct) {
        existingProduct.quantity--;
        if (existingProduct.quantity === 0) {
          const index = this.count.indexOf(existingProduct);
          this.count.splice(index, 1);
        }
      }else{
        console.log("Product not found");
      }
    },
    productDelete(product) {
      const existingProduct = this.count.find(p => 
        p.name == product.name && 
        p.qalinligi == product.qalinligi &&
        p.qalinligi_ortasi == product.qalinligi_ortasi && 
        p.olchamlari == product.olchamlari && 
        p.category == product.category &&
        p.holati == product.holati && 
        p.uzunligi == product.uzunligi &&
        p.uzunligi_y == product.uzunligi_y && 
        p.uzunligi_x == product.uzunligi_x &&
        p.sklad == product.sklad &&
        p.price == product.price && 
        p.saledPrice == product.saledPrice
      );
      if (existingProduct) {
        const index = this.count.indexOf(existingProduct);
        this.count.splice(index, 1);
      }else{
        console.log("Product not found");
      }
    },
    reset(product){
      const existingProduct = this.count.find(p => p.id === product.id);
      if (existingProduct) {
        const index = this.count.indexOf(existingProduct);
          this.count.splice(index, 1);
      }
    },
    resetAll(){
      this.count = [];
    },
    get(){
      return this.count;
    },
    update(product){
      const existingProduct = this.count.find(p => 
        p.name == product.name && 
        p.qalinligi == product.qalinligi &&
        p.qalinligi_ortasi == product.qalinligi_ortasi && 
        p.olchamlari == product.olchamlari && 
        p.category == product.category &&
        p.holati == product.holati && 
        p.uzunligi == product.uzunligi &&
        p.uzunligi_y == product.uzunligi_y && 
        p.uzunligi_x == product.uzunligi_x &&
        p.sklad == product.sklad
      );
      if (existingProduct) {
        existingProduct.saledPrice = product.saledPrice;
      } else {
        return console.log("Product not found");
      }
    },
  },
  persist: {
    storage: persistedState.localStorage
  }
});

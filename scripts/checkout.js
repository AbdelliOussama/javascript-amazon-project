import { renderCartSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js';
// import'../data/cart-class.js';


Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve();
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(()=>{
    renderCartSummary();
    renderPaymentSummary();
});

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderCartSummary();
    renderPaymentSummary();
});

*/



// loadProducts(() => {
//     renderCartSummary();
//     renderPaymentSummary();
// });
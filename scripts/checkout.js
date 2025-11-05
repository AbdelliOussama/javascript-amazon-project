import { renderCartSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js';
// import'../data/cart-class.js';

async function loadPage() {
    try {
    await loadProductsFetch();
    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
    renderCartSummary();
    renderPaymentSummary();
    } catch (error) {
        console.error("Error loading page:", error);
    }
}
loadPage();

/*
Promise.all([
    // new Promise((resolve) => {
    //     loadProducts(() => {
    //         resolve();
    //     });
    // }),
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(()=>{
    renderCartSummary();
    renderPaymentSummary();
});

*/

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
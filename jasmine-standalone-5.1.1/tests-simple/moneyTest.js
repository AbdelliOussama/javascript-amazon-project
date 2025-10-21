import { formatCurrency } from "../../scripts/utils/money.js";

console.log('test suite : formatCurrency');
console.log('------------------------------');

console.log('convert cents to dollars');

if(formatCurrency(199) === '1.99'){
    console.log('✅ passed');
}
else{
    console.log('❌ failed');
}

console.log('convert zero cents to dollars');

if(formatCurrency(0) === '0.00'){
    console.log('✅ passed');
}
else{
    console.log('❌ failed');
}
console.log('convert large amount of cents to dollars');

if(formatCurrency(123456789) === '1234567.89'){
    console.log('✅ passed');
}
else{
    console.log('❌ failed');
}
console.log('convert negative amount of cents to dollars');

if(formatCurrency(-500) === '-5.00'){
    console.log('✅ passed');
}
else{
    console.log('❌ failed');
}
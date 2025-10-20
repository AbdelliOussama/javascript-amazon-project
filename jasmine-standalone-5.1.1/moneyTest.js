import {formatCurrency} from '../scripts/utils/money.js';

describe(' test suits: formatCurrency', () => {
    it('should convert cents to dollars', () => {
        expect(formatCurrency(199)).toEqual('1.99');
    });

    it('should convert zero cents to dollars', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('should convert large amount of cents to dollars', () => {
        expect(formatCurrency(123456789)).toEqual('1234567.89');
    });

    it('should convert negative amount of cents to dollars', () => {
        expect(formatCurrency(-500)).toEqual('-5.00');
    });
});

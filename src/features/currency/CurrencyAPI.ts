import {endpoints} from './CurrencyEndpoints';

export async function getAvailableCurrencies(): Promise<any> {
    const data = await fetch(endpoints.allCurrencies);
    return await data.json();
}

export async function getRates(base: string): Promise<any> {
    const data = await fetch(endpoints.live + base);
    return await data.json();
}

export async function convert(curr1: string, curr2: string): Promise<any> {
    const data = await getRates(curr1)
    const rates = Object.entries(data.rates).filter(entry => entry[0] === curr2);
    if(rates.length > 0) {
        return rates[0][1]
    } else {
        throw new Error('Cannot convert to this currency!');
    }
}
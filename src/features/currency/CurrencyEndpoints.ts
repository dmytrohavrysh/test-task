const baseEndpoint: string = 'https://api.vatcomply.com';

const endpoints =  {
    allCurrencies: baseEndpoint + '/currencies',
    live: baseEndpoint + '/rates?base='
}

export {endpoints};
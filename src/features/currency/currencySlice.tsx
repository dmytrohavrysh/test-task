import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getAvailableCurrencies, getRates } from "./CurrencyAPI";

export interface CurrencyState {
  value: string;
  available: string[]
  rates: {[key: string]: number}
}

const initialState: CurrencyState = {
  value: 'EUR',
  available: [],
  rates: {},
};

interface Response {
  rates: {[key: string]: number}
}

export const getCurrenciesAsync = createAsyncThunk(
  'currency/getAvailableCurrencies',
  async () => {
    const response = await getAvailableCurrencies();
    return Object.keys(response);
  }
  );
  
  export const gateRatesAsync = createAsyncThunk(
    'currency/getRates',
    async (base: string) => {
      const response:Response = await getRates(base);
      const transformed:any = {}
      for(const [key, value] of Object.entries(response.rates)) {
        transformed[key] = Math.round(value * 1000) / 1000
      }
      return transformed;
    }
    )
    
    
    export const currencySlice = createSlice({
      name: 'currency',
      initialState,
      reducers: {
        changeCurrency: (state, action: PayloadAction<string>) => {
          state.value = action.payload;
        },
      },
      extraReducers: (builder) => {
        builder
        .addCase(getCurrenciesAsync.fulfilled, (state, action) => {
          state.available = action.payload;
        })
        .addCase(gateRatesAsync.fulfilled, (state, action) => {
          state.rates = action.payload
        })
      },
    });
    
    export const { changeCurrency } = currencySlice.actions;
    export const selectCurrency = (state: RootState) => state.currency.value;
    export const selectAllCurrencies = (state: RootState) => state.currency.available;
    export const selectRates = (state: RootState) => state.currency.rates;
    
    export default currencySlice.reducer;
    
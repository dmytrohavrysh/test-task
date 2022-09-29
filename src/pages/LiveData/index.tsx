import {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { gateRatesAsync, selectCurrency, selectRates } from "../../features/currency/currencySlice";
import styles from "./LiveData.module.css";

export default function LiveData() {
  const rates = useAppSelector(selectRates);
  const current = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(gateRatesAsync(current));
  }, [dispatch, current])

  return (
    <div  className={styles.container}>
      <h1>Live</h1>
      <ul className={styles.currencies__list}>
        {Object.entries(rates).map(([key, value]) => <li key={key} className={styles.currencies__item}>1 {key} = {value} {current}</li>)}
      </ul>
    </div>
  )
}

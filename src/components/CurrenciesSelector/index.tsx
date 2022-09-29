import {SyntheticEvent} from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllCurrencies } from '../../features/currency/currencySlice'
import styles from './CurrenciesSelector.module.css';

interface currenciesListProps {
    currencyChanged: (newVal: string) => void,
    defaultValue?: string
}

export default function CurrencisSelector({currencyChanged, defaultValue}: currenciesListProps) {
    const currencies = useAppSelector(selectAllCurrencies)
    const onChangeHandler = (e: SyntheticEvent) => {
        currencyChanged((e.currentTarget as HTMLSelectElement).value)
    }
    return (
        <select className={styles.select} onChange={onChangeHandler} defaultValue={defaultValue}>
            {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
  )
}

import CurrencisSelector from '../CurrenciesSelector';
import {useState, FormEvent, SyntheticEvent} from 'react';
import styles from './Exchange.module.css';
import { useAppSelector } from '../../app/hooks';
import { selectCurrency } from '../../features/currency/currencySlice';
import { convert } from '../../features/currency/CurrencyAPI';

interface selectedCurrenciesType {
    from: string,
    to: string
}
enum selectType {
    FROM='from', TO='to'
}

export default function Exchange() {
    const [sum, setSum] = useState(0);
    const [result, setResult] = useState<any>(0);
    const currCurrencie = useAppSelector(selectCurrency);
    const [selectedCurrencies, setSelectedCurrencies] = useState<selectedCurrenciesType>({from: currCurrencie, to: currCurrencie});
    
    const handleChange = (val: string, t: selectType) => {
        const newSelectedCurrencies = {...selectedCurrencies};
        newSelectedCurrencies[t] = val
        setSelectedCurrencies(newSelectedCurrencies)
    }
    
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        convert(selectedCurrencies.from, selectedCurrencies.to)
            .then(res => {setResult(Math.round(res * sum * 100) / 100)})
            .catch((e: Error) => setResult(e.message))
    }
    
    const changeNumber = (e: FormEvent<HTMLInputElement>) => {
        setSum(+e.currentTarget.value);
    }
    
    return (
        <div className={styles.container}>
            <h1>Currency Exchange</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type='number' className={styles.input} onInput={changeNumber} defaultValue='0' min='0'/>
                <CurrencisSelector defaultValue={currCurrencie} currencyChanged={(newVal) => handleChange(newVal, selectType.FROM)} />
                <CurrencisSelector defaultValue={currCurrencie} currencyChanged={(newVal) => handleChange(newVal, selectType.TO)} />
                <button className={styles.btn} type='submit'>Exchange</button>
            </form>
            <h2>{result}</h2>
        </div>
        )
    }
    
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { changeCurrency, gateRatesAsync } from '../../features/currency/currencySlice';
import { useAppDispatch } from '../../app/hooks';
import CurrencisSelector from '../CurrenciesSelector';

export function Header() {
    const dispatch = useAppDispatch()
    
    const changeCurrentCurrency = (newVal: string) => {
        dispatch(changeCurrency(newVal))
        dispatch(gateRatesAsync(newVal))
    }
    return (
        <header className={styles.header}>
            <nav className={styles.menu}>
                <ul className={styles.menu__list}>
                    <li><Link to='/' className={styles.menu__link}>Converter</Link></li>
                    <li><Link to='/live-data' className={styles.menu__link}>Live data</Link></li>
                </ul>
            </nav>
            <div>
                <span>Base currency: </span>
                <CurrencisSelector currencyChanged={changeCurrentCurrency}/>
            </div>
        </header>
    )
}
import React, { useState } from 'react';
import styles from './App.module.scss';
import { Outlet, Link } from 'react-router-dom';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);

  return (
    <div>
        <Link to={'/about'}>About</Link>
        <br />
        <Link to={'/shop'}>Shop</Link>
        <br />
        
        {count}
        <button className={styles.button} onClick={increment}>Plus</button>

        <Outlet />
    </div>
  )
}

// import React, { useState } from 'react';
// import styles from './App.module.scss';
import { Outlet, Link } from 'react-router-dom';
// import iconPng from '@/assets/win_p.png';
// import WindowSvg from '@/assets/win_s.svg';

export const App = () => {
	// const [count, setCount] = useState<number>(0);

	// const increment = () => setCount((prev) => prev + 1);

	return (
		<div>
			PAGES
			{/* <h1>Platform: {_PLATFORM_}</h1>
			<div>
				<img width={100} height={100} src={iconPng} alt="window" />
			</div>

			<div><WindowSvg width={100} height={100} color={'red'} /></div> */}

			{/* <Link to={'/about'}>About</Link> */}
			<br />
			<Link to={'/shop'}>Shop</Link>
			<br />

			{/* {count}
			<button className={styles.button} onClick={increment}>
				Plus
			</button> */}

			<Outlet />
		</div>
	);
};

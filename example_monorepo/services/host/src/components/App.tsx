import { Outlet, Link } from 'react-router-dom';
import { adminRoutes } from '@packages/shared/src/routes/admin';
import { shopRoutes } from '@packages/shared/src/routes/shop';

export const App = () => {
	return (
		<div>
			<Link to={adminRoutes.about}>About</Link>
			<br />
			<Link to={shopRoutes.main}>Shop</Link>
			<br />

			<Outlet />
		</div>
	);
};

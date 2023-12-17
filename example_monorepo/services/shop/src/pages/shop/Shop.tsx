import React from 'react'
import { Link } from 'react-router-dom';
import { shopRoutes } from '@packages/shared/src/routes/shop';

const Shop = () => {
  return (
    <div>
      Shop

      <Link to={shopRoutes.second}>second page</Link>  
    </div>
  )
}

export default Shop;

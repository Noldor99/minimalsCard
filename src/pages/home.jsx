import { Helmet } from 'react-helmet-async';

import { ProductShopDetailsView } from 'src/sections/product/view';
// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <ProductShopDetailsView />
    </>
  );
}

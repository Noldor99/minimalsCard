import Box from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useSettingsContext } from 'src/components/settings';

import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsCarousel from '../product-details-carousel';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const product = {
  id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
  gender: 'Men',
  publish: 'published',
  category: 'Shose',
  available: 72,
  priceSale: null,
  taxes: 10,
  quantity: 80,
  sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
  inventoryType: 'in stock',
  images: [
    'https://m.media-amazon.com/images/I/61vThyaOrHL._AC_SY355_.jpg',
    'https://m.media-amazon.com/images/I/71BYvNUoumL._AC_SY355_.jpg',
    'https://m.media-amazon.com/images/I/71sgEIlSvfL._AC_SY355_.jpg',
    'https://m.media-amazon.com/images/I/61Z49vScNSL._AC_SY355_.jpg',
  ],

  code: '38BEE271',
  description:
    '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
  newLabel: {
    enabled: true,
    content: 'NEW',
  },
  sku: 'WW75K5211YW/SV',
  createdAt: '2024-05-01T12:46:30.746Z',
  saleLabel: {
    enabled: false,
    content: 'SALE',
  },
  name: 'Logitech G502 HERO High Performance Wired Gaming Mouse, HERO 25K Sensor, 25,600 DPI, RGB, Adjustable Weights, 11 Programmable Buttons, On-Board Memory, PC / Mac',
  price: 37.14,
  coverUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
  totalRatings: 4.7,
  totalSold: 684,
  totalReviews: 9124,
  subDescription:
    'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  colors: ['#000000', '#FFFFFF'],
};

export default function ProductShopDetailsView() {
  const settings = useSettingsContext();

  const renderProduct = product && (
    <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
      <Grid xs={12} md={4} lg={5}>
        <ProductDetailsCarousel product={product} />
      </Grid>

      <Grid xs={12} md={8} lg={7}>
        <ProductDetailsSummary product={product} />
      </Grid>
    </Grid>
  );

  return (
    <Box
      sx={{
        mt: 12,
        mb: 15,
      }}
    >
      {product && renderProduct}
    </Box>
  );
}

ProductShopDetailsView.propTypes = {};

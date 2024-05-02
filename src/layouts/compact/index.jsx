import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import Header from '../common/header-simple';

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  return (
    <>
      <Header />

      <Container component="main">{children}</Container>
    </>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};

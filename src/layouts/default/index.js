import React from 'react';

import Header from './header';
import Footer from './footer';
import Main from './main';

const Default = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Default;

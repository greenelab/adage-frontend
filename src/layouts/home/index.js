import React from 'react';

import Header from './header';
import Footer from './footer';
import Main from '../default/main';

const Home = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Home;

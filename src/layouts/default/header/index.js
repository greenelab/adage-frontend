import React from 'react';
import { Link } from 'react-router-dom';

import NavButton from '../../../components/nav-button';
import Button from '../../../components/button';
import LinkIcon from '../../../components/link-icon';

import { ReactComponent as Logo } from '../../../images/logo-small.svg';
import { ReactComponent as Genes } from '../../../images/genes.svg';
import { ReactComponent as Experiments } from '../../../images/experiments.svg';
import { ReactComponent as Signatures } from '../../../images/signatures.svg';
import { ReactComponent as Model } from '../../../images/model.svg';
import { ReactComponent as Help } from '../../../images/help.svg';

import './index.css';

const Header = () => (
  <header className="header_default">
    <Title />
    <Nav />
    <Aux />
  </header>
);

export default Header;

const Title = () => (
  <Link to='/'>
    <div className='header_column'>
      <Logo className='logo_small' />
      <h2>adage</h2>
    </div>
  </Link>
);

const Nav = () => (
  <nav className='header_column'>
    <NavButton icon={<Genes />} text='Genes' />
    <NavButton icon={<Experiments />} text='Experiments' />
    <NavButton icon={<Signatures />} text='Signatures' />
  </nav>
);

const Aux = () => (
  <div className='header_column'>
    <Button className='model_switch_button'>
      <Model />
    </Button>
    <LinkIcon to='help' icon={<Help />} />
  </div>
);

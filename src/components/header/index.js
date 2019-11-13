import React from 'react';

import Button from '../button';
import ButtonIcon from '../button-icon';

import { ReactComponent as Logo } from '../../images/logo-small.svg';
import { ReactComponent as Genes } from '../../images/genes.svg';
import { ReactComponent as Experiments } from '../../images/experiments.svg';
import { ReactComponent as Signatures } from '../../images/signatures.svg';
import { ReactComponent as Model } from '../../images/model.svg';
import { ReactComponent as Help } from '../../images/help.svg';

import './index.css';

const Header = () => (
  <header>
    <Title />
    <Nav />
    <Aux />
  </header>
);

export default Header;

const Title = () => (
  <div className='header_column'>
    <Logo className='logo_small' />
    <h2>adage</h2>
  </div>
);

const Nav = () => (
  <nav className='header_column'>
    <Button className='nav_button' data-active="true">
      <Genes />
      <h3>Genes</h3>
    </Button>
    <Button className='nav_button'>
      <Experiments />
      <h3>Experiments</h3>
    </Button>
    <Button className='nav_button'>
      <Signatures />
      <h3>Signatures</h3>
    </Button>
  </nav>
);

const Aux = () => (
  <div className='header_column'>
    <Button className="model_switch_button">
      <Model />
    </Button>
    <ButtonIcon>
      <Help />
    </ButtonIcon>
  </div>
);

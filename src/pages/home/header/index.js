import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { ReactComponent as AdageLogo } from '../../../images/logo.svg';

import './index.css';

import packageJson from '../../../../package.json';

// big header with logo on home page and background visualization

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const canvas = document.querySelector('.home_canvas');
    if (canvas && !mounted) {
      visualization(canvas);
      setMounted(true);
    }
  }, [mounted]);

  return (
    <header className='home_header' title={packageJson.version}>
      <canvas className='home_canvas' />
      <div className='home_shadow' />
      <AdageLogo className='home_logo' />
      <span className='home_title text_huge'>adage</span>
    </header>
  );
};

export default Header;

// math helpers
const cos = (degrees) => Math.cos((2 * Math.PI * degrees) / 360);

// general shape of curve we want
// y = a^-|x|
// where eg a = 1 is linear, a = 10 is steeply exponential
// do some math and wolfram alpha magic to get this eq
// y = (h - h * a^(1 - |x| / w)) / (1 - a)
// where h is x-axis intercept and h is y-axis intercept
// https://www.desmos.com/calculator/r2wkqakaqi
const curve = (x, w, h, a) =>
  Math.max(0, (h - h * Math.pow(a, 1 - x / w)) / (1 - a));

const visualization = (canvas) => {
  // settings
  const resolution = 2; // set to 2x for high dpi screens
  const fps = 50; // frames per second
  const background = '#000000'; // background color
  const color = '#26a36c'; // photon color
  const blur = 100; // canvas blur
  const spawn = 0.25; // spawn probability each step
  const spacing = 10; // space between waves/rows
  const thickness = 1; // photon thickness
  const minSpeed = 1; // photon min horizontal speed
  const maxSpeed = 3; // photon max horizontal speed
  const ampMax = 10; // max of amplitude of wave
  const ampFall = 250; // how fast amp falls off away from center
  const freqMax = 10; // max of frequency of wave
  const freqFall = 500; // how fast freq falls off away from center

  // globals
  const ctx = canvas.getContext('2d');
  let width;
  let height;

  let photons = [];

  // on window resize
  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * resolution;
    canvas.height = height * resolution;
    ctx.scale(resolution, resolution);
    photons = [];
  };
  window.addEventListener('resize', resize);

  // clear canvas
  const clear = () => {
    ctx.globalAlpha = 1 / blur;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  };

  // photon object
  class Photon {
    constructor() {
      this.x = -thickness;
      this.y = undefined;
      this.yStart = Math.round((height / spacing) * Math.random()) * spacing;
      this.vx = minSpeed + Math.random() * (maxSpeed - minSpeed);

      this.xPrev = undefined;
      this.yPrev = undefined;
    }

    // calculate position and other props
    step() {
      this.xPrev = this.x;
      this.yPrev = this.y;

      this.x += this.vx;
      const x = Math.abs(this.x - width / 2);
      const freq = curve(x, freqFall, freqMax, 10);
      const amp = curve(x, ampFall, ampMax, 10);
      this.y = this.yStart - cos(x * freq) * amp;
    }

    // draw, with interpolated positions based on speed
    draw() {
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.beginPath();
      ctx.moveTo(this.xPrev, this.yPrev);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    }
  }

  // one frame step
  const step = () => {
    // create new photons to left of screen at random
    if (Math.random() < spawn)
      photons.push(new Photon());

    // step all photons
    for (const photon of photons)
      photon.step();

    // remove photons past right side of screen
    for (let index = 0; index < photons.length; index++) {
      if (photons[index].x > width) {
        photons.splice(index, 1);
        index--;
      }
    }
  };

  // one frame draw
  const draw = () => {
    // draw all photons
    for (const photon of photons)
      photon.draw();
  };

  // one frame
  const frame = () => {
    clear();
    step();
    draw();
  };

  // start visualization
  resize();
  window.setInterval(frame, 1000 / fps);
};

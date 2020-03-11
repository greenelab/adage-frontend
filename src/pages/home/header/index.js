import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { ReactComponent as AdageLogo } from '../../../images/logo.svg';

import './index.css';

import packageJson from '../../../../package.json';

// big header with logo on home page

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
  const color = '#26a36c'; // dot color
  const blur = 100; // canvas blur
  const spawn = 0.25; // spawn probability each step
  const spacing = 10; // space between waves/rows
  const size = 0.5; // dot radius
  const minSpeed = 1; // dot min horizontal speed
  const maxSpeed = 3; // dot max horizontal speed
  const ampMax = 10; // range of amplitude of wave
  const ampFall = 250; // how fast amp falls off away from center
  const freqMax = 10; // range of frequency of wave
  const freqFall = 500; // how fast freq falls off away from center

  // globals
  const ctx = canvas.getContext('2d');
  let width;
  let height;

  let dots = [];

  // on window resize
  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * resolution;
    canvas.height = height * resolution;
    ctx.scale(resolution, resolution);
    dots = [];
  };
  window.addEventListener('resize', resize);

  // clear canvas
  const clear = () => {
    ctx.globalAlpha = 1 / blur;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  };

  // dot object
  class Dot {
    constructor() {
      this.x = -size;
      this.y = undefined;
      this.yStart = Math.round((height / spacing) * Math.random()) * spacing;
      this.vx = minSpeed + Math.random() * (maxSpeed - minSpeed);

      this.xPrev = undefined;
      this.yPrev = undefined;
      this.speed = undefined;
    }

    // calculate position and other props
    step() {
      this.xPrev = this.x;
      this.yPrev = this.y;

      this.x += this.vx;
      const x = Math.abs(this.x - width / 2);
      const freq = curve(x, freqFall, freqMax, 16);
      const amp = curve(x, ampFall, ampMax, 16);
      this.y = this.yStart - cos(x * freq) * amp;

      this.speed = Math.sqrt(
        Math.pow(this.x - this.xPrev, 2) + Math.pow(this.y - this.yPrev, 2)
      );
    }

    // draw, with interpolated positions based on speed
    draw() {
      ctx.fillStyle = color;
      const steps = this.speed / size;
      for (let step = 0; step < steps; step++) {
        ctx.beginPath();
        ctx.arc(
          this.xPrev + (this.x - this.xPrev) * (step / steps),
          this.yPrev + (this.y - this.yPrev) * (step / steps),
          size,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }

  // one frame step
  const step = () => {
    // create new dots to left of screen at random
    if (Math.random() < spawn)
      dots.push(new Dot());

    // step all dots
    for (const dot of dots)
      dot.step();

    // remove dots past right side of screen
    for (let index = 0; index < dots.length; index++) {
      if (dots[index].x > width) {
        dots.splice(index, 1);
        index--;
      }
    }
  };

  // one frame draw
  const draw = () => {
    // draw all dots
    for (const dot of dots)
      dot.draw();
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

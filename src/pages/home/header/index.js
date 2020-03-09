import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import * as Color from 'color';

import { ReactComponent as AdageLogo } from '../../../images/logo.svg';

import './index.css';

import packageJson from '../../../../package.json';

// big header with logo on home page

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const canvas = document.querySelector('#canvas');
    if (canvas && !mounted) {
      visualization(canvas);
      setMounted(true);
    }
  }, [mounted]);

  return (
    <header className='home_header' title={packageJson.version}>
      <canvas id='canvas' />
      <AdageLogo />
      <span className='text_huge'>adage</span>
    </header>
  );
};

export default Header;

const cos = (degrees) => Math.cos((2 * Math.PI * degrees) / 360);

const blend = (colorA, colorB, amount) =>
  Color(colorA).mix(Color(colorB), amount);

const visualization = (canvas) => {
  // settings
  const resolution = 2; // set to 2x for high dpi screens
  const fps = 50; // frames per second
  const background = '#000000'; // background color
  const colors = ['#26a36c']; // list of colors from edge to center
  const blur = 50; // canvas blur
  const spacing = 10; // space between waves/rows
  const size = 1; // dot radius
  const minSpeed = 1; // dot min horizontal speed
  const maxSpeed = 1; // dot max horizontal speed
  const ampMax = 10; // range of amplitude of wave
  const ampFall = 200; // how fast amp falls off away from center
  const freqMin = 1; // min frequency of wave
  const freqMax = 3; // range of frequency of wave
  const freqFall = 500; // how fast freq falls off away from center
  const colorFall = 500; // how fast colors fall off away from center

  // globals
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'copy';
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
      this.y0 = Math.round((height / spacing) * Math.random()) * spacing;
      this.vx = minSpeed + Math.random() * maxSpeed;

      this.xPrev = undefined;
      this.yPrev = undefined;
      this.speed = undefined;
      this.color = undefined;
    }

    // calculate position and other props
    step() {
      this.xPrev = this.x;
      this.yPrev = this.y;

      this.x += this.vx;
      const x = Math.abs(this.x - width / 2);
      const freq = freqMin + Math.pow(1 + 1 / freqFall, -x) * freqMax;
      const amp = Math.pow(1 + 1 / ampFall, -x) * ampMax;
      this.y = this.y0 - cos(x * freq) * amp;

      this.speed = Math.sqrt(
        Math.pow(this.x - this.xPrev, 2) + Math.pow(this.y - this.yPrev, 2)
      );

      const colorIndex = Math.pow(1 + 1 / colorFall, -x) * (colors.length - 1);
      const colorA = colors[Math.floor(colorIndex)];
      const colorB = colors[Math.ceil(colorIndex)];
      const amount = colorIndex % 1;
      this.color = blend(colorA, colorB, amount);
    }

    // draw, with interpolated positions based on speed
    draw() {
      ctx.fillStyle = this.color;
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
    if (Math.random() < 0.1)
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

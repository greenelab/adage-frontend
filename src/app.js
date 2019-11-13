import React from 'react';
import { Component } from 'react';

import Header from './components/header';
import Footer from './components/footer';
import Main from './components/main';

import './app.css';

export class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Main>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque mauris pellentesque pulvinar pellentesque habitant
            morbi. Nascetur ridiculus mus mauris vitae. In hac habitasse platea
            dictumst. Nulla porttitor massa id neque aliquam vestibulum morbi.
            Rutrum tellus pellentesque eu tincidunt. Consequat mauris nunc
            congue nisi vitae suscipit. Duis tristique sollicitudin nibh sit
            amet commodo. Fringilla est ullamcorper eget nulla facilisi etiam
            dignissim diam quis. Viverra nibh cras pulvinar mattis nunc sed
            blandit libero volutpat. Nibh venenatis cras sed felis. Id faucibus
            nisl tincidunt eget nullam non nisi est. Tortor aliquam nulla
            facilisi cras. Cum sociis natoque penatibus et magnis dis parturient
            montes. Tortor aliquam nulla facilisi cras fermentum odio eu. Tempor
            orci dapibus ultrices in iaculis nunc sed.
          </p>
          <p>
            At erat pellentesque adipiscing commodo elit at imperdiet. Sed cras
            ornare arcu dui vivamus arcu. Sem viverra aliquet eget sit amet
            tellus cras adipiscing. Volutpat commodo sed egestas egestas
            fringilla phasellus faucibus scelerisque eleifend. Non diam
            phasellus vestibulum lorem. Scelerisque varius morbi enim nunc
            faucibus a. Rutrum tellus pellentesque eu tincidunt tortor aliquam
            nulla facilisi cras. Amet aliquam id diam maecenas ultricies mi eget
            mauris. Faucibus et molestie ac feugiat sed lectus vestibulum.
            Pretium vulputate sapien nec sagittis aliquam malesuada bibendum.
            Etiam tempor orci eu lobortis elementum nibh tellus molestie.
            Vestibulum lectus mauris ultrices eros in cursus turpis massa
            tincidunt. Vel facilisis volutpat est velit egestas dui id. In hac
            habitasse platea dictumst quisque sagittis. Parturient montes
            nascetur ridiculus mus mauris vitae ultricies leo integer. Magna ac
            placerat vestibulum lectus mauris ultrices eros in. Ultricies mi
            eget mauris pharetra et ultrices. Tincidunt augue interdum velit
            euismod in pellentesque. Quis lectus nulla at volutpat diam ut.
          </p>
          <p>
            Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan
            tortor. Ac placerat vestibulum lectus mauris ultrices eros in
            cursus. Non quam lacus suspendisse faucibus interdum posuere. Tellus
            at urna condimentum mattis pellentesque id nibh. Facilisis gravida
            neque convallis a cras semper auctor neque. Ornare quam viverra orci
            sagittis eu volutpat. Pellentesque pulvinar pellentesque habitant
            morbi tristique senectus et netus. Odio ut enim blandit volutpat
            maecenas volutpat blandit aliquam etiam. Fringilla ut morbi
            tincidunt augue. Nibh tellus molestie nunc non blandit massa enim
            nec. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum.
            Urna nunc id cursus metus aliquam eleifend. Et egestas quis ipsum
            suspendisse ultrices. Ipsum consequat nisl vel pretium lectus quam
            id. Nec nam aliquam sem et tortor. Nisl rhoncus mattis rhoncus urna.
            Integer feugiat scelerisque varius morbi enim nunc faucibus a. Augue
            mauris augue neque gravida in fermentum et sollicitudin ac. Nec
            ullamcorper sit amet risus.
          </p>
        </Main>
        <Footer />
      </>
    );
  }
}

/**
 * enhanced-viewer - v0.0.2 - 2015-11-05
 * https://adage.greenelab.com
 *
 * Copyright (c) 2015, Matt Huyck, Jie Tan, and Casey Greene
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * 
 * 3. Neither the name of the copyright holder nor the names of its
 * contributors may be used to endorse or promote products derived from this
 * software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function() {
  /* Enhance the viewing experience by embedding PDFs into the page if the 
     screen is wide enough
   */
  // constants
  var min_width = 800;
  var pad_width = 15;
  var pad_height = 10;
  
  // do these DOM lookups once and bind them to js vars for efficiency
  var header = $('header');
  var nav = $('nav');
  var heatmap = $('#heatmap');
  
  // do all layout that depends upon window size here 
  // so it gets recomputed when needed
  function redraw() {
    var header_bottom = header.position().top + header.height();
    
    nav.css({
      'position': 'relative',
      'top': header_bottom + 'px',
      'width': '16em' // this should be no smaller than the longest anchor text
    });
    var nav_right = nav.offset().left + nav.width();
    
    var heatmap_width = $(window).width() - nav_right - pad_width;
    var heatmap_height = $(window).height() - header_bottom - pad_height;
    // console.log('redraw called: header_bottom = ' + header_bottom +
    //                             ' nav_right = ' + nav_right +
    //                             ' heatmap_width = ' + heatmap_width);
    heatmap.css({
      'display': 'none',
      'position': 'fixed',
      'top': header_bottom + 'px',
      // 'left' needs to match the right edge of nav
      'left': nav_right + 'px',
      // set 'width' to fill from "left" to width of the browser
      'width': heatmap_width + 'px',
      // set 'height' to fill from "header" to height of the browser
      'height': heatmap_height +'px'
    }).show();
  };
  
  // utility function to change what heatmap we're viewing
  function setHeatmap(filename) {
    $('.selected').removeClass('selected');
    $('#heatmap').html(
      '<object data="' + filename + 
      '" type="application/pdf" width="100%" height="100%">' +
      '<p>The PDF image should display here. If you are reading this, the ' +
      'file may still be downloaded using this direct link: <a href="' + 
      filename + '">' + filename + '</a>.</p>' +
      '</object>'
    );
  };
  
  // large display initializer
  function initWidescreen() {
    if ($(window).width() < min_width) {
      return;
    }
    
    // if we're running this code we can start tweaking layout for enhanced UI
    $('header').css({
      'position': 'fixed',
      'top': '0px',
      'background-color': 'white',
      'z-index': '10'
    });
    
    // capture clicks on li-tags rather than a-tags and add a selected 
    // and hover effect
    $('nav li a:first-child')
      .attr('href', function(i, val) {
                            // 1. save the href attribute in a data attribute
        $(this).data('filename', val);
      })
      .removeAttr('href')   // 2. remove the href to 'neuter' the link
      .css({
        'font-weight': 'bold'
      })
    $('nav li').on({
      click: function() {   // 3. add our own click handler 
        setHeatmap($(this).children('a').data('filename'));
        $(this).addClass('selected');
      },
      mouseenter: function() {
        $(this).addClass('hov');
      },
      mouseleave: function() {
        $(this).removeClass('hov');
      }
    });
    $('nav ul').css({
      'list-style-type': 'none'
    });
    
    // initialize the page and hook in our redraw function
    redraw();
    $(window).resize(redraw);
    $('nav li:first').click();
  }
  
  initWidescreen();
})();

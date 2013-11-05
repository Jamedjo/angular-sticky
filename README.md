angular-sticky
==============

AngularJS directive to cause elements to stick to the top of the page when scrolling past

No jQuery dependency.

A simple directive enables sticky functionality to be added to elements, causing them to stick to the top of
the screen as they are scrolled past.

Quick implementation and only tested on latest Chrome, so use at your peril...

# Features

  * ~~Allows use of a placeholder to stop the page jumping~~
  * Recalculates element position on page load and on window resize

# Usage

Include the .js file in your page then enable usage of the directive by including the "sticky" module
as a dependency. Use the directive as follows:

    <div sticky>I'm all sticky</div>

To smoothly alighn the sticky as it fixes, you can set top and left offsets:

    <div sticky sticky-top="stickyTop()" sticky-left="31">I'm all sticky</div>

`sticky-top` and `sticky-left` can be numbers or functions which return numbers. E.g.

    $scope.stickyTop = function(){
      return Math.max(0,document.querySelector('.navbar-fixed-top').getBoundingClientRect().bottom)+20;
    }
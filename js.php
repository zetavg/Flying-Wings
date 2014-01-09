<?php if (!defined('PAGE')) die("403"); ?>


    <!-- JavaScript
    ================================================== -->
    <script src="https://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/jquery.parallax.js"></script>
    <script>
      (function( $ ){
        $.fn.rotateSec = function(deg, sec) {
          this.css({'transition-duration': sec+'s'});
          this.css({'-ms-transition-duration': sec+'s'});
          this.css({'-moz-transition-duration': sec+'s'});
          this.css({'-o-transition-duration': sec+'s'});
          this.css({'-webkit-transition-duration': sec+'s'});
          this.css({'transform': 'rotate('+deg+'deg)'});
          this.css({'-ms-transform': 'rotate('+deg+'deg)'});
          this.css({'-moz-transform': 'rotate('+deg+'deg)'});
          this.css({'-o-transform': 'rotate('+deg+'deg)'});
          this.css({'-webkit-transform': 'rotate('+deg+'deg)'});
          return this;
        };
      })( jQuery );
      function RefreshResponsive() {
        if ($(window).width() > 1439) {
          $('#hero-parallax .layer.parallax img').width($(window).width() + $(window).width()/18);
          $('#hero-parallax .layer.parallax img').css('margin-top', -$(window).width()/36+'px');
          $('#hero-parallax .layer.parallax img').css('margin-left', -$(window).width()/36+'px');
        } else {
          $('#hero-parallax .layer.parallax img').width(1600);
          $('#hero-parallax .layer.parallax img').css('margin-top', '-40px');
          $('#hero-parallax .layer.parallax img').css('margin-left', '-40px');
        }
        $('.avator').height($('.avator').width() + 12);
        $('.avator img').width($('.avator').width());
      }

      var do_x, do_y, do_z, prev_do_x, prev_do_y, prev_do_z;
      window.addEventListener('deviceorientation', handleOrientation);
      function handleOrientation(event) {
        do_x = event.beta;
        do_y = event.gamma;
        do_z = event.alpha;
      }
      function SwingLogo(t) {
        if ((prev_do_x - do_x) > 0.001 || (prev_do_y - do_y) > 0.001 || (prev_do_z - do_z) > 0.001) {
          var d_do_x = Math.abs(prev_do_x - do_x);
          if (d_do_x > 180) d_do_x = 360 - d_do_x;
          var d_do_y = Math.abs(prev_do_y - do_y);
          if (d_do_y > 180) d_do_y = 360 - d_do_y;
          var d_do_z = Math.abs(prev_do_z - do_z);
          if (d_do_z > 180) d_do_z = 360 - d_do_z;
          if (t > 0) t += d_do_x*0.01;
          else t -= d_do_x*0.01;
          if (t > 0) t += d_do_y*0.01;
          else t -= d_do_y*0.01;
          if (t > 0) t += d_do_z*0.01;
          else t -= d_do_z*0.01;
          if (t > 1.8) t = 1.8;
          else if (t < -1.8) t = -1.8;
        } else if ($('.hero .logoa').is(":hover")) {
          if (t > 0) t += 0.3;
          else t -= 0.3;
          if (t > 0.8) t = 0.8;
          else if (t < -0.8) t = -0.8;
        }
        if (t > 0.11 || t < -0.11) {
          $('.hero .logo').rotateSec(t*3, 0.7);
          if (t > 0) t -= 0.18;
          else t += 0.18;
        } else {
          $('.hero .logo').rotateSec(0, 0.7);
        }
        prev_do_x = do_x;
        prev_do_y = do_y;
        prev_do_z = do_z;
        setTimeout("SwingLogo("+(-t)+")", 700);
      }

      function FixedUpdate() {
        setTimeout("FixedUpdate()", 500);
      }
      $(document).ready(function($) {
        RefreshResponsive();
      });
      window.onload = function() {
        RefreshResponsive();
        $('#hero-parallax').parallax({
          scalarY: 30
        });
        $('.parallax-x').parallax({
          limitY: 0,
          scalarX: 10
        });
        setTimeout("$('.hero-fence').hide();", 10);
        setTimeout("$('#hero-parallax').addClass('animated fadeIn');", 100);
        setTimeout("$('.hero-ranking').addClass('animated fadeIn');", 800);
        setTimeout("RefreshResponsive()", 500);
        FixedUpdate();
        SwingLogo(1.0);
      }
      window.onresize = function() {
        RefreshResponsive();
        setTimeout("RefreshResponsive()", 500);
      }

    </script>

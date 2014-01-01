<?php if (!defined('PAGE')) die("403"); ?>
    <div class="developers-container">
      <div class="developers">
        <div class="container content">
          <div class="row">
            <div class="developers-title"><h1>Developers</h1><hr></div>
            <div class="developer"><a target="_blank" href="https://www.facebook.com/pokaichang72"><div class="avator"><img src="https://0.gravatar.com/avatar/fb9733f2971dc0532dc6083e79c71e1a?s=520"></div><div class="name">Neson Chang</div></a></div>
            <div class="developer"><a target="_blank" href="https://www.facebook.com/yukaihuang93"><div class="avator"><img src="http://i.imgur.com/U2L5tCq.jpg"></div><div class="name">Yukai</div></a></div>
            <div class="developer"><a target="_blank" href="https://www.facebook.com/ericwlapse"><div class="avator"><img src="http://i.imgur.com/bEsGPCo.jpg"></div><div class="name">陳太太</div></a></div>
            <div class="developer"><a target="_blank" href="https://www.facebook.com/iamwanchien"><div class="avator"><img src="http://i.imgur.com/ihMHfDD.jpg"></div><div class="name">枝</div></a></div>
            <div class="developer"><a target="_blank" href="https://www.facebook.com/dreamingdexiaoxiaohao"><div class="avator"><img src="http://i.imgur.com/w235XYn.jpg"></div><div class="name">Briuin Lin</div></a></div>
          </div>
        </div>
      </div>
    </div>


    <!-- FOOTER -->
    <div class="footer-container">
      <footer class="container">
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>A [ NTUST Mobile Game Design ] Project. 此為向「進撃の巨人」高度致敬之作 (業)，絕無侵權之意。</p>
        <p></p>
      </footer>
    </div>


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
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-35493848-7', 'ntust.co');
      ga('send', 'pageview');

    </script>
  </body>
</html>

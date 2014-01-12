<?php define('PAGE', true); ?>
<!--
<html>
  <head>
    <title>-->
      <?php $page_title = "Credits | 飛ぶの翼．立體機動裝置遊戲"; ?><!---->
<!--</title>
  </head>
  <body>
    <nav>-->
      <?php $page_nav = "credits"; ?>
<!--</nav>
-->
<?php include('head.php'); ?>
    <div class="no-header" style="background-color: white;"></div>



    <!-- Content and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="story game-scene" style="background-image: url(/img/btsbg.jpg); background-attachment: fixed; background-size: cover; background-position: 50% 0%; text-align: center; padding-top: 100px; padding-bottom: 100px; text-shadow: 0 0 12px rgba(0,0,0, 1), 0 0 12px rgba(0,0,0, 1);">

      <h1 style="color: #fff;">Tools &amp; Technique</h1>
      <p style="color: #eee;">　</p>
      <ul class="ne" style="color: #eee; list-style-type: disc;">
        <li>Unity</li>
        <li>Unity</li>
        <li>3dsMax</li>
        <li>Logic Studio</li>
        <li>Photoshop</li>
      </ul>
      <p style="color: #eee;">- - -</p>
      <ul class="ne" style="color: #eee; list-style-type: disc;">
        <li>iTween</li>
      </ul>
      <p style="color: #eee;">　</p>
      <p style="color: #eee;">　</p>
      <h1 style="color: #fff;">BTS</h1>
      <p style="color: #eee;">　</p>
      <div class="row">
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/2014-01-08_9.45.38.png" target="_blank" class="thumbnail">
            <img src="/img/btsimg/2014-01-08_9.45.38.png" alt="">
          </a>
        </div>
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/2013-11-22_.png" target="_blank" class="thumbnail">
            <img src="/img/btsimg/2013-11-22_.png" alt="">
          </a>
        </div>
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/1374230_10200096904944959_47339627_n.jpg" target="_blank" class="thumbnail">
            <img src="/img/btsimg/1374230_10200096904944959_47339627_n.jpg" alt="">
          </a>
        </div>
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/2013-11-18_10.58.48.png" target="_blank" class="thumbnail">
            <img src="/img/btsimg/2013-11-18_10.58.48.png" alt="">
          </a>
        </div>
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/2013-11-17_1.27.17.png" target="_blank" class="thumbnail">
            <img src="/img/btsimg/2013-11-17_1.27.17.png" alt="">
          </a>
        </div>
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/2014-01-09_4.50.35.png" target="_blank" class="thumbnail">
            <img src="/img/btsimg/2014-01-09_4.50.35.png" alt="">
          </a>
        </div>
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/2013-11-27_12.10.34.png" target="_blank" class="thumbnail">
            <img src="/img/btsimg/2013-11-27_12.10.34.png" alt="">
          </a>
        </div>
        <div class="col-xs-6 col-md-4">
          <a href="/img/btsimg/1391480_10200239192942070_601623611_n-1.jpg" target="_blank" class="thumbnail">
            <img src="/img/btsimg/1391480_10200239192942070_601623611_n-1.jpg" alt="">
          </a>
        </div>
      </div>
    </div>

    <div class="container content">

    </div><!-- /.container -->

<?php include('footer.php'); ?>
<?php include('js.php'); ?>
    <script>
      var UpdateGSS_r1 = 0;
      var GSS_topp = 0.0;
      var GSS_botp = 0.0;
      var GSS_cenp = 0.0;
      function UpdateGSS() {
        $('#b_m_bg2').rotateSec(UpdateGSS_r1, 0.5);
        UpdateGSS_r1 += 60;
        if (UpdateGSS_r1 > 360) {
          UpdateGSS_r1 -= 360;
        }

        $('#game_gui_scr_fixelem').width($('#game_gui_scr').width());

        if ($(window).width() > $(window).height()*1432/795) {
          $('#game_gui_scr_fixelem').height($(window).width()*618/1432);
        } else {
          $('#game_gui_scr_fixelem').height($(window).height()*0.778);
        }
        $('#aim_l').width($('#game_gui_scr').width()*0.1);
        $('#aim_r').width($('#game_gui_scr').width()*0.1);

        GSS_topp = $('#game_gui_scr').offset().top - $(window).scrollTop();
        GSS_botp = GSS_topp + $('#game_gui_scr').height()*0.8;
        GSS_cenp = (GSS_topp+GSS_botp)/2;

        var cpos = GSS_cenp / $('#game_gui_scr_fixelem').height();

        if (cpos > 0.7) {
          $("#aim_l").css('left', '30%');
          $("#aim_l").css('bottom', '14%');
          $("#aim_r").css('right', '38%');
          $("#aim_r").css('bottom', '14.2%');
        } else if (cpos > 0.52) {
          $("#aim_l").css('left', '27%');
          $("#aim_l").css('bottom', '36%');
          $("#aim_r").css('right', '32%');
          $("#aim_r").css('bottom', '35%');
        } else {
          $("#aim_l").css('left', '34%');
          $("#aim_l").css('bottom', '44%');
          $("#aim_r").css('right', '45%');
          $("#aim_r").css('bottom', '48%');
        }

        var aim_l_oft = $("#aim_l").offset().top - $(window).scrollTop();
        var aim_r_oft = $("#aim_r").offset().top - $(window).scrollTop();

        if (aim_l_oft < GSS_topp || aim_l_oft > GSS_botp) {
          $("#aim_l").css('opacity', '0');
        } else {
          $("#aim_l").css('opacity', '1');
        }

        if (aim_r_oft < GSS_topp || aim_r_oft > GSS_botp) {
          $("#aim_r").css('opacity', '0');
        } else {
          $("#aim_r").css('opacity', '1');
        }

        console.log($("#aim_l").offset().top);

        setTimeout("UpdateGSS()", 500);
      }

      window.onscroll = function (e) {
        GSS_topp = $('#game_gui_scr').offset().top - $(window).scrollTop();
        GSS_botp = GSS_topp + $('#game_gui_scr').height()*0.8;
        GSS_cenp = (GSS_topp+GSS_botp)/2;

        var aim_l_oft = $("#aim_l").offset().top - $(window).scrollTop();
        var aim_r_oft = $("#aim_r").offset().top - $(window).scrollTop();

        if (aim_l_oft < GSS_topp || aim_l_oft > GSS_botp) {
          $("#aim_l").css('opacity', '0');
        } else {
          $("#aim_l").css('opacity', '1');
        }

        if (aim_r_oft < GSS_topp || aim_r_oft > GSS_botp) {
          $("#aim_r").css('opacity', '0');
        } else {
          $("#aim_r").css('opacity', '1');
        }
      }


      $(document).ready(function($) {
        UpdateGSS();
      });

    </script>
<?php include('foot.php'); ?>

<?php define('PAGE', true); ?>
<!--
<html>
  <head>
    <title>-->
      <?php $page_title = "System | 飛ぶの翼．立體機動裝置遊戲"; ?><!---->
<!--</title>
  </head>
  <body>
    <nav>-->
      <?php $page_nav = "system"; ?>
<!--</nav>
-->
<?php include('head.php'); ?>
    <div class="no-header" style="background-color: white;"></div>



    <!-- Content and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="story game-scene" style="background-image: url(/img/sysgbg_bg.jpg); background-attachment: fixed; background-size: cover; background-position: 50% 0%; text-align: center; padding-top: 100px; padding-bottom: 100px; text-shadow: 0 0 4px rgba(0,0,0, 1)">
      <h1 style="color: #dedede;">Control System</h1>
      <p style="color: #ddd;">真正模擬立體機動裝置的真實物理行為，結合 UI 設計原理，打造出極為直覺的操控方式，<br>聰明地讓你輕鬆駕馭這套複雜裝置，神奇之處令人歎為觀止。</p>
      <h1>　</h1>
      <h2 style="color: #ddd;">遊戲界面</h2>
      <p>　</p>
      <div class="game-phone-container" style="position: relative; width: 90%; max-width: 800px; margin: auto;"><!-- max-width: 600px -->
        <img src="/img/mobile-device-outline.png" style="width: 100%; opacity: 0;">
        <div class="game-phone-screen" style="position: absolute; top: 7%; bottom: 7%; left: 12%; right: 13%; background-image: url(/img/sysgbg.jpg); background-attachment: fixed; background-size: cover; background-position: 50% 0%;">
          <img src="/img/mobile-device-outline.png" style="width: 100%; opacity: 0;">
          <div id="game_gui_scr" class="game-gui" style="position: absolute; top: 0; overflow: hidden;">
            <img src="/img/mobileGameUI.png" style="width: 100%;">
            <img id="b_m_bg2" class="linear-transition" src="/img/mobileGameUI/b_m_bg2.png" style="position: absolute; width: 26.96%; right: 2.7%; bottom: 1.2%;">
            <div id="game_gui_scr_fixelem" style="position: fixed; top: 0; height: 200px;">
              <img id="aim_l" class="ease-out-transition" src="/img/mobileGameUI/aim_s.png" style="position: absolute; width: 10%; left: 40%; bottom: 50%;">
              <img id="aim_r" class="ease-out-transition" src="/img/mobileGameUI/aim_s.png" style="position: absolute; width: 10%; right: 40%; bottom: 50%;">
            </div>

          </div>
        </div>
        <div class="game-phone-outline" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0;">
          <img src="/img/mobile-device-outline.png" style="width: 100%; z-index: 10;">
        </div>
      </div>
      <p>　</p>
      <p>　</p>
      <div class="row">
        <div class="col-lg-4 col-lg-offset-1">
          <img src="/img/mobileGameUI_ex.png" style="width: 100%; max-width: 300px;">
        </div>
        <div class="col-lg-7 center-if-mobile" style="color: #ddd; padding-top: 8px;">
          <br class="show-if-mobile">
          1: 速度控制桿，掌控地面行走及空中噴氣<br>
          2: 立體機動裝置準心，半自動瞄準<br>
          3: Fire／Pull 鍵，發射抓鈎／捲回繩索<br>
          4: Hold 鍵，鎖定繩索<br>
          5: Release 鍵，釋放並收回抓鈎
        </div>
      </div>
    </div>

    <div class="story game-scene" style="background-image: url(/img/sbg2.jpg); background-size: auto; background-repeat: repeat; background-position: 50% 50%; text-align: center; padding-top: 100px; padding-bottom: 100px;">
      <h1 style="color: #dedede;">Game System</h1>

      <p style="color: #ddd;">多種遊戲模式，任君制訂規則。</p>
      <p>　</p>
      <ul class="parallax-x parallax-viewport">
        <!-- parallax layers -->
        <li class="layer parallax" data-depth="1" style="margin-left: -500px;"><img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> <img src="/img/scs.png" width="256px"> </li>
      </ul>
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

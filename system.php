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
    <!-- div class="no-header"></div -->



    <!-- Content and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="story game-scene" style="background-image: url(/img/sysgbg_bg.jpg); background-attachment: fixed; background-size: cover; background-position: 50% 50%; text-align: center; padding-top: 100px; padding-bottom: 100px;">
      <h1 style="color: #c8c8c8;">Control System</h1>
      <p style="color: #ccc;">真正模擬立體機動裝置的真實物理行為，結合 UI 設計原理，打造出極為直覺的操控方式，<br>聰明地讓你輕鬆駕馭這套複雜裝置，神奇之處令人歎為觀止。</p>
      <h1>　</h1>
      <h2 style="color: #ccc;">遊戲界面</h2>
      <p>　</p>
      <div class="game-phone-container" style="position: relative; width: 90%; max-width: 600px; margin: auto;">
        <img src="/img/mobile-device-outline.png" style="width: 100%; opacity: 0;">
        <div class="game-phone-screen" style="position: absolute; top: 7%; bottom: 7%; left: 12%; right: 10.5%; background-image: url(/img/sysgbg.jpg); background-attachment: fixed; background-size: cover; background-position: 50% 50%;">
          <img src="/img/mobile-device-outline.png" style="width: 100%; opacity: 0;">
          <div class="game-gui">
          </div>
        </div>
        <div class="game-phone-outline" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0;">
          <img src="/img/mobile-device-outline.png" style="width: 100%; z-index: 10;">
        </div>
      </div>
    </div>

    <div class="container content">


    </div><!-- /.container -->

<?php include('foot.php'); ?>

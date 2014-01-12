<?php if (!defined('PAGE')) die("403"); ?>
<!DOCTYPE html>
<html lang='zh-TW'>
  <head>
    <meta charset='utf-8' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="">
    <meta property='og:description' content="立體機動裝置，尖端科技的結晶，是一套人性化的萬能交通工具，出現在我們這個充滿巨人的世界。經過多年研究，現在終於有了讓任何人使用兩根手指，操控立體機動裝置的技術。極為直覺的操控方式，聰明地讓你輕鬆駕馭這套複雜裝置，神奇之處令人歎為觀止。">
    <meta property='og:image' content="/img/fb.png">

    <title><?php echo $page_title; ?></title>

    <!-- CSS -->
    <link href="/css/screen.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <!-- NAVBAR
    ================================================== -->
    <div class="navbar-wrapper">
      <div class="container">

        <div class="navbar navbar-inverse navbar-static-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/"><img src="/img/logo_nav.png"></a>
            </div>
            <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li class="<?php if ($page_nav == 'home') echo 'active'; ?>"><a href="/">Home</a></li>
                <li class="<?php if ($page_nav == 'introduction') echo 'active'; ?>"><a href="/system/">Introduction</a></li>
                <li class="<?php if ($page_nav == 'system') echo 'active'; ?>"><a href="/system/">System</a></li>
                <li class="dropdown">
                  <a href="/cs/" class="dropdown-toggle" data-toggle="dropdown">Ranking <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li class="dropdown-header">Scroe</li>
                    <li><a href="/cs/">Kills</a></li>
                    <li><a href="/cs/">Survival</a></li>
                    <li><a href="/cs/">Average Kills</a></li>
                    <li class="divider"></li>
                    <li class="dropdown-header">Achievement</li>
                    <li><a href="/cs/">Medals</a></li>
                    <li><a href="/cs/">Statistics</a></li>
                  </ul>
                </li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li><a href="https://www.facebook.com/flyingWingsGame">Facebook</a></li>
                <li><a href="/credits/">Credits</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

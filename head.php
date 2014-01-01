<?php if (!defined('PAGE')) die("403"); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="">

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
                <li class="<?php if ($page_nav == 'introduction') echo 'active'; ?>"><a href="/cs/">Introduction</a></li>
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
                <li><a href="/cs/">Contact</a></li>
                <li><a href="/cs/">Credits</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

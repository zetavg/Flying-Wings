<?php define('PAGE', true); ?>
<?php include('../config.php'); ?>
<?php
	if ($unityHash != $phpHash) die("Hello World" . " ". $postData ." ". $unityHash . " " .  $phpHash." ");
	$UserID = anti_injection($_POST['data']);
	$UserName = anti_injection($_POST['UserName']);
	$Settings_GravitySensitivity = anti_injection($_POST['Settings_GravitySensitivity']);
	$Points_Kill = anti_injection($_POST['Points_Kill']);
	$Points_PlayTime = anti_injection($_POST['Points_PlayTime']);
	$Points_Score = anti_injection($_POST['Points_Score']);
	$Points_Achievement = anti_injection($_POST['Points_Achievement']);


	$nowtime = time();

	$SQL = "UPDATE `users` SET `LastUpdate`='" . $nowtime . "',`UserName`='" . $UserName . "',`Settings_GravitySensitivity`='" . $Settings_GravitySensitivity . "',`Settings_2`='" . 0 . "',`Settings_3`='" . 0 . "',`Settings_4`='" . 0 . "',`Settings_5`='" . 0 . "',`Points_Kill`='" . $Points_Kill . "',`Points_PlayTime`='" . $Points_PlayTime . "',`Points_Score`='" . $Points_Score . "',`Points_Achievement`='" . $Points_Achievement . "' WHERE `UserID`='" . $UserID . "'";
	$result_id = @mysql_query($SQL) or die('error');
	print $nowtime;
?>

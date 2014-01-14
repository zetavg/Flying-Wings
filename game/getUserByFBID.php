<?php define('PAGE', true); ?>
<?php include('../config.php'); ?>
<?php
	if ($unityHash != $phpHash) die("Hello World");
	$FBUserID = anti_injection($_POST['data']);
	$FBUserName = json_decode('"'.$_POST['FBUserName'].'"');
	$FBUserName = anti_injection($FBUserName);
	//echo "hi " . $FBUserID;
	$nowtime = time();

	$SQL = "SELECT * FROM users WHERE FBUserID = '" . $FBUserID . "'";
	$result_id = @mysql_query($SQL) or die('{"error":"database_error"}');
	$total = mysql_num_rows($result_id);
	if ($total) {

	} else {
		$SQL = "INSERT INTO `users`(`UserName`, `FBUserID`, `FBUserName`, `lastupdate`) VALUES ('" . $FBUserName . "', '" . $FBUserID . "', '" . $FBUserName . "', " . $nowtime . ")";
		$result_id = @mysql_query($SQL) or die('{"error":"database_error' + $SQL + '}');

		$SQL = "SELECT * FROM users WHERE FBUserID = '" . $FBUserID . "'";
		$result_id = @mysql_query($SQL) or die('{"error":"database_error"}');
		$total = mysql_num_rows($result_id);
	}

	$result = @mysql_fetch_array($result_id);
	$result['NowTime'] = (string)$nowtime;
	print json_encode($result);
?>

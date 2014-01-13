<?php define('PAGE', true); ?>
<?php include('../config.php'); ?>
<?php
	if ($unityHash != $phpHash) die("Hello World" . $unityHash . ' is ' . $phpHash . ' data ' . $_POST['data']);
	$FBUserID = anti_injection($_POST['data']);
	$FBUserName = json_decode('"'.$_POST['FBUserName'].'"');
	$FBUserName = anti_injection($FBUserName);
	echo "hi " . $FBUserID;

	$SQL = "SELECT * FROM users WHERE FBUserID = '" . $FBUserID . "'";
	$result_id = @mysql_query($SQL) or die("DATABASE ERROR!");
	$total = mysql_num_rows($result_id);
	if ($total) {
	} else {
		$SQL = "INSERT INTO `users`(`UserName`, `FBUserID`, `FBUserName`) VALUES ('" . $FBUserName . "', '" . $FBUserID . "', '" . $FBUserName . "')";
		$result_id = @mysql_query($SQL) or die("DATABASE ERROR!");
	}
?>

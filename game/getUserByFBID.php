<?php define('PAGE', true); ?>
<?php include('../config.php'); ?>
<?php
	if ($unityHash != $phpHash) die("Hello World");
	$FBID = $_POST['data'];
	echo $FBID;
?>

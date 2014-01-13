<?php if (!defined('PAGE')) die("403"); ?>
<?php
	// CONNECTIONS =========================================================

	$dbhost = "localhost";
	$dbuser = "titan_ntust_co";
	$dbpassword = "w5R5EPsbFv73mLny";
	$dbname = "titan_ntust_co";

	mysql_connect($dbhost, $dbuser, $dbpassword) or die("Cant connect into database");

	mysql_select_db($dbname) or die("Cant connect into database");

	// =============================================================================
	// PROTECT AGAINST SQL INJECTION and CONVERT PASSWORD INTO MD5 formats

	function anti_injection_login_senha($sql, $formUse = true) {

		$sql = preg_replace("/(from|select|insert|delete|where|drop table|show tables|,|'|#|\*|--|\\\\)/i","",$sql);

		$sql = trim($sql);

		$sql = strip_tags($sql);

		if(!$formUse || !get_magic_quotes_gpc())
			$sql = addslashes($sql);

	  	$sql = md5(trim($sql));

		return $sql;

	}


	function anti_injection($sql, $formUse = true) {

		$sql = preg_replace("/(from|select|insert|delete|where|drop table|show tables|,|'|#|\*|--|\\\\)/i","",$sql);

		$sql = trim($sql);

		$sql = strip_tags($sql);

		if(!$formUse || !get_magic_quotes_gpc())

			$sql = addslashes($sql);

		return $sql;
	}

	// =============================================================================

	$unityHash = anti_injection($_POST["idf_hash"]);

	$phpHash = "ffws930294";  // same code in here as in your Unity game
	$postData = "";
	$postData = $_POST["data"];
	$phpHash = md5($phpHash . $postData);


?>

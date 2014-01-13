<?php if (!defined('PAGE')) die("403"); ?>
<?php
	// CONNECTIONS =========================================================

	$dbhost = "titan.ntust.co";
	$dbuser = "titan_ntust_co";
	$dbpassword = "w5R5EPsbFv73mLny";
	$dbname = "titan_ntust_co";

	mysql_connect($host, $user, $password) or die("Cant connect into database");

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

	// THIS ONE IS JUST FOR THE NICKNAME PROTECTION AGAINST SQL INJECTION

	function anti_injection_login($sql, $formUse = true) {

		$sql = preg_replace("/(from|select|insert|delete|where|drop table|show tables|,|'|#|\*|--|\\\\)/i","",$sql);

		$sql = trim($sql);

		$sql = strip_tags($sql);

		if(!$formUse || !get_magic_quotes_gpc())

			$sql = addslashes($sql);

		return $sql;
	}

	// =============================================================================

	$unityHash = anti_injection_login($_POST["idf_hash"]);

	$phpHash = "ffws930294";  // same code in here as in your Unity game
	$postData = "";
	if ($_POST["data"]) $postData = $_POST["data"];
	$phpHash = md5($phpHash + $postData);



	$nick = anti_injection_login($_POST["myform_nick"]); //I use that function to protect against SQL injection

	$pass = anti_injection_login_senha($_POST["myform_pass"]);

	/*

	you can also use this:

	$nick = $_POST["myform_nick"];

	$pass = $_POST["myform_pass"];

	*/

	if(!$nick || !$pass) {

	    echo "Login or password cant be empty.";

	} else {

	    if ($unityHash != $phpHash){

	        echo "HASH code is diferent from your game, you infidel.";

	    } else {

	        $SQL = "SELECT * FROM scores WHERE name = '" . $nick . "'";

	        $result_id = @mysql_query($SQL) or die("DATABASE ERROR!");

	        $total = mysql_num_rows($result_id);

	        if($total) {

	            $datas = @mysql_fetch_array($result_id);

	            if(!strcmp($pass, $datas["password"])) {

	                echo "LOGADO - PASSWORD CORRECT";

	            } else {

	                echo "Nick or password is wrong.";

	            }

	        } else {

	            echo "Data invalid - cant find name.";

	        }

	    }

	}

?>

#pragma strict

static var hashSalt = "ffws930294";  // Set this th match with the server
static var ServerURL = "http://titan.ntust.co/";
static var GetUserByFBIDURL = ServerURL + "game/getUserByFBID.php";

static function MakeIdfHash(data : String) {

	return md5functions.Md5Sum(hashSalt+data);
}

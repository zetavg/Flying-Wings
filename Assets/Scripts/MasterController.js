/**
 * @fileoverview 系統控制.
 *
 * @author neson@dex.tw
 */
#pragma strict

var DevelopmentMode = false;

enum mode {menu, game};
var Mode = mode.menu;
var consoleline = "";

// Status
//////////////////////////////////////////////////////////////////////

// User //

var FBProfilePic : Texture2D;

var UserID : String;
var UserName : String;

// FB //

var FBisInit = false;
var FBisLogin = false;

var FBUserID : String;
var FBUserProfile = new JSONObject();
var FBUserName : String;

// GameObjects
//////////////////////////////////////////////////////////////////////

private var developgo : GameObject;
private var develop_console : GameObject;
private var develop_takeScreenShotToFB : TapButton;
private var UserNav : GameObject;
private var UserNav_PlayerFBLogin : GameObject;
private var UserNav_PlayerAvatar : GameObject;
private var UserNav_PlayerFBLoginB : TapButton;
private var UserNav_PlayerAvatarB : TapButton;
private var UserNav_PlayerGreetings : GameObject;


// Internet Functions
//////////////////////////////////////////////////////////////////////

// FB //

function FBInit () {
	FB.Init(FBOnInitComplete, OnHideUnity, null);
	//consolelog("FB.Init() called with " + FB.AppId);
	consolelog("FB.Init() called.");
}

function FBOnInitComplete () {
	FBisInit = true;
	consolelog("FB init complete.");
	FBLoadUserData();
}

function FBLoadUserData () {

	consolelog("FB Loading User Data ...");

	if (FB.IsLoggedIn) {

		FBisLogin = true;
		FBUserID = FB.UserId;

		if (!FBUserID) FBUserID = "0";

		var ppurl = "https" + "://graph.facebook.com/"+ FBUserID +"/picture";
		ppurl += "?access_token=" + FB.AccessToken;
		var ppwww = WWW(ppurl);
		yield ppwww;
		if (ppwww.error) {
			consolelog("Get user avator ERROR: " + ppwww.error);
		} else {
			consolelog("Get user avator successful");
			FBProfilePic = ppwww.texture;
		}

		var fpurl = "https" + "://graph.facebook.com/"+ FBUserID;
		fpurl += "?access_token=" + FB.AccessToken;
		var fpwww = WWW(fpurl);
		yield fpwww;
		if (fpwww.error) {
			consolelog("Get user name ERROR: " + fpwww.error);
		} else {
			consolelog("Get user name successful");
			FBUserProfile = new JSONObject(fpwww.data, -2, false, false);
			FBUserName = FBUserProfile['first_name'].str;
		}

		var sform = new WWWForm();
		sform.AddField("data", FBUserID);
		sform.AddField("FBUserName", FBUserName);
		sform.AddField("idf_hash", ServerConfig.MakeIdfHash(FBUserID));
		var swww = WWW(ServerConfig.GetUserByFBIDURL, sform);
		yield swww;
		if (swww.error) {
			consolelog("GameServer ERROR: " + swww.error);
		} else {
			consolelog("GameServer REPLY: " + swww.data);
		}

		UserNav_PlayerAvatar.guiTexture.texture = FBProfilePic;
		UserNav_PlayerAvatar.active = true;
		UserNav_PlayerGreetings.active = true;
		UserNav_PlayerGreetings.guiText.text = "Hello, " + UserName + "!";
		UserNav_PlayerFBLogin.active = false;

	} else {
		consolelog("FB not logged in.");
		UserNav_PlayerFBLogin.active = true;
		FBisLogin = false;
	}
}

function OnHideUnity (isGameShown : boolean) {

}

function FBLoginCallback (result : FBResult) {
	consolelog("FB login callback: ");
	if (result.Error != null)
		consolelog("Error Response: " + result.Error + ".");
	else if (!FB.IsLoggedIn) {
		consolelog("Login cancelled by player.");
	} else {
		consolelog("Login as FBID " + FB.UserId + " successful.");
		FBLoadUserData();
	}
}

function FBLogin() {
	FB.Login("email,publish_actions,user_games_activity", FBLoginCallback);
}

function FBCallback(result : FBResult) {

	if (result.Error) {
		consolelog("FBCallback ERROR: " + result.Error);
	} else {
		consolelog("FBCallback data received: " + result.Text);
	}
}

function FBTakeScreenshot() {
	StartCoroutine(FBTakingScreenshot());
}

function FBTakingScreenshot () : IEnumerator {
	consolelog("FBTakingScreenshot ...");
	yield WaitForSeconds(0.1);
	var width = Screen.width;
	var height = Screen.height;
	var tex = new Texture2D(width, height, TextureFormat.RGB24, false);
	// Read screen contents into the texture
	tex.ReadPixels(new Rect(0, 0, width, height), 0, 0);
	tex.Apply();
	var screenshot = tex.EncodeToPNG();

	var wwwForm = new WWWForm();
	wwwForm.AddBinaryData("image", screenshot, "FBSS.png");
	wwwForm.AddField("message", "Fly");

	FB.API("me/photos", Facebook.HttpMethod.POST, FBCallback, wwwForm);
}


// Initialize
//////////////////////////////////////////////////////////////////////

function Start () {

	DontDestroyOnLoad(this);  // 至始至終存活，不隨場景消滅，與遊戲共進退，是最偉大的存在。

	// Find GameObjects //

	developgo = gameObject.Find("develop");
	develop_console = gameObject.Find("develop/console");
	develop_takeScreenShotToFB = gameObject.Find("develop/takeScreenShotToFB").GetComponent("TapButton");
	UserNav = gameObject.Find("User Nav");

	UserNav_PlayerFBLogin = gameObject.Find("User Nav/Player FB Login");
	UserNav_PlayerFBLoginB = UserNav_PlayerFBLogin.GetComponent("TapButton");
	UserNav_PlayerFBLogin.active = true;
	UserNav_PlayerAvatar = gameObject.Find("User Nav/Player Avatar");
	UserNav_PlayerAvatarB = UserNav_PlayerAvatar.GetComponent("TapButton");
	UserNav_PlayerAvatar.active = false;
	UserNav_PlayerGreetings = gameObject.Find("User Nav/Player Greetings");
	UserNav_PlayerGreetings.active = false;


	if (DevelopmentMode) {
		developgo.active = true;
		consolelog("Starting.");
		consolelog("Hello.");
		print("DevelopmentMode");
	} else {
		developgo.active = false;
	}

	// Init //

	FBInit();

}


// Update
//////////////////////////////////////////////////////////////////////

function FixedUpdate () {

	switch (Mode) {
		case mode.menu:
		break;
		case mode.game:
		break;
	}

	// FB Actions
	//////////////////////////////////////////////////////////////////

	if (UserNav_PlayerFBLoginB.tapped) {
		FBLogin();
	}
	if (UserNav_PlayerAvatarB.tapped) {
		FBLogin();
	}

	// Update Var
	//////////////////////////////////////////////////////////////////

	// Development
	//////////////////////////////////////////////////////////////////
	if (DevelopmentMode) {
		if (develop_takeScreenShotToFB.tapped) {
			consolelog("Taking screen shot and upload to FB ...");
			FBTakeScreenshot();
		}
	}
}


// Development Functions
//////////////////////////////////////////////////////////////////////

function consolelog(log : String) {

	if (DevelopmentMode) develop_console.guiText.text += "\n" + log;

}

//////////////////
// END OF LINE. //
//////////////////

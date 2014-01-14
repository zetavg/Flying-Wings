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

var UserisLogin = 0;
var FBProfilePic : Texture2D;
var UserID = -1;
var UserName = "";
var Settings_GravitySensitivity = 1;
var Points_Kill = 0;
var Points_PlayTime = 0;
var Points_Score = 0;
var Points_Achievement = "";

var UserProfileLastsync = 0;

var ServerUserProfile : JSONObject;



// FB //

var FBisInit = false;
var FBisLogin = false;
var FBUserID : String;
var FBUserProfile : JSONObject;
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


// Profile Functions
//////////////////////////////////////////////////////////////////////

function ReadProfile () {

	consolelog("Reading Profile");

	UserisLogin = PlayerPrefs.GetInt("UserisLogin");
	UserID = PlayerPrefs.GetInt("UserID");
	UserName = PlayerPrefs.GetString("UserName");
	Settings_GravitySensitivity = PlayerPrefs.GetFloat("Settings_GravitySensitivity");
	Points_Kill = PlayerPrefs.GetInt("Points_Kill");
	Points_PlayTime = PlayerPrefs.GetInt("Points_PlayTime");
	Points_Score = PlayerPrefs.GetInt("Points_Score");
	Points_Achievement = PlayerPrefs.GetString("Points_Achievement");
	UserProfileLastsync = PlayerPrefs.GetInt("UserProfileLastsync");

	if (UserisLogin) {
		consolelog("User has logged in as " + UserID + " " + UserName);
		UserNav_PlayerAvatar.active = true;
		UserNav_PlayerGreetings.active = true;
		UserNav_PlayerGreetings.guiText.text = "Hello, " + UserName + "!";
		UserNav_PlayerFBLogin.active = false;
	} else {
		consolelog("User not logged in. UserisLogin: " + UserisLogin);
		UserNav_PlayerAvatar.active = false;
		UserNav_PlayerGreetings.active = false;
		UserNav_PlayerFBLogin.active = true;
		FBisLogin = false;
	}

}

function SaveLocalProfile () {

	PlayerPrefs.SetInt("UserisLogin", UserisLogin);
	PlayerPrefs.SetInt("UserID", UserID);
	PlayerPrefs.SetString("UserName", UserName);
	PlayerPrefs.SetFloat("Settings_GravitySensitivity", Settings_GravitySensitivity);
	PlayerPrefs.SetInt("Points_Kill", Points_Kill);
	PlayerPrefs.SetInt("Points_PlayTime", Points_PlayTime);
	PlayerPrefs.SetInt("Points_Score", Points_Score);
	PlayerPrefs.SetString("Points_Achievement", Points_Achievement);
	PlayerPrefs.SetInt("UserProfileLastsync", UserProfileLastsync);

}

function WipeLocalProfile () {

	consolelog("Set Local data to default ...");

	UserisLogin = 0;
	UserID = -1;
	UserName = "";
	Settings_GravitySensitivity = 1;
	Points_Kill = 0;
	Points_PlayTime = 0;
	Points_Score = 0;
	Points_Achievement = "";
	UserProfileLastsync = 0;

	SaveLocalProfile();

}

function UserLogout() {

	consolelog("UserLogout() called.");
	FB.Logout();
	WipeLocalProfile();
	ReadProfile();
}

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

		UserNav_PlayerAvatar.guiTexture.texture = FBProfilePic;

		var fpurl = "https" + "://graph.facebook.com/"+ FBUserID;
		fpurl += "?access_token=" + FB.AccessToken;
		var fpwww = WWW(fpurl);
		yield fpwww;
		if (fpwww.error) {
			consolelog("Get FBuser name ERROR: " + fpwww.error);
		} else {
			consolelog("Get FBuser name successful");
			FBUserProfile = new JSONObject(fpwww.data, -2, false, false);
			FBUserName = FBUserProfile['first_name'].str;
		}

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

function FBSyncUserData () {
	consolelog("FBSyncUserData() called");
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
		consolelog("decode json ... ");
		ServerUserProfile = new JSONObject(swww.data, -2, false, false);

		if (ServerUserProfile['LastUpdate']) {


			consolelog("Local LastSync: " + UserProfileLastsync + ", GameServer LastUpdate: " + parseInt(ServerUserProfile['LastUpdate'].str));
			if (UserProfileLastsync > parseInt(ServerUserProfile['LastUpdate'].str)) {  // 覆寫伺服器
				consolelog("Overwrite serverside");
				sform = new WWWForm();
				sform.AddField("data", UserID);
				sform.AddField("UserName", UserName);
				sform.AddField("Settings_GravitySensitivity", Settings_GravitySensitivity);
				sform.AddField("Points_Kill", Points_Kill);
				sform.AddField("Points_PlayTime", Points_PlayTime);
				sform.AddField("Points_Score", Points_Score);
				sform.AddField("Points_Achievement", Points_Achievement);
				sform.AddField("idf_hash", ServerConfig.MakeIdfHash(UserID.ToString()));
				swww = WWW(ServerConfig.UpdateUserByIDURL, sform);
				yield swww;
				if (swww.error) {
					consolelog("GameServer ERROR: " + swww.error);
				} else {
					consolelog("GameServer REPLY: " + swww.data);

					if (!swww.data == 'error') {
						consolelog((parseInt(swww.data)+1).ToString());
						UserProfileLastsync = parseInt(swww.data)+1;
						SaveLocalProfile();
					}
				}


			} else {  // 覆寫 Local
				consolelog("Overwrite local");

				UserID = parseInt(ServerUserProfile['UserID'].str);
				UserName = ServerUserProfile['UserName'].str;
				Settings_GravitySensitivity = parseFloat(ServerUserProfile['Settings_GravitySensitivity'].str);
				Points_Kill = parseInt(ServerUserProfile['Points_Kill'].str);
				Points_PlayTime = parseInt(ServerUserProfile['Points_PlayTime'].str);
				Points_Score = parseInt(ServerUserProfile['Points_Score'].str);
				Points_Achievement = ServerUserProfile['Points_Achievement'].str;
				UserProfileLastsync = parseInt(ServerUserProfile['NowTime'].str)+1;
				SaveLocalProfile();
				consolelog("UserID: " + UserID + " UserName: " + UserName);
			}

			consolelog("UserProfileLastsync: " + UserProfileLastsync);

		} else {
			consolelog("GameServer time error: has error");
		}



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
		UserisLogin = 1;
		SaveLocalProfile();
		FBLoadUserData();
		FBSyncUserData();
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
	ReadProfile();

// For Data Debug
UserisLogin = 1;
UserID = 1;
FBUserID = "12212";
UserName = "K";
Settings_GravitySensitivity = 1;
Points_Kill = 10;
Points_PlayTime = 20;
Points_Score = 123;
Points_Achievement = "";
UserProfileLastsync = 0;

	if (UserisLogin) {
		FBLoadUserData();
		FBSyncUserData();
	}

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
		UserLogout();
	}

	// Update Var
	//////////////////////////////////////////////////////////////////

	// Development
	//////////////////////////////////////////////////////////////////
	if (DevelopmentMode) {
		if (develop_takeScreenShotToFB.tapped) {
			consolelog("Taking screen shot and upload to FB ...");
			FBTakeScreenshot();
			FBSyncUserData();
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

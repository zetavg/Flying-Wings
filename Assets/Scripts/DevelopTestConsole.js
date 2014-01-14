#pragma strict

var status = "Ready.";
var FBisInit = false;
var FBisLogin = false;
var FBUserID : String;
var FBUserProfile = new JSONObject();
var FBUserName : String;
var FBProfilePic : Texture2D;
var UserID : String;
var UserName : String;
var buttonHeight = 60;
var mainWindowWidth = Screen.width - 30;
var mainWindowFullWidth = Screen.width;
var scrollPosition = Vector2.zero;

private function Button(label : String) {
	return GUILayout.Button(
	 	label,
	 	GUILayout.MinHeight(buttonHeight),
	 	GUILayout.MaxWidth(mainWindowWidth)
	);
}

function Start () {


}

function OnInitComplete () {
	FBisInit = true;
	LoadFBUserData();
}

function OnGotFBName (response : FBResult) {
	print(response);
	FBUserName = response.Text;
}

function LoadFBUserData () {
	if (FB.IsLoggedIn) {

		FBisLogin = true;
		FBUserID = FB.UserId;
		if (!FBUserID) FBUserID = "0";
		var ppurl = "https" + "://graph.facebook.com/"+ FBUserID +"/picture";
		ppurl += "?access_token=" + FB.AccessToken;
		var ppwww = WWW(ppurl);
		yield ppwww;
		FBProfilePic = ppwww.texture;
		gameObject.Find("/PPhoto").guiTexture.texture = FBProfilePic;


		var fpurl = "https" + "://graph.facebook.com/"+ FBUserID;
		fpurl += "?access_token=" + FB.AccessToken;
		var fpwww = WWW(fpurl);
		yield fpwww;
		FBUserProfile = new JSONObject(fpwww.data, -2, false, false);
		FBUserName = FBUserProfile['first_name'].str;

		var sform = new WWWForm();
		sform.AddField("data", FBUserID);
		sform.AddField("FBUserName", FBUserName);
		sform.AddField("idf_hash", ServerConfig.MakeIdfHash(FBUserID));
		var swww = WWW(ServerConfig.GetUserByFBIDURL, sform);
		yield swww;
		if (swww.error) {
			status = "SWWW ERROR: " + swww.error;
		} else {
			status = "SWWW REPLY: " + swww.data;
		}

	} else {
		FBisLogin = false;
	}
}

function OnHideUnity (isGameShown : boolean) {

}

function FBLoginCallback (result : FBResult) {
	if (result.Error != null)
		status = "Error Response:\n" + result.Error;
	else if (!FB.IsLoggedIn) {
		status = "Login cancelled by Player";
	}
}

function Callback(result : FBResult) {
}

function TakeScreenshot () : IEnumerator {
	yield WaitForSeconds(0.1);
	var width = Screen.width;
	var height = Screen.height;
	var tex = new Texture2D(width, height, TextureFormat.RGB24, false);
	// Read screen contents into the texture
	tex.ReadPixels(new Rect(0, 0, width, height), 0, 0);
	tex.Apply();
	var screenshot = tex.EncodeToPNG();

	var wwwForm = new WWWForm();
	wwwForm.AddBinaryData("image", screenshot, "DevelopTestConsole.png");
	wwwForm.AddField("message", "Fly");

	FB.API("me/photos", Facebook.HttpMethod.POST, Callback, wwwForm);
}

function OnGUI () {

	GUILayout.Space(5);
	GUILayout.Box("Status: " + status, GUILayout.MinWidth(mainWindowWidth));
	scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.MinWidth(mainWindowFullWidth));
	GUILayout.BeginVertical();
	GUI.enabled = !FBisInit;

	if (Button("FB.Init")) {
		FB.Init(OnInitComplete, OnHideUnity, null);
		//status = "FB.Init() called with " + FB.AppId;
		status = "FB.Init() called.";
	}

	GUILayout.BeginHorizontal();

	GUI.enabled = false;
	if (Button("FBONAME " + FBUserName))
	{
	}

	GUI.enabled = FB.IsLoggedIn;
	if (Button("F"))
	{
	}

	GUI.enabled = FB.IsLoggedIn;
	if (Button("F"))
	{
	}

	GUILayout.EndHorizontal();

	GUILayout.BeginHorizontal();

	GUI.enabled = FBisInit;
	if (Button("FBLogin"))
	{
		FB.Login("email,publish_actions", FBLoginCallback);
		status = "FBLogin called";
	}

	GUI.enabled = FB.IsLoggedIn;
	if (Button("FBLogout"))
	{
		FB.Logout();
		status = "FBLogout called";
	}

	GUI.enabled = FB.IsLoggedIn;
	if (Button("LoadFBUserData"))
	{
		status = "Load FB User Data With " + FBUserID;
		LoadFBUserData();
	}

	GUILayout.EndHorizontal();

	GUILayout.Space(10);
	if (Button("Take & upload screenshot"))
	{
		status = "Take screenshot";

		StartCoroutine(TakeScreenshot());
	}




	GUILayout.EndVertical();
	GUILayout.EndScrollView();


}


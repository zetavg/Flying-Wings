#pragma strict

var status = "Ready.";
var FBisInit = false;
var FBisLogin = false;
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
		status = "FB.Init() called with " + FB.AppId;
	}

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


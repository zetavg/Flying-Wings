#pragma strict

var defense : TapButton;
var kill : TapButton;
var timeattack : TapButton;
var tutorial : TapButton;

var defense_about : GameObject;
var kill_about : GameObject;
var timeattack_about : GameObject;
var tutorial_about : GameObject;


//各種Texture
var defense_texture : Texture2D;
var kill_texture : Texture2D;
var timeattack_texture : Texture2D;
var tutorial_texture : Texture2D;

var defense_hold_texture : Texture2D;
var kill_hold_texture : Texture2D;
var timeattack_hold_texture : Texture2D;
var tutorial_hold_texture : Texture2D;

function Start () {
	InactiveAllContents();
}

function Update () {

	//各種壓住、推倒。
	if (defense.held) defense.guiTexture.texture = defense_hold_texture; 
		else defense.guiTexture.texture = defense_texture;
	if (kill.held) kill.guiTexture.texture = kill_hold_texture; 
		else kill.guiTexture.texture = kill_texture;
	if (timeattack.held) timeattack.guiTexture.texture = timeattack_hold_texture; 
		else timeattack.guiTexture.texture = timeattack_texture;
	if (tutorial.held) tutorial.guiTexture.texture = tutorial_hold_texture;
		else tutorial.guiTexture.texture = tutorial_texture;

	if (defense.tapped) {
		InactiveAllContents();
		defense_about.SetActive(true);
	}
	if (kill.tapped) {
		InactiveAllContents();
		kill_about.SetActive(true);
	}


}

function InactiveAllContents(){
	var contents : GameObject[];
	contents = GameObject.FindGameObjectsWithTag("Content");
	for (var wtf in contents)
	{
		wtf.SetActive(false);
	}
}
#pragma strict

var defense : TapButton;
var kill : TapButton;
var timeattack : TapButton;
var tutorial : TapButton;
var back : TapButton;

var defense_about : GameObject;
var kill_about : GameObject;
var timeattack_about : GameObject;
var tutorial_about : GameObject;

var controlButtons : GameObject[];

function Start () {
	InactiveAllContents();
}

function Update () {

	//各種壓住、推倒。

	if (defense.tapped) {
		InactiveAllContents();
		defense_about.SetActive(true);
	}
	if (kill.tapped) {
		InactiveAllContents();
		kill_about.SetActive(true);
	}

	if (back.tapped) {
		Application.LoadLevel("Title");
	}

	controlButtons = GameObject.FindGameObjectsWithTag("ControlButton");

	for (var each in controlButtons)
	{
		var tb = each.GetComponent(TapButton);
		if (tb.released || !tb.held) tb.guiTexture.texture = tb.normal_texture[0];
		if (tb.held) tb.guiTexture.texture = tb.held_texture[0];
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
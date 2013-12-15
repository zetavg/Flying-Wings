//Input.GetMouseButton(0) && something.guiTexture.HitTest(Input.mousePosition) --> click
//GetMouseButtonDown(0)  ---> Pressed

//Popup Tutorial Dialog
var popup : GameObject;
var yes : TapButton;
var no : TapButton;
var quit : TapButton;
var dialog_group : GameObject;

//Menu buttons
var play : TapButton;
var setting : TapButton;
var training : TapButton;
var profile : TapButton;
var menu_group : GameObject;

//Textures...
var hold_texture : Texture2D;//for testing

var quit_texture : Texture2D;
var yes_texture : Texture2D;
var no_texture : Texture2D;

var quit_texture_hold : Texture2D;
var yes_texture_hold : Texture2D;
var no_texture_hold : Texture2D;


dialog_group = GameObject.Find("dialog_group");


function Update ()
{
	if (quit.tapped == true)
	{
		if (dialog_group.activeSelf == true)
		{
			//Application.Quit();
		}
		else
		{
			dialog_group.SetActive(true);
			dialog_group.transform.position.x = 0;
			menu_group.SetActive(false);
		}

	}

	if (yes.tapped == true)
	{
		//quit.animation.Play();
		dialog_group.animation.Play();
		//Application LoadLevel("Tutorial");
	}
	if (no.tapped == true)
	{
		dialog_group.animation.Play();			
		Delay1sAndInactive();
		menu_group.SetActive(true);
	}

	if (yes.held == false || no.held == false || quit.held == false)
	{
		quit.guiTexture.texture = quit_texture;
		yes.guiTexture.texture = yes_texture;
		no.guiTexture.texture = no_texture;		
	}

	if (quit.held) quit.guiTexture.texture = hold_texture;
	if (yes.held) yes.guiTexture.texture = hold_texture;
	if (no.held) no.guiTexture.texture = hold_texture;

}

function Awake() {
	menu_group.SetActive(false);
}

function Delay1sAndInactive() {
	yield WaitForSeconds(1);
	dialog_group.SetActive(false);
}


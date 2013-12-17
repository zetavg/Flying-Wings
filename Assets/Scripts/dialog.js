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

	var controlButtons : GameObject[];
	controlButtons = GameObject.FindGameObjectsWithTag("ControlButton");

	for (var each in controlButtons)
	{
		var tb = each.GetComponent(TapButton);
		if (tb.released || !tb.held) tb.guiTexture.texture = tb.normal_texture;
		if (tb.held) tb.guiTexture.texture = tb.held_texture;
	}
}

function Awake() {
	menu_group.SetActive(false);
}

function Delay1sAndInactive() {
	yield WaitForSeconds(1.5);
	dialog_group.SetActive(false);
}


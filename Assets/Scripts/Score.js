var back : TapButton;

function Update ()
{
	var sc : GameObject = GameObject.Find("SceneController");
	if (back.tapped || back.held || back.released){
		Destroy(sc);
		Application.LoadLevel("Stage");
	}
}
var back : TapButton;

var allG : GameObject[] = FindObjectsOfType(GameObject);

function Update ()
{
	var sc : GameObject = GameObject.Find("SceneController");
	if (back.tapped || back.held || back.released){
		Destroy(sc);
		for (var each in allG) if (each.name != gameObject.name) Destroy(each);
		Application.LoadLevel("Menu");

	}
}


#pragma strict

private var Player : GameObject;
private var GObject : GameObject;
private var label : GameObject;

function Start () {
	Player = transform.Find("/Player").gameObject;
	GObject = transform.Find("aimpoint").gameObject;
	label = transform.Find("aimpoint/label").gameObject;
}

function Update () {
	if (Player.GetComponent(PlayerControl).disableGUI == true) {
		GObject.active = false;
	} else if (transform.InverseTransformPoint(Player.transform.position).z > 0) {
		GObject.active = true;
	} else {
		GObject.active = false;
	}

	label.guiText.text = parseInt((Player.transform.position - transform.position).magnitude) + "m";
}

#pragma strict

private var Player : GameObject;
private var GObject : GameObject;

function Start () {
	Player = transform.Find("/Player").gameObject;
	GObject = transform.Find("aimpoint").gameObject;
}

function Update () {
	if (Player.GetComponent(PlayerControl).disableGUI == true) {
		GObject.active = false;
	} else if (transform.InverseTransformPoint(Player.transform.position).z > 0) {
		GObject.active = true;
	} else {
		GObject.active = false;
	}

}

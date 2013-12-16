#pragma strict

function Start () {

}

function Update () {

}


function OnTriggerEnter(what : Collider) {
	if (what.gameObject.tag == "Building" || what.gameObject.tag == "Wall" || what.gameObject.tag == "Ground") {
		transform.parent.gameObject.GetComponent(PlayerControl).on_ground++;
	}
}

function OnTriggerExit(what : Collider) {
    if (what.gameObject.tag == "Building" || what.gameObject.tag == "Wall" || what.gameObject.tag == "Ground") {
		transform.parent.gameObject.GetComponent(PlayerControl).on_ground--;
	}
}

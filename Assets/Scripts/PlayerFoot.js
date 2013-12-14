#pragma strict

function Start () {

}

function Update () {

}


function OnTriggerEnter(what : Collider) {
	if(what.gameObject.name == "Terrain" || what.gameObject.name == "wall" || what.gameObject.name == "house1" || what.gameObject.name == "house2" || what.gameObject.name == "house3" || what.gameObject.name == "house4" || what.gameObject.name == "house5") {
		transform.parent.gameObject.GetComponent(PlayerControl).on_ground++;
	}
}

function OnTriggerExit(what : Collider) {
    if(what.gameObject.name == "Terrain" || what.gameObject.name == "wall" || what.gameObject.name == "house1" || what.gameObject.name == "house2" || what.gameObject.name == "house3" || what.gameObject.name == "house4" || what.gameObject.name == "house5") {
		transform.parent.gameObject.GetComponent(PlayerControl).on_ground--;
	}
}

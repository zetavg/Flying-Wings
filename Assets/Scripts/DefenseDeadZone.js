var DefenseMd : DefenseMode;

function OnTriggerEnter(other : Collider){
	if (other.gameObject.tag != "Player")
		DefenseMd.Failed();
}


function Update() {
	DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);
}
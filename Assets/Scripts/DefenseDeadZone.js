var DefenseMd : DefenseMode;

function OnTriggerEnter(other : Collider){
	if (other.gameObject.tag == "Titan")
		Destroy(other.gameObject);
		DefenseMd.Failed();
}


function Update() {
	DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);
}
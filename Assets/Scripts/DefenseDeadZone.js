var DefenseMd : DefenseMode;

function OnCollisionEnter(){
	DefenseMd.Failed();
}


function Update() {
	DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);
}
var DefenseMd : Defense_Mode;

function OnCollisionEnter(){
	DefenseMd.Failed();
}


function Update() {
	var DefenseMd = GameObject.Find("DefenseMode").GetComponent(Defense_Mode);
}
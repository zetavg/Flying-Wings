var play : TapButton;

var DefenseMd : DefenseMode;
DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);

var gameMode : GameMode = GameMode.Defense;
var go = true;

function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Update() {
	if ((play.tapped || play.held || play.released )&& go) {
		DefenseMd.Activate();
		Application.LoadLevel("Game");		
		go = false;
	}

}
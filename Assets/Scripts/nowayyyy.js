var play : TapButton;

var DefenseMd : DefenseMode;
DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);

var gameMode : GameMode = GameMode.Defense;

function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Update() {
	if (play.tapped || play.held || play.released) {
		DefenseMd.Activate();
		Application.LoadLevel("Game");		
		
	}

}
//負責接收場景起始訊息，讀取設定，傳遞設定給各物件，建立網路連線，產生並同步網路連線物件，呼叫 Game Controller 開始遊戲。

/*
起始訊息定義：
mode：遊戲模式名稱，目前僅defense（吧）
level：難度 easy hard insane
	難度與巨人攻擊強度、巨人數量、巨人移動速度成正相關
*/


#pragma strict

public enum GameMode 
{
	Defense, 
	Killing, 
	TimeAttack
};

public enum Level 
{
	Easy, 
	Hard, 
	Insane
};


var defense : TapButton;
var kill : TapButton;
var timeattack : TapButton;
var tutorial : TapButton;
var back : TapButton;

var kill_about : GameObject;
var defense_about : GameObject;
var timeattack_about : GameObject;
var tutorial_about : GameObject;

var controlButtons : GameObject[];

var GameMode : GameMode;
var level : Level;

//mode scripts
var Defense : DefenseMode;
Defense = GameObject.Find("DefenseMode").GetComponent(DefenseMode);




function Awake()
{
	DontDestroyOnLoad(gameObject);
}


function Start () {
	InactiveAllContents();
}

function Update () {

	//各種壓住、推倒。

	if (defense.tapped) {
		InactiveAllContents();
		defense_about.SetActive(true);
		DefenseMode.SetUpLevel(level);
		DefenseMode.ModeActive();

	}
	if (kill.tapped) {
		InactiveAllContents();
		kill_about.SetActive(true);
	}

	if (back.tapped) {
		Application.LoadLevel("Title");
	}

	controlButtons = GameObject.FindGameObjectsWithTag("ControlButton");

	for (var each in controlButtons)
	{
		var tb = each.GetComponent(TapButton);
		if (tb.released || !tb.held) tb.guiTexture.texture = tb.normal_texture[0];
		if (tb.held) tb.guiTexture.texture = tb.held_texture[0];
	}


}

function InactiveAllContents(){
	var contents : GameObject[];
	contents = GameObject.FindGameObjectsWithTag("Content");
	for (var wtf in contents)
	{
		wtf.SetActive(false);
	}
}
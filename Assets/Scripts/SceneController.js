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

var play : TapButton;

var kill_about : GameObject;
var defense_about : GameObject;
var timeattack_about : GameObject;
var tutorial_about : GameObject;

//難度設定按鈕
var levelEasy : TapButton;
var levelHard : TapButton;
var levelInsane : TapButton;

var controlButtons : GameObject[];

//Set Default value for difficulty and gamemode
var gameMode : GameMode = GameMode.Defense;
var level : Level = Level.Easy;


//mode scripts
var DefenseMd : DefenseMode;
DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);

var TimeMd : TimeAttack;
TimeMd = GameObject.Find("TimeAttack").GetComponent(TimeAttack);

//var KillMd : Killing;

function Awake()
{
	DontDestroyOnLoad(gameObject);
}


function Start () {
	InactivateAllContents();

	//default choose EASY level
	levelEasy.guiTexture.texture = levelEasy.held_texture[0];

	//default play defense mode
	defense_about.SetActive(true);
}

function Update () {

	//各種壓住、推倒。

	if (defense.tapped) {
		//button animation control
		InactivateAllContents();
		defense_about.SetActive(true);

		//啟用Defense模式
		//InactivateAllModes();
		//DefenseMd.activate = true;
		gameMode = GameMode.Defense;
	}

	if (kill.tapped) {
		//button animation control
		InactivateAllContents();
		kill_about.SetActive(true);

		//啟用TimeAttack模式
		//InactivateAllModes();
		//TimeMd.activate = true;
		gameMode = GameMode.Killing;
	}

	if (timeattack.tapped) {
		InactivateAllContents();
		timeattack_about.SetActive(true);

		gameMode = GameMode.TimeAttack;
	}

	if (back.tapped) {
		Destroy(gameObject);
		Application.LoadLevel("Title");
	}
	
	if (play.tapped) {
		//Load Level Here and Setup up Objects According to activated mode
		
		//Application.LoadLevel("City");

		switch(gameMode)
		{
			case GameMode.Defense:
				DefenseMd.SetUpLevel(level);
				DefenseMd.Activate();
				break;

			case GameMode.Killing:	
				//,.......
				break;	

			case GameMode.TimeAttack:
				TimeMd.SetUpLevel(level);
				TimeMd.Activate();
				break;
		}

	}


	if (levelEasy.tapped || levelEasy.released || levelEasy.held) 
	{
		print("Good");
		InactiveLevelTextures();
		level = Level.Easy;
		levelEasy.UseSet(1);
	}
	if (levelHard.tapped || levelHard.released || levelHard.held)
	{
		InactiveLevelTextures();
		level = Level.Hard;
		levelHard.UseSet(1);
	}
	if (levelInsane.tapped || levelInsane.released || levelInsane.held)
	{
		InactiveLevelTextures();
		level = Level.Insane;
		levelInsane.UseSet(1);
	}



	controlButtons = GameObject.FindGameObjectsWithTag("ControlButton");

	for (var each in controlButtons)
	{
		var tb = each.GetComponent(TapButton);
		if (tb.released || !tb.held) tb.guiTexture.texture = tb.normal_texture[0];
		if (tb.held) tb.guiTexture.texture = tb.held_texture[0];
	}


}

function InactivateAllContents(){
	var contents : GameObject[];
	contents = GameObject.FindGameObjectsWithTag("Content");
	for (var wtf in contents)
	{
		wtf.SetActive(false);
	}
}

function InactivateAllModes() {
	DefenseMd.activate = false;
	TimeMd.activate = false;
	/* if there are other modes write here */
}

function InactiveLevelTextures() {
	levelEasy.UseSet(0);
	levelHard.UseSet(0);
	levelInsane.UseSet(0);
}
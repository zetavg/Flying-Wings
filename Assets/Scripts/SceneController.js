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
	TimeAttack,
	Tutorial
};

public enum Level 
{
	Easy, 
	Hard, 
	Insane
};

//關卡按鈕
var defense : TapButton;
var kill : TapButton;
var timeattack : TapButton;
var tutorial : TapButton;

//關卡說明
var defense_about : GUITexture;
var kill_about : GUITexture;
var timeattack_about : GUITexture;
var tutorial_about : GUITexture;

//兩個控制按鈕
var back : TapButton;
var play : TapButton;

//難度設定按鈕
var levelEasy : TapButton;
var levelHard : TapButton;
var levelInsane : TapButton;

//Set Default value for difficulty and gamemode
var gameMode : GameMode = GameMode.Defense;
var level : Level = Level.Easy;


//mode scripts
var DefenseMd : DefenseMode;
DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);

var TimeMd : TimeAttack;
TimeMd = GameObject.Find("TimeAttack").GetComponent(TimeAttack);

//var KillMd : Killing;
//KillMd = GameObject.Find("Killing").GetComponent(Killing);

function Awake()
{
	DontDestroyOnLoad(gameObject);
}


function Start () {

	//default choose EASY level
	InactivateLevelTextures();
	levelEasy.UseSet(1);

	//Inactivate Mode Contents with tag "Content"
	InactivateAllContents();

	//default play defense mode
	defense_about.gameObject.SetActive(true);
}

function Update () {

	//遊戲按鈕行為：
	{
		if (defense.tapped || defense.held || defense.released) {
			//button animation control
			InactivateAllContents();
			defense_about.gameObject.SetActive(true);

			//啟用Defense模式
			gameMode = GameMode.Defense;
		}

		if (kill.tapped || kill.held || kill.released) {
			//button animation control
			InactivateAllContents();
			kill_about.gameObject.SetActive(true);

			//啟用TimeAttack模式
			gameMode = GameMode.Killing;
		}

		if (timeattack.tapped || timeattack.held || timeattack.released) {
			InactivateAllContents();
			timeattack_about.gameObject.SetActive(true);

			gameMode = GameMode.TimeAttack;
		}

		if (tutorial.tapped || tutorial.held || tutorial.released) {
			InactivateAllContents();
			tutorial_about.gameObject.SetActive(true);

			gameMode = GameMode.Tutorial;
		}

		if (back.tapped || back.held || back.released) {
			Destroy(gameObject);
			Application.LoadLevel("Title");
		}
		
		if (play.tapped || play.held || play.released) {
			//Load Level Here and Setup up Objects According to activated mode
			
			Application.LoadLevel("City");
			//或者load「載入中」畫面。

			Wait(10);

			//用gameMode參數來啟動模式
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
		if (levelEasy.tapped || levelEasy.held || levelHard.released) 
		{
			level = Level.Easy;
			InactivateLevelTextures();
			levelEasy.UseSet(1);		
			
		}
		if (levelHard.tapped || levelHard.held || levelHard.released)
		{
			level = Level.Hard;
			InactivateLevelTextures();
			levelHard.UseSet(1);

		}
		if (levelInsane.tapped || levelInsane.held || levelInsane.released)
		{
			level = Level.Insane;
			InactivateLevelTextures();
			levelInsane.UseSet(1);
		}
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


function InactivateLevelTextures() {
	levelEasy.UseSet(0);
	levelHard.UseSet(0);
	levelInsane.UseSet(0);
}

function ByeeeeMi() {
	Destroy(gameObject);
}

function Wait(t : int) {
	yield WaitForSeconds(t);
}
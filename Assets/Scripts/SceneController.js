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

//Set Default value for difficulty and gamemode
var gameMode : GameMode = GameMode.Defense;


//mode scripts
var DefenseMd : DefenseMode;
DefenseMd = GameObject.Find("DefenseMode").GetComponent(DefenseMode);

var TimeMd : TimeAttack;
TimeMd = GameObject.Find("TimeAttack").GetComponent(TimeAttack);

var KillMd : KillingMode;
//

//var KillMd : Killing;
//KillMd = GameObject.Find("Killing").GetComponent(Killing);

function Awake()
{
	DontDestroyOnLoad(gameObject);
}


function Start () {

	//Inactivate Mode Contents with tag "Content"
	InactivateAllContents();

	//default play defense mode
	defense_about.gameObject.SetActive(true);
}

function Update () {

	//遊戲按鈕行為：
	{
		if (defense.tapped || defense.held || defense.released || Input.GetMouseButton(0) && defense.gameObject.guiTexture.HitTest(Input.mousePosition) ) {
			//button animation control
			InactivateAllContents();
			defense_about.gameObject.SetActive(true);

			//啟用Defense模式
			gameMode = GameMode.Defense;
		}

		if (kill.tapped || kill.held || kill.released  || Input.GetMouseButton(0) && kill.gameObject.guiTexture.HitTest(Input.mousePosition)) {
			//button animation control
			InactivateAllContents();
			kill_about.gameObject.SetActive(true);

			//啟用TimeAttack模式
			gameMode = GameMode.Killing;
		}

		if (timeattack.tapped || timeattack.held || timeattack.released  || Input.GetMouseButton(0) && timeattack.gameObject.guiTexture.HitTest(Input.mousePosition)) {
			InactivateAllContents();
			timeattack_about.gameObject.SetActive(true);

			gameMode = GameMode.TimeAttack;
		}

		if (tutorial.tapped || tutorial.held || tutorial.released) {
			InactivateAllContents();
			tutorial_about.gameObject.SetActive(true);

			gameMode = GameMode.Tutorial;
		}

		if (back.tapped || back.held || back.released  || Input.GetMouseButton(0) && back.gameObject.guiTexture.HitTest(Input.mousePosition)) {
			Destroy(gameObject);
			Application.LoadLevel("Menu");
		}
		
		//Load Level Here and Setup up Objects when play button pressed
		if (play.tapped || play.held || play.released  || Input.GetMouseButton(0) && play.gameObject.guiTexture.HitTest(Input.mousePosition)) {		
			
			Application.LoadLevel("City");
			//或者load「載入中」畫面。

			//用gameMode參數來啟動模式
			switch(gameMode)
			{
				case GameMode.Defense:
					//TimeMd.gameObject.SetActive(false);
					//KillMd.gameObject.SetActive(false);
					DefenseMd.Activate();
					break;

				case GameMode.Killing:	
					//,.......
					break;	

				case GameMode.TimeAttack:
					//DefenseMd.gameObject.SetActive(false);
					//KillMd.gameObject.SetActive(false);
					TimeMd.Activate();
					break;
			}

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


function ByeeeeMi() {
	Destroy(gameObject);
}
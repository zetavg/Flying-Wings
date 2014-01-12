/*
	a trial ... = =
	Game Controller (各 Game Mode 各一)：負責遊戲流程控制、記分、傳送通知、叫 Player 移動攝影機
*/
var scriptActive = false;
var status_game = false;

var titanAttack : float; //攻擊強度
var titanNumber : int;	//巨人數量
var titanSpeed : float;	//巨人移動速度（應該越快月難打吧）

var CountTime : int; //	倒數秒數
var countState = false;

function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function ModeActive()
{
	status_game = true;
	
	var gateLife = 100;
	
	CountTime = 180;
	countState = true;

}

function StartAnime()
{
	//主角由某個位置跑動到門下守備位置的動畫
	//鏡頭繞主角而旋轉拉遠拉近之類的。
}




//if Titan break the gate then end the mode
function Failed()
{
	//一堆巨人衝入城牆GG惹的畫面
	//直接錄製...吧


	//popup 幾張崩潰圖幻燈片
	//popup 選單，Replay/Menu等等


	status_game = false;
	//切到計分scene


}

function CountDown()
{
	if (CountTime > 0)
	{
		CountTime -= Time.deltaTime;
		//Debug.Log(Countdown);
		//Timer.guiText.text = Countdown.ToString("F1"); 
	}
	//else if (Countdown == 0)
	//load score level here

}

function SetUpLevel(difficulty : Level)
{
	switch(difficulty)
	{
		//假如血量100的話辣
		case Level.Easy:
			titanAttack = 5;
			titanNumber = 10;
			titanSpeed = 1;
			break;
		case Level.Hard:
			titanAttack = 10;
			titanNumber = 30;
			titanSpeed = 2;
			break;
		case Level.Insane:
			titanAttack = 50;
			titanNumber = 100;
			titanSpeed = 5;
			break;
	}
}

function Update()
{
	if (countState) CountDown();

}
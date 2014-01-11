//負責接收場景起始訊息，讀取設定，傳遞設定給各物件，建立網路連線，產生並同步網路連線物件，呼叫 Game Controller 開始遊戲。

/*
起始訊息定義：
mode：遊戲模式名稱，目前僅defense（吧）
level：難度 easy hard insane
	難度與巨人攻擊強度、巨人數量、巨人移動速度成正相關
*/

public enum GameMode 
{
	Defense, 
	Killing, 
	TimeLimit
};

public enum Level 
{
	Easy, 
	Hard, 
	Insane
};

var Gmode : GameMode;
//Set the value in the mode selection script
//ex SceneController.Gmode = Gmode.Defense


var titanAttack : float; //攻擊強度
var titanNumber : int;	//巨人數量
var titanSpeed : float;	//巨人移動速度（應該越快月難打吧）



function SetUpLevel(level : Level)
{
	switch(level)
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















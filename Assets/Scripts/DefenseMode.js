/*
Game Controller (各 Game Mode 各一)：負責遊戲流程控制、記分、傳送通知、叫 Player 移動攝影機
參數：
	activate：判斷模式是否啟動
	巨人強度：
	（以瑪利亞之牆血量100相對來計）
		Easy：每次扣2，巨人攻擊CD時間五秒。
		Hard：每次扣4，巨人攻擊CD時間三秒。
		Insane：每次扣10，巨人攻擊CD時間一秒。（幹好像太難了）

	巨人移動速度：
		Easy：慢
		Hard：稍快
		Insane：稍快（我好仁慈）

	每一波巨人數量（好吧得承認真的沒完過塔防）
		遞增(X)

		與難度正相關：
		Easy：四波，每次五隻，每波打完CD時間十秒
		Hard：五波，每次七隻，每波打完CD時間十秒
		Insane：十波，每次十二隻，無CD醬。顆。

*/
var activate = false;

var titanAttack : float; //攻擊強度
var titanNumber : int;	//巨人數量
var titanSpeed : float;	//巨人移動速度（應該越快月難打吧）


function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Activate()
{	
	//var gateLife = 100;
	


}

//Additional
function StartAnime()
{
	//主角由某個位置跑動到門下守備位置的動畫
	//鏡頭繞主角而旋轉拉遠拉近之類的。
}




//if Titan break the gate then end the mode
function Failed()
{
	//Additional:
		//一堆巨人衝入城牆GG惹的畫面
		//直接錄製...吧


		//popup 幾張崩潰圖幻燈片
		//popup 選單，Replay/Menu等等


	activate = false;

	//切到計分scene
	//......


}

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
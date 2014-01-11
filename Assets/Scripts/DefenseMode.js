/*
	a trial ... = =
	Game Controller (各 Game Mode 各一)：負責遊戲流程控制、記分、傳送通知、叫 Player 移動攝影機
*/
var scriptActive = false;
var status_game = false;


function ModeActive()
{
	status_game = true;
	
	var gateLife = 100;
	CountDown(180);
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

}

function CountDown(amount : int)
{
	//倒數here

}
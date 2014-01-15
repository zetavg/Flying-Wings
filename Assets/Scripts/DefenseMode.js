/*
Game Controller (各 Game Mode 各一)：負責遊戲流程控制、記分、傳送通知、叫 Player 移動攝影機
參數：
	<del>activate：判斷模式是否啟動</del>no need anymore


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

計分標準：
	時間、城牆血量

	start time
	end time等
*/

//var activate = false;

var titanAttack = 50.0; //攻擊強度
var titanNumber = 100;	//巨人數量
var titanSpeed = 5.0;	//巨人移動速度（應該越快月難打吧）
var titan : GameObject;
var titans : GameObject[]; //巨人們

var TargetPos : Vector3 = new Vector3(-0.3, 0, -188);

var playerControl : PlayerControl;

var killNumber : int;

//時間
var startTime : float;
var endTime : float;
var timeInterval : float;

var score : GUIText;

var first = false;


function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Activate()
{	
	//var gateLife = 100;
		
	startTime = Time.time;

	//titans = new GameObject[titanNumber];
	first = true;



}

function Update() {
	playerControl = GameObject.Find("Player").GetComponent(PlayerControl);
	
	if (first) {
		for (var i = 0; i < titanNumber; i++) {
			var Pos = new Vector3(Random.Range(-200.0, 200.0), 0, Random.Range(-110.0, 180.0));
			titans[i] = Instantiate(titan, Pos, transform.rotation);	
		}
		first = false;	
	}
	for (var each in titans) each.GetComponent(TitanAI).MoveToPoint(TargetPos);


	if (playerControl.killNumber == titanNumber)
	{
		killNumber = GameObject.Find("Player").GetComponent(PlayerControl).killNumber;

		Application.LoadLevel("Score");

		score = GameObject.Find("Score").GetComponent(GUIText);
		score.text = killNumber.ToString();

		endTime = Time.time;
		timeInterval = endTime - startTime;

		var totalTime = PlayerPrefs.GetFloat("Total Playing Time", 0.0F);
		PlayerPrefs.SetFloat("Total Playing Time", totalTime + timeInterval);

		var totalKills = PlayerPrefs.GetInt("Total Kills", 0);
		PlayerPrefs.SetInt("Total Kills", totalKills + killNumber);

		
	}
}

//Additional
function StartAnime()
{
	//主角由某個位置跑動到門下守備位置的動畫
	//鏡頭繞主角而旋轉拉遠拉近之類的。
	//理想啦。
}




//if Titan break the gate then end the mode
function Failed()
{
	//Application.LoadLevel("Failed");

	//Additional:
		//一堆巨人衝入城牆GG惹的畫面
		//直接錄製...吧


		//popup 幾張崩潰圖幻燈片
		//popup 選單，Replay/Menu等等

	//切到計分scene
	//......


}


function End(){

	score = GameObject.Find("Score").GetComponent(GUIText);
	killNumber = playerControl.killNumber;

	endTime = Time.time;
	timeInterval = endTime - startTime;

	var totalTime = PlayerPrefs.GetFloat("Total Playing Time", 0.0F);
	PlayerPrefs.SetFloat("Total Playing Time", totalTime + timeInterval);


	var totalKills = PlayerPrefs.GetInt("Total Kills", 0);
	PlayerPrefs.SetInt("Total Kills", totalKills + killNumber);
}
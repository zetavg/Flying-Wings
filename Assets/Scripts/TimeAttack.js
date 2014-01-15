/*
時間挑戰模式：Endless，多砍一隻時間加時間，初始時間45秒

參數：
	朕賜你不死，所以沒有血量ㄏㄏ（明明就是懶得寫）

	遊戲時間：
		初始時間45秒

	巨人強度：
		恩。
	巨人移動速度：
		越快越難砍，吧。
	砍殺數：
		恩。

	巨人範圍：
		整個城市都是我的屠宰場^_<~*
		隨機Instantiate?
		挑出waypoint的array吧。

產生巨人：無限制產生，幹掉一隻生一支，場內二十隻？

*/


//Default Playing Time
var countTime : float = 45;
var countState = false;
var killNumber : int = 40;
var instantiateTitan = false;
var titanKilled = false;
var score : GUIText;

var titan : GameObject;

//時間參數
var startTime : float;
var endTime : float;
var timeInterval : float;
var addedTime : int = 10;
var nextTime : float;

//控制參數
var first = true;


//var mother : GameObject;
//mother = GameObject.Find("SceneController");

/* 巨人產生的位置 */
//var AutoWayPoints : AutoWayPoint[];
var titans : GameObject[];


function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Activate()
{
	
	//intantiate objects here


	countState = true;
	//countTime = 45;
	startTime = Time.time;
}


//Instantiate Titan in random autowaypoint
function TitanGo(){
	var titanPos = AutoWayPoints[Random.Range(0, AutoWayPoints.length-1)].gameObject.transform.position;
	Instantiate(titan, titanPos, transform.rotation);
}

function Update()
{
	if (countState) CountDown();

	playerControl = GameObject.Find("Player").GetComponent(PlayerControl);
	
	if (first) {
		for (var i = 0; i < titanNumber; i++) {
			var Pos = new Vector3(Random.Range(-200.0, 200.0), 0, Random.Range(-110.0, 180.0));
			titans[i] = Instantiate(titan, Pos, transform.rotation);	
		}
		first = false;	
	}

	if (Time.time > nextTime + 15.0)
	{
		TargetPos = new Vector3(Random.Range(-200, 200), 0, Random.Range(-200, 200))
		for (var each in titans) each.GetComponent(TitanAI).MoveToPoint(TargetPos);
	}
	

	//AutoWayPoints = FindObjectsOfType(AutoWayPoint);

	if (instantiateTitan) 
	{
		TitanGo();
		instantiateTitan = false;
	}

	
	if (titanKilled) {
		instantiateTitan = true;
		
		if (Time.time - startTime < 40)
			countTime += addedTime;
		else
			countTime += addedTime/2;
		titanKilled = false;
	}
	
}

function CountDown()
{
	if (countTime >= 0)
	{
		countTime -= Time.deltaTime;
		//Debug.Log(countTime);
		//Timer.guiText.text = countTime.ToString("F1"); 
	}
	else //Time's up!
	{
		//Load Score Level
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
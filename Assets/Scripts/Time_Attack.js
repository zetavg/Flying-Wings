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
var countTime : float;
var countState = false;
var killNumber : int = 0;
var instantiateTitan = false;
var titanKilled = false;
var score : GUIText;

var titan : GameObject;

//時間參數
var startTime : float;
var endTime : float;
var timeInterval : float;
var addedTime : int = 10;


//var mother : GameObject;
//mother = GameObject.Find("SceneController");

/* 巨人產生的位置 */
var AutoWayPoints : AutoWayPoint[];
var titans : GameObject[];


function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Activate()
{
	
	//intantiate objects here
	var i = 0;
	titans = new GameObject[50];

	for (var each in AutoWayPoints) {
		titans[i] = Instantiate(titan, each.gameObject.transform.position, transform.rotation);
		i++;
	}


	countState = true;

	SetUpLevel();

	TitanGo();

	startTime = Time.time;
}

function SetUpLevel()
{
	countTime = 45;
}

//Instantiate Titan in random autowaypoint
function TitanGo(){
	var titanPos = AutoWayPoints[Random.Range(0, AutoWayPoints.length-1)].gameObject.transform.position;
	Instantiate(titan, titanPos, transform.rotation);
}

function Update()
{
	if (countState) CountDown();
	

	AutoWayPoints = FindObjectsOfType(AutoWayPoint);

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
	}
	
}

function CountDown()
{
	if (countTime > 0)
	{
		countTime -= Time.deltaTime;
		//Debug.Log(countTime);
		//Timer.guiText.text = countTime.ToString("F1"); 
	}
	else //Time's up!
	{
		//Load Score Level
		Application.LoadLevel("Score");
		End();
	}
	

}

function End(){
	//work in 結算 scene
	//score.gameObject.SetActive(true);
	score = GameObject.Find("Score").GetComponent(GUIText);

	score.text = killNumber.ToString();

	endTime = Time.time;
	timeInterval = endTime - startTime;

	var totalTime = PlayerPrefs.GetFloat("Total Playing Time", 0.0F);
	PlayerPrefs.SetFloat("Total Playing Time", totalTime + timeInterval);

	killNumber = GameObject.FindWithTag("Player").GetComponent(PlayerControl).killNumber;

	var totalKills = PlayerPrefs.GetInt("Total Kills", 0);
	PlayerPrefs.SetInt("Total Kills", totalKills + killNumber);

}
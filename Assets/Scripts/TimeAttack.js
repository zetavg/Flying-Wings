/*
時間挑戰模式：在限定時間內砍殺最多的巨人

參數：
	朕賜你不死，所以沒有血量ㄏㄏ（明明就是懶得寫）

	遊戲時間：90sec 180sec 300sec

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

var score : GUIText;

var titan : GameObject;

//var mother : GameObject;
//mother = GameObject.Find("SceneController");

/* 巨人產生的位置 */
var AutoWayPoints : AutoWayPoint[];


function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Activate(level : Level)
{
	//intantiate objects here
	countState = true;

	SetUpLevel(level);

	TitanGo();	


}

function SetUpLevel(level : Level)
{
	switch(level)
	{
		case Level.Easy:
			countTime = 90;
			break;
		case Level.Hard:
			countTime = 180;
			break;
		case Level.Insane:
			countTime = 300;
			break;
	}
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

	/*
	if (Titan got killed)
		killNumber++;
		instantiateTitan = true;
	*/
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

}
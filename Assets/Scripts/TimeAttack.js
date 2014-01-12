/*
時間挑戰模式：在限定時間內砍殺最多的巨人

參數：
	遊戲時間：90sec 180sec 300sec
巨人強度：
	恩。
巨人移動速度：
	越快越難砍，吧。

產生巨人：無限制產生，幹掉一隻生一支，場內二十隻？

*/

var activate = false;

//Default Playing Time
var countTime : int;
var countState = false;


function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function Start()
{
	//Set Default Playing Time.
	countTime = 90;
}

function Activate()
{
	//intantiate objects here
	countState = true;

}

function SetUpLevel(level : Level)
{

}


function End(){
	//結算scene

}

function Update()
{
	if (countState) CountDown();

}

function CountDown()
{
	if (countTime > 0)
	{
		countTime -= Time.deltaTime;
		//Debug.Log(Countdown);
		//Timer.guiText.text = Countdown.ToString("F1"); 
	}
	//else if (Countdown == 0)
	//load score level here

}
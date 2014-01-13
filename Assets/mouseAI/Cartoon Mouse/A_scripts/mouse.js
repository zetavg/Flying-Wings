#pragma strict

var playermod :GameObject;
var Animationctrl : Animation;
private var anicase : int;
private var step_flag : int = 0;
private var time_flag : int = 0;
private var myTimer : float = 5;
private var myTimer2 : float = 0.5;
private var Die_flag : int = 0;

function Start () {
	Animationctrl = playermod.GetComponent(Animation);

}
/*
function Animationctrler()
{
	//var Animationctrl : Animation = model.GetComponent(Animation);
	switch (anicase)
	{
	case 0:
			Animationctrl.Play("walk");
		break;
	case 1:
			Animationctrl.Play("die");
		break;
	
	}
		
}
*/
function Timer()
{
	if(myTimer > 0)
	{
		myTimer -= Time.deltaTime;
	}
	else
	{
		time_flag = 1;
	//	step_flag = 1;
	}
}
function Timer2()
{
	if(myTimer2 > 0)
	{
		myTimer2 -= Time.deltaTime;
	}
	else
	{
		Die_flag = 1;
	}
}

function Move()
{
	if(step_flag == 0) 
	{
		Timer();
		if(time_flag == 0)
		{
			Animationctrl.Play("walk");
			this.transform.Translate(Vector3.forward * Time.deltaTime * 2, Space.World);
		}
	}
	
	if(step_flag == 1)
	{
		Die();
		
	}
}

function Die()
{
	Timer2();
	if(Die_flag == 0)
		Animationctrl.Play("die");
	else
		step_flag = 2;
}
function Update () {
	
	//Move();
	Animationctrl.Play("walk");
			//this.transform.Translate(Vector3.forward * Time.deltaTime * 2, Space.World);
	//if(step_flag == 2)
		//Destroy(playermod);
}




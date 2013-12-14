#pragma strict

private var windowRect1;
private var windowRect2;
private var windowRect3;

public var playerName;  

function Awake ()
{	
	
	windowRect1 = Rect (Screen.width/2-310,Screen.height/2-90,380,280);
	windowRect2 = Rect (Screen.width/2+85,Screen.height/2-90,220,100);
	windowRect3 = Rect (Screen.width/2+85,Screen.height/2+55,220,100);
	playerName = PlayerPrefs.GetString("playerName", "player");  

}
function OnGUI ()
{
	windowRect1 = GUILayout.Window (0, windowRect1, listGUI, "Select a Level");	
	windowRect2 = GUILayout.Window (1, windowRect2, playerGUI, "Player Settings");	
	windowRect3 = GUILayout.Window (2, windowRect3, scoreGUI, "Highest Score");		
}
function scoreGUI(id : int){

	GUILayout.BeginVertical();
	GUILayout.Space(10);
	GUILayout.EndVertical();
	
	GUILayout.BeginHorizontal();
	GUILayout.Space(10);
		GUILayout.Label("Score: ");

	GUILayout.Space(10);
	GUILayout.EndHorizontal();	
	
	GUILayout.BeginHorizontal();
	GUILayout.Space(10);
	GUILayout.Label("Player: ");
	

	GUILayout.Space(10);
	GUILayout.EndHorizontal();
	
	
	GUILayout.BeginHorizontal();
	GUILayout.FlexibleSpace();
			
	GUILayout.FlexibleSpace();
	GUILayout.EndHorizontal();
	
}


function playerGUI(id : int){

	GUILayout.BeginVertical();
	GUILayout.Space(5);
	GUILayout.EndVertical();
	GUILayout.Label("");
	playerName = GUI.TextField (new Rect(10, 20, 200, 30), playerName, 50);  	
		

		GUILayout.BeginHorizontal();
		GUILayout.Space(10);

		GUILayout.Space(10);
		GUILayout.EndHorizontal();
		
		GUILayout.BeginHorizontal();
		GUILayout.Space(10);

		GUILayout.EndHorizontal();
		
		GUILayout.BeginHorizontal();
		//GUILayout.Space(10);
		//GUILayout.FlexibleSpace();
		
		if (GUILayout.Button ("SaveName"))
		{
			PlayerPrefs.SetString("playerName", playerName);  
		}	
		if (GUILayout.Button ("Advanced"))
		{
			Application.LoadLevel(1);
		}	
		
		//GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	
	
	
}

private var scrollPosition : Vector2;

function listGUI (id : int) {
	GUILayout.BeginVertical();
		GUILayout.Space(6);
		GUILayout.EndVertical();
	
	GUILayout.BeginHorizontal();
	
	if (GUILayout.Button ("level1")){
		Application.LoadLevel(1);
	}
	
	if (GUILayout.Button ("level2")){
		Application.LoadLevel(2);
	}

	if (GUILayout.Button ("level3")){
		Application.LoadLevel(3);
	}
	if (GUILayout.Button ("level4")){
		Application.LoadLevel(4);
	}
	GUILayout.EndHorizontal();
}
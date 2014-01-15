//
// SplashScreen Script
//
// This is the same script as above (only a few redundant things were removed), just converted to UnityScript
// to help out those sticking to unity script, and to help those just starting out with it.
// Quantum Fusion Studios

var guiDepth : int = 0;
var levelToLoad : String = "";
var splashLogo : Texture2D;
var fadeSpeed : float = 0.3;
var waitTime : float = 0.5;
var waitForInput : boolean = false;
var startAutomatically : boolean = true;
var timeFadingInFinished : float = 0.0;
var logoPositioning : LogoPositioning;
var splashType : SplashType;
enum SplashType {LoadNextLevelThenFadeOut, FadeOutThenLoadNextLevel}
enum LogoPositioning {Centered, Stretched, WidthBasedStretchedCentered}
private var alpha : float = 0.0;
private var status : FadeStatus = FadeStatus.FadeIn;
private var oldCam : Camera;
private var oldCamGO : GameObject;
private var splashLogoPos : Rect;
private var loadingNextLevel : boolean = false;
private enum FadeStatus {Paused, FadeIn, FadeWaiting, FadeOut}


function Start()
{
	if (startAutomatically)
	{
		status = FadeStatus.FadeIn;
	}

	else
	{
		status = FadeStatus.Paused;
	}

	oldCam = Camera.main;
	oldCamGO = Camera.main.gameObject;

	if (logoPositioning == LogoPositioning.Centered)
	{
		splashLogoPos.x = (Screen.width * 0.5) - (splashLogo.width * 0.5);
		splashLogoPos.y = (Screen.height * 0.5) - (splashLogo.height * 0.5);

		splashLogoPos.width = splashLogo.width;
		splashLogoPos.height = splashLogo.height;
	}

	else if (logoPositioning == LogoPositioning.WidthBasedStretchedCentered)
	{
		splashLogoPos.width = splashLogo.width;
		splashLogoPos.height = splashLogo.height*(splashLogo.width/splashLogoPos.width);

		splashLogoPos.x = (Screen.width * 0.5) - (splashLogoPos.width * 0.5);
		splashLogoPos.y = (Screen.height * 0.5) - (splashLogoPos.height * 0.5);


	}

	else
	{
		splashLogoPos.x = 0;
		splashLogoPos.y = 0;

		splashLogoPos.width = Screen.width;
		splashLogoPos.height = Screen.height;
	}

	if (splashType == SplashType.LoadNextLevelThenFadeOut)
	{
		DontDestroyOnLoad(this);
		DontDestroyOnLoad(Camera.main);
	}


	if ((Application.levelCount <= 1) || (levelToLoad == ""))
	{
		Debug.LogWarning("Invalid levelToLoad value.");
	}
}



function Update()
{
	switch(status)
	{
		case FadeStatus.FadeIn:
			alpha += fadeSpeed * Time.deltaTime;
		break;

		case FadeStatus.FadeWaiting:
			if ((!waitForInput && Time.time >= timeFadingInFinished + waitTime) || (waitForInput && Input.anyKey))
			{
				status = FadeStatus.FadeOut;
			}
		break;

		case FadeStatus.FadeOut:
			alpha += -fadeSpeed * Time.deltaTime;
		break;
	}
}



function OnGUI()
{
	GUI.depth = guiDepth;

	if (splashLogo != null)
	{
		GUI.color = Color(GUI.color.r, GUI.color.g, GUI.color.b, Mathf.Clamp01(alpha));
		GUI.DrawTexture(splashLogoPos, splashLogo);

			if (alpha > 1.0)
			{
				status = FadeStatus.FadeWaiting;
				timeFadingInFinished = Time.time;
				alpha = 1.0;

				if (splashType == SplashType.LoadNextLevelThenFadeOut)
				{
					oldCam.depth = -1000;
					loadingNextLevel = true;

					if ((Application.levelCount >= 1) && (levelToLoad != ""))
					{
						Application.LoadLevel(levelToLoad);
					}
				}
			}

			if (alpha < 0.0)
			{
				if (splashType == SplashType.FadeOutThenLoadNextLevel)
				{
					if ((Application.levelCount >= 1) && (levelToLoad != ""))
					{
						Application.LoadLevel(levelToLoad);
					}
				}

				else
				{
					Destroy(oldCamGO);
				}
			}
	}
}



function OnLevelWasLoaded(lvlIdx : int)
{
	if (loadingNextLevel)
	{
		Destroy(oldCam);
	}
}


function OnDrawGizmos()
{
	Gizmos.color = Color(1, 0, 0, 0.5);
	Gizmos.DrawCube(transform.position, Vector3(1, 1, 1));
}


function StartSplash()
{
	status = FadeStatus.FadeIn;
}

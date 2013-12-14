//
// Radar - Based off of the other radar scripts I've seen on the wiki
// By: Justin Zaun
//
// Attach this wherever you like, I recommend you attach it where the rest of your GUI is. Once
// attached take a look at the inspector for the object. You are going to see a bunch of options
// to setup. I've tried to give a set of defaults that will work with little messing around.
//
// The first item that should be set is the "Radar Center Tag" for anything of interesting to
// happen. This tag should be the object at the center of the radar, typically this is the local
// player's object. Place a check in the "Radar Center Active" box to diplay the play on the radar.
//
// The second item that should be set is the "Radar Blip1 Tag." This is the tag given to the
// objects you want to show on the radar. Typically this would be the remote player's tag or
// the bad guy's tag.
//
// To turn on the display of the blip place a check in the "Radar Blip1 Active" box.
//
// If you run your game at this point you will see a radar in the bottom center of your screen
// that is showing you all the remote players/bad guys that are around you.
//
// Now that you have seen a quick example of the radar I'll explain all the options. There looks
// like a lot but they are split into two sections. At the top are general radar settings that
// determin how you would like the radar to look. On the bottom there are settings for the blips
//
// I'll explain the blips first. This radar supports up to 4 types of blips. Each blip has an
// "Radar Blip# Active" option for turning on or off the blip. This allows you to have everything
// setup and then in game based on events to turn on the display of different types on blips.
//
// The second options is the "Radar Blip# Color" setting. This is the color of the blip. Not hard
// to explain, it changed the color of the object's blips for a given Tag. The last option for a
// blip is "Radar Blip# Tag." This is the tag for the object you would like to have on the radar.
//
// Some examples would be using Blip1 for bad guys, Blip2 for items the play is trying to find,
// Blip3 for forts and Blip4 could be the level's exits. Having the items on the radar in differnt
// colors will let the player identify the type of object the blip represents.
//
// The top options are the overall settings. First is the location of the radar. There are several
// options to choose from. If you choose "Custom" you have to fill in the "Radar Location Custom"
// to define the location. When you are defining the location please note this is the center of the
// radar.
//
// The third option "Radar Type" is how you would like your radar to look. You have a choice of
// Textured, Round and Transparent. The default is Round and is the colored bullseye you
// saw at the start if you played with the first example. If you choose Textured you MUST set
// "Radar Texture" to some image for the background. If you choose Round you can change the colors
// used in the bullseye with "Radar BackroundA" and "Radar BackgroundB"
//
// The last two options are about the size and zoom of the radar. The "Radar Size" is a percent
// of the screen the radar will take up, for example .2 is 20% of the screen. The "Radar Zoom"
// determines how much of the map should be displayed on the radar. Making this number smaller
// will zoom out and show you more stuff.

using UnityEngine;
using System.Collections;

public class Radar : MonoBehaviour
{

	public enum RadarTypes : int {Textured, Round, Transparent};
	public enum RadarLocations : int {TopLeft, TopCenter, TopRight, BottomLeft, BottomCenter, BottomRight, Left, Center, Right, Custom};

	// Display Location
	public RadarLocations radarLocation = RadarLocations.BottomCenter;
	public Vector2 radarLocationCustom;
	public RadarTypes radarType = RadarTypes.Round;
	public Color radarBackgroundA = new Color(255, 255, 0);
	public Color radarBackgroundB = new Color(0, 255, 255);
	public Texture2D radarTexture;
	public float radarSize = 0.20f;  // The amount of the screen the radar will use
	public float radarZoom = 0.60f;
	public bool autoScale = false;

	// Center Object information
	public bool   radarCenterActive;
	public Color  radarCenterColor = new Color(255, 255, 255);
	public string radarCenterTag;

	// Blip information
	public bool   radarBlip1Active;
	public Color  radarBlip1Color = new Color(0, 0, 255);
	public float radarBlip1Size = 6;
	public string radarBlip1Tag;

	public bool   radarBlip2Active;
	public Color  radarBlip2Color = new Color(0, 255, 0);
	public float radarBlip2Size = 6;
	public string radarBlip2Tag;

	public bool   radarBlip3Active;
	public Color  radarBlip3Color = new Color(255, 0, 0);
	public float radarBlip3Size = 6;
	public string radarBlip3Tag;

	public bool   radarBlip4Active;
	public Color  radarBlip4Color = new Color(255, 0, 255);
	public float radarBlip4Size = 6;
	public string radarBlip4Tag;

	// Internal vars
	private GameObject _centerObject;
	private int        _radarWidth;
	private int        _radarHeight;
	private Vector2    _radarCenter;
	private Texture2D  _radarCenterTexture;
	private Texture2D  _radarBlip1Texture;
	private Texture2D  _radarBlip2Texture;
	private Texture2D  _radarBlip3Texture;
	private Texture2D  _radarBlip4Texture;

	private float screenScale = 0;

	// Initialize the radar
	void Start ()
	{

		if (autoScale && Screen.width > 1100) {
			screenScale = (float)Screen.width/1100;
			radarSize *= screenScale;
			radarZoom *= screenScale;
		}

		// Determine the size of the radar
    	//_radarWidth = (int)(Screen.width * radarSize);
    	_radarWidth = (int)(radarSize);
    	_radarHeight = _radarWidth;

    	// Get the location of the radar
    	setRadarLocation();

		// Create the blip textures
		_radarCenterTexture = new Texture2D(3, 3, TextureFormat.RGB24, false);
		_radarBlip1Texture = new Texture2D(3, 3, TextureFormat.RGB24, false);
		_radarBlip2Texture = new Texture2D(3, 3, TextureFormat.RGB24, false);
		_radarBlip3Texture = new Texture2D(3, 3, TextureFormat.RGB24, false);
		_radarBlip4Texture = new Texture2D(3, 3, TextureFormat.RGB24, false);

		CreateBlipTexture(_radarCenterTexture, radarCenterColor);
		CreateBlipTexture(_radarBlip1Texture, radarBlip1Color);
		CreateBlipTexture(_radarBlip2Texture, radarBlip2Color);
		CreateBlipTexture(_radarBlip3Texture, radarBlip3Color);
		CreateBlipTexture(_radarBlip4Texture, radarBlip4Color);

		// Setup the radar background texture
		if (radarType != RadarTypes.Textured)
		{
			radarTexture = new Texture2D(_radarWidth, _radarHeight, TextureFormat.RGB24, false);
			CreateRoundTexture(radarTexture, radarBackgroundA, radarBackgroundB);
		}

		// Get our center object
		GameObject[] gos;
		gos = GameObject.FindGameObjectsWithTag(radarCenterTag);
		_centerObject = gos[0];
	}

	// Update is called once per frame
	void OnGUI ()
	{
		GameObject[] gos;

		// Draw th radar background
		if (radarType != RadarTypes.Transparent)
		{
			Rect radarRect = new Rect(_radarCenter.x - _radarWidth / 2, _radarCenter.y - _radarHeight / 2, _radarWidth, _radarHeight);
			GUI.DrawTexture(radarRect, radarTexture);
		}

		// Draw blips
		if (radarBlip1Active)
		{
			// Find all game objects
			gos = GameObject.FindGameObjectsWithTag(radarBlip1Tag);

			// Iterate through them and call drawBlip function
			foreach (GameObject go in gos)
			{
				drawBlip(go, _radarBlip1Texture, radarBlip1Size);
			}
		}
		if (radarBlip2Active)
		{
			gos = GameObject.FindGameObjectsWithTag(radarBlip2Tag);

			foreach (GameObject go in gos)
			{
				drawBlip(go, _radarBlip2Texture, radarBlip2Size);
			}
		}
		if (radarBlip3Active)
		{
			gos = GameObject.FindGameObjectsWithTag(radarBlip3Tag);

			foreach (GameObject go in gos)
			{
				drawBlip(go, _radarBlip3Texture, radarBlip3Size);
			}
		}
		if (radarBlip4Active)
		{
			gos = GameObject.FindGameObjectsWithTag(radarBlip4Tag);

			foreach (GameObject go in gos)
			{
				drawBlip(go, _radarBlip4Texture, radarBlip4Size);
			}
		}

		// Draw center oject
		if (radarCenterActive)
		{
			Rect centerRect = new Rect(_radarCenter.x - 3, _radarCenter.y - 3, 6, 6);
			GUI.DrawTexture(centerRect, _radarCenterTexture);
		}
	}

	// Draw a blip for an object
	void drawBlip(GameObject go, Texture2D blipTexture, float size)
	{
		if (_centerObject)
		{
			Vector3 centerPos = _centerObject.transform.position;
			Vector3 extPos = go.transform.position;

			// Get the distance to the object from the centerObject
			float dist = Vector3.Distance(centerPos, extPos);

			Vector3 toPos = go.transform.position - _centerObject.transform.position;

			// Get the object's offset from the centerObject
			//float bX = centerPos.x - extPos.x;
			//float bY = centerPos.z - extPos.z;
			float bY = -Vector3.Dot(toPos, _centerObject.transform.forward);
			float bX = -Vector3.Dot(toPos, _centerObject.transform.right);

			// Scale the objects position to fit within the radar
			bX = bX * radarZoom;
			bY = bY * radarZoom;

			// For a round radar, make sure we are within the circle
			if(dist <= (_radarWidth - 2) * 0.5 / radarZoom)
			{
				Rect clipRect = new Rect(_radarCenter.x - bX - size/2, _radarCenter.y + bY - size/2, size, size);
				GUI.DrawTexture(clipRect, blipTexture);
			}
		}
	}

	// Create the blip textures
	void CreateBlipTexture(Texture2D tex, Color c)
	{
		Color[] cols = {c, c, c, c, c, c, c, c, c};
		tex.SetPixels(cols, 0);
		tex.Apply();
	}

	// Create a round bullseye texture
	void CreateRoundTexture(Texture2D tex, Color a, Color b)
	{
		Color c = new Color(0, 0, 0);
		int size = (int)((_radarWidth / 2) / 4);

		// Clear the texture
		for (int x = 0; x < _radarWidth; x++)
		{
			for (int y = 0; y < _radarWidth; y++)
			{
				tex.SetPixel(x, y, c);
			}
		}

		for (int r = 4; r > 0; r--)
		{
			if (r % 2 == 0)
			{
				c = a;
			}
			else
			{
				c = b;
			}
			DrawFilledCircle(tex, (int)(_radarWidth / 2), (int)(_radarHeight / 2), (r * size), c);
		}

		tex.Apply();
	}

	// Draw a filled colored circle onto a texture
	void DrawFilledCircle(Texture2D tex, int cx, int cy, int r, Color c)
	{
		for (int x = -r; x < r ; x++)
		{
			int height = (int)Mathf.Sqrt(r * r - x * x);

			for (int y = -height; y < height; y++)
				tex.SetPixel(x + cx, y + cy, c);
		}
	}

	// Figure out where to put the radar
	void setRadarLocation()
	{
		// Sets radarCenter based on enum selection
		if(radarLocation == RadarLocations.TopLeft)
		{
			_radarCenter = new Vector2(_radarWidth / 2, _radarHeight / 2);
		}
		else if(radarLocation == RadarLocations.TopCenter)
		{
			_radarCenter = new Vector2(Screen.width / 2, _radarHeight / 2);
		}
		else if(radarLocation == RadarLocations.TopRight)
		{
			_radarCenter = new Vector2(Screen.width - _radarWidth / 2, _radarHeight / 2);
		}
		else if(radarLocation == RadarLocations.Left)
		{
			_radarCenter = new Vector2(_radarWidth / 2, Screen.height / 2);
		}
		else if(radarLocation == RadarLocations.Center)
		{
			_radarCenter = new Vector2(Screen.width / 2, Screen.height / 2);
		}
		else if(radarLocation == RadarLocations.Right)
		{
			_radarCenter = new Vector2(Screen.width - _radarWidth / 2, Screen.height / 2);
		}
		else if(radarLocation == RadarLocations.BottomLeft)
		{
			_radarCenter = new Vector2(_radarWidth / 2, Screen.height - _radarHeight / 2);
		}
		else if(radarLocation == RadarLocations.BottomCenter)
		{
			_radarCenter = new Vector2(Screen.width / 2, Screen.height - _radarHeight / 2);
		}
			else if(radarLocation == RadarLocations.BottomRight)
		{
			_radarCenter = new Vector2(Screen.width - _radarWidth / 2, Screen.height - _radarHeight / 2);
		}
			else if(radarLocation == RadarLocations.Custom)
		{
			_radarCenter = radarLocationCustom;
		}
	}


}

#pragma strict

@script RequireComponent( GUITexture )

static private var joysticks : Joystick[];					// A static collection of all joysticks
static private var enumeratedJoysticks : boolean = false;

var tapped : boolean;
var held : boolean;

private var gui : GUITexture;

function Start()
{
	// Cache this component at startup instead of looking up every frame	
	gui = GetComponent( GUITexture );

	tapped = false;
	held = false;
}

function Update()
{	
	if ( !enumeratedJoysticks ) {
		joysticks = FindObjectsOfType( Joystick ) as Joystick[];
		enumeratedJoysticks = true;
	}	
		
	var count = Input.touchCount;
	if (count == 0) {
		tapped = false;
		held = false;
	}

	var is_touched = false;

	for (var i : int = 0;i < count; i++) {
		var touch : Touch = Input.GetTouch(i);
		if (gui.HitTest(touch.position)) {
			if (tapped == false && held == false) tapped = true;
			else tapped = false;
			held = true;
			for ( var j : Joystick in joysticks ) {
				if ( j != this )
					j.LatchedFinger(touch.fingerId);
			}
			is_touched = true;
			break;
		}
	}

	if (!is_touched) {
		tapped = false;
		held = false;
	}
}

/**
 * @fileoverview A simple tap button.
 * Supports touch avoidance with Unity Joystick.
 *
 * @author neson@dex.tw
 */
#pragma strict

@script RequireComponent( GUITexture )

static private var joysticks : Joystick[];  // A static collection of all joysticks
static private var enumeratedJoysticks : boolean = false;

public var normal_texture : Texture;
public var disabled_texture : Texture;
public var held_texture : Texture;

var tapped : boolean;  // 點按
var held : boolean;  // 按住
var released : boolean;  // 放開

private var gui : GUITexture;

function Start() {
	// Cache this component at startup instead of looking up every frame
	gui = GetComponent( GUITexture );

	tapped = false;
	held = false;
	released = false;
}

function FixedUpdate() {
	if ( !enumeratedJoysticks ) {
		joysticks = FindObjectsOfType( Joystick ) as Joystick[];
		enumeratedJoysticks = true;
	}

	var count = Input.touchCount;
	var is_touched = false;
	released = false;

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
		if (held == true) {
			released = true;
		}
		tapped = false;
		held = false;
	}

	if (count == 0) {
		tapped = false;
		held = false;
	}
}

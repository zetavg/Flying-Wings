/**
 * @fileoverview A simple tap button.
 * Supports touch avoidance with Unity Joystick.
 *
 * Example:
 * public var T : TapButton;
 * if (T.tapped == true) ...
 * if (T.held == true) ...
 * if (T.released == true) ...
 * T.Enable();
 * T.UseSet(1);
 * T.Disable();
 *
 * @author neson@dex.tw
 */
#pragma strict

@script RequireComponent( GUITexture )
@script RequireComponent( AudioSource )

static private var joysticks : Joystick[];  // A static collection of all joysticks
static private var enumeratedJoysticks : boolean = false;


public var normal_texture : Texture[];  // 可定多組 guitexture 的 set, 並切換
public var disabled_texture : Texture[];
public var held_texture : Texture[];
private var normal_texture_in_use : Texture;
private var disabled_texture_in_use : Texture;
private var held_texture_in_use : Texture;
private var TextureSet = 0;
private var is_enabled = true;
private var gui : GUITexture;

public var tapped : boolean;  // 點按
public var held : boolean;  // 按住
public var released : boolean;  // 放開

class Effects {
	var sunkenWhenPressed = false;  // 按下後縮小
	var sunkenRate = 0.88;  // 按下後縮小比例
	var sunkenAnimation = false;  // 按下後縮小動畫
	var sunkenAnimationInitialVelocity = 0.00;
	var sunkenAnimationVelocityAcceleration = 0.02;
	var sunkenAnimationMinScale = 0.86;
	var sunkenAnimationMaxScale = 1.01;
	var sunkenAnimationTime = 0.0;  // 按下後縮小動畫時間
	var tapSFX : AudioClip;  // 點擊音效
}
public var effects : Effects;
private var juststart = true;
private var scale = 1.0;
private var pixelInset_org : Rect;
private var animation_step = 0;
private var animation_next = 0;
private var animation_v = 0f;

function Start() {
	// Cache this component at startup instead of looking up every frame
	gui = GetComponent( GUITexture );

	normal_texture_in_use = normal_texture[0];
	disabled_texture_in_use = disabled_texture[0];
	held_texture_in_use = held_texture[0];

	tapped = false;
	held = false;
	released = false;

	animation_v = effects.sunkenAnimationInitialVelocity;
}


function FixedUpdate() {

	// Init

	if (juststart) {
		pixelInset_org = guiTexture.pixelInset;
		juststart = false;
	}

	if (is_enabled) {

		// Is pressed?

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

		// Texture

		if (held && held_texture_in_use) {
			guiTexture.texture = held_texture_in_use;
		} else if (normal_texture_in_use) {
			guiTexture.texture = normal_texture_in_use;
		}

	} else {  // disabled
		if (disabled_texture_in_use) {
			guiTexture.texture = disabled_texture_in_use;
		}
	}

	// Effects

	if (effects.sunkenWhenPressed && !effects.sunkenAnimation) {
		if (held) {
			Scale(effects.sunkenRate);
		} else {
			Scale(1);
		}
	} else if (effects.sunkenWhenPressed && effects.sunkenAnimation) {
		if (tapped) {
			animation_next = 1;
		}
		if (released) {
			animation_next = 11;
		}
	}

	if (animation_step == 0) {
		if (animation_next == 1) {
			animation_step = 1;
			animation_next = 0;
		}

	} else if (animation_step == 1) {
		if (scale+animation_v < (1-(1-effects.sunkenAnimationMinScale)/2) || scale > 1) {
			animation_step = 2;
		}
		animation_v -= effects.sunkenAnimationVelocityAcceleration;
		Scale(scale+animation_v);

	} else if (animation_step == 2) {
		if (scale+animation_v < effects.sunkenAnimationMinScale || scale > 1) {
			animation_step = 3;
		}
		if (animation_v < effects.sunkenAnimationVelocityAcceleration) animation_v += effects.sunkenAnimationVelocityAcceleration;
		Scale(scale+animation_v);

	} else if (animation_step == 3) {
		if (scale+animation_v > effects.sunkenRate) {
			animation_step = 4;
			Scale(effects.sunkenRate);
			animation_v = effects.sunkenAnimationInitialVelocity;
		}
		animation_v += effects.sunkenAnimationVelocityAcceleration;
		Scale(scale+animation_v);

	} else if (animation_step == 4) {
		if (animation_next == 11) {
			animation_step = 11;
			animation_next = 0;
		}

	} else if (animation_step == 11) {
		if (animation_next == 1) {
			animation_step = 1;
			animation_next = 0;
		}
		if (scale+animation_v > (effects.sunkenRate-(effects.sunkenRate-effects.sunkenAnimationMaxScale)/2)) {
			animation_step = 12;
		}
		animation_v += effects.sunkenAnimationVelocityAcceleration;
		Scale(scale+animation_v);

	} else if (animation_step == 12) {
		if (animation_next == 1) {
			animation_step = 1;
			animation_next = 0;
		}
		if (scale+animation_v > effects.sunkenAnimationMaxScale) {
			animation_step = 13;
		}
		if (animation_v > effects.sunkenAnimationVelocityAcceleration) animation_v -= effects.sunkenAnimationVelocityAcceleration;
		Scale(scale+animation_v);

	} else if (animation_step == 13) {
		if (animation_next == 1) {
			animation_step = 1;
			animation_next = 0;
		}
		if (scale+animation_v < 1) {
			animation_step = 0;
			Scale(1);
			animation_v = effects.sunkenAnimationInitialVelocity;
		}
		animation_v -= effects.sunkenAnimationVelocityAcceleration;
		Scale(scale+animation_v);
	}

	if (effects.tapSFX && tapped) {
		if (!GetComponent('AudioSource')) {
			gameObject.AddComponent(AudioSource);
			audio.dopplerLevel = 0;
			audio.panLevel = 0;
			audio.minDistance = Mathf.Infinity;
		}
		audio.PlayOneShot(effects.tapSFX);
	}
}


function Disable() {
	is_enabled = false;
}


function Enable() {
	is_enabled = true;
}


function UseSet(n : int) {  // 使用某 set
	var i = 0;

	i = n;
	while (i >= 0) {
		if (normal_texture[i]) {
			normal_texture_in_use = normal_texture[i];
			break;
		}
		i--;
	}

	i = n;
	while (i >= 0) {
		if (held_texture[i]) {
			held_texture_in_use = held_texture[i];
			break;
		}
		i--;
	}

	i = n;
	while (i >= 0) {
		if (disabled_texture[i]) {
			disabled_texture_in_use = disabled_texture[i];
			break;
		}
		i--;
	}
}


function Scale(p : float) {  // Scale the GUITexture to a specified percentage, maintaining the center location.

	var new_width = pixelInset_org.width*p;
	var new_height = pixelInset_org.height*p;
	var new_x = pixelInset_org.x-(new_width-pixelInset_org.width)/2;
	var new_y = pixelInset_org.y-(new_height-pixelInset_org.height)/2;

	guiTexture.pixelInset = new Rect(new_x, new_y, new_width, new_height);

	scale = p;
}

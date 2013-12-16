﻿/**
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


function Start() {
	// Cache this component at startup instead of looking up every frame
	gui = GetComponent( GUITexture );

	normal_texture_in_use = normal_texture[0];
	disabled_texture_in_use = disabled_texture[0];
	held_texture_in_use = held_texture[0];

	tapped = false;
	held = false;
	released = false;
}


function FixedUpdate() {

	if (is_enabled) {
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

		if (held && held_texture) {
			guiTexture.texture = held_texture_in_use;
		} else if (normal_texture_in_use) {
			guiTexture.texture = normal_texture_in_use;
		}

	} else {
		if (disabled_texture) {
			guiTexture.texture = disabled_texture_in_use;
		}
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

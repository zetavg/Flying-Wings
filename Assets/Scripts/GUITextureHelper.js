/**
 * @fileoverview Help me with GUITextures
 *
 * @author neson@dex.tw
 */
#pragma strict

@script RequireComponent( GUITexture )

public var textures : Texture[];  // 可定多組 texture, 並切換
public var displayAsLable = false;  // 轉換成 GUILable, 方便進行旋踵等動作
private var texture : Texture;  // 現役 texture
private var show = true;  // 是否隱藏
private var org_screen_rect : Rect;
private var l_screen_rect : Rect;  // GUILable 用
private var l_center : Vector2;
public var l_rotate = 0.0;

function Start() {
	texture = guiTexture.texture;
	org_screen_rect = guiTexture.GetScreenRect();

	if (displayAsLable) {
		DisplayAsGUILabel();
	} else {
		DisplayAsGUITexture();
	}
}


function FixedUpdate() {
	LRotateV(1.9);
}


function UseTexture(n : int) {  // 使用某 texture
	if (textures[n]) {
		texture = textures[n];
		if (!displayAsLable) {
			guiTexture.texture = texture;
		}
	}
}

/*
function Scale(p : float) {  // Scale the GUITexture to a specified percentage, maintaining the center location.

	var new_width = pixelInset_org.width*p;
	var new_height = pixelInset_org.height*p;
	var new_x = pixelInset_org.x-(new_width-pixelInset_org.width)/2;
	var new_y = pixelInset_org.y-(new_height-pixelInset_org.height)/2;

	guiTexture.pixelInset = new Rect(new_x, new_y, new_width, new_height);

	scale = p;
}*/

function OnGUI() {

	if (show && displayAsLable) {
		GUIUtility.RotateAroundPivot(l_rotate, l_center);
		GUI.DrawTexture(l_screen_rect, texture, ScaleMode.StretchToFill, true, 0);
	}
}


function DisplayAsGUILabel() {  // 轉換為 GUILabel
	displayAsLable = true;
	guiTexture.texture = null;
	l_screen_rect = guiTexture.GetScreenRect();
	l_screen_rect.y = Screen.height - l_screen_rect.y - l_screen_rect.height;
	l_center.x = l_screen_rect.x + l_screen_rect.width/2;
	l_center.y = l_screen_rect.y + l_screen_rect.height/2;
}

function DisplayAsGUITexture() {  // 轉換為 GUITexture
	displayAsLable = false;
	guiTexture.texture = texture;
}

function Hide() {  // 隱藏
	show = false;
	if (!displayAsLable) {
		guiTexture.texture = null;
	}
}

function Show() {  // 顯示
	show = true;
	if (!displayAsLable) {
		guiTexture.texture = texture;
	}
}

function LRotate(d : float) {  // 旋轉 GUILabel
	if (!displayAsLable) {
		DisplayAsGUILabel();
	}
	l_rotate = d;
}

function LRotateV(dv : float) {  // 旋轉 GUILabel (速度)
	if (!displayAsLable) {
		DisplayAsGUILabel();
	}
	l_rotate += dv;
	if (l_rotate > 360) l_rotate -= 360;
	if (l_rotate < -360) l_rotate += 360;
}

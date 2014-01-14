/**
 * @fileoverview 維持 GUI 元素基於螢幕寬度之比例.
 *
 * @author neson@dex.tw
 */
#pragma strict

public var ignoreCustomSet = true;
public var baseScreenWidth = 600.0;
public var baseScreenHeight = 400.0;
public var scaleBelow = true;
enum sbmode { height, width };
public var scaleBase = sbmode.width;

function Awake () {

	// Default Value
	if (ignoreCustomSet) {
		baseScreenWidth = 600.0;
		scaleBelow = true;
	}

	var GUIScales = 0.0;

	if (Screen.width > baseScreenWidth || scaleBelow) {
		GUIScales = Screen.width/baseScreenWidth;

		if (guiTexture) {
			guiTexture.pixelInset.x *= GUIScales;
			guiTexture.pixelInset.y *= GUIScales;
			guiTexture.pixelInset.width *= GUIScales;
			guiTexture.pixelInset.height *= GUIScales;
		}

		if (guiText) {
			guiText.fontSize *= GUIScales;
			guiText.pixelOffset.x *= GUIScales;
			guiText.pixelOffset.y *= GUIScales;
		}
	}
}

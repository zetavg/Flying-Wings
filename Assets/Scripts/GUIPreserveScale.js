/**
 * @fileoverview 維持 GUI 元素基於螢幕寬度之比例.
 *
 * @author neson@dex.tw
 */
#pragma strict

public var ignoreCustomSet = true;
public var baseScreenWidth = 600.0;
public var scaleBelow = true;

function Awake () {

	// Default Value
	if (ignoreCustomSet) {
		baseScreenWidth = 600.0;
		scaleBelow = true;
	}

	if (Screen.width > baseScreenWidth || scaleBelow) {
		var GUIScales = Screen.width/baseScreenWidth;

		guiTexture.pixelInset.x *= GUIScales;
		guiTexture.pixelInset.y *= GUIScales;
		guiTexture.pixelInset.width *= GUIScales;
		guiTexture.pixelInset.height *= GUIScales;

		guiText.fontSize *= GUIScales;
		guiText.pixelOffset.x *= GUIScales;
		guiText.pixelOffset.y *= GUIScales;
	}
}

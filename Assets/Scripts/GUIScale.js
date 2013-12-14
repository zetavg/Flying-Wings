#pragma strict

function Awake () {
	if (Screen.width > 600) {
		var GUIScales = Screen.width/600.0;
		guiTexture.pixelInset.x *= GUIScales;
		guiTexture.pixelInset.y *= GUIScales;
		guiTexture.pixelInset.width *= GUIScales;
		guiTexture.pixelInset.height *= GUIScales;
	}
}

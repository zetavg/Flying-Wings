#pragma strict

var target : Transform;		// Object that this label should follow
var offset = Vector3.up;	// Units in world space to offset; 1 unit above object by default
var clampToScreen = false;	// If true, label will be visible even if object is off screen
var clampBorderSize = .05;	// How much viewport space to leave at the borders when a label is being clamped
var useMainCamera = true;	// Use the camera tagged MainCamera
var cameraToUse : Camera;	// Only use this if useMainCamera is false
var ActiveOnlyIsVisible = false;
private var cam : Camera;
private var thisTransform : Transform;
private var camTransform : Transform;

function Awake () {
	if (!target) {
		target = transform.parent.transform;
	}
}

function Start () {
	thisTransform = transform;
	if (useMainCamera)
		cam = Camera.main;
	else
		cam = cameraToUse;
	camTransform = cam.transform;
}

function LateUpdate () {
	if (clampToScreen) {
		var relativePosition = camTransform.InverseTransformPoint(target.position);
		relativePosition.z = Mathf.Max(relativePosition.z, 1.0);
		thisTransform.position = cam.WorldToViewportPoint(camTransform.TransformPoint(relativePosition + offset));
		thisTransform.position = Vector3(Mathf.Clamp(thisTransform.position.x, clampBorderSize, 1.0-clampBorderSize),
										 Mathf.Clamp(thisTransform.position.y, clampBorderSize, 1.0-clampBorderSize),
										 thisTransform.position.z);
	}
	else {
		thisTransform.position = cam.WorldToViewportPoint(target.position + offset);
	}

	if (ActiveOnlyIsVisible) {
		if (!target.transform.root.renderer.isVisible) {
			thisTransform.position += Vector3(-100, -100, 0);
		}
		print(cam.WorldToViewportPoint(target.position + offset));
	}
}


@script RequireComponent(GUIText)

#pragma strict

public var died = false;
var speed = 3.0;
var rotationSpeed = 5.0;
var attackRange = 30.0;
var dontComeCloserRange = 5.0;
var pickNextWaypointDistance = 2.0;
var target : Transform;
var curWayPoint : AutoWayPoint;
var nav = false;
var navDes : Vector3;
var Des : Vector3;



function Die () {
	died = true;
	animation.CrossFade("TitanDie", 0.5);

	for (var child1 : Transform in transform) {
		if (child1.gameObject.name == "AimPoint") {
			child1.active = false;
		}
		if (child1.gameObject.name == "Kill Range" || child1.gameObject.name == "Kill Point") {
			Destroy(child1.gameObject);
		}
		for (var child2 : Transform in child1.transform) {
			if (child2.gameObject.name == "AimPoint") {
				child2.active = false;
			}
			if (child2.gameObject.name == "Kill Range" || child2.gameObject.name == "Kill Point") {
				Destroy(child2.gameObject);
			}

			for (var child3 : Transform in child2.transform) {
				if (child3.gameObject.name == "AimPoint") {
					child3.active = false;
				}
				if (child3.gameObject.name == "Kill Range" || child3.gameObject.name == "Kill Point") {
					Destroy(child3.gameObject);
				}

				for (var child4 : Transform in child3.transform) {
					if (child4.gameObject.name == "AimPoint") {
						child4.active = false;
					}
					if (child4.gameObject.name == "Kill Range" || child4.gameObject.name == "Kill Point") {
						Destroy(child4.gameObject);
					}
					for (var child5 : Transform in child4.transform) {
						if (child5.gameObject.name == "AimPoint") {
							child5.active = false;
						}
						if (child5.gameObject.name == "Kill Range" || child5.gameObject.name == "Kill Point") {
							Destroy(child5.gameObject);
						}

						for (var child6 : Transform in child5.transform) {
							if (child6.gameObject.name == "AimPoint") {
								child6.active = false;
							}
							if (child6.gameObject.name == "Kill Range" || child6.gameObject.name == "Kill Point") {
								Destroy(child6.gameObject);
							}
						}
					}
				}
			}
		}
	}
}


function CanSeeTarget () : boolean {
	if (Vector3.Distance(transform.position, target.position) > attackRange)
		return false;

	var hit : RaycastHit;
	if (Physics.Linecast (transform.position, target.position, hit))
		return hit.transform == target;

	return false;
}

function AttackPlayer () {
}

function SearchPlayer (position : Vector3) {
	// Run towards the player but after 3 seconds timeout and go back to Patroling
	var timeout = 3.0;
	while (timeout > 0.0) {
		MoveTowards(position);

		// We found the player
		if (CanSeeTarget ())
			return;

		timeout -= Time.deltaTime;
		yield;
	}
}

function RotateTowards (position : Vector3) {
	SendMessage("SetSpeed", 0.0);

	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1)
		return;

	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}

function MoveTowards (position : Vector3) {
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.5) {
		SendMessage("SetSpeed", 0.0);
		return;
	}

	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);

	// Move the character
	direction = forward * speed * speedModifier;
	GetComponent(CharacterController).SimpleMove(direction);

	SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}

function PickNextWaypoint (currentWaypoint : AutoWayPoint) {
	// We want to find the waypoint where the character has to turn the least

	// The direction in which we are walking
	var forward = transform.TransformDirection(Vector3.forward);

	// The closer two vectors, the larger the dot product will be.
	var best = currentWaypoint;
	var bestDot = -10.0;
	for (var cur : AutoWayPoint in currentWaypoint.connected) {
		var direction = Vector3.Normalize(cur.transform.position - transform.position);
		var dot = Vector3.Dot(direction, forward);
		if (dot > bestDot && cur != currentWaypoint) {
			bestDot = dot;
			best = cur;
		}
	}

	return best;
}

function Start () {

	curWayPoint = AutoWayPoint.FindClosest(transform.position);

}

function Update () {

	if (!died && !nav) {
		var waypointPosition = curWayPoint.transform.position;

		// Are we close to a waypoint? -> pick the next one!
		if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance)
			curWayPoint = PickNextWaypoint (curWayPoint);

		// Move towards our target
		MoveTowards(waypointPosition);
		//yield;

	}
	if (nav) MoveToPoint(navDes);
	Des = gameObject.GetComponent(NavMeshAgent).destination;

}

function MoveToPoint(destination : Vector3){
	navDes = destination;
	nav = true;
	//overpowered function wwwwwwwww
	gameObject.GetComponent(NavMeshAgent).SetDestination(destination);
}
function SetSpeed(){

}

//宣告:速度、旋轉速度、射程、攻擊範圍、射角、禁止攻擊範圍、攻擊延遲、下個移動點、目標
var speed = 3.0;
var rotationSpeed = 5.0;
var shootRange = 15.0;
var attackRange = 30.0;
var shootAngle = 4.0;
var dontComeCloserRange = 5.0;
var delayShootTime = 0.35;
var pickNextWaypointDistance = 2.0;
var target : Transform;
private var lastShot = -10.0;
// Make sure there is always a character controller
@script RequireComponent (CharacterController)
//功能:初始化
//如果沒有目標，找尋遊戲中有"Player"標籤的物件為目標
//執行功能:Patrol
function Start () {
	// Auto setup player as target through tags
	if (target == null && GameObject.FindWithTag("Player"))
		target = GameObject.FindWithTag("Player").transform;
	Patrol();
}
//功能:Patrol

function Patrol () {
	var curWayPoint = AutoWayPoint.FindClosest(transform.position);
	while (true) {
		var waypointPosition = curWayPoint.transform.position;
		// Are we close to a waypoint? -> pick the next one!
		if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance)
			curWayPoint = PickNextWaypoint (curWayPoint);

		// Attack the player and wait until
		// - player is killed
		// - player is out of sight		
		if (CanSeeTarget ())
			yield StartCoroutine("AttackPlayer");
		
		// Move towards our target
		MoveTowards(waypointPosition);
		
		yield;
	}
}
//功能:CanSeeTarget
//偵測目標
function CanSeeTarget () : boolean {
	if (Vector3.Distance(transform.position, target.position) > attackRange)
		return false;
		
	var hit : RaycastHit;
	if (Physics.Linecast (transform.position, target.position, hit))
		return hit.transform == target;
    
	return false;
}

function Shoot () {
	// Start shoot animation
	animation.CrossFade("shoot", 0.3);

	// Wait until half the animation has played
	yield WaitForSeconds(delayShootTime);
	
	// Fire gun
	BroadcastMessage("Fire");
	
	// Wait for the rest of the animation to finish
	yield WaitForSeconds(animation["shoot"].length - delayShootTime);
}

function AttackPlayer () {
	var lastVisiblePlayerPosition = target.position;
	while (true) {
		if (CanSeeTarget ()) {
			// Target is dead - stop hunting
			if (target == null)
				return;

			// Target is too far away - give up	
			var distance = Vector3.Distance(transform.position, target.position);
			if (distance > shootRange * 3)
				return;
			
			lastVisiblePlayerPosition = target.position;
			if (distance > dontComeCloserRange)
				MoveTowards (lastVisiblePlayerPosition);
			else
				RotateTowards(lastVisiblePlayerPosition);

			var forward = transform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);

			// Start shooting if close and play is in sight
			if (distance < shootRange && angle < shootAngle)
				yield StartCoroutine("Shoot");///////////////////在攻擊範圍內做的動作
		} else {
			yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop attacking
			if (!CanSeeTarget ())
				return;
		}

		yield;
	}
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
	GetComponent (CharacterController).SimpleMove(direction);
	
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
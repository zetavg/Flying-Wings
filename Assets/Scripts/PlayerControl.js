/////////////////
// 立體機動裝置 //
/////////////////
/**
 * @fileoverview 玩家控制.
 *
 * @author neson@dex.tw
 */
#pragma strict


// Universal
//////////////////////////////////////////////////////////////////////

private var i : int;
private var j : int;
private var t : int;


//
//////////////////////////////////////////////////////////////////////

public var rotate_cam = false;  // 是否旋轉視角, 用於左右旋轉畫面平衡
public var max_speed = 30.0;  // 玩家在場景中的最大速度, 避免失速
public var PlayerControlsGUI : GameObject;  // 控制界面
public var Gear : GameObject;
public var Joystick : Joystick;
public var FireBotton : TapButton;
public var ReleaseBotton : TapButton;
public var Aim : GameObject;
public var FireBotton_texture : Texture;
public var FireBotton_texture_disabled : Texture;
public var FireBotton_texture_pull : Texture;
public var FireBotton_texture_pull_pulled : Texture;
public var ReleaseBotton_texture : Texture;
public var ReleaseBotton_texture_disabled : Texture;
public var ReleaseBotton_texture_released : Texture;
public var Aim_texture : Texture;
public var Aim_aim_texture : Texture;
public var TDMG_Fire_sound : AudioClip;  // 射出 hook 的音效
public var TDMG_Hooked_sound : AudioClip;  // hook 釘住的音效
public var TDMG_Withdraw_sound : AudioClip;  // 收回 hook 音效
public var Land_sound : AudioClip;  // 落地音效
public var Kill_sound : AudioClip;  // 揮刀音效

public var TDMG_Attacher_L : GameObject;
public var TDMG_Attacher_R : GameObject;


// Self
//////////////////////////////////////////////////////////////////////

private var MainCamW : GameObject;  // Cam 的容器
private var MainCam : GameObject;  // Cam
private var TargetW : GameObject;  // 準心容器
private var Target : GameObject;  // 準心
private var TDMG : GameObject;  // 立體機動裝置
private var TDMG_Gear : GameObject;
private var TDMG_Hook_LC : GameObject;
private var TDMG_Hook_RC : GameObject;
private var TDMG_Hook_L : GameObject;
private var TDMG_Hook_R : GameObject;
private var TDMG_Jet : GameObject;


// Status
//////////////////////////////////////////////////////////////////////

public var on_ground = 0;  // 是否在地上? 0: 否, n>0: 接觸到 n 個地面物件. 由 playerFoot 維護.
private var pre_on_ground = 0;  // 上一次 update 時是否在地上?
private var pre_position : Vector3;  // 上一次 update 時的坐標
private var kill_mode = 0;  // 0: not killing, 1: prepare killing, 2: kill
private var hit_thing = false;  // 是否有接觸到物體?
public var prev_y = 00.0;
public var prev_velocity : Vector3;
public var fire_start_time = 00.0;
private var TDMG_Hook_L_state = 0;
private var TDMG_Hook_R_state = 0;  // 0 已收回，1 收回中，2 attach，3 射出
private var TDMG_Hook_L_attach_point : Vector3;
private var TDMG_Hook_R_attach_point : Vector3;
private var pull_y_cd = 0;
private var pull_y_count = 0;
private var kill_cd = 0;


// Controls
//////////////////////////////////////////////////////////////////////

private var control_buffer_rate = 7;
private var update_buffer_c = 0;
private var buffer_forward = new float[control_buffer_rate];
private var buffer_input_rotate_y = new float[control_buffer_rate];
private var buffer_input_rotate_x = new float[control_buffer_rate];
private var TDMG_Wire_max_distance = 2/0.02;


// Gravity //

public var gravitySensitivity = 1.0;
private var gc_speed_up_range = 0.3;
private var gc_no_rotate_range = 0.1;
private var gravity_buffer_rate = 12;  // 緩衝區大小
private var gravity_buffer_i_x = 0;  // 緩衝區計數器
private var gravity_buffer_i_y = 0;  // 緩衝區計數器
private var InputAngle_x_buffer = new float[gravity_buffer_rate];  // 緩衝區
private var InputAngle_y_buffer = new float[gravity_buffer_rate];  // 緩衝區
for (i=0 ; i<gravity_buffer_rate ; i++) {  // 緩衝區歸零
	InputAngle_x_buffer[i] = 0;
	InputAngle_y_buffer[i] = 0;
}

/**
 * Returns the stabilized InputAngle_x.
 *
 * @return {boolean}.
 */
function GetInputAngle_y() {
	if (++gravity_buffer_i_x >= gravity_buffer_rate) gravity_buffer_i_x = 0;
	var input_acceleration_x = Input.acceleration.x;
	if (input_acceleration_x > 1) input_acceleration_x = 1;
	else if (input_acceleration_x < -1) input_acceleration_x = -1;
	InputAngle_x_buffer[gravity_buffer_i_x] = (Mathf.Asin(input_acceleration_x)/(Mathf.PI)-0)*gravitySensitivity;
	var sum = 0.0;
	for (i=0 ; i < gravity_buffer_rate ; i++) {
		sum += InputAngle_x_buffer[i];
	}
	var avg = sum/gravity_buffer_rate;
	return avg;
}

/**
 * Returns the stabilized InputAngle_y.
 *
 * @return {boolean}.
 */
function GetInputAngle_x() {
	if (++gravity_buffer_i_y >= gravity_buffer_rate) gravity_buffer_i_y = 0;
	var input_acceleration_y = Input.acceleration.y;
	if (input_acceleration_y > 1) input_acceleration_y = 1;
	else if (input_acceleration_y < -1) input_acceleration_y = -1;
	InputAngle_y_buffer[gravity_buffer_i_y] = (Mathf.Asin(-input_acceleration_y)/(Mathf.PI)-0.2)*2*gravitySensitivity;  // 導正
	var sum = 0.0;
	for (i=0 ; i < gravity_buffer_rate ; i++) {
		sum += InputAngle_y_buffer[i];
	}
	var avg = sum/gravity_buffer_rate;
	return avg;
}



// Animatiom
//////////////////////////////////////////////////////////////////////

private var speed_state : int;  // 0 靜止，1 走，2 跑






// Init
//////////////////////////////////////////////////////////////////////

function Start () {

	// Initialize Variables //


	// Find GameObjects //

	MainCam = transform.Find("Camera Wrapper/Main Camera").gameObject;
	MainCamW = transform.Find("Camera Wrapper").gameObject;
	TargetW = transform.Find("Target Wrapper").gameObject;
	Target = transform.Find("Target Wrapper/Target").gameObject;
	TDMG = transform.Find("TDMG").gameObject;
	TDMG_Gear = transform.Find("TDMG/TDMG_Gear").gameObject;
	TDMG_Hook_LC = transform.Find("TDMG/TDMG_Hook_L_Container").gameObject;
	TDMG_Hook_RC = transform.Find("TDMG/TDMG_Hook_R_Container").gameObject;
	TDMG_Hook_L = transform.Find("TDMG/TDMG_Hook_L_Container/TDMG_Hook").gameObject;
	TDMG_Hook_R = transform.Find("TDMG/TDMG_Hook_R_Container/TDMG_Hook").gameObject;
	TDMG_Jet = transform.Find("TDMG/TDMG_Jet").gameObject;
}


// Update
//////////////////////////////////////////////////////////////////////

function FixedUpdate () {

	// Basic Controls and Controls SFX
	//////////////////////////////////////////////////////////////////////

	var TDMG_Gear_sound = 0;

	// Rotation (Gravity) //

	// Y (left & right)
	var input_rotate_y = GetInputAngle_y();

	if (input_rotate_y > 0.4) input_rotate_y = 0.4;  // limit
	else if (input_rotate_y < -0.4) input_rotate_y = -0.4;

	TargetW.transform.localRotation.eulerAngles.y = input_rotate_y*input_rotate_y*100;
/*	MainCamW.transform.localRotation.y += (input_rotate_y/3-MainCamW.transform.localRotation.y)/10;
	if (input_rotate_y > 0.1) {
		transform.Rotate(Vector3.up, (TargetW.transform.localRotation.y-0.1)*5);
	} else if (input_rotate_y < -0.1) {
		transform.Rotate(Vector3.up, (TargetW.transform.localRotation.y+0.1)*5);
	}*/

	// X (up & down)
	var input_rotate_x = GetInputAngle_x();

	// print(input_rotate_x+ " " + input_rotate_y);

	// Limit
	if (input_rotate_x > 0.4) input_rotate_x = 0.4;
	else if (input_rotate_x < -0.4) input_rotate_x = -0.4;
	//if (input_rotate_x > 0.34) input_rotate_x += (input_rotate_x-0.34)*3;

	TargetW.transform.localRotation.eulerAngles.x = -input_rotate_x*input_rotate_x*100;
/*	MainCamW.transform.localRotation.x += (input_rotate_x/3-MainCamW.transform.localRotation.x)/10;*/

	// Debug
	print("x " + input_rotate_x + " y " + input_rotate_y);



	// Forward (Joystick:Thrust Lever) //
	buffer_forward[update_buffer_c] = (Joystick.position.y+1)*4;  // 0~8
	var forward = 0.0;
	for (i=0; i<control_buffer_rate; i++)
		forward += buffer_forward[i];
	forward /= control_buffer_rate;
	if (forward < 1) forward = 0;
/*	if (on_ground) {  // 地上走
		if (forward < 1 && Mathf.Abs(input_rotate_y) > 0.15) {  // 禁止在地面定點旋轉，若要旋轉，則強制加力前進
			forward = 0.9 + Mathf.Abs(input_rotate_y)*2;
		}
		rigidbody.AddForce(transform.forward * (forward-transform.InverseTransformDirection(rigidbody.velocity).z), ForceMode.VelocityChange);
		rigidbody.AddForce((-1) * transform.right * (transform.InverseTransformDirection(rigidbody.velocity).x), ForceMode.VelocityChange);
		if (!pre_on_ground) audio.PlayOneShot(Land_sound, 1);
		if (TDMG_Jet.GetComponent(AudioSource).volume > 0) TDMG_Jet.GetComponent(AudioSource).volume -= 0.05;
	} else {  // 天上飛
		rigidbody.AddForce(transform.forward * (forward*1.2-transform.InverseTransformDirection(rigidbody.velocity).z), ForceMode.VelocityChange);
		rigidbody.AddForce((-1) * transform.right * (transform.InverseTransformDirection(rigidbody.velocity).x), ForceMode.VelocityChange);
		if (!hit_thing) rigidbody.AddForce(transform.up * forward/2, ForceMode.Acceleration);

		TDMG_Jet.GetComponent(AudioSource).volume += (forward/100 - TDMG_Jet.GetComponent(AudioSource).volume)/10;
	}*/


	// Wire
	//////////////////////////////////////////////////////////////////////

	// 總體狀態，及 GUI 反應 //
	var FireBotton_status;  // 0: Fire, 1: Pull, 2: Disabled.
	var ReleaseBotton_status = 1;  // 0: Release, 1: Releaseing, 2: Disabled

	if (TDMG_Hook_L_state + TDMG_Hook_R_state <= 1 ) {  // 有可用的 TDMG Hook，且皆已收回或收回中
		FireBotton_status = 0;
		ReleaseBotton_status = 2;
		//TDMG_Attacher.GetComponent(ConfigurableJoint).linearLimit.limit = Mathf.Infinity;

	} else if (TDMG_Hook_L_state == 2 || TDMG_Hook_R_state == 2) {  // 有已 attach 的 TDMG Hook
		FireBotton_status = 1;
		//if ((transform.position - TDMG_Attacher.transform.position).magnitude > 2) {  // 最短兩公尺
			//TDMG_Attacher.GetComponent(ConfigurableJoint).linearLimit.limit = (transform.position - TDMG_Attacher.transform.position).magnitude;  // 限制繩長，拉回不再放
		//}
		//print((transform.position - TDMG_Attacher.transform.position).magnitude);
		ReleaseBotton_status = 0;

	} else if (TDMG_Hook_L_state == 3 || TDMG_Hook_R_state == 3) {  // 有射出中的 TDMG Hook
		FireBotton_status = 2;
		ReleaseBotton_status = 2;
		//TDMG_Attacher.GetComponent(ConfigurableJoint).linearLimit.limit = Mathf.Infinity;
	}

	// 按鍵行為 //
	TDMG_Gear.GetComponent(AudioSource).volume = 0;
	var is_fire_hit = false;
	var heading = MainCam.transform.position - Target.transform.position;  // 取得瞄準方向
	var fire_ray : Ray = Ray(MainCam.transform.position, -1*heading);
	var fire_hit : RaycastHit;
	var fire_hit_p_L : Vector3;
	var fire_hit_p_R : Vector3;
	if (Physics.Raycast(fire_ray, fire_hit)) {  // 取得擊中點 (fire_hit.point)
		Debug.DrawLine(fire_ray.origin, fire_hit.point);
		if ((transform.position - fire_hit.point).magnitude < TDMG_Wire_max_distance) {
			is_fire_hit = true;
			Aim.guiTexture.texture = Aim_aim_texture;
		} else {
			Aim.guiTexture.texture = Aim_texture;
		}
	}

	if (FireBotton_status == 0) {  // Fire
		FireBotton.guiTexture.texture = FireBotton_texture;

		if (FireBotton.tapped == true) {  // Fire TDMG Hook

			if (is_fire_hit) {
				TDMG.audio.PlayOneShot(TDMG_Fire_sound, 1);
				Debug.DrawLine(fire_ray.origin, fire_hit.point);
				Debug.DrawLine(TargetW.transform.position, Target.transform.position);
	//			TDMG_Attacher.transform.position = fire_hit.point;  // 將 TDMG_Attacher 移至擊中點
	//			TDMG_Attacher.transform.parent = fire_hit.transform;  // 將 TDMG_Attacher 的 parent 設為被擊中物件，等同將 TDMG_Attacher attach 到被擊中物件上

				var fire_ray_L : Ray = Ray(MainCam.transform.position-transform.right, -1*heading-transform.right);
				var fire_hit_L : RaycastHit;
				var fire_ray_R : Ray = Ray(MainCam.transform.position+transform.right, -1*heading+transform.right);
				var fire_hit_R : RaycastHit;
				var use_hook_L = false;
				var use_hook_R = false;

				if (fire_hit.collider.gameObject.tag != "Titan") {
					if (!TDMG_Hook_L_state && Physics.Raycast(fire_ray_L, fire_hit_L)) {  // 取得左右擊中點
						if ((fire_hit.point - fire_hit_L.point).magnitude < 10.5) {

							use_hook_L = true;
							TDMG_Attacher_L.transform.position = fire_hit_L.point;  // 將 TDMG_Attacher 移至擊中點
							TDMG_Attacher_L.transform.parent = fire_hit_L.transform;  // 將 TDMG_Attacher 的 parent 設為被擊中物件，等同將 TDMG_Attacher attach 到被擊中物件上
						}
					}

					if (!TDMG_Hook_R_state && Physics.Raycast(fire_ray_R, fire_hit_R)) {  // 取得左右擊中點

						if ((fire_hit.point - fire_hit_R.point).magnitude < 10.5) {
							use_hook_R = true;
							TDMG_Attacher_R.transform.position = fire_hit_R.point;  // 將 TDMG_Attacher 移至擊中點
							TDMG_Attacher_R.transform.parent = fire_hit_R.transform;  // 將 TDMG_Attacher 的 parent 設為被擊中物件，等同將 TDMG_Attacher attach 到被擊中物件上
						}
					}
				}

				if (!use_hook_L || !use_hook_R) {  // 其中一 hook 無法使用？
					if (TDMG_Hook_L_state != 0) {
						use_hook_R = true;
						TDMG_Attacher_R.transform.position = fire_hit.point;  // 將 TDMG_Attacher 移至擊中點
						TDMG_Attacher_R.transform.parent = fire_hit.transform;  // 將 TDMG_Attacher 的 parent 設為被擊中物件，等同將 TDMG_Attacher attach 到被擊中物件上
					} else if (TDMG_Hook_R_state != 0) {
						use_hook_L = true;
						TDMG_Attacher_L.transform.position = fire_hit.point;  // 將 TDMG_Attacher 移至擊中點
						TDMG_Attacher_L.transform.parent = fire_hit.transform;  // 將 TDMG_Attacher 的 parent 設為被擊中物件，等同將 TDMG_Attacher attach 到被擊中物件上
					} else {
						if (input_rotate_y > 0) {
							use_hook_R = true;
							TDMG_Attacher_R.transform.position = fire_hit.point;  // 將 TDMG_Attacher 移至擊中點
							TDMG_Attacher_R.transform.parent = fire_hit.transform;  // 將 TDMG_Attacher 的 parent 設為被擊中物件，等同將 TDMG_Attacher attach 到被擊中物件上
						} else {
							use_hook_L = true;
							TDMG_Attacher_L.transform.position = fire_hit.point;  // 將 TDMG_Attacher 移至擊中點
							TDMG_Attacher_L.transform.parent = fire_hit.transform;  // 將 TDMG_Attacher 的 parent 設為被擊中物件，等同將 TDMG_Attacher attach 到被擊中物件上
						}
					}
				}

				// 射出 Hook，並開始計時
				fire_start_time = Time.time;
				if (use_hook_L) TDMG_Hook_L_state = 3;
				if (use_hook_R) TDMG_Hook_R_state = 3;
			}

		}


	} else if (FireBotton_status == 1) {  // Pull
		FireBotton.guiTexture.texture = FireBotton_texture_pull;

		if (FireBotton.held == true) {
			var pull_target : Vector3;
			if (TDMG_Hook_L_state == 2 && TDMG_Hook_R_state == 2) {
				pull_target = (TDMG_Attacher_L.transform.position + TDMG_Attacher_R.transform.position) / 2;
			} else if (TDMG_Hook_L_state == 2) {
				pull_target = TDMG_Attacher_L.transform.position;
			} else if (TDMG_Hook_R_state == 2) {
				pull_target = TDMG_Attacher_R.transform.position;
			}
			if ((transform.position - pull_target).magnitude > 0.1) {
				FireBotton.guiTexture.texture = FireBotton_texture_pull_pulled;
				var wire_speed = (12 - Vector3.Project(rigidbody.velocity, (pull_target - transform.position).normalized).magnitude);
				if (wire_speed < 0) wire_speed = 0;
				if (((pre_position.y-pull_target.y) > (transform.position.y - ((TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).y) && (transform.position.y-pull_target.y) < (transform.position.y - ((TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).y)) || ((pre_position.y-pull_target.y) < (transform.position.y - ((TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).y) && (transform.position.y-pull_target.y) > (transform.position.y - ((TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).y)) || ((pull_target - (TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).magnitude < 0.1)) {
					pull_y_cd = 10;
					pull_y_count++;
				}
				if (pull_y_count < 2) {
					if (!pull_y_cd) {
						rigidbody.AddForce((pull_target - (TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).normalized * wire_speed, ForceMode.VelocityChange);  // 向繩索方向加力
					} else {
						rigidbody.AddForce(((pull_target - (TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).normalized - Vector3.up*(pull_target - (TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).normalized.y) * wire_speed, ForceMode.VelocityChange);  // 向繩索方向加力
						pull_y_cd--;
					}
				} else {  // 避免出現 Y 軸簡諧運動
					rigidbody.AddForce(((pull_target - (TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).normalized - Vector3.up*(pull_target - (TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).normalized.y) * wire_speed, ForceMode.VelocityChange);  // 向繩索方向加力
					var yfa = (pull_target.y - ((TDMG_Hook_LC.transform.position + TDMG_Hook_RC.transform.position)/2).y)/3;
					yfa -= rigidbody.velocity.y/12;
					rigidbody.AddForce(transform.up*(yfa), ForceMode.VelocityChange);
				}

				TDMG_Gear.GetComponent(AudioSource).volume += ((Vector3.Project(rigidbody.velocity, (pull_target - transform.position).normalized).magnitude) - (TDMG_Gear.GetComponent(AudioSource).volume))/10;
			}
		} else {
			FireBotton.guiTexture.texture = FireBotton_texture_pull;
			pull_y_cd = 0;
			pull_y_count = 0;
		}

	} else {
		FireBotton.guiTexture.texture = FireBotton_texture_disabled;
	}

	if (ReleaseBotton_status == 0) {  // 可用
		ReleaseBotton.guiTexture.texture = ReleaseBotton_texture;
		if (ReleaseBotton.tapped == true) {
			if (TDMG_Hook_L_state == 2) TDMG_Hook_L_state = 1;
			if (TDMG_Hook_R_state == 2) TDMG_Hook_R_state = 1;
		}
	} else if (ReleaseBotton_status == 1) {  // 已按
		ReleaseBotton.guiTexture.texture = ReleaseBotton_texture_released;
	} else {
		ReleaseBotton.guiTexture.texture = ReleaseBotton_texture_disabled;
	}

	// Hook 物理行為，依 Status 依序定義 //
	if (TDMG_Hook_L_state == 3) {  // 若射出中
		TDMG_Hook_L.transform.position += (TDMG_Attacher_L.transform.position - TDMG_Hook_L.transform.position).normalized;
		TDMG_Gear_sound = 1;
		if (Time.time - fire_start_time > 2) {  // 超時
			TDMG_Hook_L_state = 1;  // 收回
		} else if ((TDMG_Attacher_L.transform.position - TDMG_Hook_L.transform.position).magnitude < 0.8) {  // 中
			TDMG_Hook_L_state = 2;
			TDMG_Attacher_L.audio.PlayOneShot(TDMG_Hooked_sound, 1);
			//TDMG_Attacher.GetComponent(ConfigurableJoint).linearLimit.limit = (transform.position - TDMG_Attacher.transform.position).magnitude;
		}
	} else if (TDMG_Hook_L_state == 2) {
		TDMG_Hook_L.transform.position = TDMG_Attacher_L.transform.position;
	} else if (TDMG_Hook_L_state == 1) {
		TDMG_Hook_L.transform.position += (TDMG_Hook_LC.transform.position - TDMG_Hook_L.transform.position).normalized;
		TDMG_Gear_sound = 1;
		if ((TDMG_Hook_LC.transform.position - TDMG_Hook_L.transform.position).magnitude < 0.8) {
			TDMG_Hook_L.transform.position = TDMG_Hook_LC.transform.position;  // 完成回收
			TDMG_Hook_L_state = 0;
			TDMG.audio.PlayOneShot(TDMG_Withdraw_sound, 1);
		}
	}

	if (TDMG_Hook_R_state == 3) {  // 若射出中
		TDMG_Hook_R.transform.position += (TDMG_Attacher_R.transform.position - TDMG_Hook_R.transform.position).normalized;
		TDMG_Gear_sound = 1;
		if (Time.time - fire_start_time > 2) {  // 超時
			TDMG_Hook_R_state = 1;  // 收回
		} else if ((TDMG_Attacher_R.transform.position - TDMG_Hook_R.transform.position).magnitude < 0.8) {  // 中
			TDMG_Hook_R_state = 2;
			TDMG_Attacher_R.audio.PlayOneShot(TDMG_Hooked_sound, 1);
			//TDMG_Attacher.GetComponent(ConfigurableJoint).linearLimit.limit = (transform.position - TDMG_Attacher_R.transform.position).magnitude;
		}
	} else if (TDMG_Hook_R_state == 2) {
		TDMG_Hook_R.transform.position = TDMG_Attacher_R.transform.position;
	} else if (TDMG_Hook_R_state == 1) {
		TDMG_Hook_R.transform.position += (TDMG_Hook_RC.transform.position - TDMG_Hook_R.transform.position).normalized;
		TDMG_Gear_sound = 1;
		if ((TDMG_Hook_RC.transform.position - TDMG_Hook_R.transform.position).magnitude < 0.8) {
			TDMG_Hook_R.transform.position = TDMG_Hook_RC.transform.position;  // 完成回收
			TDMG_Hook_R_state = 0;
			TDMG.audio.PlayOneShot(TDMG_Withdraw_sound, 1);
		}
	}


	// input_rotate_x
	//print(TargetW.transform.position);
	//print(TDMG_Attacher.transform.position);

	// Kill
	//////////////////////////////////////////////////////////////////////

	if (kill_mode == 2) {
		audio.PlayOneShot(Kill_sound, 1);
	}


	// Moving Animation
	//////////////////////////////////////////////////////////////////////

	// Decide speed state
	if (speed_state == 0 && rigidbody.velocity.magnitude > 0.01)  // 0 to 1
		speed_state = 1;
	else if (speed_state == 1 && rigidbody.velocity.magnitude > 3.7)  // 1 to 2
		speed_state = 2;
	else if (speed_state == 2 && rigidbody.velocity.magnitude < 3.2) // 2 to 1
		speed_state = 1;
	else if (rigidbody.velocity.magnitude < 0.05) speed_state = 0;  // all to 0

	if (on_ground) {  // On grond animation
		TDMG_Jet.particleEmitter.minEmission = 0;
		TDMG_Jet.particleEmitter.maxEmission = 0;
		if (speed_state == 1) {
			animation.CrossFade("Walk", 0.2);
			animation["Walk"].speed = rigidbody.velocity.magnitude/2.2;
		} else if (speed_state == 2) {
			animation.CrossFade("Run", 0.2);
			animation["Run"].speed = rigidbody.velocity.magnitude/5;
		} else if (speed_state == 0) {
			animation.CrossFade("Stand", 0.2);
		}
	} else {  //Flying
		var TDMG_jet_air_amount = Mathf.Sqrt(forward)*2.828;
		TDMG_Jet.particleEmitter.enabled = true;
		TDMG_Jet.particleEmitter.localVelocity = Vector3(0, -(TDMG_jet_air_amount));
		TDMG_Jet.particleEmitter.minEmission = TDMG_jet_air_amount*100;
		TDMG_Jet.particleEmitter.maxEmission = TDMG_jet_air_amount*200;
		TDMG_Jet.particleEmitter.minEnergy = TDMG_jet_air_amount*0.001;
		TDMG_Jet.particleEmitter.maxEnergy = TDMG_jet_air_amount*0.1;
		TDMG_Jet.particleEmitter.rndVelocity = Vector3(TDMG_jet_air_amount*0.1, TDMG_jet_air_amount*0.1, TDMG_jet_air_amount*0.1);
		if (Random.Range(8,0.1) <= forward) {  // 氣體噴出量，(forward) = 8(全速) ~ 0(stop)
			//var TDMG_Gas_s = Instantiate(TDMG_Gas);
			//TDMG_Gas_s.transform.position = TDMG_Jet.transform.position;
			//TDMG_Gas_s.rigidbody.AddForce(TDMG_Jet.transform.forward);
		}

		if (!kill_cd) {
			if (kill_mode == 1) {  // 準備擊殺
				animation.CrossFade("PreKill", 0.5);  // 準備揮刀
			} else if (kill_mode == 2) {  // 擊殺
				animation.Play("Kill");
				animation.CrossFadeQueued("Fly", 10);
			} else if (transform.position.y < prev_y+0.01) {  // 沒在上昇
				animation.CrossFade("Fly2", 0.5);
			} else {  // 在上昇
				animation.CrossFade("Fly", 0.2);
			}
		}

	}


	// Update var
	//////////////////////////////////////////////////////////////////////

	update_buffer_c++;
	if (update_buffer_c >= control_buffer_rate) update_buffer_c = 0;
	prev_y = transform.position.y;
	prev_velocity = rigidbody.velocity;
	if (kill_cd) kill_cd--;
	if (kill_mode == 2) kill_cd = 50;
	kill_mode = 0;
	pre_on_ground = on_ground;
	pre_position = transform.position;
	hit_thing = false;

	// 被動避免失速
	if(rigidbody.velocity.magnitude > max_speed) {
		rigidbody.velocity = rigidbody.velocity.normalized * max_speed;
	}
	if(rigidbody.velocity.y > max_speed/3) {
		rigidbody.velocity.y = max_speed/3;
	}
}


function Update () {
	TDMG_Hook_LC.GetComponent(LineRenderer).SetPosition(0, TDMG_Hook_L.transform.position);
	TDMG_Hook_LC.GetComponent(LineRenderer).SetPosition(1, TDMG_Hook_LC.transform.position);
	TDMG_Hook_RC.GetComponent(LineRenderer).SetPosition(0, TDMG_Hook_R.transform.position);
	TDMG_Hook_RC.GetComponent(LineRenderer).SetPosition(1, TDMG_Hook_RC.transform.position);
}


function OnTriggerStay (what : Collider) {
	if (what.gameObject.name == "Kill Range") {
		if (kill_mode == 0) kill_mode = 1;
	}
}


function OnTriggerEnter(what : Collider) {
	if (what.gameObject.name == "Kill Point") {
		kill_mode = 2;
		what.transform.root.gameObject.GetComponent(TitanAI).Die();
	}
}


function OnCollisionStay(what : Collision) {
    if(what.gameObject.name == "Terrain" || what.gameObject.tag == "Wall" || what.gameObject.tag == "Building" || what.gameObject.name == "wall" || what.gameObject.name == "house1") {
		hit_thing = true;
	}
}

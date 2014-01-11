/**
 * @fileoverview 玩家足部 trigger, 用來判定玩家是否落地.
 * Gameobject 直接掛在 player 底下, 用 tag 分辨接觸物件是否為地面並維護 player 的 on_ground.
 *
 * @author neson@dex.tw
 */
#pragma strict

function OnTriggerEnter(what : Collider) {
	if (what.gameObject.tag == "Building" || what.gameObject.tag == "Wall" || what.gameObject.tag == "Ground") {
		transform.parent.gameObject.GetComponent(PlayerControl).on_ground++;
	}
}

function OnTriggerExit(what : Collider) {
    if (what.gameObject.tag == "Building" || what.gameObject.tag == "Wall" || what.gameObject.tag == "Ground") {
		transform.parent.gameObject.GetComponent(PlayerControl).on_ground--;
	}
}

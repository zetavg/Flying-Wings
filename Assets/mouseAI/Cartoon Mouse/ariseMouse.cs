using UnityEngine;
using System.Collections;

public class ariseMouse : MonoBehaviour {
	public GameObject mouse;
	public GameObject target;
	int radius=5;
	// Use this for initialization
	void Start () {
		//Vector3 position = new Vector3(Random.Range(-10.0F, 10.0F), 0, Random.Range(-10.0F, 10.0F));
		//Instantiate(mouse, position, Quaternion.identity)  ;
		Instantiate(mouse, Random.insideUnitSphere * radius,
		            Quaternion.LookRotation(target.transform.position));
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}

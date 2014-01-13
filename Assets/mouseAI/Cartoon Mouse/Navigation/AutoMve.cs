using UnityEngine;
using System.Collections;

public class AutoMve : MonoBehaviour {
	NavMeshAgent ball;
	Transform[] goals;
	Vector3 curGoal;
	// Use this for initialization
	void Start () {
		//Random.seed(Time.time);
		ball = this.GetComponent<NavMeshAgent>();
		goals = GameObject.Find("goal").GetComponentsInChildren<Transform>();
		curGoal = goals[Random.Range(0,(goals.Length-1))].position;
		ball.SetDestination(curGoal);
	}
	
	// Update is called once per frame
	void Update () {
		if(Vector3.Distance( curGoal,this.transform.position)<1.0f)
		{
			 print ("curGoal"+curGoal);
			 curGoal = goals[Random.Range(1,5)].position;
			 
			ball.SetDestination(curGoal);
		}
	}
}

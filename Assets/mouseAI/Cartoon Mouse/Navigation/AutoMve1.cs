using UnityEngine;
using System.Collections;

public class AutoMve1 : MonoBehaviour
{
	NavMeshAgent ball;
	Transform[] goals;
	Vector3 randomDirection;
	Vector3 finalPosition;
	Vector3 curGoal;
	int walkRadius = 6;
	public GameObject hitParticles;
	// Use this for initialization
	 
	NavMeshHit hit;

	void Start ()
	{ 
		randomDirection = Random.insideUnitSphere * walkRadius;
		
//			randomDirection.x=Random.Range(0,walkRadius);
		randomDirection += transform.position;
		NavMesh.SamplePosition (randomDirection, out hit, walkRadius, 1);
		finalPosition = hit.position;
		 
		ball = this.GetComponent<NavMeshAgent> ();
		//goals = GameObject.Find ("goal").GetComponentsInChildren<Transform> ();
		//scurGoal = goals [Random.Range (0, (goals.Length - 1))].position;
		ball.SetDestination (finalPosition);
	//	print ("finalPosition" + finalPosition);  
	//	print ("update");
		/*
		ball = this.GetComponent<NavMeshAgent>(); 
 		curGoal =  Vector3(Random.Range(minx,maxx),100,Random.Range(minz,maxz));
		ball.SetDestination(curGoal);*/
	}
	
	// Update is called once per frame 
	void Update ()
	{  
		//if (Vector3.Distance (finalPosition, this.transform.position) < 0.1f) {
			//print ("finalPosition" + finalPosition); 
			//Instantiate (hitParticles, finalPosition, hitParticles.transform.rotation);
			//Destroy (hitParticles);
			randomDirection = Random.insideUnitSphere * walkRadius;
		
			//randomDirection.x=Random.Range(0,1);
			
			randomDirection += transform.position; 
			NavMesh.SamplePosition (randomDirection, out hit, walkRadius, 1);
			finalPosition = hit.position;
			 
			ball.SetDestination (finalPosition);
		//} 
		
		
		/*
				if(Vector3.Distance( curGoal,this.transform.position)<1.0f)
		{
			 print ("curGoal"+curGoal);
			 curGoal =  Vector3(Random.Range(minx,maxx),100,Random.Range(minz,maxz));
			 
			ball.SetDestination(curGoal);
		}*/
	}
	
	static int deadnum=0;
	void OnCollisionEnter(Collision other) 
   {
        if (other.gameObject.tag == "weapon")  // 用類別的名字 
        { 
			Destroy(this.gameObject, 0.8f);
			deadnum++;
			print ("deadnum"+deadnum);
        }
	
   }
}

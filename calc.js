#pragma strict

var partsNumbers = new Array();	//parts of targetsNum
var targets = new Array();	//targets of operation
var math = new Array();	// + or - or * or /
var answer:int = 0;
var labelText = "";


/////////createButtons//////////
function OnGUI(){

	var setNumButton = function(x,y,num){
		if(GUI.Button(Rect(x,y,100,50),num.ToString())){
			inputPartsNum(num);
			textChange(num);
		}
	};
	var setMathButton = function(y,mth){
		if(GUI.Button(Rect(410,y,50,50),mth.ToString())){
			if(partsNumbers.length>0){
				createTargetNum();
				resetPartsNum();
				inputMath(mth);
	textChange(mth);
			}else{
				Debug.Log("you have no targets!");
			}
		}
	};
	var setAnswerButton = function(){
		if(GUI.Button(Rect(210,210,200,50),"=")){
			if(partsNumbers.length>0){
			
				createTargetNum();
				calculation();
				
				resetPartsNum();
				resetTargets();
				resetMath();
			}else{
				Debug.Log("I can't calculate now!");
			}
		}
	};
	
	for(var i=1;i<10;i++){
		if(i<=3){
			setNumButton(10+100*i,60,i);					
		}else if(i<=6){
			setNumButton(10+100*(i-3),110,i);		
		}else{
			setNumButton(10+100*(i-6),160,i);		
		}
	}
	setNumButton(110,210,0);
	
	setMathButton(60,"+");
	setMathButton(110,"-");
	setMathButton(160,"*");
	setMathButton(210,"/");
	
	setAnswerButton();
	
	GUI.Label(Rect(110,10,350,50),labelText);
}
////////////////////////////////////

//////////input///////////////////
function inputPartsNum(num){
	partsNumbers.Push(num);
}

function inputMath(mth){
	math.Push(mth);
}
//////////////////////////////////

////////labelControll////////////
function textChange(txt){
	if(answer==0){
		labelText += txt.ToString();
	}else{
		labelText = txt.ToString();
		answer = 0;
	}
}
function calcResult(){
	labelText = answer.ToString();
}
/////////////////////////////////

/////////createTargets///////////
function createTargetNum(){
	var createdNum:int = 0;
	partsNumbers.Reverse();
	for(var i=0;i<partsNumbers.length;i++){
		var part:int = partsNumbers[i];
		createdNum += part*Mathf.Pow(10,i);
	}
	targets.Push(createdNum);
	Debug.Log(createdNum + " has created!");
}
/////////////////////////////////

/////////resetData////////////////
function resetPartsNum(){
	partsNumbers = new Array();
}
function resetTargets(){
	targets = new Array();
}
function resetMath(){
	math = new Array();
}
//////////////////////////////////

/////////////mainOperation//////////////
function calculation(){
	answer = targets[0];
	for(var i=0;i<targets.length;i++){
		if(targets.length>i+1){
			var calcNum:int = targets[i+1];
			switch(math[i]){
				case "+":answer+=calcNum;break;
				case "-":answer-=calcNum;break;
				case "*":answer*=calcNum;break;
				case "/":answer/=calcNum;break;
			}
		}
	}
	Debug.Log("answer is "+answer);
	calcResult();
}
////////////////////////////////////////////

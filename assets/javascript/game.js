(function() {
  'use strict'; 



	//main game object/logic
	//credit: http://saturdayblitz.com/college-football-trivia-test-your-knowledge/
	var trivia = {

		numQuestions: 5, //how many total questions (gets overwritten by actual length of array)

		qCount: 0, //how many questions has user gone through

		numCorrect: 0, //number of user's correct answers

		numWrong: 0, //number of user's wrong answers

		numTimedOut: 0, //number of times the countdown timer ran out before user made selection

		qTimer_set: 20000, //how long do we give user to answer questions

		qTimer: null, //var for timeout function

		countDownHUD: null, //var for countdown display interval

		resultTimer_set: 3500,	//how long to result show page after each user choice 

		resultTimer: null,	//var for timeout function

		questions: [
			{
				q: "Which team has the highest total of wins in the FBS?",
				a: 3,
				options: [ 
					"Notre Dame", 
					"Ohio State", 
					"Alabama", 
					"Michigan" 
				]
			},
			{
				q: "Which team has had the most players drafted in the first round of the NFL Draft?",
				a: 1,
				options: [ 
					"Alabama", 
					"USC", 
					"Ohio State", 
					"Miami (FL)" 
				]
			},
			{
				q: "Which team has been to the most bowl games?",
				a: 0,
				options: [ 
					"Alabama", 
					"Texas", 
					"USC", 
					"Nebraska" 
				]
			},
			{
				q: "Which team has the highest winning percentage in the FBS?",
				a: 0,
				options: [ 
					"Notre Dame", 
					"Alabama", 
					"Michigan", 
					"Ohio State" 
				]
			},
			{
				q: "Which team has won the most overall conference championships?",
				a: 3,
				options: [ 
					"Ohio State", 
					"USC", 
					"Oklahoma", 
					"Nebraska" 
				]
			}												 
		],

	   	init: function(){ 
	   		//check and set number of questions based on questions array
	   		this.numQuestions = (trivia.questions.length);

	   		//set first start prompt
	   		$('#innerContent').html(''+
	   		'<h1 class="mainTitle">College Football Trivia</h1>'+
	   		'<div id="startGame" class="cta">START GAME!</div>');
	   	},

	   	newQuestion: function(){
	   		var thisCount = this.qCount;
	   		var thisQ = trivia.questions[(thisCount)]; 

	   		//clear timer
	   		this.clearMainTimer();	   		

	   		//if there is another quetion in the array, load it into page
	   		if (thisCount < this.questions.length) {
	   			this.qCount++;

	   			//build new question UI
		   		$('#innerContent').html(''+
		   		'<h3 id="timer">Time Remaining: <span id="secs">'+(this.qTimer_set / 1000)+'</span></h3>'+
		   		'<h2 class="question">'+thisQ.q+'</h2>'+
		   		'<div id="choices"></div>');

	   			for (var i = 0; i < thisQ.options.length; i++) {
	   				$('<div class="cta choice">'+thisQ.options[i]+'</div>').appendTo('#choices'); 
	   			};

	   			//start new timer
	   			this.startMainTimer();	   					   

	   		}else{
	   			//else game is over, show results page
	   			this.gameOver();
	   		}
	   		
	   	},

	   	checkAnswer: function(choice){
	   		this.clearMainTimer(); 

	   		//is selected answer the correct one?
	   		if (choice === (trivia.questions[(this.qCount - 1)].a)) {
	   			this.handleCorrectAnswer();
	   		}else{
	   			this.handleWrongAnswer();
	   		}
	   	},

	   	startMainTimer: function(){

	   		this.qTimer = setTimeout(function(){
	   			trivia.handleTimedOut();
	   			clearInterval(this.countDownHUD);
	   		}, this.qTimer_set);

	   		//update timer feedback on page
			this.countDownHUD = setInterval(function(){
				var curTime = Number($('#secs').text());
				$('#secs').html(curTime-1);
			}, 1000);  
	   			
	   	},

	   	clearMainTimer: function(){
	   		clearTimeout(this.qTimer);
	   		clearInterval(this.countDownHUD);
	   	},

	   	handleCorrectAnswer: function(){
	   		//inform user they selected the correct answer
	   		$('#innerContent').html(''+
	   		'<h1 class="mainTitle">Correct!</h1>'+
	   		'<h2>The right answer was: '+
	   			trivia.questions[this.qCount - 1].options[trivia.questions[this.qCount - 1].a]+
	   		'</h2>');

	   		this.numCorrect++;
	   		this.resultTimeout();	   		
	   	},

	   	handleWrongAnswer: function(){
	   		//inform user they selected the wrong answer
	   		$('#innerContent').html(''+
	   		'<h1 class="mainTitle">Sorry, wrong answer.</h1>'+
	   		'<h2>The right answer was: '+
	   			trivia.questions[this.qCount - 1].options[trivia.questions[this.qCount - 1].a]+
	   		'</h2>');

	   		this.numWrong++;
	   		this.resultTimeout();	
	   	},

	   	handleTimedOut: function(){
	   		//inform user they ran out of time
	   		$('#innerContent').html(''+
	   		'<h1 class="mainTitle">Out of time!</h1>'+
	   		'<h2>The right answer was: '+
	   			trivia.questions[this.qCount - 1].options[trivia.questions[this.qCount - 1].a]+
	   		'</h2>');

	   		this.numTimedOut++;
	   		this.clearMainTimer();
	   		this.resultTimeout();
	   	},

	   	resultTimeout: function(){
	   		setTimeout(function(){
	   			trivia.newQuestion();
	   		}, this.resultTimer_set);	   		
	   	},

	   	gameOver: function(){
	   		//show number of correct, wrong, timeouts - and restart btn of course
	   		$('#innerContent').html(''+
	   		'<h1>Game Over!</h1>'+
	   		'<h2>Here\'s how you did:</h2>'+
	   		'<h3>Correct Answers: '+this.numCorrect+'</h3>'+
	   		'<h3>Incorrect Answers: '+this.numWrong+'</h3>'+
	   		'<h3>Unanswered: '+this.numTimedOut+'</h3>'+
	   		'<div id="restartGame" class="cta">PLAY AGAIN?</div>');	   		
	   	},

	   	restartGame: function(){
	   		//reset game vars
	   		this.qCount = 0;			
			this.numCorrect = 0;
			this.numWrong = 0;
			this.numTimedOut = 0;			
	   	
	   		this.init();
	   	}

	};


	// kick off game 
	trivia.init(); 






	//user events
	//**************************************************//

	//click event for starting game
	$(document).on('click', '#startGame', function(){
		trivia.newQuestion();
	});

	//click event for user answer selection
	$(document).on('click', '.choice', function(){
		trivia.checkAnswer($(this).index());
	});

	//click event to restart game
	$(document).on('click', '#restartGame', function(){
		trivia.restartGame();
	});


}()); 
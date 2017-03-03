(function() {
  'use strict'; 



	//main game object/logic
	//http://saturdayblitz.com/college-football-trivia-test-your-knowledge/
	var trivia = {

		numQuestions: 5, //how many total questions (gets overwritten by actual length of array)

		qCount: 0, //how many questions has user gone through

		numCorrect: 0, //number of user's correct answers

		numWrong: 0, //number of user's wrong answers

		numTimedOut: 0, //number of times the countdown timer ran out before user made selection

		quetionTimer: 20, //how long do we give user to answer questions

		resultTimer: 5,	//how long to show page after each user choice (reult for each question answered)

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
	   		console.log('Ready to go!');
	   		console.log(trivia.questions[0].options[trivia.questions[0].a]);

	   		//check and set number of questions based on questions array
	   		this.numQuestions = (questions.length+1);
	   		console.log('this.numQuestions: '+this.numQuestions);

	   		//set first start prompt

	   	},

	   	newQuestion: function(){

	   		//if there is another quetion in the array, load it into page
	   		//else game is over, show results page

	   		//reset timer

	   	},

	   	checkAnswer: function(choice){
	   		console.log('user selected choice: '+choice+1);

	   		//get correct answer for current question from array
	   	},

	   	handleCorrectAnswer: function(){
	   		
	   	},

	   	handleWrongAnswer: function(){
	   		
	   	},

	   	handleTimedOut: function(){
	   		
	   	},

	   	restartGame: function(){

	   		//reset game vars			
			this.numCorrect = 0;
			this.numWrong = 0;
			this.numTimedOut = 0;			
	   	
	   		this.init();

	};


	// kick off game 
	trivia.init(); 






	//user events
	//**************************************************//

	//click event for starting game
	$('#startGame').on('click', function(){

	});

	//click event for user answer selection
	$('.choice').on('click', function(){
		trivia.checkAnswer($(this).index());
	});

	//click event to restart game
	$('#restartGame').on('click', function(){
		
	});


}()); 
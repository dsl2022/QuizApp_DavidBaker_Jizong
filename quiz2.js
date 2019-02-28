/*global cuid */

'use strict';


// quiz data base

const questionOne = ' Normal adult dogs have how many teeth?';
const keyOne = {a:24,b:38,c:42,d:32};
const explainationOne = 'this is a test explain for question 2';
const questionTwo = 'Through what part of the body do dogs sweat?';
const keyTwo = {a:'Mouth',b:'Ears',c:'Nose',d:'Paws'};
const explainationTwo = 'this is a test explain for question 2';
const questionThree = ' What is the most common training command taught to dogs?';
const keyThree = {a:'Stay',b:'Beg',c:'Sit',d:'Dance'};
const explainationThree = 'this is a test explain for question 3';

const QUIZBASE = {
  QUIZ:[
    {id:cuid(),question:questionOne,answerKey:keyOne,correctKey:'c',completed:false,isCorrect:false,submittedKey:'',explaination:explainationOne},
    {id:cuid(),question:questionTwo,answerKey:keyTwo,correctKey:'d',completed:false,isCorrect:false,submittedKey:'',explaination:explainationTwo},
    {id:cuid(),question:questionThree,answerKey:keyThree,correctKey:'d',completed:false,isCorrect:false,submittedKey:'',explaination:explainationThree}
  ],
  quizTitle:'Doggy Pop Quiz',
  quizStart:false,
  score:0,
  quizArray:[],
  historyArray:[],
  completed:false
};


  

function generateStart(){
  console.log('`generateIntro` ran');
  return `<div id='start-quiz-box'>
  <button id = 'quiz-intro-button'>Read quiz intro</button>
  <div class='quiz-start-content'>
  <p id='quiz-start-title'>Welcome to ${QUIZBASE.quizTitle}</p>
  </div>
    <button class = 'button' id='quiz-start-button' type='submit'><span>Start Quiz</span></button>
    </div>`;
}

function generateQuizIntro(){

}

function generateQuiz(n){
  
  //console.log('`generateQuiz` ran');
  //console.log('quiz num',n);
  //console.log('test quiz object index in generate quiz',QUIZBASE.QUIZ[n]);
  //console.log('test answer keys',QUIZBASE.QUIZ[n].answerKey);
  //console.log('test correct answer keys',QUIZBASE.QUIZ[n].correctKey);
  return `<div data-item-id = ${QUIZBASE.QUIZ[n].id} id = 'quiz-content'>
  <p class='quiz-question'>${QUIZBASE.historyArray.length}. ${QUIZBASE.QUIZ[n].question}</p>
  <form data-item-id = ${QUIZBASE.QUIZ[n].id} class = 'quiz-submit-form'>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${QUIZBASE.QUIZ[n].answerKey.a}" name="answer" required>
    <span>A) ${QUIZBASE.QUIZ[n].answerKey.a}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${QUIZBASE.QUIZ[n].answerKey.b}" name="answer" required>
    <span>B) ${QUIZBASE.QUIZ[n].answerKey.b}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${QUIZBASE.QUIZ[n].answerKey.c}" name="answer" required>
    <span>C) ${QUIZBASE.QUIZ[n].answerKey.c}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${QUIZBASE.QUIZ[n].answerKey.d}" name="answer" required>
    <span>D) ${QUIZBASE.QUIZ[n].answerKey.d}</span>
    </label>
    <button type="submit" class="button quiz-answer-submit"><span>Submit</span></button>
    <button type="submit" class="button quiz-restart"><span>Restart</span></button>
    </fieldset>
    </form>
    
    </div>`;
}





function generateStatus(quizNum,score){
  console.log('`generateStatus` ran');
  return ` 
 
  <ul id='quiz-status-field'>
  <li id='quiz-title-bar'>${QUIZBASE.quizTitle}</li>
  <li id = 'quiz-number'>Qestion: ${quizNum}/10</li>
  <li id = 'quiz-score'>Score:${score}/100</li>
</ul>`;
}


function calculateQuizStat(){
  
  let correctAnswers = QUIZBASE.QUIZ.filter(quiz => quiz.isCorrect===true);
  let score = correctAnswers.length *10;
  let correctRecorded = correctAnswers.length;
  let wrongRecorded = QUIZBASE.historyArray.length - correctRecorded;
  return [score,correctRecorded,wrongRecorded];
}

function generateFinishedMessage(){
  
  let statArray = calculateQuizStat();
  console.log('test array stat',statArray);
  return ` <div class='quiz-final-message-box'>
  <p>Thank you! you have completed this quiz.</p>
<ul class = "quiz-final-stat">
  <li>Your score is <span>${statArray[0]}</span></li>
  <li>You got</li>
  <li><span>${statArray[1]} </span>correct </li>
  <li><span>${statArray[2]} </span>wrong </li>
</ul>
</div> 
<div>
<button class = 'button quiz-review' type = 'submit'><span>Review</span></button>
<button class = 'button quiz-restart' type = 'submit'><span>Restart</span></button>      
</div>`;
}

function generateQuizReviewString(){
  return `<div>review the quiz,review content to be to be updated later</div>
  <button class='quiz-review-restart' type='submit'>restart</button>
  `;

}


function reviewQuiz(){
  console.log('`reviewQuiz` ran');
  $('#content-box').html(generateQuizReviewString());
  $('.quiz-review-restart').click(function(){
    restartQuiz();
  });
}


function render() {
  console.log('`render` ran');
  console.log('test quizstart status',!QUIZBASE.QUIZ.quizStart);
  if (!QUIZBASE.quizStart) {
    console.log('not started',QUIZBASE.QUIZ.quizStart);
    $('#content-box').empty();
    $('#content-box').html(generateStart());
    $('#quiz-status').empty();
    
  } else {
    $('#content-box').empty();
    // console.log('testing quizArray length in render:',QUIZBASE.quizArray.length);
    if(!QUIZBASE.quizArray.length){
      //console.log('quiz is finished in render');
      
      $('#content-box').html(generateFinishedMessage());// bug not rendering
      quizRestartOrReviewbuttonHandle();
      $('#quiz-status').empty();
    }
    
    //console.log('testing quizArray in render',QUIZBASE.quizArray);
    let index = QUIZBASE.quizArray.shift();
    QUIZBASE.historyArray.push(index);
    $('#content-box').html(generateQuiz(index));
    // first argument keeps track of the number of question
    $('#quiz-status').html(generateStatus(QUIZBASE.historyArray.length,QUIZBASE.score));
    // submitAnswer();
    
  }
}

function quizRestartOrReviewbuttonHandle(){
  $('#content-box').on('click','.quiz-restart',function(){
    restartQuiz();
  });
  $('#content-box').on('click','.quiz-review',function(){
    reviewQuiz();
  });
}


function startQuiz(){
  
  $('#quiz-start-button').on('click', function(){
   
    QUIZBASE.quizStart = !QUIZBASE.quizStart;
    generateQuizArray();
    console.log('test quiz array in startquiz',QUIZBASE.quizArray);
    render();
    submitAnswer();
    
  });
  
}




function shuffleArray(a){
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  console.log('original',a);
  return a;
}


function generateQuizArray(){
  let arrayLength = QUIZBASE.QUIZ.length;
  for (let i =0;i < arrayLength;i++){
    QUIZBASE.quizArray.push(i);
  }
  QUIZBASE.quizArray = shuffleArray(QUIZBASE.quizArray);
}



function generatePromptAfterSubmit(rightWrong,Explain=''){
  return `<div class = 'quiz-transition-box'>
  <div class='quiz-correct-or-wrong'>
    <span>${rightWrong}</span>
  </div>
  <div class='dog-paw'>
  <div id="dots">
  <div id="dot1" class="dot"></div>
  <div id="dot2" class="dot"></div>
  <div id="dot3" class="dot"></div>
  <div id="dot4" class="dot"></div>
  <div id="dot5" class="dot5"></div>
  </div>
</div>
  <div class= 'quiz-explaination-field'>
  <p class = 'quiz-explaination-content'>
    ${Explain}
  </p>
  </div>
  <button type="submit" class="button quiz-transition-continue"><span>Continue</span></button>
  
</div>`;
}

function promptAfterSubmit(object){
  

  console.log('is correct test',object.isCorrect);
  if(object.isCorrect){
    QUIZBASE.score+=10;
    let correct = 'Correct,well done!';
    let trainsition = generatePromptAfterSubmit(correct);
    $('#content-box').html(trainsition);
    
    $('.quiz-transition-continue').on('click',function(){
      render();
      submitAnswer();
      
     
    });
  }else{
    let wrong = 'Sorry, your answer is incorrect!';
    let trainsition = generatePromptAfterSubmit(wrong,object.explaination);
    $('#content-box').html(trainsition);
    $('.quiz-transition-continue').on('click',function(){
      //render();
      //
      render();
      submitAnswer();
      
    });
  
  }
  
}

// get key from value 
function getAnswerKey(object, value) {
  let key = Object.keys(object).find(key => object[key] === Number(value));
  if(key===undefined){
    let key = Object.keys(object).find(key => object[key] === value);
    return key;
  }
  console.log('testing key in geneate answer key',key);
  return key;
}


function submitAnswer(){
  console.log('`submitAnswer` ran');
  $('.quiz-restart').click(function(){
    restartQuiz();
  });

  $('form').on('submit',function(event){
    event.preventDefault();
    // get radio button checked value
    let selected = $('input:checked');
    let answer = selected.val();
    console.log('selected answer',answer);  // tested
    // find current quiz id
    let currentQuizId = $(this).data('item-id');
    console.log('testing current quiz id',currentQuizId); //
    let currentQuizObject = QUIZBASE.QUIZ.find(quiz => quiz.id === currentQuizId);
    // get submitted anawer value through cuid. 
    let submitedKey = getAnswerKey(currentQuizObject.answerKey,answer);  // has bug 
    console.log('compare keys',currentQuizObject.correctKey,submitedKey);  // has bug

    if(currentQuizObject.correctKey===submitedKey){
      currentQuizObject.isCorrect =!currentQuizObject.isCorrect;
    }
    currentQuizObject.completed = !currentQuizObject.completed;
    currentQuizObject.submittedKey = submitedKey;
    console.log('Testing submit',currentQuizObject,QUIZBASE.QUIZ);
    promptAfterSubmit(currentQuizObject);
   
  });
  
}






function restartQuiz(){
  console.log('`restartQuiz` ran');
  QUIZBASE.quizStart = false;
  QUIZBASE.score=0;
  QUIZBASE.quizArray=[];
  QUIZBASE.historyArray=[];
  render();
  startQuiz();
}




function handleQuizApp(){
  
  
  render();
  startQuiz();
  
}

$(handleQuizApp);
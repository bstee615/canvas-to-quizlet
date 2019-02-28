function currentPageIsCanvasQuiz() {
    return document.getElementById('quiz_show') ? true : false;
}

function getCanvasQuizQuestionInfo() {
    let message = {
        name: '',
        questions: []
    };

    $(document).find('#quiz_show').each(function() {
        const $quiz = $(this);
        // Get name
        message.name = $quiz.find('#quiz_title').get(0).textContent;

        // Get questions
        $quiz.find('#questions .display_question.multiple_choice_question').each(function() {
            const $question = $(this);
            let questionInfo = {
                text: '',
                correctAnswers: []
            };
    
            // Gather all question text
            $question.find('.question_text').each(function() {
                questionInfo.text += $.trim(this.textContent);
            });
    
            // Gather all text of correct answer
            $question.find('.correct_answer').each(function() {
                const $answer = $(this);
                
                let answerText = '';
                $answer.find('.answer_text').each(function() {
                    answerText += $.trim(this.textContent);
                });
    
                questionInfo.correctAnswers.push(answerText);
            });
    
            message.questions.push(questionInfo);
        });
    });
    
    return message;
}

if (currentPageIsCanvasQuiz()) {
    chrome.runtime.sendMessage(getCanvasQuizQuestionInfo());
}
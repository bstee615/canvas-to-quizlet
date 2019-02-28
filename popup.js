// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
    // TODO: Check if page is correct hostname before injecting JS.
    // Credit @Ross Zurowski https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
    // const HOSTNAME = 'bju.instructure.com';
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     let hostname = new URL(tabs[0].url).hostname;
        

    // Credit @Ishan - https://stackoverflow.com/questions/21317476/how-to-use-jquery-in-chrome-extension
    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
        file: 'thirdParty/jquery-3.3.1.js'
    });

    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
        file: 'payload.js'
    });

    document.getElementById('createQuizlet').addEventListener('click', createQuizlet);
});

var quiz;
// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
    quiz = message;
    const name = quiz.name;

    // Convenience method to tag HTML onto the popup
    const addElement = innerHTML => document.getElementById('quizQuestions').innerHTML += innerHTML;

    // Display quiz questions on popup
    addElement('<h1>' + name + '</h1>');
    addElement('<p>' + quiz.questions.length + ' questions</p>');
    quiz.questions.forEach(function(q) {
        addElement('<h2>' + q.text + '</h2>');

        addElement('<ul>');
        q.correctAnswers.forEach(function(a) {
            addElement('<li>' + a + '</li>');
        });
        addElement('</ul>');
    });
});

// Credit @Matěj Pokorný -  https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
function downloadText(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function quizletText() {
    let text = '';
    quiz.questions.forEach(function(q) {
        text += q.text;
        text += ','
        
        text += '"';
        q.correctAnswers.forEach(answer => text += answer);
        text += '"';
        
        text += '\n';
    });

    return text;
}

function createQuizlet() {
    if (!quiz) {
        alert("Quiz isn't loaded.");
    }
    else {
        downloadText(quiz.name + '.csv', quizletText());
    }
}
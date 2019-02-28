![C2Q Logo](logo128.png)
# Canvas to Quizlet
A Chrome extension to generate Quizlet flashcards from Canvas quizzes.

![Screenshot](screenshot.png)

## About
Version 1.0

Written by Benjamin Steenhoek 2/28/2019

## To Install
This will be on the Chrome extensions store under "Canvas to Quizlet".

To install it unpacked:
- Go to the Chrome Extensions menu (Options > More Tools > Extensions).
- Click "Load Unpacked" in the top left.
- Give it the project root directory.

## Scope/TODO
- Currently only supports multiple-choice questions.
- I have not tested it on questions with more than one answer.
- Does not actually validate whether the page is a Canvas quiz. There is a TODO for this in payload.js.
- The styling of the popup is minimal.
- Needs an option to set the hostname in popup.js. It should only scrape the page if the hostname is right.

## Give Credit Where Credit's Due
@Ishan - https://stackoverflow.com/questions/21317476/how-to-use-jquery-in-chrome-extension
@Ross Zurowski https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
@Matěj Pokorný - https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
Tom Forth for background, permissions, and browser_action quickstart in manifest.json
https://www.tomforth.co.uk/chromeextension/
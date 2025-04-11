# OmniGen Chrome Extension

OmniGen is a Chrome extension that utilizes generative AI to process text based on user input and selected AI functions. It integrates with OpenAI Compatible APIs, allowing users to configure API settings for customized text processing.

## Features

- **Text Input**: Allows users to input text (up to 100 characters).
- **AI Function Selection**: Provides a selection of AI functions to process the input text.
- **OpenAI Compatible API Integration**: Integrates with OpenAI Compatible APIs, enabling users to configure settings such as Base URL, API Key, and Model IDs.
- **Context Menu Integration**: Processes selected text from web pages using the selected AI function.
- **History**: Maintains a history of past interactions and generated content.
- **Copy Functionality**: Copies the output text to the clipboard.
- **Character Count**: Displays the character count for the input text field.
- **Web UI Link**: Provides a link to a web UI for additional functionality.
- **Dark Mode Support**: Supports both light and dark modes, adapting to the user's system preferences.

## AI Functions

- **CNGenerator**: Generates Chinese names based on the input prompt.
- **EnGenerator**: Generates English names based on the input prompt.
- **DocSummarizer**: Summarizes the content of a web page given its URL.
- **EnToZh**: Translates English text to Chinese.

## Installation

1.  Clone this repository.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the directory of the cloned repository.

## Configuration

1.  After installing the extension, click on its icon in the Chrome toolbar to open the popup.
2.  Click on the "Settings" button to configure the API settings:
    -   **Base URL**: The base URL of the OpenAI Compatible API.
    -   **API Key**: Your API key for authentication.
    -   **Default Model ID**: The default model ID for general text processing.
    -   **EnGenerator Model ID**: The model ID specifically for the EnGenerator function.
    -   **DocSummarizer Model ID**: The model ID specifically for the DocSummarizer function.
3.  Input your text in the provided textarea, select an AI function, and click "Process with AI".
4.  The result will be displayed in the result textarea, and you can copy it to your clipboard using the "Copy Result" button.

## Local Testing

To test the Chrome extension locally:

1.  Ensure you have the latest version of Node.js and npm installed.
2.  Install the dependencies by running `npm install` in the project directory:
    ```bash
    npm install
    ```
3.  Build the project by running `npm run build`:
    ```bash
    npm run build
    ```
4.  **Create the following files in the root directory of your project:**
    -   `index.html`: This file will be the popup for your extension. Copy the following content to this file:
        ```html
        <!DOCTYPE html>
        <html>
        <head>
          <title>OmniGen</title>
          <link rel="stylesheet" href="src/app/globals.css">
        </head>
        <body>
          <div id="root"></div>
          <script src="src/app/page.js" type="module"></script>
        </body>
        </html>
        ```
    -   `options.html`: This file will be the options page for your extension. Copy the following content to this file:
        ```html
        <!DOCTYPE html>
        <html>
        <head>
            <title>OmniGen Options</title>
            <link rel="stylesheet" href="src/app/globals.css">
        </head>
        <body>
            <h1>OmniGen Options</h1>
            <p>This is the options page for the OmniGen Chrome extension.</p>
            <script src="options.js"></script>
        </body>
        </html>
        ```
    -   `background.js`:  Create an empty `background.js` file in the root directory.
    -   `contentScript.js`: Create an empty `contentScript.js` file in the root directory.
5.  Load the unpacked extension in Chrome as described in the Installation section, pointing to the project directory.

### Troubleshooting Local Testing Errors

-   **"Could not load javascript 'contentScript.js' for script."**:
    -   Ensure that the `contentScript.js` file exists in the root directory.
    -   Verify that the `manifest.json` file correctly references `contentScript.js` within the `content_scripts` array:
        ```json
        "content_scripts": [
          {
            "matches": ["<all_urls>"],
            "js": ["contentScript.js"]
          }
        ]
        ```
    -   Add `contentScript.js` to the `web_accessible_resources` array in `manifest.json`:
        ```json
        "web_accessible_resources": [
          {
            "resources": ["contentScript.js"],
            "matches": ["<all_urls>"]
          }
        ]
        ```
-   **"Manifest file is missing or unreadable"**:
    -   Double-check that `manifest.json` exists in the root directory.
    -   Ensure that the file is not empty and contains valid JSON.

## Usage

1.  Open the Chrome extension popup by clicking on the extension icon.
2.  Enter your text in the input field (up to 100 characters).
3.  Select an AI function from the dropdown.
4.  Click the "Process with AI" button to generate text based on the selected function.
5.  View the result in the output field.
6.  Use the "Copy Result" button to copy the generated text to your clipboard.

## Contributing

Feel free to contribute to this project by submitting issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

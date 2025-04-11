# **App Name**: OmniGen

## Core Features:

- URL Capture: Capture the URL of the currently active tab in Chrome.
- Popup Display: Display a popup window within the Chrome extension to show captured data and controls.
- AI Summarization: Utilize generative AI via an OpenAI compatible API to summarize web page content. This acts as a tool to distill key information, leveraging reasoning to incorporate relevant details.
- Copy to Clipboard: Allow users to copy the summarized content or other AI generated text to their clipboard.
- User Input: Provides a field for users to input simple text (up to 100 characters).
- Prompt Combination & Display: Combines user input with selected text as a prompt for Gen-AI API calls. If no selected text, use user input only. Displays results in the extension popup.
- API Integration: Integrate with OpenAI Compatible API, allowing users to configure Base URL, API Key, Default Model ID, and specific Model IDs for EnGenerator and DocSummarizer.
- Context Menu Integration: Implement context menu functionality for processing selected text directly from web pages.
- History Feature: Include a history feature for viewing past interactions and generated content.
- Web UI Link: Provide a Web UI link for additional functionality and detailed settings.
- Character Count Display: Display a character counter for the input text field.
- Direct Settings Access: Provide direct access to settings from the popup for quick configuration.
- CNGenerator: AI function for Chinese name generation.
- EnGenerator: AI function for English name generation.
- DocSummarizer: AI function for Document Summarization.
- EnToZh: AI function for English to Chinese translation.

## Style Guidelines:

- Light gray (#F5F5F5) for a clean and modern background.  Dark mode support by inverting color scheme.
- Dark gray (#333333) for primary text to ensure high readability, adapting to light text in dark mode.
- Teal (#008080) for interactive elements and highlights, providing visual accents and remaining consistent in dark mode.
- A clear and readable font (e.g., Arial, Helvetica, or system default) for all text elements, optimized for both light and dark themes.
- Simple, monochromatic icons for actions like 'copy', 'summarize', and AI function selection. Icons should be easily recognizable and adapt to dark mode with a lighter color.
- A clean and intuitive layout for the popup window, ensuring ease of use and quick access to key features. The layout should dynamically adjust to different screen sizes.

## Original User Request:
I wan to build a Chrome extension that can:
1. extension for processing text using Gen-AI
2. User interface for inputting text (up to 100 characters) and selecting AI functions
3. Four AI functions available:
   - CNGenerator
   - EnGenerator
   - DocSummarizer
   - EnToZh
   - ...etc.
4. Integration with OpenAI Compatible API
5. User settings for API configuration:
   - Base URL
   - API key
   - Default Model ID
   - Specific Model IDs for EnGenerator and DocSummarizer
6. Context menu integration for processing selected text, if no selected text just using user input
7. History feature for viewing past interactions
8. Copy functionality for output text
9. Character count display for input text
10. Web UI link for additional functionality
11. Direct access to settings from the popup

## Requirements
1. The extension should:
   1. Provide a field for users to input simple text (up to 100 characters)
   2. Combine user input with selected text as a prompt for Gen-AI API calls
   3. If no selected text, just use user input only.
   4. Process text using the selected AI function
2. Gen-AI uses an OpenAI Compatible API. Extension settings should allow users to input:
   1. Base URL
   2. API key
   3. Model IDs:
      - Default Model ID
      - EnGenerator Model ID
      - DocSummarizer Model ID
      - ...etc.
3. Each Gen-AI API call should display results in the extension popup
4. Provide a README.md file explaining all functionalities and instructions for local testing
5. Implement context menu functionality for processing selected text
6. Include a history feature for viewing past interactions
7. Provide a Web UI link for additional functionality
8. history.js and background.js should refer to one JS to get "AI_FUNCTIONS"
9. support system dark mode
  
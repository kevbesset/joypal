# Joypal

![Joypal main screen](./docs/joypal_capture.jpeg "Joypal main screen")

Joypal is a powerful interface designed to enhance your interaction with AI models. Leveraging the capabilities of Ollama, Joypal connects you to a variety of AI models to provide a seamless and enriched conversational experience.

## Prerequisites

To use Joypal, follow these steps:

1. **Install Ollama**: Joypal is integrated with Ollama, which you need to install first. Visit [Ollama](https://ollama.com/) to get started.
2. **Download AI Models**: Access Ollama's [model library](https://ollama.com/library) to download the models you need. Popular models include LLaMA and Mistral, among others. Use the terminal command `ollama pull <model_name>` to download your chosen model, for example, `ollama pull llama3.1`.
3. **API Setup**: Ollama automatically provides an API for the models you download. This API is utilized by Joypal. For more information, refer to [Ollama JS documentation](https://github.com/ollama/ollama-js).

## Features

- **Channel Creation**: Create channels for discussions with different models.
- **Enhanced Prompting**: Change models during conversations, set roles, and use templates for prompts.
- **Channel Management**: Save, rename, duplicate, export, and import channels.
- **Message Management**: Modify, copy, or regenerate messages.
- **Markdown Support**: Messages support markdown formatting for better readability.
- **Error Handling**: Display raw messages if markdown formatting causes issues.

## Current Functionality

- **Creating Channels**: Start discussions with various AI models.
- **Dynamic Model Switching**: Change the AI model mid-conversation.
- **Role Setting**: Define a system role for context in conversations.
- **Template Usage**: Save and use templates to prefill prompts.
- **Channel Persistence**: Save channels locally, with options to rename, duplicate, and delete.
- **Export/Import**: Export channels to JSON and import them back.
- **Message Controls**: Edit, copy, and regenerate individual messages.
- **Markdown Formatting**: Supports markdown for message formatting.

## Future Improvements

### Objectives

- Provide a superior web interface compared to ChatGPT.
- Connect with various AI models available on Ollama, ChatGPT, etc.
- Allow local hosting of Ollama models for enhanced security.
- Offer unlimited tokens for free models and connect API tokens for paid models.

### Optimized Interface

- All functionalities of ChatGPT including:
  - Markdown responses
  - Code highlighting
  - Multiple proposed responses
  - Message editing and restarting from a specific point
  - Response regeneration
  - Message copying
  - Voice discussions
- Save and organize chats in folders (similar to Arc browser).
- Search messages within chats.
- Integrated voice commands.
- Create prompts in formatted Markdown (like Notion).
  - Auto-format Markdown live.
  - Use command shortcuts with “/”.
- Create prompt templates with predefined fillable sections (like Emmet).
  - Propose to fill in placeholders interactively.
- Detail view for each message (duration, tokens used, etc.).
- Onboarding/setup process for initial configurations.
  - Configure Ollama to use different URLs.
  - Set up online models like ChatGPT, Gemini, etc.
  - Distinguish between local and online models.
- AI Store:
  - Download and manage a list of AI models.
  - Configure new AIs on the fly.
- Keyboard Shortcuts:
  - `Cmd + N` → Create a new chat.
  - `Cmd + S` → Toggle sidebar.
- Structured prompt creation:
  - Categorize into Role, Tasks, Context, and Characteristics/Examples.
  - Bypass structure with "raw" mode.
  - Optimize roles in system messages.
  - Build steps interactively with AI assistance.

### Additional Features

- Real-time model switching during conversations.
- Theme management with various themes.
- Split view for multiple model responses to a single prompt.
- Create prompt scenarios for automated discussions.
- AI-to-AI interactions with "god mode" intervention for system prompts.
- File-to-text translation for prompt inputs.

## Development Scripts

To streamline the development process, the following npm scripts are available:

- **`dev`**: Starts the development server using Vite.
  ```sh
  npm run dev
  ```
- **`build`**: Compiles TypeScript and builds the project using Vite.
  ```sh
  npm run build
  ```
- **`lint`**: Runs ESLint on the codebase to enforce coding standards and find potential errors.
  ```sh
  npm run lint
  ```
- **`preview`**: Serves the built project locally for previewing.
  ```sh
  npm run preview
  ```

## Contributions
We welcome contributions! Please feel free to submit issues, fork the repository, and send pull requests.

## License
This project is licensed under the MIT License.

---

Thank you for using Joypal! If you encounter any issues or have questions, feel free to reach out.
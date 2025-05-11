# Craftly.AI

> AI-powered content crafting for creators

Craftly.AI is a comprehensive React-based web application designed to streamline the content creation process for digital creators across multiple platforms. This all-in-one toolbox helps generate engaging titles, captions, hashtags, AI-generated images, and more without requiring any backend infrastructure.

## Features

- **Multi-Platform Support**: Customize content for Instagram, YouTube, TikTok, Twitter/X, LinkedIn, Facebook, and blogs
- **Content Generation Tools**:
  - Title Generator
  - Caption/Description Generator
  - Hashtag Generator
  - Blog Outline Generator
  - AI Image Generation (powered by Stability API)
- **Platform-Specific Previews**: View exactly how your content will appear on each platform
- **Direct Posting**: Post content directly to platforms with one click
- **Advanced Export Options**: Download content with generated images, save as PDF, copy to clipboard, or download as text files
- **Content History**: Access, reuse, and manage your previously created content and generated images
- **User-Friendly Interface**: Intuitive design with responsive layouts for all devices

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Soham2212004/craftly.ai.git
   cd craftly.ai
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your API keys
   ```
   GEMINI_API_KEY=your_gemini_api_key
   STABILITY_API_KEY=your_stability_api_key
   ```

4. Start the development server
   ```
   npm start
   # or
   yarn start
   ```

## Usage

1. Select your target platform from the dropdown menu
2. Enter your topic or keywords in the content input area
3. Choose your preferred tone and content length
4. Generate titles, captions, hashtags, or blog outlines
5. Create AI-generated images to accompany your content
6. Preview how your complete content will appear on the selected platform
7. Directly post to your selected platform with one click
8. Download your content with generated images or export in your preferred format
9. Access your content history to view, reuse, or delete previous creations

## Project Roadmap

### Phase 1: Basic Structure
- React project setup with dependencies
- Core UI components
- State management implementation
- Platform selection functionality

### Phase 2: Content Generation
- Title generation logic
- Caption/description generators
- Hashtag suggestion algorithm
- Blog outline generator

### Phase 3: Preview & Polish
- Platform-specific preview layouts
- Image generation integration using Stability API
- Direct posting functionality
- Export functionality with image download options
- Responsive design
- UI/UX optimization

### Phase 4: Advanced Features
- Content history with image management
- Themes and customization
- Detailed analytics
- Shareable content plans
- Multi-platform posting schedules

## Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI / Chakra UI
- **State Management**: React Context API
- **Local Storage**: For content history management
- **APIs**: 
  - Gemini API for text generation
  - Stability API for image generation
  - Social platform APIs for direct posting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Soham Soni - [sonisoham91@gmail.com](mailto:sonisoham91@gmail.com)

Project Link: [https://github.com/Soham2212004/craftly.ai](https://github.com/Soham2212004/craftly.ai)

---

Made with ❤️ by Soham Soni

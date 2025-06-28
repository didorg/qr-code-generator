# QR Code Generator

A modern, responsive QR code generator built with React, TypeScript, and Tailwind CSS. Generate QR codes for URLs, text content, and contact information with customizable colors and instant download capabilities.

![QR Code Generator](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)

## ✨ Features

- **Multiple QR Code Types**: URLs, text content, and contact information (vCard)
- **Real-time Generation**: Instant QR code creation as you type
- **Color Customization**: Custom foreground and background colors with live preview
- **Download & Share**: Instant PNG download and copy-to-clipboard functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Reliable Generation**: Multiple backends with automatic fallback for maximum reliability

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16.0.0 or higher)
- npm (version 7.0.0 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/qr-code-generator.git
cd qr-code-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5156](http://localhost:5156) to view the application.

## 📦 Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start development server on port 5156 |
| `npm run build`   | Build for production                  |
| `npm run preview` | Preview production build              |
| `npm run lint`    | Run code quality checks               |

## 🎯 Usage

1. **Choose QR Type**: Select URL, Text, or Contact from the tabs
2. **Enter Content**: Fill in your information
3. **Customize**: Adjust colors using the color picker
4. **Generate**: QR code appears instantly
5. **Download**: Save as PNG or copy data to clipboard

### QR Code Types

- **URL**: Website links with automatic protocol detection
- **Text**: Any plain text content up to reasonable limits
- **Contact**: Full contact information in vCard format (name, phone, email, organization, website)

## 🏗️ Technology Stack

- **React 18.2** - Modern UI library
- **TypeScript 5.2** - Type-safe development
- **Vite 5.0** - Fast build tool and dev server
- **Tailwind CSS 3.3** - Utility-first styling
- **Lucide React** - Beautiful icons
- **QRious** - Primary QR generation library

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](docs/) directory:

- **[📖 Documentation Index](docs/README.md)** - Complete documentation guide
- **[🤝 Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute to the project
- **[🚀 Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to various platforms
- **[🔒 Security Policy](docs/SECURITY.md)** - Security guidelines and reporting

## 🚀 Deployment

**✅ GitHub Pages Configured**: This project includes automated GitHub Pages deployment via GitHub Actions.

### Quick Deploy to GitHub Pages

1. Enable GitHub Pages in repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch - deployment happens automatically!

**Live Demo**: `https://YOUR_USERNAME.github.io/qr-code-generator/`

### Alternative Platforms

- **[Vercel](https://vercel.com)** - Zero-config deployment
- **[Netlify](https://netlify.com)** - Git-based deployment
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)** - Google's hosting solution

See the [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
5. Push and create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

- **Bug Reports**: Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Requests**: Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **Security Issues**: Email [security@your-domain.com](mailto:security@your-domain.com)
- **General Questions**: Start a [discussion](https://github.com/your-username/qr-code-generator/discussions)

## 🙏 Acknowledgments

Built with these amazing tools:

- [QRious](https://github.com/neocotic/qrious) - QR code generation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

Made with ❤️ by the QR Code Generator team

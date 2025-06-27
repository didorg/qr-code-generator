# 🤝 Contributing to QR Code Generator

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/qr-code-generator.git
   cd qr-code-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

### Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes following our coding standards
3. Test your changes: `npm run lint && npm run build`
4. Commit with conventional commit format: `git commit -m "feat: add new feature"`
5. Push and create a pull request

## 📝 Coding Standards

### TypeScript/React

- Use TypeScript for type safety
- Follow React functional component patterns
- Use hooks appropriately
- Keep components small and focused

### Code Style

- Use ESLint and Prettier (configured in the project)
- Use meaningful variable and function names
- Write self-documenting code
- Add JSDoc comments for public APIs

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Ensure accessibility compliance

## 🧪 Testing

- Run `npm run lint` to check code quality
- Test all QR generation types (URL, text, contact)
- Verify responsive design on different devices
- Test color customization features
- Ensure download and copy functionality works

## 📋 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add WiFi QR code generation
fix: resolve color picker validation issue
docs: update installation instructions
refactor: simplify QR generation logic
```

## 🔍 Pull Request Process

1. Update your branch: `git fetch upstream && git rebase upstream/main`
2. Push your changes: `git push origin feature/your-feature-name`
3. Create a Pull Request with:
   - Descriptive title
   - Clear description of changes
   - Screenshots for UI changes
   - Reference to related issues

## 🐛 Reporting Issues

Use our [issue templates](../.github/ISSUE_TEMPLATE/) for:

- Bug reports
- Feature requests

Include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, etc.)

## 📚 Documentation

When contributing:

- Update relevant documentation
- Add JSDoc comments for new functions
- Update the main README if needed
- Consider adding examples

## 🔒 Security

For security issues, please email [security@your-domain.com](mailto:security@your-domain.com) instead of creating a public issue.

See our [Security Policy](./SECURITY.md) for more details.

## 💡 Getting Help

- Check the [main README](../README.md)
- Search existing [issues](https://github.com/your-username/qr-code-generator/issues)
- Join [discussions](https://github.com/your-username/qr-code-generator/discussions)

## 🙏 Recognition

Contributors will be recognized in:

- README contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉

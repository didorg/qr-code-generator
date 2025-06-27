# 🔒 Security Policy

The QR Code Generator team takes security seriously. This document outlines our security practices and how to report vulnerabilities.

## 🛡️ Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported        |
| ------- | ---------------- |
| 1.0.x   | ✅ Supported     |
| < 1.0   | ❌ Not supported |

## 🔄 Recent Security Updates

**January 2024**: Updated build dependencies to address moderate security vulnerabilities:

- Upgraded Vite from 5.4.19 to 6.3.5
- Fixed esbuild vulnerability (GHSA-67mh-4wv8-2f99)
- Current status: 0 known vulnerabilities

## 🚨 Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: [security@your-domain.com](mailto:security@your-domain.com)

### What to Include

- Type of issue (e.g., XSS, code injection, etc.)
- Full paths of source file(s) related to the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue

### What to Expect

1. **Acknowledgment**: Receipt confirmed within 48 hours
2. **Initial Assessment**: Assessment provided within 72 hours
3. **Progress Updates**: Regular updates on fix progress
4. **Resolution**: Issues resolved within 30 days

## 🔍 Security Considerations

### Client-Side Security

This application processes user input on the client-side with these security measures:

#### Input Validation

- All user inputs are validated before QR code generation
- URL validation prevents malicious protocol injection
- Text content is limited to reasonable lengths
- Contact information follows vCard standards

#### Data Handling

- **No server-side data storage**: All processing happens client-side
- **No data transmission**: QR codes are generated locally
- **No tracking**: User data is not collected or transmitted

#### External Dependencies

- QRious library is loaded from a trusted CDN
- Fallback APIs (Google Charts, QR Server) are used only when necessary
- All external requests use HTTPS

### Content Security

#### QR Code Content

- Generated QR codes contain only user-provided data
- No injection of malicious content
- URL sanitization prevents XSS in QR content

#### Download Security

- Downloaded files are standard PNG images
- No executable content in generated files
- Filename sanitization prevents path traversal

## 🔐 Security Best Practices

### For End Users

1. **Verify QR Code Content**: Always verify the generated QR code contains the expected data
2. **Check URLs**: Ensure URLs are correct before generating QR codes
3. **Privacy**: Be cautious when sharing QR codes containing personal information
4. **Scanning**: Only scan QR codes from trusted sources

### For Developers

1. **Keep Dependencies Updated**: Regularly update npm packages
2. **Code Review**: Review all code changes for security implications
3. **Input Validation**: Always validate and sanitize user inputs
4. **HTTPS**: Use HTTPS in production deployments

## ⚠️ Known Security Limitations

1. **Client-Side Generation**: Security depends on the user's browser environment
2. **External APIs**: Fallback QR generation relies on external services
3. **Content Trust**: The application cannot verify the safety of URLs or text content

## 📋 Privacy Policy

### Data Collection

- **No personal data collection**: The application does not collect, store, or transmit personal data
- **No analytics**: No user behavior tracking (unless explicitly enabled)
- **No cookies**: No cookies or persistent tracking mechanisms

### Third-Party Services

When fallback APIs are used:

- Data is transmitted securely over HTTPS
- No personal information is included in API requests
- Requests contain only the text to be encoded

## 📧 Contact

For security-related questions:

- **Email**: [security@your-domain.com](mailto:security@your-domain.com)
- **Response Time**: We aim to respond within 48 hours

---

**Last Updated**: January 2024

Thank you for helping keep QR Code Generator safe and secure! 🔒

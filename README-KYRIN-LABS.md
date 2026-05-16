# Kyrin Labs - Cybersecurity Research Website

A professional cybersecurity research website built with Hugo, featuring a dark minimal hacker aesthetic inspired by Google Project Zero, SlowMist, and Offensive Security.

## Project Structure

```
kyrin-labs/
├── layouts/                    # Hugo layouts
│   ├── index.html             # Main homepage layout
│   ├── _default/              # Default layouts
│   └── partials/              # Reusable components
│       ├── head.html          # Head section
│       ├── header.html        # Navigation header
│       ├── footer.html        # Site footer
│       ├── scripts.html       # JavaScript functionality
│       └── sections/          # Homepage sections
│           ├── hero.html      # Hero section
│           ├── expertise.html # Core expertise cards
│           ├── research.html  # Research categories
│           ├── investigations.html # Investigation capabilities
│           ├── case-studies.html # Case studies
│           ├── tools.html     # Security tools
│           ├── latest-research.html # Recent research articles
│           └── contact.html   # Contact section
├── assets/css/                # Stylesheets
│   ├── main.scss             # Main SCSS styles
│   └── custom.css            # Existing custom styles
├── content/                   # Site content
│   ├── research/             # Research articles
│   ├── investigations/       # Investigation services
│   ├── case/                # Case studies
│   ├── tools/               # Security tools
│   ├── blog/                # Blog posts
│   ├── services/            # Consulting services
│   └── about/               # About page
├── hugo.toml                # Site configuration
└── test-build.sh            # Build test script
```

## Features

### 1. Homepage Sections
- **Hero Section**: Bold title with cybersecurity focus areas
- **Core Expertise**: Cards for UEBA Investigation, Data Leak Analysis, Web3 Asset Tracing
- **Research Areas**: Threat Intelligence, Digital Forensics, Web3 Security, Data Protection
- **Investigation Capabilities**: Incident Response, Forensic Analysis, Blockchain Forensics, Insider Threat Analysis
- **Case Studies**: Anonymized security investigation cases
- **Security Tools**: Open-source tools with GitHub links
- **Latest Research**: Dynamic display of recent research articles
- **Contact Section**: Professional contact information

### 2. Design Elements
- **Dark Theme**: GitHub-inspired dark color palette
- **Minimalist Layout**: Clean, professional research lab aesthetic
- **Responsive Design**: Mobile-friendly with hamburger menu
- **Security-Focused Typography**: Inter for body, JetBrains Mono for code
- **Theme Toggle**: Light/dark mode support

### 3. Technical Features
- **Modular Components**: Reusable partials for easy maintenance
- **Hugo Integration**: Compatible with existing theme structure
- **Performance Optimized**: Minified CSS and efficient layouts
- **Security Headers**: CSP and other security headers included
- **SEO Optimized**: Open Graph and Twitter cards

## Installation & Usage

1. **Build the site**:
   ```bash
   ./test-build.sh
   ```

2. **Preview locally**:
   ```bash
   hugo server
   ```

3. **Add content**:
   - Research articles in `content/research/`
   - Case studies in `content/case/`
   - Blog posts in `content/blog/`
   - Tools documentation in `content/tools/`

## Configuration

Key configuration in `hugo.toml`:
- Site title: "Kyrin Labs"
- Description: "Security Research & DLP Investigation"
- Custom color palette matching GitHub dark theme
- Professional fonts (Inter, JetBrains Mono)
- Navigation menu with all required sections
- Security settings for safe content rendering

## Customization

### Colors
Edit `assets/css/main.scss` to modify the color scheme:
- `$background: #0d1117` - GitHub dark background
- `$highlight: #2f81f7` - Professional blue accent
- `$card-bg: #161b22` - Card backgrounds

### Content
- Update contact information in `layouts/partials/sections/contact.html`
- Modify expertise cards in `layouts/partials/sections/expertise.html`
- Add/remove menu items in `hugo.toml`

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Progressive enhancement for older browsers

## Security Considerations
- Content Security Policy headers
- Safe HTML rendering disabled
- No external dependencies except fonts
- All communications over HTTPS

## License

This website template is designed for Kyrin Labs security research. Customize as needed for your security research or consulting practice.

---

*Built with Hugo • Inspired by Project Zero, SlowMist, and Offensive Security*

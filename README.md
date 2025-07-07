# 🌟 SAHIM's Portfolio Website

A modern, dark- and light-themed personal portfolio website showcasing skills as a Python Developer and DevOps Engineer. Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

## ✨ Features

### 🎨 Design & Animation
- **Light/Dark Mode Toggle**: Animated, modern pill switch in the navbar (sun/moon icon), with smooth transitions and theme persistence.
- **Dark Theme**: Modern dark color palette with blue/purple accents and animated SVG circuit/tech background.
- **Light Theme**: Clean, high-contrast palette with a beautiful blue/white animated background (uses a high-res image and blue overlay for a techy, soft look).
- **Sticky Navbar**: Always visible, with perfect contrast and readability in both themes, even after scrolling.
- **Smooth Animations**: All hero/menu text and navbar animate in on theme change for a polished feel.
- **Typing Effect**: Animated text cycling through professional titles.
- **Scroll Animations**: Elements fade in as you scroll using Intersection Observer.

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Flexible Layout**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Mobile navigation with hamburger menu
- **Performance Optimized**: Throttled scroll events and efficient animations

### 🚀 Interactive Elements
- **Smooth Scrolling**: Navigation links with smooth scroll behavior
- **Hover Effects**: Cards and buttons with engaging hover animations
- **Contact Form**: Functional contact form with validation
- **Loading Screen**: Elegant loading animation on page load

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
├── ai-waves-light.png  # High-res background image for light mode (add this file)
└── README.md           # This file
```

## 🛠️ Setup Instructions

### 1. Download/Clone
```bash
# Clone the repository
git clone <repository-url>

# Or download and extract the ZIP file
```

### 2. Open in Browser
Simply open `index.html` in your web browser - no server required!

### 3. Customize Content
Edit the HTML file to replace placeholder content with your information.

### 4. Light Mode Background Image
- Place your high-res background image for light mode as `ai-waves-light.png` in the project root.
- For best results, use a 1920x1080 or higher PNG/JPG with soft blue/white gradients and techy waves.

## 🎯 Customization Guide

### Personal Information
Edit the following sections in `index.html`:

#### Hero Section (Lines ~50-70)
```html
<h1 class="hero-title">Hi, I'm <span class="highlight">YOUR_NAME</span></h1>
<div class="typing-words">
    <span>Python Developer</span>
    <span>DevOps Engineer</span>
    <span>Backend Specialist</span>
    <span>Automation Lover</span>
</div>
```

#### About Section (Lines ~90-110)
```html
<p>Your personal bio and background information...</p>
<p>Your professional goals and aspirations...</p>
```

#### Projects Section (Lines ~130-200)
Replace the project cards with your own projects:
```html
<div class="project-card">
    <div class="project-content">
        <h3>Your Project Title</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span class="tech-badge">Technology</span>
        </div>
    </div>
</div>
```

#### Contact Section (Lines ~220-250)
Update social media links:
```html
<div class="social-links">
    <a href="your-github-url" class="social-link" title="GitHub">
        <i class="fab fa-github"></i>
    </a>
    <a href="your-linkedin-url" class="social-link" title="LinkedIn">
        <i class="fab fa-linkedin"></i>
    </a>
</div>
```

### Styling Customization

#### Colors (styles.css - Lines ~10-20)
```css
:root {
    --bg-primary: #0a0a0a;        /* Main background (dark) */
    --bg-secondary: #111111;      /* Section backgrounds (dark) */
    --accent-primary: #3b82f6;    /* Primary accent color */
    --accent-secondary: #8b5cf6;  /* Secondary accent color */
}
[data-theme="light"] {
    --bg-primary: #f4f6fa;        /* Main background (light) */
    --bg-secondary: #ffffff;      /* Section backgrounds (light) */
    --accent-primary: #3b82f6;
    --accent-secondary: #8b5cf6;
}
```

#### Navbar
- The navbar is always visible, with high-contrast text and background in both themes.
- The active menu item is bold and underlined.
- The theme toggle is on the right, before the Contact link.

#### Typography
The website uses Inter font from Google Fonts. To change:
1. Update the font import in `index.html` (Line ~10)
2. Modify `font-family` in `styles.css` (Line ~25)

### Tech Stack Icons
Add or remove tech stack items in the About section:
```html
<div class="tech-item" data-tech="Your Tech">
    <i class="fab fa-your-icon"></i>
    <span>Your Tech</span>
</div>
```

## 🎨 Animation Customization

### Typing Speed
Adjust the typing effect speed in `script.js` if desired.

### Theme/Section Animations
- All hero/menu text and navbar animate in on theme change for a smooth, modern feel.
- Scroll animations are handled with Intersection Observer and CSS.

## 🌐 Live Demo
Your site is live on GitHub Pages and all theme/navbar/background changes are visible on all pages and after scrolling.

---

For any further customization, just edit the relevant HTML, CSS, or JS files. Enjoy your modern, animated, and fully theme-aware portfolio!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them with the community!

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to reach out!

---

**Made with ❤️ by SAHIM**

*Built with vanilla HTML, CSS, and JavaScript - because sometimes the best solutions are the simplest ones!* 
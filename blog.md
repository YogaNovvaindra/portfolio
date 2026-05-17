# Ghost CMS UI/UX Improvement Plan

If you want to improve your blog's typography, background themes, and overall aesthetic directly through the **Ghost CMS Admin Panel** (at `ygnv.my.id/ghost`), you can achieve a massive upgrade without touching any external code. Ghost provides built-in design settings and powerful "Code Injection" capabilities that let you override the default theme styles.

Here are suggestions for what you can do directly inside Ghost CMS:

---

## 1. Native Design Settings (`Settings` -> `Design`)

Ghost's built-in themes (like Casper or Headline) offer native toggles for basic aesthetics.

*   **Brand Color**: Ensure your brand color is set to a vibrant, accessible color (like your signature blue `#0077FF`). Ghost uses this variable to automatically style buttons, links, and accents across the theme.
*   **Typography Toggle**: Look for the "Typography" setting. Most native Ghost themes let you toggle the body text between a modern **Sans-Serif** and a classic **Serif**. For long-form technical reading, setting the body to Serif (while keeping headings Sans-Serif) often improves legibility.
*   **Dark/Light Mode**: Check if your active theme has a built-in Dark Mode toggle. You can set it to "Dark" by default for that tech aesthetic, or "Auto" to respect the reader's system preferences.

---

## 2. Advanced Typography via Code Injection

If the native font options are too limited, you can import premium fonts (like *Inter* for a modern tech feel, or *Merriweather* for an editorial feel) via Google Fonts using Ghost's Code Injection (`Settings` -> `Code Injection`).

**Add this to the Site Header (`<head>`):**
```html
<!-- 1. Import Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

<style>
  /* 2. Apply Inter to all Headings for a clean, geometric look */
  h1, h2, h3, h4, h5, h6, .gh-head {
      font-family: 'Inter', sans-serif !important;
      letter-spacing: -0.02em !important;
  }
  
  /* 3. Apply Merriweather to the Article Body for high readability */
  .gh-content p, .gh-content li, .gh-content blockquote {
      font-family: 'Merriweather', serif !important;
      line-height: 1.8 !important; /* Give text breathing room */
      font-size: 1.1rem !important;
  }
</style>
```

---

## 3. Background Themes & Gradients via Code Injection

You can override the default background of your Ghost theme to add mesh gradients, "aurora" effects, or simply a richer, deep-space dark mode color instead of pure black/gray.

**Add this to the Site Header (`<head>`):**
```html
<style>
  /* 1. Override the default background to a premium deep blue/zinc */
  body, .site-main, .gh-main {
      background-color: #0A0F1C !important; 
      color: #E4E4E7 !important; /* Soft white text to reduce eye strain */
  }
  
  /* 2. Add a subtle glowing mesh/aurora gradient at the top of the page */
  body::before {
      content: '';
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 80vw;
      height: 600px;
      background: radial-gradient(circle, rgba(0,119,255,0.08) 0%, rgba(139,92,246,0.05) 40%, rgba(0,0,0,0) 70%);
      pointer-events: none;
      z-index: -1;
  }
</style>
```

---

## 4. Code Block Aesthetics (Syntax Highlighting)

Ghost does not include syntax highlighting by default. You can easily add a beautiful, modern syntax highlighter (like Prism.js) via Code Injection to make your technical snippets pop.

**Add this to the Site Header (`<head>`):**
```html
<!-- Prism.js CSS Theme (e.g., 'Tomorrow Night' dark theme) -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />

<style>
  /* Enhance code block containers to look like premium IDE windows */
  pre[class*="language-"] {
      border-radius: 0.75rem !important;
      border: 1px solid #27272a !important; /* Subtle border */
      background: #121214 !important; /* Very dark background */
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5) !important;
      margin: 2em 0 !important;
  }
  code[class*="language-"] {
      font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
      font-size: 0.9em !important;
  }
</style>
```

**Add this to the Site Footer (`</body>`):**
```html
<!-- Prism.js Library and Autoloader for syntax highlighting -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
```

---

## 5. Micro-Interactions & Polish

You can add subtle CSS animations to make the Ghost theme feel more interactive and "glassy".

**Add this to the Site Header (`<head>`):**
```html
<style>
  /* Make article cards lift slightly and glow on hover */
  .post-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
      border: 1px solid transparent;
  }
  .post-card:hover {
      transform: translateY(-4px) !important;
      /* Soft blue glow drop-shadow */
      box-shadow: 0 20px 25px -5px rgba(0, 119, 255, 0.1), 0 8px 10px -6px rgba(0, 119, 255, 0.1) !important;
      border-color: rgba(0, 119, 255, 0.3) !important;
  }

  /* Add a glassmorphism effect to the site header/navbar */
  .gh-head {
      background: rgba(10, 15, 28, 0.7) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  }
</style>
```

---

## 6. Site Identity & Meta Settings (Title, About, SEO)

A strong tech blog needs a clear, punchy identity to differentiate it from your main portfolio. You can configure all of this in Ghost under `Settings` -> `General` (or `Settings` -> `Site` depending on your Ghost version).

### Site Title (`Settings` -> `Site` -> `Title & description`)
**Copy this exactly into the "Site Title" field:**
```text
Yoga Novaindra | Tech Log
```

### Site Description (`Settings` -> `Site` -> `Title & description`)
**Copy this exactly into the "Site description" field:**
```text
Field notes, documentation, and practical guides on DevSecOps, Kubernetes, security, and cloud infrastructure.
```

### The "About" Page (`Pages` -> `New Page`)
Create a new page in Ghost and copy-paste the following content exactly:

**Page Title:**
```text
About
```

**Body Content (Copy this directly into the editor):**
```text
Hi, I'm Yoga Novaindra.

I'm a DevSecOps Engineer passionate about secure cloud architecture, infrastructure automation, and software engineering.

I use this blog as my personal knowledge base. It's where I document my field notes, share infrastructure patterns, and post technical guides for problems I couldn't easily find answers to on StackOverflow. 

If you want to see my professional work, projects, or get in touch, you can find me at my main portfolio: [yoganova.my.id](https://yoganova.my.id).

You can also connect with me on [GitHub](https://github.com/YogaNovvaindra) or [LinkedIn](https://linkedin.com/in/yoga-novaindra).
```

### SEO / Meta Description (`Settings` -> `General` -> `Meta data`)
Ensure your search engine metadata is set properly so your blog ranks well on Google.

**Meta Title:**
```text
Yoga Novaindra | Tech Log
```
**Meta Description:**
```text
Field notes, documentation, and practical guides on DevSecOps, Kubernetes, security, and cloud infrastructure.
```

### Publication Cover (`Settings` -> `Design` -> `Brand`)
*   **Recommendation**: Ghost uses this as the default "fallback" Open Graph image when you share a link to your blog on Twitter or LinkedIn. Upload a simple, high-resolution image featuring a dark background and your `[Y]` logo in the center.

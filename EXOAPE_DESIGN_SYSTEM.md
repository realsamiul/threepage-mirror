# Exo Ape Design System & Motion Theory

A comprehensive guide to Exo Ape's layout principles, CSS architecture, text animations, scrolling interactions, and parallax effects. This document serves as both reference material and a template for building similar experiences.

---

## I. Color Philosophy

Exo Ape uses a refined, **minimal color palette** focused on contrast, legibility, and emotional impact.

### Core Palette

```css
/* Neutrals - The Foundation */
--color-white: #fff;
--color-off-white: #f8f8f8;
--color-light-grey: #e4e0db;
--color-dark-grey: #0d0e13;
--color-story: #070707;

/* Functional Opacities */
--color-white-02: hsla(0, 0%, 100%, 0.2);
--color-white-04: hsla(0, 0%, 100%, 0.4);
--color-white-06: hsla(0, 0%, 100%, 0.6);
--color-white-08: hsla(0, 0%, 100%, 0.8);

--color-dark-grey-02: rgba(13, 14, 19, 0.2);
--color-dark-grey-04: rgba(13, 14, 19, 0.4);
--color-dark-grey-06: rgba(13, 14, 19, 0.6);
--color-dark-grey-08: rgba(13, 14, 19, 0.8);

--color-sand: #e0ccbb;
--color-sand-06: hsla(28, 37%, 81%, 0.6);
--color-sand-08: hsla(28, 37%, 81%, 0.8);
```

### Color Logic

- **Light Mode**: Dark grey text on white/off-white backgrounds
- **Dark Mode**: White text on dark grey backgrounds
- **Accent**: Sand/warm beige for subtle highlights and hover states
- **Opacity Variants**: Named by percentage (02, 04, 06, 08) for consistent transparency across elements

**Key Principle**: Two-tone design system (dark + light) with sand as the only accent color. This restraint creates elegance and forces intentional use of color.

---

## II. Typography System

Exo Ape uses **TWK Lausanne** exclusively across all weights (300, 400, 500), creating visual coherence through font family consistency.

### Font Stack

```css
@font-face {
  font-family: 'Lausanne-300';
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/TWKLausanne-300.woff2') format('woff2');
}

@font-face {
  font-family: 'Lausanne-400';
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/TWKLausanne-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Lausanne-500';
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/TWKLausanne-500.woff2') format('woff2');
}

body {
  font-family: 'Lausanne-400';
}

h1, h2, h3 {
  font-family: 'Lausanne-500';
}

.light-weight {
  font-family: 'Lausanne-300';
}
```

### Responsive Typographic Scale

All font sizes use **viewport width percentages (vw)** to scale fluidly across devices. This creates a responsive hierarchy without media query breakpoints for every size.

**Mobile Scale (< 601px):**
```css
--font-s-h0: 25.6vw;  /* Hero Title */
--font-s-h1: 16vw;    /* Section Title */
--font-s-h2: 7.73vw;  /* Subsection */
--font-s-h3: 6.4vw;   /* Small Title */
--font-s-h4: 4.8vw;   /* Label */
--font-s-p: 3.73vw;   /* Body Text */
--font-s-label: 3.73vw;
```

**Desktop Scale (≥ 601px):**
```css
--font-s-h0: 17.36vw;
--font-s-h1: 10vw;
--font-s-h2: 3.61vw;
--font-s-h3: 2.22vw;
--font-s-h4: 1.67vw;
--font-s-p: 1.11vw;
--font-s-label: 0.97vw;
```

**Line Height**: Consistent 1.25-1.5x the font size for optimal readability
**Letter Spacing**: Slight negative spacing (-0.5% to -1.2% of font size) for tightness and sophistication

### Typography Principle

**One font family, multiple weights** = Visual unity + Elegant simplicity. No serif-sans mixing. Exo Ape trusts typography as the primary design element.

---

## III. Layout Architecture

### Flexbox First Methodology

Exo Ape uses **Flexbox as the primary layout system**, organized by content sections.

```css
.container {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 4vw;  /* Responsive padding */
}

.section {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 4vw;
}

.grid-3 {
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
}

.grid-3 > * {
  flex: 1 1 calc(33.33% - 1.33vw);
}
```

### Responsive Breakpoint Strategy

**Single Primary Breakpoint at 601px:**
```css
@media (min-width: 601px) {
  /* All layout shifts happen here */
}
```

Minimal breakpoints = cleaner code + consistent behavior. Most sizing handled via `vw` units.

### Spacing System

All spacing uses **viewport-relative values** to scale with content:

```css
--spacing-xs: 1vw;
--spacing-sm: 2vw;
--spacing-md: 4vw;
--spacing-lg: 6vw;
--spacing-xl: 8vw;

section {
  padding: var(--spacing-lg) 0;
}

.element {
  margin-bottom: var(--spacing-md);
}
```

**Principle**: Proportional scaling means content always relates to viewport, creating natural responsive behavior.

---

## IV. Text Animation Theory

### Concept: The Title Mask Animation

Exo Ape's signature animation breaks long headings into **individual lines**, then animates each line independently with a **clip-path or overflow-hidden mask effect**.

### HTML Structure

```html
<h1 class="title">
  <div class="title-mask">
    <div class="title-line">Building</div>
  </div>
  <div class="title-mask">
    <div class="title-line">Digital</div>
  </div>
  <div class="title-mask">
    <div class="title-line">Presence</div>
  </div>
</h1>
```

### CSS Implementation

```css
.title {
  display: flex;
  flex-direction: column;
}

.title-mask {
  overflow: hidden;
  height: var(--font-s-h1);  /* Matches font size */
  line-height: var(--font-lh-h1);
}

.title-line {
  font-size: var(--font-s-h1);
  line-height: var(--font-lh-h1);
  letter-spacing: var(--font-ls-h1);
  font-family: 'Lausanne-500';
  
  /* Animation hook */
  will-change: transform;
  transform: translateY(100%);  /* Hidden below mask initially */
}

/* Animated state (via JS or data attribute) */
.title-line.is-visible {
  animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
  }
}
```

### Animation Timing Strategy

**Staggered Entry**: Each line animates with a **100-150ms delay** relative to the previous line.

```javascript
// Pseudo-code for stagger
document.querySelectorAll('.title-line').forEach((el, index) => {
  el.style.animationDelay = `${index * 0.1}s`;
});
```

**Cubic Bezier**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` creates a smooth acceleration curve that feels natural and premium.

---

## V. Scroll-Driven Animations

### Core Principle: Intersection Observer API

Exo Ape uses **Intersection Observer** to trigger animations as elements enter the viewport, avoiding janky on-scroll calculations.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);  // Fire once
    }
  });
}, {
  threshold: 0.1,  // Trigger when 10% visible
  rootMargin: '0px 0px -100px 0px'  // Trigger 100px before entering
});

// Observe all animatable elements
document.querySelectorAll('.animate').forEach(el => {
  observer.observe(el);
});
```

### Common Scroll Animation Types

#### 1. Fade In

```css
.element {
  opacity: 0;
  transition: opacity 0.6s ease-out;
}

.element.animate-in {
  opacity: 1;
}
```

#### 2. Slide In (Bottom)

```css
.element {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.element.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

#### 3. Scale In

```css
.element {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.element.animate-in {
  opacity: 1;
  transform: scale(1);
}
```

#### 4. Staggered Children

```css
.container.animate-in .child {
  animation: slideUp 0.6s ease-out both;
}

.container.animate-in .child:nth-child(2) {
  animation-delay: 0.1s;
}

.container.animate-in .child:nth-child(3) {
  animation-delay: 0.2s;
}
```

**Timing Pattern**: 
- Duration: 0.6-0.8 seconds
- Easing: `ease-out` or `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Stagger: 0.08-0.15s between elements

---

## VI. Parallax & Depth Effects

### Parallax Concept: Relative Speed

Elements move at **different speeds** based on scroll position, creating depth illusion.

```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Layer 1: Slower (background)
  document.querySelector('.parallax-slow').style.transform = 
    `translateY(${scrolled * 0.3}px)`;
  
  // Layer 2: Normal (mid-ground)
  document.querySelector('.parallax-normal').style.transform = 
    `translateY(${scrolled * 0.6}px)`;
  
  // Layer 3: Faster (foreground)
  document.querySelector('.parallax-fast').style.transform = 
    `translateY(${scrolled * 0.9}px)`;
});
```

### Parallax with Multiple Containers

```html
<section class="parallax-section">
  <div class="parallax-bg" data-speed="0.5"></div>
  <div class="parallax-content" data-speed="0.8">
    <h2>Content</h2>
  </div>
</section>
```

```css
.parallax-section {
  position: relative;
  overflow: hidden;
  height: 800px;
}

.parallax-bg,
.parallax-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
}

.parallax-bg {
  height: 120%;  /* Extra height to prevent gaps */
}
```

### Parallax with Images

For large hero images, parallax creates a cinematic feel:

```css
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  object-fit: cover;
  will-change: transform;
}

.hero-content {
  position: relative;
  z-index: 10;
  height: 100vh;
  display: flex;
  align-items: center;
}
```

**Performance Note**: Use `will-change: transform` and `transform` (not top/left) to ensure GPU acceleration.

---

## VII. Marquee Animation

Exo Ape uses **continuous scrolling marquees** for key messaging.

```html
<div class="marquee">
  <div class="marquee-line">
    Forever Upwards
    <svg class="icon"><!-- Icon --></svg>
    Forever Upwards
    <svg class="icon"><!-- Icon --></svg>
  </div>
</div>
```

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
  padding: 2vw 0;
}

.marquee-line {
  display: inline-block;
  font-size: var(--font-s-h2);
  font-family: 'Lausanne-500';
  letter-spacing: var(--font-ls-h2);
  will-change: transform;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);  /* Seamless loop */
  }
}

/* Duplicate content for seamless loop */
.marquee-line {
  width: 200%;  /* Must be 200% for infinite loop */
}
```

**Key**: Content is duplicated so at 50% animation, the first copy exits while the second copy enters seamlessly.

---

## VIII. Link Hover Effects

Exo Ape uses sophisticated hover states that draw user attention without breaking the aesthetic.

```html
<a href="#" class="link">
  <div class="wrap">
    <div class="circle">
      <div class="circle-fill"></div>
    </div>
    Our Story
    <div class="border"></div>
  </div>
</a>
```

```css
.link {
  position: relative;
  display: inline-block;
  text-decoration: none;
  color: inherit;
}

.wrap {
  display: flex;
  align-items: center;
  gap: 1vw;
  position: relative;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid currentColor;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-out;
}

.circle-fill {
  width: 0;
  height: 0;
  border-radius: 50%;
  background: currentColor;
  transition: all 0.3s ease-out;
}

.border {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease-out;
}

.link:hover .circle-fill {
  width: 100%;
  height: 100%;
}

.link:hover .border {
  width: 100%;
}
```

**Hover Behavior**:
- Inner circle fills in (0 → 100%)
- Underline extends left to right
- Timing: 0.3s with ease-out easing
- Creates tactile, premium feel

---

## IX. Building a Page: Start to Finish

### Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <style>
    /* Global styles + CSS variables */
  </style>
</head>
<body>
  <!-- Hero Section -->
  <header class="hero light">
    <div class="container">
      <h1 class="title">
        <div class="title-mask">
          <div class="title-line">Your</div>
        </div>
        <div class="title-mask">
          <div class="title-line">Headline</div>
        </div>
      </h1>
    </div>
    <div class="background">
      <img src="hero.jpg" alt="Hero">
    </div>
  </header>

  <!-- Service/Content Section -->
  <section class="services dark">
    <div class="container">
      <div class="content animate" data-animate="slideUp">
        <h2>Section Title</h2>
        <p>Content here</p>
      </div>
    </div>
  </section>

  <script>
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
  </script>
</body>
</html>
```

### Implementation Checklist

- [ ] **Color System**: Define CSS variables for all colors with opacity variants
- [ ] **Typography**: Import font and set up responsive vw-based sizing
- [ ] **Layout**: Use Flexbox with responsive gap/padding (vw units)
- [ ] **Text Animations**: Use title-mask structure for headline animations
- [ ] **Scroll Animations**: Implement Intersection Observer for fade/slide effects
- [ ] **Hover States**: Add premium link/button hover animations
- [ ] **Parallax** (Optional): Layer elements with different transform speeds
- [ ] **Performance**: Add `will-change` and use `transform` only (not position)

---

## X. Performance Principles

### Animation Best Practices

1. **Use `transform` and `opacity` only** – These are GPU-accelerated
2. **Avoid animating layout properties** – width, height, position (except transform)
3. **Add `will-change: transform`** to animated elements
4. **Use Intersection Observer** – Not scroll events (more performant)
5. **Debounce resize listeners** – Prevent frame drops on window resize
6. **Use `font-display: swap`** – Show text while fonts load
7. **Lazy load images** – `loading="lazy"` for below-fold content
8. **Minimize repaints** – Batch DOM updates, use CSS variables

### GPU Acceleration Pattern

```css
.animated-element {
  will-change: transform;
  transform: translateZ(0);  /* Forces GPU layer */
  backface-visibility: hidden;
  perspective: 1000px;
}
```

---

## XI. Accessibility Considerations

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Color Contrast

- Text on light backgrounds: Use dark grey (`#0d0e13`)
- Text on dark backgrounds: Use white (`#fff`)
- Minimum WCAG AA: 4.5:1 contrast ratio for body text

### Semantic HTML

```html
<!-- Good -->
<header role="banner">
  <nav aria-label="Main navigation"></nav>
</header>
<main></main>
<footer role="contentinfo"></footer>

<!-- Avoid -->
<div class="header"></div>
<div class="nav"></div>
```

---

## XII. Adaptation Examples

### Example 1: Reusable Hero Section

```html
<header class="hero light">
  <div class="container">
    <div class="text">
      <h1 class="title">
        <div class="title-mask"><div class="title-line">Your Title</div></div>
        <div class="title-mask"><div class="title-line">Here</div></div>
      </h1>
      <p class="subtitle">Supporting text</p>
    </div>
  </div>
  <div class="background">
    <img src="image.jpg" alt="Description">
  </div>
</header>
```

### Example 2: Reusable Card Grid

```html
<section class="grid-section">
  <div class="container">
    <h2>Card Section</h2>
    <div class="card-grid">
      <article class="card animate" data-animate="slideUp">
        <img src="image.jpg" alt="">
        <h3>Card Title</h3>
        <p>Card content</p>
      </article>
      <!-- More cards -->
    </div>
  </div>
</section>

<style>
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2vw;
  }
  
  .card {
    flex: 1 1 calc(33.33% - 1.33vw);
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card:nth-child(2).animate-in {
    transition-delay: 0.1s;
  }
  
  .card:nth-child(3).animate-in {
    transition-delay: 0.2s;
  }
</style>
```

---

## Summary: Exo Ape's Design DNA

| Aspect | Principle |
|--------|-----------|
| **Color** | Minimal palette (dark + light + sand accent only) |
| **Typography** | Single font family (Lausanne) with responsive vw sizing |
| **Layout** | Flexbox-first, proportional spacing (vw units) |
| **Animation** | Intersection Observer triggers, 0.6-0.8s duration, cubic-bezier easing |
| **Text Animation** | Title mask (overflow:hidden + translateY stagger) |
| **Scroll Effects** | Parallax via different transform speeds, fade/slide on scroll |
| **Performance** | GPU-accelerated (transform only), will-change hints, lazy loading |
| **Accessibility** | Semantic HTML, reduced-motion support, 4.5:1 contrast |

**Core Philosophy**: Sophistication through restraint. Every design decision serves clarity and elegance. No decoration without function.

---

**Use this guide to create new pages** by following the structure templates and adapting the components to your content. The system scales beautifully across devices and requires minimal JavaScript.

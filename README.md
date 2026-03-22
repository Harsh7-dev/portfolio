# Harsh Patel — Portfolio

Personal portfolio website showcasing my experience, projects, and skills as a Software Engineer.

**Live:** [harsh-patel.dev](https://harsh-patel.dev)

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Deployment:** Vercel

## Features

- Responsive design with dark/light mode
- Scroll-triggered text highlight animations
- Interactive career timeline wheel
- Contact form with mailto integration
- Smooth scroll navigation with offset handling
- Error boundary for graceful failure recovery

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  components/
    Hero.jsx          # Landing section with career wheel
    About.jsx         # Bio with scroll-highlight text
    Skills.jsx        # Technical skills grid
    Experience.jsx    # Work experience timeline
    Projects.jsx      # Project showcase cards
    Certifications.jsx
    Contact.jsx       # Contact form
    Navbar.jsx        # Responsive navigation
    Footer.jsx
    ErrorBoundary.jsx
  assets/             # Images and logos
  index.css           # Theme variables and global styles
  App.jsx             # Root component
```

## License

MIT

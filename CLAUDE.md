# CLAUDE.md - Agent Guidance for desk.zentala.io

## Project Type
Astro-based blog and project website for the Open Smart Desk project.

## Development
- Local development: `cd astro-desk && npm run dev`
- Build: `cd astro-desk && npm run build`
- Preview build: `cd astro-desk && npm run preview`
- Deploy: Push to master branch (auto-deploys via GitHub Pages)

## Code Style Guidelines
- Astro: Use Astro components for page structure and layout
- HTML: HTML5 semantic tags, maintain consistent indentation
- CSS: Follow Bootstrap conventions, use Bootstrap classes when possible
- JavaScript: Minimal JS, keep functionality simple and accessible
- Markdown: Use clean, well-structured Markdown for blog content
- Components: Reuse components when possible for consistency

## File Structure
- astro-desk/: Main Astro project
  - src/: Source files
    - pages/: Page templates (index.astro, vision.astro, build.astro, contribute.astro)
    - components/: Reusable UI components
    - content/blog/: Blog posts in Markdown format
    - styles/: Global styles
  - public/: Static assets
    - images/: Project photos and diagrams
    - enclosure/: Design files for physical components

## Blog Content Guidelines
- Technical posts: Include code snippets, diagrams, and clear explanations
- Progress updates: Show before/after comparisons when possible
- Post images: Use high-quality images, optimize for web
- Tags: Use consistent tags for categorization

## Additional Notes
- This is a documentation and progress tracking site for a hardware project
- Maintain visual consistency with the existing design
- Focus on clear communication of technical concepts
- Site should be responsive and mobile-friendly
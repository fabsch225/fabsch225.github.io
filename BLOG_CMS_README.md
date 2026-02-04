# Mini CMS for Blog

A lightweight, file-based Content Management System for your Next.js portfolio with pure Markdown authoring, React component rendering, and mathematical typesetting support.

## Features

### ✨ Pure Markdown Authoring
- Write blog posts in standard Markdown (`.md`) files
- Support for frontmatter metadata (title, date, author, tags, excerpt)
- Automatic file-based routing
- No database required

### 🎨 Deterministic React Rendering
- Uses your existing portfolio components for consistent styling
- Custom component mapping for markdown elements
- Integrates seamlessly with your design system
- Supports all standard markdown features (lists, tables, blockquotes, etc.)

### 📐 Mathematical Typesetting (KaTeX)
- Inline math: `$E = mc^2$`
- Display math: `$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$`
- Fast rendering with KaTeX
- Full LaTeX math syntax support

### 💻 Code Syntax Highlighting
- Fenced code blocks with language detection
- Integrated with your existing CodeBlock component
- Line numbers and styling

### 🔧 Additional Features
- GitHub Flavored Markdown (tables, task lists, strikethrough)
- Automatic post sorting by date
- SEO-friendly with metadata
- Static generation for optimal performance

## Project Structure

```
portfolio/
├── app/
│   └── blog/
│       ├── page.tsx              # Blog listing page
│       └── [slug]/
│           └── page.tsx          # Individual blog post page
├── common/
│   ├── blog.ts                   # Blog post utilities
│   └── markdown.tsx              # Markdown renderer with components
└── content/
    └── blog/
        ├── welcome.md            # Example post
        ├── big-o-notation.md     # Example post with code
        └── fourier-transforms.md # Example post with math
```

## Creating a New Blog Post

1. Create a new `.md` file in `content/blog/`:

```bash
touch content/blog/my-new-post.md
```

2. Add frontmatter and content:

```markdown
---
title: "My New Post"
date: "2026-02-04"
author: "Your Name"
excerpt: "A brief description of your post that appears in the listing."
tags: ["tag1", "tag2"]
---

# My New Post

Your content here...
```

3. The blog automatically picks it up! No configuration needed.

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `author` | No | Author name |
| `excerpt` | No | Short description for listing (auto-generated if omitted) |
| `tags` | No | Array of tags |

## Markdown Syntax Examples

### Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Emphasis

```markdown
**bold text**
*italic text*
~~strikethrough~~
```

### Lists

```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

### Links

```markdown
[Link text](https://example.com)
```

### Code

Inline code: \`const x = 1;\`

Code blocks:
\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Math

Inline: `$E = mc^2$`

Display:
```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes

```markdown
> This is a blockquote
> With multiple lines
```

## API

### `getAllPosts()`

Returns all blog posts sorted by date (newest first).

```typescript
import { getAllPosts } from '@common/blog';

const posts = getAllPosts();
```

### `getPostBySlug(slug: string)`

Returns a specific post by its slug (filename without extension).

```typescript
import { getPostBySlug } from '@common/blog';

const post = getPostBySlug('welcome');
```

### `getAllSlugs()`

Returns all post slugs for static path generation.

```typescript
import { getAllSlugs } from '@common/blog';

const slugs = getAllSlugs();
```

## Dependencies

The Mini CMS uses the following packages:

- `react-markdown` - Markdown rendering
- `remark-gfm` - GitHub Flavored Markdown
- `remark-math` - Math syntax support
- `rehype-katex` - KaTeX rendering
- `katex` - Math typesetting library
- `gray-matter` - Frontmatter parsing

## Accessing the Blog

- Blog listing: http://localhost:10000/blog
- Individual post: http://localhost:10000/blog/[slug]

## Customization

### Component Styling

Modify `common/markdown.tsx` to customize how markdown elements render:

```typescript
export const components = {
  h1: ({ children, ...props }: any) => (
    <h1 style={{ /* your styles */ }} {...props}>
      {children}
    </h1>
  ),
  // ... other components
};
```

### Layout

Edit `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` to change the blog layout.

### Math Rendering

KaTeX styles are imported via:
```typescript
import 'katex/dist/katex.min.css';
```

## Best Practices

1. **Use descriptive slugs**: Filename becomes the URL slug
2. **Write good excerpts**: They appear in the blog listing
3. **Date format**: Use YYYY-MM-DD for consistent sorting
4. **Math escaping**: Use `\\` for backslashes in inline math
5. **Code language**: Specify language for syntax highlighting

## Examples

See the example posts in `content/blog/`:
- `welcome.md` - Introduction with various markdown features
- `big-o-notation.md` - Technical post with code examples
- `fourier-transforms.md` - Math-heavy post with equations

## Troubleshooting

### Math not rendering
- Ensure KaTeX CSS is imported
- Check dollar sign escaping in markdown
- Verify remark-math and rehype-katex are installed

### Posts not showing
- Check file is in `content/blog/`
- Ensure file has `.md` extension
- Verify frontmatter is valid YAML

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run lint`

## License

MIT License - same as the parent portfolio project.

---
title: "Welcome to the Blog"
date: "2026-02-04"
author: "Fabian"
excerpt: "An introduction to the new Mini CMS blog with markdown authoring, React components, and mathematical typesetting support."
tags: ["meta", "introduction", "markdown"]
---

# Welcome to the Blog

This is the first post in the new **Mini CMS** blog system! This blog supports pure markdown authoring with some powerful features.

## Features

### Pure Markdown Authoring

Write your posts in clean, simple markdown. The CMS automatically processes and renders them using your existing React components for a consistent look and feel.

### React Component Integration

The blog deterministically renders markdown using your portfolio's existing components:

- **Card** components for structured content
- **CodeBlock** for syntax-highlighted code
- **Text** components for typography
- **ActionListItem** for links

### Mathematical Typesetting

The blog has full KaTeX support for beautiful mathematical equations!

#### Inline Math

You can write inline equations like $E = mc^2$ or $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$ right in your text.

#### Display Math

For more complex equations, use display mode:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

Here's the quadratic formula:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

And here's Euler's identity, one of the most beautiful equations in mathematics:

$$
e^{i\pi} + 1 = 0
$$

### Code Syntax Highlighting

The blog supports syntax highlighting for multiple programming languages:

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
```

### Markdown Features

The blog supports all standard markdown features:

- **Bold text** and *italic text*
- Lists (like this one!)
- [Links](https://github.com)
- Tables
- Blockquotes
- And more!

#### Tables

| Feature | Supported |
|---------|-----------|
| Markdown | ✓ |
| Math | ✓ |
| Code Highlighting | ✓ |
| React Components | ✓ |

#### Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

---

## Getting Started

To create a new blog post:

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter with title, date, author, and excerpt
3. Write your content in markdown
4. The blog automatically picks it up!

That's it! Happy blogging!

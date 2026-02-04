---
title: "Obsidian Callouts Demo"
date: "2026-02-04"
author: "Fabian"
excerpt: "A demonstration of Obsidian-style callouts with various types and formatting options."
tags: ["demo", "markdown", "callouts"]
---

# Obsidian Callouts Demo

This post demonstrates the Obsidian-style callout syntax supported by the blog CMS.

## Basic Callouts

> [!NOTE] Important Information
> This is a note callout. It contains important information that readers should pay attention to.

> [!TIP] Pro Tip
> This is a tip callout. Use it to share helpful advice or best practices with your readers.

> [!WARNING] Be Careful
> This is a warning callout. Use it to alert readers about potential pitfalls or issues they should avoid.

> [!CAUTION] Critical Warning
> This is a caution callout for critical warnings that require immediate attention.

## Callouts with Code

> [!NOTE] Code Example
> Here's how to use callouts with code:
> 
> ```javascript
> function example() {
>   console.log("This works inside callouts!");
> }
> ```

## Callouts with Math

> [!TIP] Mathematical Formula
> You can include math in callouts too:
> 
> The quadratic formula is:
> 
> $$
> x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
> $$

## Callouts with Lists

> [!NOTE] Features
> - Support for markdown formatting
> - Code blocks with syntax highlighting
> - Mathematical equations
> - Tables and lists
> - And much more!

## Multiple Callouts

> [!TIP] First Tip
> This is the first tip in a series.

> [!TIP] Second Tip
> This is the second tip, immediately following the first one.

> [!WARNING] Watch Out
> Multiple callouts can appear one after another.

## Callout Types

The following callout types are supported (though they all render similarly, you can customize styling per type):

> [!NOTE] Note
> For general notes and information

> [!TIP] Tip
> For helpful suggestions

> [!IMPORTANT] Important
> For crucial information

> [!WARNING] Warning
> For cautionary advice

> [!CAUTION] Caution
> For critical warnings

> [!INFO] Info
> For informational content

> [!SUCCESS] Success
> For positive outcomes

> [!QUESTION] Question
> For questions or prompts

> [!FAILURE] Failure
> For errors or failures

> [!DANGER] Danger
> For dangerous situations

## Regular Blockquotes

Regular blockquotes still work as expected:

> This is a regular blockquote without the callout syntax.
> It renders in the traditional style with italic text and a border.

> Another regular blockquote.
> Multiple lines are supported.

## Nested Content in Callouts

> [!NOTE] Complex Content
> Callouts can contain complex nested content:
> 
> ### A Heading Inside
> 
> Some **bold text** and *italic text*.
> 
> 1. Ordered list item 1
> 2. Ordered list item 2
> 3. Ordered list item 3
> 
> And even tables:
> 
> | Feature | Supported |
> |---------|-----------|
> | Markdown | Yes |
> | Code | Yes |
> | Math | Yes |

---

## Conclusion

Obsidian-style callouts provide a powerful way to highlight important information, tips, and warnings in your blog posts. They're implemented using the Accordion and Card components from your component library, maintaining consistent styling throughout the site.

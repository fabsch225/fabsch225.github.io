import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  tags?: string[];
  draft?: boolean;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Helper function to normalize slug for URL
function normalizeSlug(slug: string): string {
  return slug.replace(/\s+/g, '-');
}

// Helper function to process tags
function processTags(tags: any): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) {
    return tags.map((tag) => {
      // If tag contains a slash, extract the last part (e.g., "MyBlog/Learning" -> "Learning")
      if (typeof tag === 'string' && tag.includes('/')) {
        return tag.split('/').pop() || tag;
      }
      return String(tag);
    });
  }
  if (typeof tags === 'string') {
    return [tags];
  }
  return [];
}

export function getAllPosts(): BlogPost[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const rawSlug = fileName.replace(/\.(md|mdx)$/, '');
      const slug = normalizeSlug(rawSlug);
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || rawSlug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        content,
        author: data.author,
        tags: processTags(data.tags),
        draft: data.draft || false,
      } as BlogPost;
    })
    .filter((post) => !post.draft); // Exclude draft posts

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const normalizedSlug = normalizeSlug(slug);
    
    // Try to find file with normalized slug or original filename
    const fileNames = fs.readdirSync(postsDirectory);
    let fileName: string | null = null;
    
    for (const fn of fileNames) {
      const rawSlug = fn.replace(/\.(md|mdx)$/, '');
      if (normalizeSlug(rawSlug) === normalizedSlug) {
        fileName = fn;
        break;
      }
    }
    
    if (!fileName) {
      return null;
    }
    
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const rawSlug = fileName.replace(/\.(md|mdx)$/, '');

    const post = {
      slug: normalizedSlug,
      title: data.title || rawSlug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content,
      author: data.author,
      tags: processTags(data.tags),
      draft: data.draft || false,
    };

    // Return null if post is a draft
    if (post.draft) {
      return null;
    }

    return post;
  } catch (error) {
    return null;
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const rawSlug = fileName.replace(/\.(md|mdx)$/, '');
      return normalizeSlug(rawSlug);
    });
}

export function getRandomPosts(count: number): BlogPost[] {
  const allPosts = getAllPosts();
  const shuffled = [...allPosts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export interface PostsByYear {
  [year: string]: BlogPost[];
}

export function getPostsByYear(): PostsByYear {
  const allPosts = getAllPosts();
  const postsByYear: PostsByYear = {};

  allPosts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  return postsByYear;
}

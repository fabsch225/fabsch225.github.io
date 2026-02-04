'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import CodeBlock from '@components/CodeBlock';
import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
import ActionListItem from '@components/ActionListItem';
import Divider from '@root/components/Divider';
import Table from '@components/Table';
import TableRow from '@components/TableRow';
import TableColumn from '@components/TableColumn';
import ListItem from '@components/ListItem';
import Row from '@root/components/Row';
import Accordion from '@components/Accordion';

// Helper function to process wiki-style links
function processWikiLinks(content: string): string {
  // Process image embeds: ![[image.png]] -> ![](image.png)
  content = content.replace(/!\[\[([^\]]+)\]\]/g, (match, filename) => {
    return `![](${filename})`;
  });
  
  // Process internal links: [[path|title]] or [[path]]
  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, linkContent) => {
    const parts = linkContent.split('|');
    const path = parts[0].trim();
    const title = parts[1]?.trim() || path;
    
    // Convert blog paths to URLs
    if (path.startsWith('Blog/')) {
      const slug = path.replace('Blog/', '').replace(/\s+/g, '-');
      return `[${title}](/blog/${slug})`;
    }
    
    // Default to the path with title
    return `[${title}](${path})`;
  });
  
  return content;
}

// Component mapping for markdown rendering
export const components = {
  h1: ({ children, ...props }: any) => (
    <h1 style={{ marginTop: '2ch', marginBottom: '1ch'}} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 style={{ marginTop: '2ch', marginBottom: '1ch'}} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 style={{ marginTop: '1.5ch', marginBottom: '0.5ch'}} {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <Text style={{ marginBottom: '1ch', textAlign: 'justify' }} {...props}>
      {children}
    </Text>
  ),
  code: ({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <CodeBlock style={{ marginBottom: '1ch', overflowX: 'auto', maxWidth: '100%' }}>
        {String(children).replace(/\n$/, '')}
      </CodeBlock>
    ) : (
      <code style={{ 
        background: 'var(--color-background-tertiary)', 
        padding: '0.2ch 0.5ch',
        borderRadius: '0.3ch',
        fontFamily: 'monospace'
      }} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre style={{ marginBottom: '1ch' }} {...props}>
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  ul: ({ children, ...props }: any) => (
    <ul style={{ marginBottom: '1ch' }} {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol style={{ marginBottom: '1ch' }} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <ListItem {...props}>
      {children}
    </ListItem>
  ),
  blockquote: ({ children, ...props }: any) => {
    // Check if this is an Obsidian-style callout
    // Pattern: [!TYPE] Optional Title
    const childrenArray = React.Children.toArray(children);
    const firstChild: any = childrenArray[1];
    
    // Extract text content from first paragraph
    let textContent = '';
    if (firstChild && typeof firstChild === 'object' && 'props' in firstChild) {
      const firstPara = firstChild.props?.children;
      if (typeof firstPara === 'string') {
        textContent = firstPara;
      } else if (Array.isArray(firstPara)) {
        textContent = firstPara.map((c: any) => typeof c === 'string' ? c : '').join('');
      }
    }
    console.log(textContent)
    const calloutMatch = textContent.match(/^\[!(\w+)\]\s*(.*)/);
    
    if (calloutMatch) {
      const [, type, title] = calloutMatch;
      const calloutTitle = title || type;
      
      // Get remaining content (excluding the first line)
      const remainingChildren = childrenArray;
      
      // Remove the callout syntax from first paragraph
      if (remainingChildren[1] && typeof remainingChildren[1] === 'object' && 'props' in remainingChildren[1]) {
        const firstPara: any = remainingChildren[1];
        const paraChildren = firstPara.props?.children;
        
        if (typeof paraChildren === 'string') {
          // Remove the first line (callout syntax line)
          const lines = paraChildren.split('\n');
          lines.shift(); // Remove first line with [!TYPE] Title
          const cleanedText = lines.join('\n');

            remainingChildren[1] = React.cloneElement(firstPara, {
                ...firstPara.props,
                children: cleanedText
            });
          
        }
      }
      
      return (
        <div>
          <Accordion title={calloutTitle} defaultValue={false}>
            <Card>
              {remainingChildren}
            </Card>
          </Accordion>
        </div>
      );
    }
    
    // Regular blockquote
    return (
      <blockquote style={{ 
        borderLeft: '0.3ch solid var(--color-border)',
        marginLeft: '0',
        paddingLeft: '2ch',
        marginBottom: '1ch',
        fontStyle: 'italic'
      }} {...props}>
        {children}
      </blockquote>
    );
  },
  table: ({ children, ...props }: any) => (
    <div style={{ marginBottom: '1ch', marginTop: '1ch'}}>
      <Table {...props}>
        {children}
      </Table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <>{children}</>
  ),
  tbody: ({ children, ...props }: any) => (
    <>{children}</>
  ),
  tr: ({ children, ...props }: any) => (
    <TableRow {...props}>
      {children}
    </TableRow>
  ),
  th: ({ children, ...props }: any) => (
    <TableColumn {...props}>
      {children}
      <br />
      <Divider />
    </TableColumn>
  ),
  td: ({ children, ...props }: any) => (
    <TableColumn {...props}>
      {children}
    </TableColumn>
  ),
  hr: (props: any) => (
    <Divider type="GRADIENT" style={{ margin: '2ch 0' }} {...props} />
  ),
  img: ({ src, alt, ...props }: any) => (
    <img 
      src={src} 
      alt={alt || ''} 
      style={{ 
        maxWidth: '100%', 
        height: 'auto',
        marginBottom: '1ch',
        marginTop: '1ch',
        display: 'block'
      }} 
      {...props} 
    />
  ),
};

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Preprocess wiki-style links
  const processedContent = processWikiLinks(content);
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={components}
    >
      {processedContent}
    </ReactMarkdown>
  );
}

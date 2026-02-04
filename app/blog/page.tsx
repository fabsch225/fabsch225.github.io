import '@root/global.scss';
import 'katex/dist/katex.min.css';

import { getAllPosts, BlogPost } from '@common/blog';
import ActionListItem from '@components/ActionListItem';
import Card from '@components/Card';
import Text from '@components/Text';
import DefaultLayout from '@components/page/DefaultLayout';
import Row from '@components/Row';

export const dynamic = 'force-static';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <h1 style={{ fontSize: '2em', marginBottom: '2ch' }}>
        Blog
      </h1>
      
      <Text style={{ marginBottom: '2ch', textAlign: 'justify' }}>
        Welcome to the blog. Here you'll find articles about programming, mathematics, and technology.
      </Text>

      {posts.length === 0 ? (
        <Card title="No Posts Yet">
          <Text>Check back soon for new content!</Text>
        </Card>
      ) : (
        posts.map((post: BlogPost) => (
          <div key={post.slug} style={{ marginBottom: '2ch' }}>
            <Card title={post.title}>
              <Text style={{ marginBottom: '1ch', opacity: 0.7 }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {post.author && ` • ${post.author}`}
              </Text>
              
              <Text style={{ marginBottom: '1ch', textAlign: 'justify' }}>
                {post.excerpt}
              </Text>

              {post.tags && post.tags.length > 0 && (
                <Text style={{ marginBottom: '1ch', opacity: 0.7 }}>
                  Tags: {post.tags.join(', ')}
                </Text>
              )}

              <Row>
                <ActionListItem icon={'->'} href={`/blog/${post.slug}`}>
                  Read More
                </ActionListItem>
              </Row>
            </Card>
          </div>
        ))
      )}
    </DefaultLayout>
  );
}

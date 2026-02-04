import '@root/global.scss';
import 'katex/dist/katex.min.css';
import { getPostBySlug, getAllSlugs } from '@common/blog';
import { MarkdownRenderer } from '@common/markdown';
import ActionListItem from '@components/ActionListItem';
import Card from '@components/Card';
import Text from '@components/Text';
import DefaultLayout from '@components/page/DefaultLayout';
import Row from '@components/Row';

export const dynamic = 'force-static';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <DefaultLayout previewPixelSRC="/favicon.ico">
        <Card title="Post Not Found">
          <Text>The blog post you're looking for doesn't exist.</Text>
          <Row>
            <ActionListItem icon={'<-'} href="/blog">
              Back to Blog
            </ActionListItem>
          </Row>
        </Card>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <Row style={{ marginBottom: '2ch' }}>
        <ActionListItem icon={'<-'} href="/blog">
          Back to Blog
        </ActionListItem>
      </Row>

      <h1 style={{ fontSize: '2em', marginBottom: '1ch' }}>
        {post.title}
      </h1>

      <Text style={{ marginBottom: '2ch', opacity: 0.7 }}>
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {post.author && ` • ${post.author}`}
      </Text>

      {post.tags && post.tags.length > 0 && (
        <Text style={{ marginBottom: '2ch', opacity: 0.7 }}>
          Tags: {post.tags.join(', ')}
        </Text>
      )}

      <div style={{ marginBottom: '2ch' }}>
        <MarkdownRenderer content={post.content} />
      </div>
    </DefaultLayout>
  );
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

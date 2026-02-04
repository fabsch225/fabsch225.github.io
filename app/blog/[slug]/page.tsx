import '@root/global.scss';
import 'katex/dist/katex.min.css';
import { getPostBySlug, getAllSlugs } from '@common/blog';
import { MarkdownRenderer } from '@common/markdown';
import ActionListItem from '@components/ActionListItem';
import Card from '@components/Card';
import Text from '@components/Text';
import DefaultLayout from '@components/page/DefaultLayout';
import Row from '@components/Row';
import BreadCrumbs from '@components/BreadCrumbs';
import Badge from '@components/Badge';

export const dynamic = 'force-static';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <DefaultLayout previewPixelSRC="/favicon.ico">
        <BreadCrumbs items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: 'Not Found' }
        ]} />
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
      <BreadCrumbs items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title }
      ]} />

      <h1 style={{ fontSize: '2em', marginBottom: '1ch', marginTop: '2ch' }}>
        {post.title}
      </h1>

      <Text style={{ marginBottom: '1ch', opacity: 0.7 }}>
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {post.author && ` • ${post.author}`}
      </Text>

      {post.tags && post.tags.length > 0 && (
        <div style={{ marginBottom: '2ch', display: 'flex', gap: '0.5ch', flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
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

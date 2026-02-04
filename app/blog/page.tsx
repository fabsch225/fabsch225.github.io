import '@root/global.scss';
import 'katex/dist/katex.min.css';

import { getAllPosts, getRandomPosts, getPostsByYear, BlogPost } from '@common/blog';
import ActionListItem from '@components/ActionListItem';
import Card from '@components/Card';
import Text from '@components/Text';
import DefaultLayout from '@components/page/DefaultLayout';
import Row from '@components/Row';
import BreadCrumbs from '@components/BreadCrumbs';
import Badge from '@components/Badge';
import Accordion from '@components/Accordion';

export const dynamic = 'force-static';

export default function BlogPage() {
  const randomPosts = getRandomPosts(2);
  const postsByYear = getPostsByYear();
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <BreadCrumbs items={[
        { name: 'Home', url: '/' },
        { name: 'Blog' }
      ]} />
      
      <h1 style={{ fontSize: '2em', marginBottom: '2ch', marginTop: '2ch' }}>
        Blog
      </h1>
      
      <Text style={{ marginBottom: '2ch', textAlign: 'justify' }}>
        Welcome to the blog. Here you'll find articles about programming, mathematics, and technology.
      </Text>

      {randomPosts.length === 0 ? (
        <Card title="No Posts Yet">
          <Text>Check back soon for new content!</Text>
        </Card>
      ) : (
        <>
          <h2 style={{ fontSize: '1.5em', marginBottom: '1ch', marginTop: '2ch' }}>
            Featured Posts
          </h2>
          
          {randomPosts.map((post: BlogPost) => (
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
                  <div style={{ marginBottom: '1ch', display: 'flex', gap: '0.5ch', flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                )}

                <Row>
                  <ActionListItem icon={'->'} href={`/blog/${post.slug}`}>
                    Read More
                  </ActionListItem>
                </Row>
              </Card>
            </div>
          ))}

          <h2 style={{ fontSize: '1.5em', marginBottom: '1ch', marginTop: '3ch' }}>
            Archive
          </h2>

          {years.map((year) => (
            <Accordion key={year} title={`${year} (${postsByYear[year].length} posts)`} defaultValue={false}>
              <div style={{ paddingLeft: '2ch' }}>
                {postsByYear[year].map((post: BlogPost) => (
                  <Row key={post.slug} style={{ marginBottom: '0.5ch' }}>
                    <ActionListItem icon={'->'} href={`/blog/${post.slug}`}>
                      {post.title} • {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </ActionListItem>
                  </Row>
                ))}
              </div>
            </Accordion>
          ))}
        </>
      )}
    </DefaultLayout>
  );
}

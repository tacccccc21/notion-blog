import SinglePost from '@/components/Post/SinglePost';
import Tag from '@/components/Tag/Tag';
import { getAllPosts, getAllTags, getPagePostsForTopPage } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const getStaticProps: GetStaticProps = async () =>{
  const fourPosts = await getPagePostsForTopPage(4);
  const allTags = await getAllTags();

  return{
    props:{
      fourPosts,
      allTags,
    },
    revalidate: 60,
  }
}

export default function Home({ fourPosts ,allTags}: any) {

  return (
    <div className='container h-full w-full mx-auto font-mono'>


    <main className='container w-full mt-16'>
      <h1 className='text-5xl font-medium text-center mb-16'>Notion Blog</h1>
      
        {fourPosts.map((post: any) =>
        <div className='mx-4' key={post.id}>
        <SinglePost 
        title = {post.title}
        description = {post.description}
        date = {post.date}
        tags = { post.tags }
        slug = {post.slug}
        isPagenationPage={false}
        ></SinglePost>
              </div>
        )}

      <Link href="/posts/page/1" className='mb-6 lg:w-1/2 mx-auto rounded-sm px-5 block text-right'>...もっと見る</Link>
      <Tag tags={allTags}></Tag>
    </main>
    </div>
  )
}

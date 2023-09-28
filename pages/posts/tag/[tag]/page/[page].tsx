import Pagenation from '@/components/Pagenation/Pagenation';
import SinglePost from '@/components/Post/SinglePost';
import { getAllPosts, getAllTags, getNumberOfPages, getNumberOfPagesByTag, getPagePostsForTopPage, getPostsByPage, getPostsByTagAndPage } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next';
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const getStaticPaths: GetStaticPaths = async () => {
const allTags = await getAllTags();
let params: any= [];

await Promise.all(
    allTags.map((tag: string) => {
      return getNumberOfPagesByTag(tag).then((numberOfPagesByTag: number)=>{
        for(let i = 1; i <= numberOfPagesByTag; i++){
          params.push({params:{tag: tag,page: i.toString()}})
        }
      })}
    )
);

  return {
    paths: params,
    fallback: true,
  }
 }

export const getStaticProps: GetStaticProps = async (context) =>{
  const currentPage: any = context.params?.page;
  const currentTag: any = context.params?.tag;

  const upperCaseCurrentTag = currentTag.charAt(0).toUpperCase() + currentTag.slice(1)

  const posts = await getPostsByTagAndPage(upperCaseCurrentTag ,parseInt(currentPage, 10));

  const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);

  return{
    props:{
      posts,
      numberOfPagesByTag,
      currentTag,
    },
    revalidate: 60,
  }
}

const BlogTagPageList = ({ numberOfPagesByTag, posts, currentTag}) => {
  return (
    <div className='container h-full w-full mx-auto font-mono'>


    <main className='container w-full mt-16'>
      <h1 className='text-5xl font-medium text-center mb-16'>Notion Blog🚀</h1>
      <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
      {posts.map((post: any) =>
        <div className='' key={post.title}>
          <SinglePost 
          title = {post.title}
          description = {post.description}
          date = {post.date}
          tags = { post.tags }
          slug = {post.slug}
          isPagenationPage={true}
          ></SinglePost>
        </div>
      )}

      </section>
      <Pagenation numberOfPage={numberOfPagesByTag} tag={currentTag}/>
    </main>
    </div>
  )
}

export default BlogTagPageList;
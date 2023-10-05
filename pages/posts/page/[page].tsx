import Pagenation from '@/components/Pagenation/Pagenation';
import SinglePost from '@/components/Post/SinglePost';
import Tag from '@/components/Tag/Tag';
import { getAllPosts, getAllTags, getNumberOfPages, getPagePostsForTopPage, getPostsByPage } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next';
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  let params:any[] = [];
  for(let i:number = 1; i <= numberOfPage; i++){
    params.push({params:{ page: i.toString()}})
  }
  return {
    paths: params,
    // paths : Array<string | { params: { [key: string]: string } }>,
    fallback: "blocking",
    // allTags,
  }
}

export const getStaticProps: GetStaticProps = async (context) =>{
  
  const currentPage = context.params?.page;
  const postsByPage = await getPostsByPage(parseInt(currentPage?.toString() || "",10));

  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  return{
    props:{
      postsByPage,
      numberOfPage,
      allTags
    },
    revalidate: 60,
  }
}

const BlogPageList = ({ postsByPage, numberOfPage ,allTags}: any) => {
  return (
    <div className='container h-full w-full mx-auto font-mono'>
    <main className='container w-full mt-16'>
      <h1 className='text-5xl font-medium text-center mb-16'>Notion Next Blog</h1>
      <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
      {postsByPage.map((post: any) =>
        <div className='' key={post.id}>
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
      <Pagenation numberOfPage={Number(numberOfPage)} tag={""}></ Pagenation>
      <Tag tags={allTags}></Tag>
    </main>
    </div>
  )
}

export default BlogPageList;
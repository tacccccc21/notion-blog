import Link from 'next/link';
import React from 'react'

type Props ={
  title: string,
  description: string,
  date: string,
  tags: string[],
  slug: string,
  isPagenationPage: boolean,
}

const SinglePost = (props: Props) => {
  const {title,description,date,tags,slug,isPagenationPage} = props;
  
    return (
    <Link href={`/posts/${slug}`}>
      {isPagenationPage ? (
      <section className='bg-sky-100 mb-8 mx-auto rounded-md p-5 cursor-pointer transition-all hover:bg-sky-200 duration-200'>
        <div className='lg:flex items-center gap-3 md:block '>
          <h2 className='text-gray-600 text-2xl mb-2'>{title}</h2>
          <div className='text-gray-600 mb-2'>{date}</div>
          {/* {tags.map((tag: string, index: number) => 
          <Link href={`/posts/tag/${tag}/page/1`}>
            <span className='text-gray-600 bg-gray-300 p-1 rounded-sm mr-3' key={index}>{tag}</span>
          </Link>
          )} */}
        </div>
        <p className='text-gray-600'>
          {description}
        </p>
      </section>
      ):(
      <section className='lg:w-1/2 bg-sky-100 mb-8 mx-auto rounded-md p-5 cursor-pointer transition-all hover:bg-sky-200 duration-200'>
        <div className='lg:flex items-center gap-3 md:block '>
          <h2 className='text-gray-600 text-2xl mb-2'>{title}</h2>
          <div className='text-gray-600'>{date}</div>
          {/* {tags.map((tag:string, index: number) => 
          <Link href={`/posts/tag/${tag}/page/1`}>
            <span className='text-gray-600 bg-gray-300 p-1 rounded-sm mr-1' key={index}>{tag}</span>
          </Link>
          )} */}
        </div>
        <p className='text-gray-600'>
          {description}

        </p>
      </section>
      )}

    </Link>
  )
}

export default SinglePost
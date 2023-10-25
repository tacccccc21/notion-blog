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
      <section className='px-5 bg-sky-100 mb-8 mx-auto rounded-md p-5 min-h-screen cursor-pointer transition-all hover:bg-sky-200 duration-200'>
        <div className='lg:flex items-center gap-3 md:block '>
          <h2 className='text-gray-600 text-2xl mb-2'>{title}</h2>
          <div className='text-gray-600 mb-2'>{date}</div>
        </div>
        <p className='text-gray-600'>
          {description}
        </p>
      </section>
      ):(
      <section className='px-5 lg:w-1/2 bg-sky-100 mb-8 mx-auto rounded-md p-5 cursor-pointer transition-all hover:bg-sky-200 duration-200'>
        <div className='lg:flex items-center gap-3 md:block '>
          <h2 className='text-gray-600 text-2xl mb-2'>{title}</h2>
          <div className='text-gray-600'>{date}</div>
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
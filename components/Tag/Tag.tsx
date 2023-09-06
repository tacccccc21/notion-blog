import Link from 'next/link'
import React from 'react'

type Props ={
  tags: string[],
}

const Tag = (props: Props) => {
  const {tags} = props
  return (
    <div className='mx-4'>
      <section className='lg:w-1/2 mb-8 mx-auto rounded-sm bg-slate-200 p-5'>
        <div className='font-medium mb-4'>tag検索</div>
        <div className='flex flex-wrap gap-5'>
          {tags.map((tag: string, index:number) => 
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span className='cursol-pointer px-2 font-medium bg-slate-100 rounded-sm inline-block'>
                {tag}
              </span>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Tag
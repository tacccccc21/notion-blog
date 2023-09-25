import { getPageLink } from '@/lib/blog_helper';
import Link from 'next/link'
import React from 'react'

interface Props {
  numberOfPage: number;
  tag: string;
}

const Pagenation = (props: Props) => {

  const {numberOfPage, tag} = props;

  let pages: any[] = [];
  for(let i = 1; i <= numberOfPage; i++){
    pages.push(i)
  }

  return (
    
    <section className='mb-8 lg:w-1/2 mx-auto rounded-sm p-5'>
      <ul className='flex items-center justify-center gap-4'>
        {pages.map((page) =>(
        <li className='bg-sky-100 rounded-lg w-6 h-6 relative' key={page}>
          <Link href={getPageLink(tag, page)} className='text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-400'>{page}</Link>
        </li>
        ))}
      </ul>
    </section>
  )
}

export default Pagenation
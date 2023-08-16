import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import customFetch from '../axiosInstance'

export default function PostDetail() {
  //parametrik verileri string olrak almak için useParams hookunu kullanıyoruz
  const { id } = useParams()

  const {data:post, isLoading, error, isFetching} = useQuery({
    queryKey:["oneBlog", id],
    queryFn: async () => {
      const response = await customFetch.get(`/${id}`)
      return response.data;
    }
  })

  return (
    <div className='mt-12'>
      {isFetching && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {post && (
        <div className='col-center gap-5'>
          <div className='center gap-3'>
            <Link to={`/newpost?mode=edit&id=${id}`} className="py-2 px-4 bg-blue-500 hover:bg-blue-400 rounded text-white">Edit</Link>
          </div>
          <img src={post.imageUrl}  className='w-60'/>
          <h1 className='text-2xl'>{post.title}</h1>
          <h5 className='text-lg'>{post.category}</h5>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  )
}

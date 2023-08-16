import React, { useEffect } from 'react'
import { useQueryParams } from './useQueryParams'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import customFetch from '../axiosInstance'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function NewPost() {
  const {id, mode} = useQueryParams()
  const [blogData, setBlogData] = React.useState({
    id: '',
    title: '',
    content: '',
    category: 'HTML',
  })
  const queryClient = useQueryClient();

  const {data, isFetching, error} = useQuery({
    queryKey: ["blog",id],
    queryFn: async () => {
      const response = await customFetch.get(`/${id}`)
      return response.data
    },
    enabled: mode === 'edit'
  })

  const {mutate:submitBlog, isLoading} = useMutation({
    mutationFn: async ({method,body}) => {
        //sadece 1 parametre yollayabilirsin, obje olarak yolla
      const response= await axios({
        method: method,
        url: `http://localhost:3000/blogs${mode === 'edit' ? `/${id}` : ''}`,
        data: body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data
    },
    onSuccess: (data) => {
      toast.success('Success')
      //tekrardan veri çekimi yapmak
      queryClient.invalidateQueries({queryKey: ["blog"]})
      //sonuç
      if(mode === 'edit') return;
      setBlogData({
        id: '',
        title: '',
        content: '',
        category: 'HTML',
        })

    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error)
    }
  })

  useEffect(() => {
    if (data && mode === 'edit') {
      console.log(data)
      setBlogData(data)

    }
  }, [data])

  const onSubmitHandler =  (e) => {
    e.preventDefault();
    const method = mode === 'edit' ? 'put' : 'post';

    submitBlog({method, body: blogData})
  }

  return (
    <div>
      <b className='text-2xl'>
        {mode === 'edit' ? 'Edit' : 'New'} Post
      </b>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4 p-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="id"
            type="text"
            placeholder="ID"
            value={blogData.id}
            onChange={(e) => setBlogData({...blogData, id: +e.target.value})}
            disabled={mode === 'edit'}
          />
        </div>
        <div className="mb-4 p-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="title"
            type="text"
            placeholder="Title"
            value={blogData.title}
            onChange={(e) => setBlogData({...blogData, title: e.target.value})}
          />
        </div>
        <div className="mb-4 p-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="content"
            type="text"
            placeholder="Content"
            value={blogData.content}
            onChange={(e) => setBlogData({...blogData, content: e.target.value})}
          />
        </div>
        <div className="mb-4 p-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="shadow border rounded  py-2 px-3 text-gray-700 leading-tight bg-white"
            id="category"
            value={blogData.category}
            onChange={(e) => setBlogData({...blogData, category: e.target.value})}

          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Javascript">Javascript</option>
            <option value="React">"React"</option>
          </select>
        </div>

        <div className="flex items-center justify-center p-3">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-1/6"
            type="submit"
            disabled={isFetching || isLoading}
          >
            {mode === 'edit' ? 'Edit' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

import React from 'react'
import { useState } from 'react'

const Github = () => {
  const [data, setData] = useState(null)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUser = () => {
    if (!username) return
    setLoading(true)
    setError('')
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Not Found') {
          setError('User not found!')
          setData(null)
        } else {
          setData(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Something went wrong!')
        setLoading(false)
      })
  }

  return (
    <div className='text-center m-4 text-white p-4'>
      <h1 className='text-3xl mb-4'>GitHub User Search</h1>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Enter GitHub username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchUser()}
          className='p-2 rounded text-black w-64'
        />
        <button
          onClick={fetchUser}
          className='ml-2 p-2 bg-blue-600 rounded text-white'
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {data && (
        <div className='bg-gray-600 p-4 rounded inline-block'>
          <img src={data.avatar_url} alt="Git picture" width={150} className='rounded-full mx-auto' />
          <p className='text-xl mt-2'>{data.name || data.login}</p>
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>
          <p>Public Repos: {data.public_repos}</p>
        </div>
      )}
    </div>
  )
}

export default Github
import { useState } from 'react'

interface YouTubeModalProps {
  onSubmit: (videoId: string) => void
  onClose: () => void
}

export function YouTubeModal({ onSubmit, onClose }: YouTubeModalProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const handleSubmit = () => {
    const videoId = extractVideoId(url)
    if (videoId) {
      onSubmit(videoId)
      onClose()
    } else {
      setError('Please enter a valid YouTube URL')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label 
          htmlFor="youtube-url" 
          className="block text-sm font-medium"
        >
          YouTube URL
        </label>
        <input
          id="youtube-url"
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
            setError('')
          }}
          placeholder="https://www.youtube.com/watch?v=..."
          className={`
            w-full px-3 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-gray-700 dark:border-gray-600
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button 
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Insert
        </button>
      </div>
    </div>
  )
}
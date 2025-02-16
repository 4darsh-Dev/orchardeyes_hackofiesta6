import React, { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { getImagePrediction } from '../api'

const ImageUpload = ({ onImageUpload, maxSizeMB = 5 }) => {
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const [file, setFile] = useState(null)
  const handleFile = (file) => {
    setError('')

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
      onImageUpload?.(file)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
      setFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFile(file)
      setFile(file)
      console.log(file, 'file')
    }
  }

  const removeImage = () => {
    setPreview(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onImageUpload?.(null)
  }
  const handleUpload = async () => {
    try {
      console.log('Uploading image')
      const formData = new FormData()
      if(file){
        formData.append('file', file)
        console.log(formData, 'formData')
        const prediction = await getImagePrediction(formData)
        console.log(prediction, 'prediction')
      }else{
        console.log('No file uploaded')
      }
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }
  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-500 bg-red-50' : ''} h-[60vh] flex items-center justify-center
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <div className='relative flex items-center flex-col gap-4 '>
            <img
              src={preview}
              alt='Preview'
              className='w-full h-48 object-contain rounded-lg'
            />
            <button
              onClick={removeImage}
              className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
            >
              <X className='w-4 h-4' />
            </button>
            <button
              className='bg-pink-300 p-2 rounded-lg text-pink-900 font-bold'
              onClick={handleUpload}
            >
              Get Prediction
            </button>
          </div>
        ) : (
          <div className='text-center'>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleChange}
              className='hidden'
            />
            <div className='flex flex-col items-center gap-2'>
              <div className='p-3 bg-gray-100 rounded-full'>
                {error ? (
                  <X className='w-6 h-6 text-red-500' />
                ) : (
                  <ImageIcon className='w-6 h-6 text-gray-400' />
                )}
              </div>
              <div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='text-blue-500 hover:text-blue-600 font-medium'
                >
                  Click to upload
                </button>
                <span className='text-gray-500'> or drag and drop</span>
              </div>
              <p className='text-sm text-gray-500'>
                PNG, JPG, GIF up to {maxSizeMB}MB
              </p>
              {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUpload

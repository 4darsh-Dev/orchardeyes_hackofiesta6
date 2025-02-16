import React, { useState, useEffect } from 'react'
import {
  Camera,
  TreePine,
  Leaf,
  Droplet,
  ScanEye,
  CalendarCheck,
  Download,
  Check,
  X
} from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

const ProfilePage = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Profile State
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    contactNumber: '123-456-7890',
    email: 'john.doe@example.com',
    farmLocation: '123 Orchard Lane, Apple City',
    orchardName: "John's Organic Orchard",
    totalArea: 10,
    numberOfTrees: 500,
    treeAgeRange: 'Mature',
    orchardType: 'Organic',
    soilType: 'Loamy',
    irrigationSystem: 'Drip',
    lastDroneScanDate: '2023-10-01',
    identifiedIssues: 'None',
    yieldEstimation: '5000 kg',
    ndviHealthIndex: 0.85,
    pestDiseaseHeatmapLink: '/heatmap',
    subscriptionPlan: 'Pro',
    lastPaymentDate: '2023-09-15',
    nextScheduledScan: '2023-11-01 10:00 AM'
  })

  // Form State
  const [formData, setFormData] = useState(profile)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    // Set default profile image
    setImagePreview('/api/placeholder/120/120')
  }, [])

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }

      setImageFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate form data
      if (!formData.fullName.trim()) {
        throw new Error('Full name is required')
      }
      if (!formData.email.trim()) {
        throw new Error('Email is required')
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update profile
      setProfile(formData)
      setSuccess(true)
      setIsEditing(false)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      {/* Profile Header */}
      <div className='relative mb-8'>
        <div className='h-40 bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg' />

        {/* Profile Image */}
        <div className='absolute -bottom-16 left-6'>
          <div className='relative'>
            <img
              src='https://www.shutterstock.com/image-photo/close-pensive-male-bearded-farmer-260nw-302296364.jpg'
              alt='Profile'
              className='w-32 h-32 rounded-full border-4 border-white object-cover'
            />

            {isEditing && (
              <label className='absolute bottom-0 right-0 p-2 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition-colors'>
                <Camera size={16} className='text-white' />
                <input
                  type='file'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>
        {/* Regular Profile View */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>{profile.fullName}</h1>
          <p className='text-gray-600 mt-2'>{profile.orchardName}</p>
        </div>
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className='absolute top-6 right-6 p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors'
        >
          {isEditing ? <X size={16} /> : <Camera size={16} />}
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className='mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center'>
          <Check className='inline-block mr-2' />
          Profile updated successfully!
        </div>
      )}

      {/* Profile Stats */}
      <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* <span>{formData.fullName}</span> */}
        <div className='p-6 bg-green-50 rounded-lg text-center'>
          <TreePine className='mx-auto text-green-600' size={32} />
          <p className='text-2xl font-bold mt-2'>{profile.numberOfTrees}</p>
          <p className='text-gray-600'>Apple Trees</p>
        </div>
        <div className='p-6 bg-yellow-50 rounded-lg text-center'>
          <Leaf className='mx-auto text-yellow-600' size={32} />
          <p className='text-2xl font-bold mt-2'>{profile.yieldEstimation}</p>
          <p className='text-gray-600'>Yield Estimation</p>
        </div>
        <div className='p-6 bg-blue-50 rounded-lg text-center'>
          <Droplet className='mx-auto text-blue-600' size={32} />
          <p className='text-2xl font-bold mt-2'>{profile.irrigationSystem}</p>
          <p className='text-gray-600'>Irrigation System</p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className='mt-8'>
        <div className='space-y-6'>
          {isEditing ? (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  className='mt-1 w-full rounded-md border border-gray-300 p-2'
                  maxLength={50}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Contact Number
                </label>
                <input
                  type='text'
                  name='contactNumber'
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className='mt-1 w-full rounded-md border border-gray-300 p-2'
                  maxLength={15}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 w-full rounded-md border border-gray-300 p-2'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Farm Location
                </label>
                <input
                  type='text'
                  name='farmLocation'
                  value={formData.farmLocation}
                  onChange={handleChange}
                  className='mt-1 w-full rounded-md border border-gray-300 p-2'
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400'
              >
                {loading ? (
                  <Loader2 className='animate-spin mx-auto' />
                ) : (
                  'Save Changes'
                )}
              </button>
            </>
          ) : (
            <>
              {/* Orchard Details */}
              <div className='mt-8'>
                <h2 className='text-xl font-semibold mb-4'>Orchard Details</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='p-6 bg-gray-50 rounded-lg'>
                    <p className='text-gray-700'>
                      Total Area: {profile.totalArea} acres
                    </p>
                  </div>
                  <div className='p-6 bg-gray-50 rounded-lg'>
                    <p className='text-gray-700'>
                      Tree Age Range: {profile.treeAgeRange}
                    </p>
                  </div>
                  <div className='p-6 bg-gray-50 rounded-lg'>
                    <p className='text-gray-700'>
                      Orchard Type: {profile.orchardType}
                    </p>
                  </div>
                  <div className='p-6 bg-gray-50 rounded-lg'>
                    <p className='text-gray-700'>
                      Soil Type: {profile.soilType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Monitoring & Insights */}
              <div className='mt-8'>
                <h2 className='text-xl font-semibold mb-4'>
                  Monitoring & Insights
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='p-6 bg-gray-50 rounded-lg'>
                    <p className='text-gray-700'>
                      Last Drone Scan: {profile.lastDroneScanDate}
                    </p>
                  </div>
                  <div className='p-6 bg-gray-50 rounded-lg'>
                    <p className='text-gray-700'>
                      NDVI Health Index: {profile.ndviHealthIndex}
                    </p>
                  </div>
                  <div className='p-6 bg-gray-50 rounded-lg'>
                    <a
                      href={profile.pestDiseaseHeatmapLink}
                      className='text-blue-500 hover:underline'
                    >
                      View Heatmap
                    </a>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className='mt-8'>
                <h2 className='text-xl font-semibold mb-4'>
                  Subscription Details
                </h2>
                <div className='p-6 bg-gray-50 rounded-lg'>
                  <p className='text-gray-700'>
                    Plan: {profile.subscriptionPlan}
                  </p>
                  <p className='text-gray-700'>
                    Last Payment: {profile.lastPaymentDate}
                  </p>
                  <p className='text-gray-700'>
                    Next Scan: {profile.nextScheduledScan}
                  </p>
                  <button className='mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'>
                    Download Reports
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProfilePage

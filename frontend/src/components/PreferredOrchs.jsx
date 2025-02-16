import React from 'react'
import OrchardSection from './OrchardSection'
import DroneInfoSection from './DroneInfoSection'

const PreferedOrchs = () => {
  const orchards = [
    {
      name: 'Singh Apple Orchard',
      location: 'Batesri, Himachal Pradesh',
      image:
        'https://media.istockphoto.com/id/658414030/photo/apple-orchard.jpg?s=612x612&w=0&k=20&c=4gaKJ7T0fVt_sfXpyX7F1EVc3lZc4wOlq3tLi9eacRM='
    },
    {
      name: 'Singh Apple Orchard',
      location: 'Batesri, Himachal Pradesh',
      image:
        'https://t4.ftcdn.net/jpg/01/39/66/05/360_F_139660577_2M4SpMagf4nDHIKk2AEpkDtQ4NDKjZkc.jpg'
    },
    {
      name: 'Singh Apple Orchard',
      location: 'Batesri, Himachal Pradesh',
      image:
        'https://media.istockphoto.com/id/1488664923/photo/looking-down-rows-of-apple-trees-in-orchard-farm-jpg.jpg?s=1024x1024&w=is&k=20&c=MRXNWYIaYKOI22f9q1ihn46Ja2rIg1YqhACgkab-TkI='
    },
    {
      name: 'Singh Apple Orchard',
      location: 'Batesri, Himachal Pradesh',
      image:
        'https://media.istockphoto.com/id/1488664923/photo/looking-down-rows-of-apple-trees-in-orchard-farm-jpg.jpg?s=1024x1024&w=is&k=20&c=MRXNWYIaYKOI22f9q1ihn46Ja2rIg1YqhACgkab-TkI='
    }
    // Add more orchards as needed
  ]

  return (
    <div>
      <OrchardSection orchards={orchards} />
      <DroneInfoSection />
    </div>
  )
}

export default PreferedOrchs

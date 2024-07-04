import { useState, useEffect } from 'react'

type Subscription = {
  id: string
  name: string
  category: string
}

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  useEffect(() => {
    // Fetch subscriptions
    // This is a placeholder, replace with actual API call
    const dummySubscriptions: Subscription[] = [
      { id: '1', name: 'Ministry of Education', category: 'Government' },
      { id: '2', name: 'Dhaka University', category: 'Education' },
      { id: '3', name: 'Supreme Court of Bangladesh', category: 'Legal' },
      // Add more dummy subscriptions...
    ]
    setSubscriptions(dummySubscriptions)
  }, [])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <ul className="divide-y divide-gray-200">
        {subscriptions.map(sub => (
          <li key={sub.id} className="py-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{sub.name}</h3>
              <p className="text-sm text-gray-500">{sub.category}</p>
            </div>
            <button className="text-red-600 hover:text-red-800">
              Unsubscribe
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
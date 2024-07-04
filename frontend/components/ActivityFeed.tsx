import { useState, useEffect } from 'react'

type Activity = {
  id: string
  type: 'like' | 'comment' | 'share'
  content: string
  date: string
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Fetch recent activities
    // This is a placeholder, replace with actual API call
    const dummyActivities: Activity[] = [
      { id: '1', type: 'like', content: 'Liked a post from Ministry of Education', date: '2024-07-03' },
      { id: '2', type: 'comment', content: 'Commented on Dhaka University admission notice', date: '2024-07-02' },
      { id: '3', type: 'share', content: 'Shared a post about new job openings', date: '2024-07-01' },
      // Add more dummy activities...
    ]
    setActivities(dummyActivities)
  }, [])

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'like':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        )
      case 'comment':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        )
      case 'share':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        )
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <ul className="divide-y divide-gray-200">
        {activities.map(activity => (
          <li key={activity.id} className="py-4 flex items-start">
            <div className="mr-4">
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.content}</p>
              <p className="text-sm text-gray-500">{activity.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
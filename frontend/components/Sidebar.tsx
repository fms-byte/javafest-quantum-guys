import Link from 'next/link'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <div className={`lg:block ${open ? 'block' : 'hidden'} lg:w-1/4`}>
      <div className="bg-white p-4 rounded-lg shadow">
        <button title='close' onClick={onClose} className="lg:hidden float-right">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <nav>
          <ul className="space-y-2">
            <li><Link href="/subscriptions" className="text-indigo-600 hover:underline">My Subscriptions</Link></li>
            <li><Link href="/topics" className="text-indigo-600 hover:underline">Explore Topics</Link></li>
            <li><Link href="/websites" className="text-indigo-600 hover:underline">Website Directory</Link></li>
            <li><Link href="/reports" className="text-indigo-600 hover:underline">AI Reports</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
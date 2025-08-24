import { useHiring } from '../contexts/HiringContext'
import { useState } from 'react'

const TeamMemberCard = ({ member }) => {
  const { handleSelectCandidate } = useHiring()
  const [copiedField, setCopiedField] = useState(null)

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 1500)
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-l-4 border-green-500 relative">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">{member.name}</h4>
          <p className="text-gray-600 text-sm">{member.currentRole}</p>
          <p className="text-gray-500 text-xs">{member.location} • {member.category}</p>

          {/* Email */}
          <div className="relative">
            <span className="text-gray-600 text-sm">Email: </span>
            <span
              onClick={() => handleCopy(member.email, 'email')}
              className="underline cursor-pointer text-gray-800 text-sm"
            >
              {member.email}
            </span>
            {copiedField === 'email' && (
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-100 transition-opacity">
                Copied!
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <span className="text-gray-600 text-sm">Phone: </span>
            <span
              onClick={() => handleCopy(member.phone, 'phone')}
              className="underline cursor-pointer text-gray-800 text-sm"
            >
              {member.phone}
            </span>
            {copiedField === 'phone' && (
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-100 transition-opacity">
                Copied!
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => handleSelectCandidate(member.id)}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default TeamMemberCard

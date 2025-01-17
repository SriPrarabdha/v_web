import React from 'react'
import { Music, Calendar, Clock, Globe, Mic } from 'lucide-react'

export const CustomizationForm: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 item-center">
      <h2 className="text-3xl font-bold item-center text-gray-800 mb-6">Customize Your Song</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            placeholder="Enter your contact number"
            required
          />
        </div>
        
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Music className="h-4 w-4 mr-1" /> Choose Mood
          </label>
          <select
            id="mood"
            name="mood"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select a mood</option>
            <option value="romantic">Romantic</option>
            <option value="joyful">Joyful</option>
            <option value="emotional">Emotional</option>
            <option value="other">other</option>
          </select>
        </div>

        <div>
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Select Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select an occasion</option>
            <option value="valentine">Valentine</option>
            <option value="proposal">Proposal</option>
            <option value="anniversary">Anniversary</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            
          </select>
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Clock className="h-4 w-4 mr-1" /> Length of the Song
          </label>
          <select
            id="length"
            name="length"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select song length</option>
            <option value="2">1-2 minutes</option>
            <option value="5">2-3 minutes</option>
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Globe className="h-4 w-4 mr-1" /> Language of the Song
          </label>
          <select
            id="language"
            name="language"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>

        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Mic className="h-4 w-4 mr-1" /> Preferred Artist
          </label>
          <select
            id="artist"
            name="artist"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select preferred artist</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Mention who is the song to and who is the song from
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            placeholder="This song is for my wife Neha!!"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#F94D8F] text-white px-6 py-3 rounded-full hover:bg-[#E43D7F] transition-colors text-lg font-semibold"
        >
          Continue with Payment
        </button>
      </form>
    </div>
  )
}


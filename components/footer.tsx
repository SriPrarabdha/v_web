import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 lg:gap-40">
          {/* Information Column */}
          <div>
            <h3 className="font-semibold text-2xl mb-6">INFORMATION</h3>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-gray-300 text-gray-300">About Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-gray-300 text-gray-300">Privacy Policy</a></li>
              <li><a href="/delivery" className="hover:text-gray-300 text-gray-300">Orders & Delivery</a></li>
              <li><a href="/terms-condition" className="hover:text-gray-300 text-gray-300">Terms & Condition</a></li>
              <li><a href="/faq" className="hover:text-gray-300 text-gray-300">Miscellaneous FAQs</a></li>
            </ul>
          </div>

          {/* About Company Column */}
          <div>
            <h3 className="font-semibold text-2xl mb-6">ABOUT US</h3>
            <div className="space-y-4 text-gray-300">
              <p className="max-w-sm">
                Melodious Memories tech team proudly presents A Custom Song, 
                an innovative project designed to create meaningful musical 
                experiences for our community.
              </p>
              <p className="max-w-sm">
                Our mission is to transform your special moments into 
                timeless melodies, creating personalized musical gifts 
                that touch hearts and create lasting memories.
              </p>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-2xl mb-6">CONTACT US</h3>
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-gray-300">Dedicated Help Center</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Call Us:</span>
                  <a href="tel:+918955817991" className="hover:text-white">+91-8955817991</a>
                </p>
                <p>(9:00 AM - 9:00 PM)</p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <a href="mailto:help@myMelodiousMemories.in" className="hover:text-white">
                    help@myMelodiousMemories.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
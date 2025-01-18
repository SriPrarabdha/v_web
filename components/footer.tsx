import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Information Column - Left Side */}
          <div className="md:pl-8 lg:pl-16">
            <h3 className="font-semibold text-lg mb-4">INFORMATION</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
              <li><a href="" className="hover:text-gray-300">About Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="/delivery" className="hover:text-gray-300">Orders & Delivery</a></li>
              <li><a href="/terms-condition" className="hover:text-gray-300">Refund & Return</a></li>
              <li><a href="/faq" className="hover:text-gray-300">Miscellaneous Faqs</a></li>
              <li><a href="/faq" className="hover:text-gray-300">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Column - Right Side */}
          <div className="mt-8 md:mt-0 md:pr-8 lg:pr-16">
            <h3 className="font-semibold text-lg mb-4">CONTACT US</h3>
            <div className="space-y-4">
              <h4 className="font-medium">Dedicated Help Center</h4>
              <p>Call Us: +91-8955817991</p>
              <p>(9:00AM - 9:00PM)</p>
              <p>Email Us at: help@myMelodiousMemories.in</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
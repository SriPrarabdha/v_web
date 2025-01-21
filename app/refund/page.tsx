"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PromoBanner } from "@/components/promo-banner"
import { SiteHeader } from "@/components/site-header"

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full py-4 px-6 text-left flex justify-between items-center hover:bg-gray-50"
      onClick={toggleOpen}
    >
      <span className="text-lg font-medium text-gray-900">{question}</span>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>
    {isOpen && (
      <div className="px-6 pb-4">
        <p className="text-gray-600">{answer}</p>
      </div>
    )}
  </div>
);

const FAQPage = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "When and how can I cancel an order?",
      answer: "You can cancel your order within 24 hours of placing it by calling our customer services at +1 (555) 123-4567 (Mon-Sat, 9am-6pm) or emailing us at support@example.com. Orders cannot be cancelled after 24 hours or if they've been shipped. Upon cancellation, you can choose between 100% store credit or a refund (2% processing fee applies). Refunds typically process in 3-4 business days."
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for most items in their original condition and packaging. Return shipping costs are the responsibility of the customer unless the item received was defective or incorrect."
    },
    {
      id: 3,
      question: "How do I track my return?",
      answer: "Once your return is processed, you'll receive a confirmation email with a tracking number. You can use this number on our website to monitor the status of your return and refund."
    },
    {
      id: 4,
      question: "What items cannot be returned?",
      answer: "We cannot accept returns for personalized items, perishable goods, downloadable digital products, gift cards, and items marked as final sale. Special occasion items like flowers and experience vouchers are also non-returnable."
    },
    {
      id: 5,
      question: "How are refunds processed?",
      answer: "Refunds are processed to the original payment method used for the purchase. Processing time is typically 3-4 business days, though it may take additional time to appear on your statement depending on your bank."
    },
    {
      id: 6,
      question: "Can I exchange an item instead of returning it?",
      answer: "Yes, we offer exchanges for items of equal or lesser value. If you choose an item of greater value, you'll need to pay the difference. Contact customer service to arrange an exchange."
    },
    {
      id: 7,
      question: "What condition should returned items be in?",
      answer: "Items must be unused, unworn, and in their original packaging with all tags attached. Products showing signs of wear or use may not be eligible for return or may receive only partial refund."
    },
    {
      id: 8,
      question: "How do I package my return?",
      answer: "Use secure packaging to prevent damage during transit. Include your order number and return form in the package. We recommend using a tracked shipping service for your protection."
    },
    {
      id: 9,
      question: "What if I received a damaged item?",
      answer: "Contact customer service within 24 hours of delivery with photos of the damage. We'll arrange a return shipping label at no cost to you and process a replacement or refund based on your preference."
    },
    {
      id: 10,
      question: "Can I return a gift?",
      answer: "Yes, gift returns are accepted with the gift receipt or order number. Refunds for gifts will be issued as store credit to prevent the original purchaser from being notified of the return."
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <PromoBanner />
        <SiteHeader />
      <div className="max-w-3xl mx-auto py-12 px-4">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          RETURNS AND REFUNDS - FAQ
        </h1>
        <div className="bg-white rounded-lg shadow">
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openItem === item.id}
              toggleOpen={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
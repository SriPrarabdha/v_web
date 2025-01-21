import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PromoBanner } from "@/components/promo-banner"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <PromoBanner />
        <SiteHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Terms and Conditions for Melodious Memories Custom Song Services
            </h1>
          </div>

          {/* Agreement Notice */}
          <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
            <p>
              By accessing this service, we assume you accept these terms and conditions. 
              Do not continue to use Melodious Memories' Custom Song Services if you do not 
              agree to take all of the terms and conditions stated on this page.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Services */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Services</h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-xl font-medium mb-2">Custom Song Creation</h3>
                <p className="text-gray-700">
                  Melodious Memories offers personalized songwriting and production services using 
                  advanced technology to generate lyrics, music, and songs. Customers can choose 
                  from various package options that include different lengths, styles, and 
                  additional features such as video creation and music publishing. Our innovative 
                  approach ensures unique and tailored musical experiences for each client.
                </p>
              </div>
            </section>

            {/* Copyright */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Copyright and Ownership</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Upon full payment, the custom song and all its components become the sole 
                    property of the customer, except for the underlying rights in the musical 
                    composition and recordings which remain with Melodious Memories.</li>
                <li>The customer is granted a non-exclusive, worldwide license to use the song 
                    for personal, non-commercial purposes.</li>
              </ul>
            </section>

            {/* Ordering Process */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ordering Process</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Customers must provide detailed information about the desired song, including 
                    mood, occasion, and any specific lyrics or messages to be included.</li>
                <li>Melodious Memories reserves the right to refuse service based on content that is 
                    deemed inappropriate or offensive.</li>
              </ul>
            </section>

            {/* Delivery and Revisions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delivery and Revisions</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>The estimated delivery time for the custom song will be specified in the 
                    service agreement. Melodious Memories aims to meet this timeline, subject to 
                    the receipt of all necessary customer inputs.</li>
                <li>Depending on the chosen package, customers are entitled to a certain number 
                    of revisions to ensure their satisfaction with the final product.</li>
              </ul>
            </section>

            {/* Payments and Refunds */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payments and Refunds</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Full payment is required in advance to begin work on a custom song.</li>
                <li>Due to the personalized nature of the service, refunds are not available 
                    once work has begun. However, Melodious Memories is committed to ensuring 
                    customer satisfaction and will make reasonable efforts to address any concerns.</li>
              </ul>
            </section>

            {/* Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
              <p className="text-gray-700">
                Personal information submitted through Melodious Memories's service will be used 
                solely for the purpose of fulfilling the custom song request. Information will 
                not be shared with any third parties, except as required by law.
              </p>
            </section>

            {/* Data Usage Consent */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Usage Consent</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By using our services, you consent to Melodious Memories's use of your data for 
                  promotional purposes. We may contact you with personalized messages, such as 
                  birthday wishes or product-related updates.
                </p>
                <p>
                  Your data may be utilized in marketing campaigns and promotions related to 
                  Melodious Memories and its associated companies, including Thaagam Foundation, 
                  M7 Studios, and Acustomsong. This data usage supports both promotional 
                  efforts and charitable initiatives.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700">
                Melodious Memories is not liable for any direct, indirect, incidental, or 
                consequential damages that may result from the use of its services.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Changes to Terms and Conditions
              </h2>
              <p className="text-gray-700">
                Melodious Memories reserves the right to modify these terms and conditions at any 
                time. Changes will be effective immediately upon posting to the website.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                For any questions or concerns about these terms and conditions, please contact 
                us at{" "}
                <a 
                  href="mailto:help@mymelodiousmemories.in" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  help@mymelodiousmemories.in
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
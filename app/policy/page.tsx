import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PromoBanner } from "@/components/promo-banner"
import { SiteHeader } from "@/components/site-header"
export default function PolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <PromoBanner />
        <SiteHeader />

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Information Usage Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How Does Giftcart.com Use the Information Collected Digitally or Online?</h2>
            <div className="prose max-w-none">
              <p className="mb-4">Giftcart.com uses the information you provide to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Deliver products that you have ordered</li>
                <li>Contact you or the product recipient(s) in the event of order delay or difficulty</li>
                <li>Deliver information through various communication channels about our products or website</li>
                <li>Send information about events, surveys, promotions, specific offers and contests</li>
                <li>Tailor your experience on our website to your interests</li>
                <li>Develop our products, services, and website</li>
                <li>Respond to your inquiries and improve your overall experience</li>
              </ul>
              
              <p className="mb-4">If you have set up an account at this site, you may save personal information in that account, such as your name and shipping information, and we will access this saved information to make your shopping quicker and easier.</p>
              
              <p className="mb-4">We require you to create and/or access your account to use various services on the website, such as your order history, loyalty credits, gift registry and Wish List.</p>
            </div>
          </section>

          {/* Information Sharing Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">What Information Does Giftcart.com Share With Third Parties?</h2>
            <div className="prose max-w-none">
              <p className="mb-4">We may use third party vendors to help us provide services to you, such as:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Monitoring site activity</li>
                <li>Hosting the website</li>
                <li>Assisting with contact center operations</li>
                <li>Working on Social Media Pages</li>
                <li>Processing orders</li>
                <li>Running promotions and events</li>
                <li>Maintaining our database</li>
                <li>Processing employment applications</li>
                <li>Administering and monitoring communications</li>
              </ul>

              <p className="mb-4">Giftcart.com does not sell your data; however, we may make names and addresses available to our Advertising & Alliance Promotion Network (AAPN).</p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Important Note</h3>
                <p>If you do not wish to have your information shared with AAPN, please unsubscribe from our "Subscription center". Please note that this process may take approximately 30 days to complete.</p>
              </div>

              <p className="mb-4">We may disclose specific information about you if necessary to do so by law or based on our good faith belief that it is necessary to conform or comply with the law or is necessary to protect our users, website or the public.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
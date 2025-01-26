import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentFailed() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            We&apos;re sorry, but your payment could not be processed at this time.
            No charges have been made to your account.
          </p>
          <div className="space-y-4">
            <div className="text-gray-600">
              <h2 className="font-semibold mb-2">What you can do:</h2>
              <ul className="list-disc list-inside text-left max-w-md mx-auto">
                <li>Check your payment details and try again</li>
                <li>Ensure you have sufficient funds</li>
                <li>Try a different payment method</li>
                <li>Contact your bank if the issue persists</li>
              </ul>
            </div>
            <div className="space-x-4">
              <Link href="/checkout">
                <Button className="mt-4">
                  Try Again
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="mt-4">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

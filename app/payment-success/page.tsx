import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccess() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your payment has been processed successfully.
            We&apos;ll start working on your music project right away.
          </p>
          <div className="space-y-4">
            <div className="text-gray-600">
              <h2 className="font-semibold mb-2">Next Steps:</h2>
              <ul className="list-disc list-inside text-left max-w-md mx-auto">
                <li>You&apos;ll receive a confirmation email shortly</li>
                <li>Our team will review your requirements</li>
                <li>We&apos;ll keep you updated on the progress</li>
              </ul>
            </div>
            <Link href="/">
              <Button className="mt-4">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

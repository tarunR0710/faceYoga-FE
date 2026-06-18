import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail, Clock, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Payment Successful - ${SITE_CONFIG.name}`,
  description: 'Your payment was successful. Welcome to FaceYoga!',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome to {SITE_CONFIG.name}! Your transformation journey begins now.
        </p>

        {/* What's Next Card */}
        <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8 text-left">
          <h2 className="font-semibold text-lg text-primary mb-6">What happens next?</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-primary">Check your email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with your order details and login credentials.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-primary">Analysis in progress</h3>
                <p className="text-sm text-muted-foreground">
                  Our experts will prepare your personalized face yoga plan within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-primary">Start your journey</h3>
                <p className="text-sm text-muted-foreground">
                  Once ready, you'll receive your complete plan with video tutorials and tracking tools.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link href="/">
            <Button size="lg" className="group">
              Back to Homepage
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground">
            Questions? Contact us at{' '}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-primary hover:underline"
            >
              {SITE_CONFIG.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

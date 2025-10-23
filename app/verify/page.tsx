"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const token = searchParams.get('token')
        const type = searchParams.get('type')

        if (type === 'signup' && token) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'email',
          })

          if (error) {
            setStatus('error')
            setMessage('Verification failed. The link may be invalid or expired.')
          } else {
            setStatus('success')
            setMessage('Your email has been successfully verified!')
          }
        } else {
          // Handle other verification types or redirect
          setStatus('error')
          setMessage('Invalid verification link.')
        }
      } catch (error) {
        setStatus('error')
        setMessage('An error occurred during verification.')
      }
    }

    handleEmailVerification()
  }, [searchParams])

  const handleContinue = () => {
    router.push('/signin')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === 'loading' && <Loader2 className="h-12 w-12 text-primary animate-spin" />}
            {status === 'success' && <CheckCircle className="h-12 w-12 text-green-500" />}
            {status === 'error' && <AlertCircle className="h-12 w-12 text-red-500" />}
          </div>
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Verifying...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'success' && (
            <div className="space-y-4">
              <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  You have been authenticated successfully!
                </h2>
                <p className="text-sm text-green-700">
                  Your email has been verified and your account is now active.
                </p>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                You can now login to access your HealSpace account and start your mental wellness journey.
              </p>
              <Button onClick={handleContinue} className="w-full bg-primary hover:bg-accent text-white py-3">
                Login to Your Account
              </Button>
            </div>
          )}
          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Please try signing up again or contact support if the problem persists.
              </p>
              <Button onClick={() => router.push('/get-started')} variant="outline" className="w-full">
                Back to Sign Up
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
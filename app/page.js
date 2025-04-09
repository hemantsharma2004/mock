import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Clock, Award, Brain } from "lucide-react"
import { Button } from "../components/ui/button"



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Brain className="h-10 w-10 text-purple-600" />
              <span className="text-3xl font-bold text-gray-900">Mockly AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Ace Your Next Interview with <span className="text-purple-600">AI-Powered</span> Practice
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Prepare for job interviews with personalized AI mock interviews. Get real-time feedback and improve your
              skills.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="group">
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-purple-600">{i}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">1,000+</span> interviews conducted today
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full blur-3xl opacity-30"></div>
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Frontend Developer Interview</h3>
                  <p className="text-sm text-gray-500">React.js • 45 minutes</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Mockly AI:</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Explain the difference between controlled and uncontrolled components in React.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-700">You:</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Controlled components are those where React controls the state...
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Feedback:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-gray-600">Good explanation of core concepts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Mockly AI?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Our platform is designed to help you succeed in any interview scenario
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Interviews",
                description:
                  "Practice with our advanced AI that simulates real interview scenarios and adapts to your responses.",
              },
              {
                icon: Clock,
                title: "Save Time",
                description: "Practice anytime, anywhere without scheduling with human interviewers or career coaches.",
              },
              {
                icon: CheckCircle,
                title: "Detailed Feedback",
                description:
                  "Get personalized feedback on your answers, communication style, and areas for improvement.",
              },
              {
                icon: Users,
                title: "Industry Specific",
                description: "Choose from interviews tailored to tech, finance, healthcare, and many other industries.",
              },
              {
                icon: Award,
                title: "Proven Results",
                description:
                  "Users report 80% higher confidence and 65% better interview performance after using Mockly AI.",
              },
              {
                icon: ArrowRight,
                title: "Continuous Improvement",
                description: "Track your progress over time and see how your interview skills improve with practice.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their interview skills with Mockly AI.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="bg-white text-purple-900 hover:bg-gray-100">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">Mockly AI</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Mockly AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

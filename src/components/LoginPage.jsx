// src/components/LoginPage.jsx
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const LoginPage = () => {
  const { loginWithGoogle } = useAuth()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="text-center max-w-lg w-full">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
          Smart<span className="text-yellow-300">Hire</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-white/90 font-light mb-12">
          The smarter way to hire — fast, fair, and future-ready.
        </p>

        {/* Google Button */}
        <div className="flex justify-center">
          <Button
            onClick={loginWithGoogle}
            className="px-8 py-6 rounded-full text-lg font-semibold shadow-xl bg-white text-gray-800 hover:bg-gray-100 flex items-center gap-3"
          >
            <LogIn className="w-6 h-6 text-purple-600" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

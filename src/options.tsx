// src/options.tsx
import AuthForm from "~components/AuthForm"

import "./style.css"

import useFirebaseUser from "~firebase/useFirebaseUser"

export default function Options() {
  const { user, isLoading, onLogin, onLogout } = useFirebaseUser()
  console.log("⏩ user:", user)

  const logout = async (e: any) => {
    console.log("Clicked on logout")
    e.preventDefault()
    try {
      await onLogout()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-10">
      <div className="text-white flex flex-col space-y-10 items-center justify-center">
        {!user && <AuthForm />}
        {user && <div>You're signed in! Woo</div>}
        {user && (
          <div
            className="w-[40px] h-[20px] hover:cursor-pointer border"
            onClick={logout}>
            Signout
          </div>
        )}
      </div>
    </div>
  )
}

"use client";

import { useUserAuth } from "./_utils/auth-context";
import HolidayList from "./components/holidayList";

export default function SignInPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4">Holiday Tracker</h1>
        <p className="text-xl">Keep track of holidays around the world</p>
      </header>
      {user ? (
        <div className="w-full max-w-4xl bg-white text-black rounded-lg shadow-lg p-8 relative">
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
          <div className="my-8 text-lg">
            <p className="font-semibold mb-4">Welcome {user.displayName}!</p>
            <p className="mb-2">Do you work with offices around the world?</p>
            <p className="mb-2">If yes, then this is for you!</p>
            <p>Search for dates and countries to check if your co-workers are on holiday!</p>
          </div>
          <HolidayList />
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white text-black rounded-lg shadow-lg p-8">
          <button
            onClick={handleSignIn}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign In with GitHub
          </button>
        </div>
      )}
    </main>
  );
}

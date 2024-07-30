"use client";

import { useUserAuth } from "./_utils/auth-context";
import HolidayList from "./components/holidayList";


export default function SignInPage() {

  const { user, gitHubSignIn, firebaseSignOut} = useUserAuth(); 

  	async function handleSignIn(){
		try {
			await gitHubSignIn();
		} catch (error) {
			console.log(error);
		}
	}
	

  	async function handleSignOut(){
		try {
			await firebaseSignOut();
		} catch (error) {
			console.log(error);
		}
	}
	console.dir(user);

  return (
    <main className="h-full p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-red-300">
      <header>
        <h1 className="text-3xl">Holiday Tracker</h1>
      </header>
      {user ? (
        <div className="m-2">
          <div className="my-10 text-lg font-semibold">
            <p className="mb-4">Welcome {user.displayName} !</p>
            <p>Do you work with offices around the world?</p>
            <p>If yes then this is for you! </p>
            <p>Search up the dates and countries to check if your co-worker is on holiday!</p>
          </div>
          <HolidayList />
          <button onClick={handleSignOut} className="text-lg m-2 hover:underline">Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn} className="text-lg m-2 hover:underline decoration-wavy">Click here to sign In with GitHub</button>
        </div>
      )}
    </main>
  );
}

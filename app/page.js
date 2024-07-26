"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";


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
    <main className="p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-red-300">
      <header>
        <h1 className="text-3xl">Holiday Tracker</h1>
      </header>
      {user ? (
        <div>
          <p>Welcome {user.displayName}</p>
          <p>You are signed in as {user.email}</p>

          <img className="w-8 h-8" src={user.photoURL} alt="Profile" />
          	<p>
		  		<Link className="hover:underline decoration-wavy" href="holiday-list">Holiday tracker</Link>
			</p>
          <button onClick={handleSignOut} className="text-lg m-2 hover:underline">Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn} className="text-lg m-2 hover:underline">Sign In with GitHub</button>
        </div>
      )}
    </main>
  );
}

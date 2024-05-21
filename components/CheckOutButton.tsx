"use client";
import { useSession } from "next-auth/react";
import React from "react";

function CheckOutButton() {
  const { data: session } = useSession();
  const CreateCheckOutSession = async () => {
    if (!session) return;
    //push a document into the firestore db

    //...stripe extension on firebase will create a checkout session

    //redirect user to checkout page
  };
  //responsive for Stripe checkOut session,Stripe payment and Managements
  return (
    <button
      onClick={() => CreateCheckOutSession()}
      className="mt-8 block rounded-md
     bg-indigo-600 px-3.5 py-2 text-center
      text-sm font-semibold leading-6 text-white shadow-sm
       hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer 
        disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white 
          disabled:cursor-default"
    >
      Sign Up
      {/* <button>Sign Up</button> */}
    </button>
  );
}

export default CheckOutButton;
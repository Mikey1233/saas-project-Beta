"use client";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { db } from "@/firebase";



function CheckOutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const CreateCheckOutSession = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    const userId: string = session.user.id as string; // Ensure userId is of type string

    const docRef = await addDoc(
      collection(db, "customers", userId, "checkout_sessions"),
      {
        payment_method_types: ['card'], 
        price: "price_1PJiI9AiaMrIOPgJhSr0llzC",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    //push a document into the firestore db

    //...stripe extension on firebase will create a checkout session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`an error occured : ${error.message}`)
        setLoading(false)
      }
      if (url) {
        window.location.assign(url);
        setLoading(false)
      }
    });
    //redirect user to checkout page
  };
  //responsive for Stripe checkOut session,Stripe payment and Managements
  return (
    <button
      onClick={() => CreateCheckOutSession()}
      className="mt-8 block rounded-md
     bg-indigo-600 px-3.5 py-2 place-content-center text-center
      text-sm font-semibold leading-6 text-white 
       hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer 
        disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white 
          disabled:cursor-default"
    >
     {loading ? ("Loading...") : "Sign Up"}
    </button>
  );
} 

export default CheckOutButton;

// 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

// rk_test_51PIf42AiaMrIOPgJIaqaBr72ojbnMtHotJt3ZTtvrPuGLlmfN7ogMn7G5mqsWkM4mKv2ajUTgjKt8ypMYT6oY3N100EqYk5ufe

//stripe : https://us-central1-saas-project-380e1.cloudfunctions.net/ext-firestore-stripe-payments-handleWebhookEvents

//stripe web hook ,signing secret : whsec_NQRuY2wLpqhQpdAuGbKMUSHdT6TGcPhC

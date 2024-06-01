"use client";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { db } from "@/firebase";
import LoadingSpinner from "./LoadingSpinner";
import { useSubscription } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";

function CheckOutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const subscription = useSubscription((state) => state.subscription);
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = subscription?.status === "active" && subscription?.role === "pro";
  const CreateCheckOutSession = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    const userId: string = session.user.id as string; // Ensure userId is of type string

    const docRef = await addDoc(
      collection(db, "customers", userId, "checkout_sessions"),
      {
        payment_method_types: ["card"],
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
        alert(`an error occured : ${error.message}`);
        setLoading(false);
      }
      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });
    //redirect user to checkout page
  };

  
  //responsive for Stripe checkOut session,Stripe payment and Managements
  return (
    <div className="flex flex-col space-y-2">
      {isSubscribed && (
        <>
          <hr className="mt-5 " />
          <p className="text-center text-xs  text-indigo-600"> You are subscribed to PRO</p>
        </>
      )}
     
      <div
        className="mt-8  rounded-md h-10
flex place-items-center     bg-indigo-600 px-3.5 py-2 place-content-center text-center
      text-sm font-semibold leading-6 text-white 
       hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer 
        disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white 
          disabled:cursor-default"
      >
        {isSubscribed ? (
          <ManageAccountButton />
        ) : loading || isLoadingSubscription ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => CreateCheckOutSession()}>Sign Up</button>
        )}
      </div>
    </div>
  );
}

export default CheckOutButton;

import React from "react";
import CheckOutButton from "./CheckOutButton";
import Link from "next/link";
const tiers = [
  {
    name: "Starter",
    id: null,
    href: "#",
    priceMonthly: "Free",
    description: "Get Chatting right away with anyone, anywhere!",
    features: [
      "20 Message Chat Limit in Chats",
      "2 Participant limit in Chat",
      "3 Chat Rooms limit",
      "Supports 2 languages",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    priceMonthly: "$5.99",
    description: "Get Chatting right away with anyone, anywhere!",
    features: [
      "Unlimited Messages in Chats",
      "Unlimited Participants in Chats",
      "Unlimited Chat Rooms",
      "Supports up to 10 languages",
      "Multimedia support in chats (coming soon)",
      "1-hour, dedicated support response time",
      "Early access to New Features",
    ],
  },
];
const ListItems = ({ feature }: { feature: String }) => {
  return (
    <li className="flex gap-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-5 flex-none text-indigo-600"
      >
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clipRule="evenodd"
        
        ></path>
      </svg>
      {feature}
    </li>
  );
};
function PricingCard({ redirect }: { redirect: boolean }) {
  return (
    <div className="sm:mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 m-3">
      {tiers.map((arr) => (
        <div
          key={arr.id}
          className="flex flex-col justify-between rounded-3xl bg-white p-8  ring-1 ring-gray-900/10 sm:p-10"
        >
          <div>
            <h3
              id="nullStarter"
              className="text-base font-semibold leading-7 text-indigo-600"
            >
              {arr.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {arr.priceMonthly}
              </span>
            </div>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {arr.description}
            </p>
            <ul
              role="list"
              className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
            >
              {arr.features.map((text) => (
                <ListItems feature={text} key={text}/>
              ))}
            </ul>
          </div>
          {redirect ? (
            <Link
              className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
              href="/register"
            >
              Get started today
            </Link>
          ) : arr.id && <CheckOutButton/> }
        </div>
      ))}
    </div>
  );
}

export default PricingCard;
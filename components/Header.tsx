import { getServerSession } from "next-auth";
import { DarkModeToggle } from "./DarkModeToggle";
import { Logo } from "./Logo";
import { UserButton } from "./UserButton";
import { authOptions } from "@/auth";
import Link from "next/link";
import { MessageSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "./LanguageSelect";

async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex sm:justify-between flex-col sm:flex-row items-center p-4 gap-0.5 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />

        <div className=" flex items-center justify-end space-x-4 ">
          {/* LanguageSelect */}
          <LanguageSelect />

          {session ? (
            <>
              <Link href={"/chat"} prefetch={false}>
                <MessageSquareIcon className="text-black dark:text-white" />
              </Link>
            </>
          ) : (
            <Link
              href={"/pricing"}
              className="transition ease-in-out text-black dark:text-white bg-indigo-600 py-2 px-3 rounded hover:-translate-y-1 hover:scale-100  duration-300"
            >
              <span>pricing</span>
            </Link>
          )}

          {/* Session && (

          ) */}

          <DarkModeToggle />
          <CreateChatButton />
          <UserButton session={session} />
        </div>
      </nav>

      {/* Upgrade Banner */}
      <UpgradeBanner/>
    </header>
  );
}
export default Header;
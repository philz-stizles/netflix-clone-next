import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AccountMenuProps {
  isVisible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isVisible }) => {
  const { data: currentUser } = useCurrentUser();
  // const router = useRouter();

  // const selectProfileHandler = useCallback(() => {
  //   router.push("/");
  // }, [router]);

  return !isVisible ? null : (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            src="/images/default-blue.png"
            width={32}
            height={32}
            className="w-8 rounded-md"
            alt=""
          />
          <Link
            href="/profiles"
            className="text-white text-sm group-hover/item:underline"
          >
            {currentUser?.name}
          </Link>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </div>
    </div>
  );
};

export default AccountMenu;

import UserCard from "@/components/profiles/UserCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

const Profiles = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const images = [
    "/images/default-blue.png",
    "/images/default-red.png",
    "/images/default-slate.png",
    "/images/default-green.png",
  ];

  const selectProfileHandler = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfileHandler()}>
            <UserCard name={currentUser?.name} imageSrc={images[Math.floor(Math.random() * 4)]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  
// You always have to return something in the end.
  return {
    props: {},
  };
}

export default Profiles;

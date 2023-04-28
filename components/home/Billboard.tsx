import useBillboard from "@/hooks/useBillboard";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import PlayButton from "../ui/buttons/PlayButton";
import { useRouter } from "next/router";
import Button from "../ui/buttons/Button";

const Billboard = () => {
  const { data, isLoading, error } = useBillboard();
  const { openModal } = useInfoModalStore();
  const router = useRouter()

  const openModalHandler = useCallback(() => {
    openModal(data?.id);
    // openModal(data);
  }, [openModal, data?.id]);
  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton onClick={() => router.push(`/watch/${data?.id}`)} />
          <Button
            onClick={openModalHandler}
          >
            <InformationCircleIcon className="w-4 md:w-7 mr-1" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;

import { PlayIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"

interface PlayButtonProps {
    onClick: () => void
}

const PlayButton: React.FC<PlayButtonProps> = ({onClick}) => {
  return (
    <button 
      onClick={onClick}
      className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
      >
        <PlayIcon className="w-4 md:w-7 text-black mr-1" />
        Play
    </button>
  )
}

export default PlayButton
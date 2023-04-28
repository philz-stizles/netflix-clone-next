import Image from "next/image";
import React from "react";

interface UserCardProps {
    name: string,
    imageSrc?: string,
};

const UserCard: React.FC<UserCardProps> = ({name, imageSrc}) => {
  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="relative w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
       {imageSrc &&  <Image src={imageSrc} alt="Profile" fill className="w-max h-max object-contain" draggable={false} />}
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};

export default UserCard;

import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string;
}

function PlayButton({ movieId }: PlayButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-white text-black cursor-pointer rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xl lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transtion"
    >
      <BsFillPlayFill size={25} className="mr-1" />
      Play
    </button>
  );
}

export default PlayButton;

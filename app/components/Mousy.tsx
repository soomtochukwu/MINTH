import Image from "next/image";
const tails = ["art03", "art02", "art01"];
import React from "react";

const Mousy = () => {
  return (
    <div id="mousy">
      {tails.map((path, index) => {
        return (
          <Image
            key={index + path}
            className={`fixed invisible z-20 ${path} tail`}
            src={`/${path}.png`}
            alt={path}
            width={25}
            height={25}
          ></Image>
        );
      })}
    </div>
  );
};

export default Mousy;

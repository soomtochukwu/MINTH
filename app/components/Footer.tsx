import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-14 backdrop-blur-md md:flex justify-center items-center  md:sticky *:bg-gray-700  *:p-1 *:px-3 *:text-white *:rounded-md lg:space-x-36 hidden space-x-10 bottom-0 w-full text-center">
      <div>Meet me {"  -->"}</div>

      <Link target="meetMe" href={"https://somtochukwu-ko.vercel.app/"}>
        Portfolio 🛄
      </Link>
      <Link
        target="meetMe"
        className="flex"
        href={"http://github.com/soomtochukwu/"}
      >
        Github{"    "}
        <Image
          src={"/octocat.png"}
          width={20}
          height={5}
          alt={":octocat:"}
        ></Image>
      </Link>

      <Link
        target="meetMe"
        href={
          "https://sepolia.etherscan.io/address/0x884c8cC437bD61C7d7Ed04720F60d657E0eCdbE3#code"
        }
      >
        The smart contract 🧩
      </Link>
    </div>
  );
};

export default Footer;

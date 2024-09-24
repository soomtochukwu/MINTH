"use client";
/* eslint-disable react-hooks/exhaustive-deps */
let x: number = 0;
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import {
  useAccount,
  useConnect,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { Minth_abi, Minth_address } from "./utils/var";
import { injected } from "wagmi/connectors";
import { PinataSDK } from "pinata";
import Link from "next/link";
import Progress from "./components/Progress";

export default function Home() {
  const //
    [image, setImage] = useState<File | null>(null),
    [imageUrl, setImageUrl] = useState(""),
    [stage, setStage] = useState<string | null>(null),
    { address, isConnected } = useAccount(),
    { writeContractAsync } = useWriteContract(),
    { connect } = useConnect(),
    pinata = new PinataSDK({
      pinataJwt: process.env.NEXT_PUBLIC_JWT,
      pinataGateway: process.env.NEXT_PUBLIC_gate,
    }),
    pinImage = async () => {
      try {
        console.log("> pinning");
        setStage("pinning");

        const //
          NFT_image = await (async () => {
            const pin = await pinata.upload.file(image as File);
            await console.log("> 1st stage!");
            setStage("1st stage");
            await console.log(pin.IpfsHash);
            return pin;
          })(),
          metadata = {
            attributes: [
              {
                trait_type: "Name",
                value: `${(image as File).name}`,
              },
              {
                trait_type: "Owner",
                value: address,
              },
            ],
            description: `Minted for ${address} by Minth`,
            // @ts-ignore
            image: `ipfs://${NFT_image.IpfsHash}`,
            name: "Minth",
          },
          metadataBlob = new Blob([JSON.stringify(metadata)], {
            type: "application/json",
          }),
          file2 = new File(
            [metadataBlob],
            `metadata_${(image as File).name}.json`,
            {
              type: "application/json",
            }
          ),
          NFT_image_Metadata = await (async () => {
            const pin = await pinata.upload.file(file2);
            console.log("> 2nd stage!");
            setStage("2nd stage");
            await console.log(pin.IpfsHash);
            console.log("> pinned!");
            setStage("pinned");
            return pin;
          })();
        return NFT_image_Metadata;
      } catch (error) {
        // @ts-ignore
        console.log(error.message);
      }
    },
    Minth = async () => {
      console.log(address, isConnected);
      if (imageUrl || image) {
        console.log("> minting!");
        setStage("minting");
        const NFT = await pinImage();
        await writeContractAsync({
          abi: Minth_abi,
          address: Minth_address,
          functionName: "safeMint",
          // @ts-ignore
          args: [`ipfs://${NFT.IpfsHash}`],
        })
          .then((tx) => {
            console.log("> submitted at", tx);
            setStage("mining");
          })
          .catch((e) => {
            console.log(e.message | e.shortMessage);
          });
      } else {
        alert("upload and image or enter a valid url");
        // @ts-ignore
        document.getElementById("url").focus();
        return 0;
      }
    };

  //
  useWatchContractEvent({
    address: Minth_address,
    abi: Minth_abi,
    eventName: "MINTH",
    onLogs(nft) {
      console.log("NFT minted", nft);
      setStage("minted");
      alert("YOUR NFT WILL APPEAR IN YOUR");
      setTimeout(() => {
        setStage(null);
      }, 3000);
    },
  });
  //

  return (
    <div className="h-screen">
      <div className="text-center md:fixed w-full font-bold p-6 text-5xl font-sans">
        <Link href={"/"}>Welcome to Minth</Link>
        <div className="font-extralight text-sm ">
          ...Turn your fav. images into NFTs 😃
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:h-full p-3 h-fit justify-center items-center  md:space-x-7 *:mt-7">
        {/* left pane */}
        <div className="flex dark bg-gray-100 border flex-col justify-center items-center space-y-10 md:min-w-96 md:min-h-96 rounded-xl shadow-gray-600 shadow-2xl  p-5">
          <div className="w-full">
            <div className="text-center">Upload Images</div>
            <input
              type="file"
              className="dark w-full bg-gray-100 active:scale-95 p-3 shadow-gray-600 shadow-lg rounded-md"
              accept="image"
              onInput={(e) => {
                // @ts-ignore
                const file = e.target.files[0];
                console.log(file);
                console.log(URL.createObjectURL(file));
                setImageUrl(URL.createObjectURL(file));
                setImage(file);
              }}
            />
          </div>
          {/*  */}
          <div className="text-center">Or</div>
          <div className="w-full">
            <input
              placeholder="Enter Image URL"
              className="dark border text-center w-full p-3 bg-gray-100 rounded-md shadow-gray-600 shadow-lg"
              type="url"
              id="url"
              onInput={async (e) => {
                const val = e.currentTarget.value;
                setImageUrl(val);
                setImage(null);
                const response = await fetch(val, {
                    mode: "no-cors",
                  }),
                  blob = await response.blob(),
                  file = new File(
                    [blob],
                    `${imageUrl.slice(imageUrl.lastIndexOf("/") + 1)}`,
                    { type: blob.type }
                  );
                setImage(file);
                console.log(file);
              }}
            />
          </div>
          <button
            onClick={async () => {
              if (address && isConnected) {
                Minth();
              } else {
                setImageUrl("connect wallet and try again");
                console.log(await connect({ connector: injected() }));
              }
            }}
            className="p-3 px-10 rounded-md active:scale-95 bg-gray-700 text-white"
          >
            Mint now!
          </button>
          <div
            onClick={() => {
              console.log(x);
              const stg = [
                "pinning",
                "1st stage",
                "2nd stage",
                "pinned",
                "minting",
                "minted",
              ];
              if (x >= stg.length) {
                x = 0;
                setStage(null);
              } else {
                setStage(stg[x]);

                x++;
              }
            }}
            className="h-6 w-full"
          >
            <Progress
              progressBarBG={"bg-gray-700"}
              color={"text-gray-400"}
              stages={[
                "pinning",
                "1st stage",
                "2nd stage",
                "pinned",
                "minting",
                "mining",
                "minted",
              ]}
              currentStage={stage as string}
            />
          </div>
        </div>

        {/* right pane */}
        <div className=" dark bg-gray-100 flex justify-center items-center shadow-gray-600 shadow-2xl md:min-w-96 md:min-h-96 w-fit border rounded-xl">
          <div className=" absolute ">
            <pre>
              {imageUrl
                ? `Loading \n${imageUrl
                    ?.slice(imageUrl.lastIndexOf("/") + 1)
                    .slice(0, 20)}`
                : "Your NFT will be previewed here"}
            </pre>
          </div>
          {imageUrl ? (
            <img
              id="imagePreview"
              className="z-10 rounded-xl"
              alt="Preview"
              src={imageUrl}
              // width={500}
              // height={500}
            ></img>
          ) : null}
        </div>

        {/*  */}
      </div>
    </div>
  );
}

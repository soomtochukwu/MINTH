/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MouseEvent } from "react";

export const coOrdinate = (event: MouseEvent) => {
  const //
    //
    { screenX, clientY } = event,
    coord: HTMLElement = document.getElementsByClassName(
      "coord"
    )[0] as HTMLElement,
    tails = document.getElementsByClassName("tail");
  //
  //
  coord.innerText = `${screenX}, ${clientY}`;
  for (let i = 0; i < tails.length; i++) {
    const tail: HTMLElement = tails[i] as HTMLElement;
    tail.style.left = screenX + "px";
    tail.style.top = clientY + "px";
    tail.style.visibility = "visible";
    // tail.style.transition = +Math.random().toFixed(1) * 0.4 + "s";
  }

  //
};

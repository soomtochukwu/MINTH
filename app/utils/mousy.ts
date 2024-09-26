/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MouseEvent } from "react";

export const coOrdinate = (event: MouseEvent) => {
    (document.getElementById("mousy") as HTMLElement).style.display = "block";

    const //
      //
      { clientX, clientY } = event,
      tails = document.getElementsByClassName("tail");
    //
    //
    for (let i = 0; i < tails.length; i++) {
      const tail: HTMLElement = tails[i] as HTMLElement;
      tail.style.left = clientX + 5 + "px";
      tail.style.top = clientY + 5 + "px";
      tail.style.visibility = "visible";
      // tail.style.transition = +Math.random().toFixed(1) * 0.4 + "s";
    }

    //
  },
  coOrdinateOut = () => {
    (document.getElementById("mousy") as HTMLElement).style.display = "none";
  };

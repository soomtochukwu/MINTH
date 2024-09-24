import React, { useEffect, useState } from "react";
interface ProgressProps {
  progressBarBG: string;
  color: string;
  stages: string[];
  currentStage: string;
}
const Progress = ({
  color,
  progressBarBG,
  stages,
  currentStage,
}: ProgressProps) => {
  const [percentage, setPercentage] = useState(0);
  //
  useEffect(() => {
    console.log(currentStage);
    if (!stages.includes(currentStage) && currentStage) {
      alert("invalid stage");
      throw new Error("invalid stage");
    }
    const //
      progressBar: HTMLElement = document.getElementById(
        "progressBar"
      ) as HTMLElement,
      max_w: number = document.getElementById("bar")?.offsetWidth as number,
      currentStageIndex = stages.indexOf(currentStage) + 1,
      percentage = (currentStageIndex * 100) / stages.length;
    setPercentage(percentage);
    //
    progressBar.style.width =
      String((currentStageIndex * max_w) / stages.length) + "px";
  }, [currentStage, stages]);

  return (
    <div
      className={`relative transition-all border rounded-md w-full h-full ${
        currentStage ? null : "scale-0"
      }`}
      id="bar"
    >
      <div
        id="progressBar"
        className={`${progressBarBG} w-0  transition-all rounded-md  absolute max-w-full h-full`}
      ></div>
      <div className={`${color} absolute z-10 w-full text-center  h-full`}>
        {currentStage}: {Math.floor(percentage)}%
      </div>
    </div>
  );
};

export default Progress;

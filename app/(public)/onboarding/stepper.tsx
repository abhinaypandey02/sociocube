import type { Icon } from "@phosphor-icons/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import classNames from "classnames";
import React from "react";

export default function OnboardingStepper({
  steps,
  currentStep,
}: {
  steps: { title: string; description: string; icon: Icon }[];
  currentStep: number;
}) {
  return (
    <ol className="h-fit translate-x-[21px] space-y-14 border-l-2">
      {steps.map((step, i) => (
        <li className="flex translate-x-[-21px] gap-3 " key={step.title}>
          <div className="bg-primary-bg py-1">
            <div
              className={classNames(
                "flex size-10 items-center justify-center rounded-full border-2  bg-white",
                currentStep > i ? "border-green-500" : "",
                currentStep === i ? "border-gray-700" : "",
                currentStep < i ? "border-dashed" : "border-solid",
              )}
            >
              {currentStep > i ? <Check color="green" /> : <step.icon />}
            </div>
          </div>
          <div className="max-lg:hidden">
            <h4 className="font-poppins text-xl font-semibold">{step.title}</h4>
            <p className="font-poppins ">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

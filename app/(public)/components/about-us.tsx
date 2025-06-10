import {
  LinkedinLogo,
  ThreadsLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import SectionWrapper from "./section-wrapper";

export default function AboutUs() {
  return (
    <SectionWrapper
      headerClassName="mb-6! "
      id="about-us"
      prefixTitle={"About Us"}
      title="Built by two. Built for many."
    >
      <div className="justify-center flex gap-14 max-lg:flex-wrap items-center">
        <div className="">
          <p className="  leading-7 text-gray-600">
            We’re two friends who go way back to our college days, united by a
            shared love for tech and building things that matter. Over countless
            brainstorming sessions and late-night code sprints, we realized how
            broken the influencer-brand ecosystem still is—especially for
            emerging creators who deserve better opportunities.
          </p>
          <p className="mt-10 text-xl leading-8 text-gray-700">
            That’s why we started Sociocube—to create a platform that connects
            creators and brands without the noise, middlemen, or gatekeeping.
            We're building this ourselves, from scratch, driven by purpose and a
            belief that technology can open doors for every kind of influencer.
            This is just the beginning.
          </p>
        </div>
        <div className="flex items-center max-sm:flex-wrap justify-center sm:shrink-0 gap-10">
          <div className={"shrink-0"}>
            <Image
              width={288}
              height={288}
              className={"rounded-xl size-64"}
              src={"/shraddha.png"}
              alt={"Shraddha Sharma"}
            />
            <h4 className={"text-center text-2xl font-poppins mt-3"}>
              Shraddha Sharma
            </h4>
            <p className={"text-center text-gray-600 mt-0.5"}>
              Marketing & Tech
            </p>
            <div
              className={
                "flex gap-3 text-2xl justify-center mt-1.5 text-primary"
              }
            >
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={"https://threads.com/@whatshraddha"}
              >
                <ThreadsLogo />
              </a>
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={"https://x.com/whatshraddha"}
              >
                <XLogo />
              </a>
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={"https://www.linkedin.com/in/shraddha-sharma-97309135a/"}
              >
                <LinkedinLogo />
              </a>
            </div>
          </div>
          <div>
            <Image
              width={288}
              height={288}
              className={"rounded-xl size-64"}
              src={
                "https://cdn.sanity.io/images/79g6hku1/production/6fa55a30db3979aa4cc63d8c7722b8b269c77ab3-845x845.jpg"
              }
              alt={"Abhinay Pandey"}
            />
            <h4 className={"text-center text-2xl font-poppins mt-3"}>
              Abhinay Pandey
            </h4>
            <p className={"text-center text-gray-600 mt-0.5"}>Sales</p>
            <div
              className={
                "flex gap-3 text-2xl justify-center mt-1.5 text-primary"
              }
            >
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={"https://threads.com/@abhinayx"}
              >
                <ThreadsLogo />
              </a>
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={"https://x.com/abhinaypandeyx"}
              >
                <XLogo />
              </a>
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={"https://linkedin.com/in/abhinayx"}
              >
                <LinkedinLogo />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

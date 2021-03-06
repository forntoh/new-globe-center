import formatHeadline from "../../utils/text";
import Carousel from "../carousel";
import { Img } from "../image";
import Underline from "../underline";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Section } from "../../typings";
import { Arrow } from "../Arrow";

const listVariants = {
  hidden: {
    transition: {
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 256,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

interface Props {
  gallery?: Section<any>;
  screenWidth: number;
}

export default function GallerySection({ gallery, screenWidth }: Props) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const [maximized, setMaximized] = useState<number>();

  return (
    <div className="h-full flex flex-col justify-center mt-0 md:mt-20 lg:mt-8 2xl:mt-0">
      <div className="container space-y-5">
        <div className="max-w-max space-y-4">
          <h2>{formatHeadline(gallery?.headline || "")}</h2>
          <Underline className="text-primary w-full h-3" />
        </div>
        <p className="max-w-4xl">{gallery && gallery.description}</p>
      </div>
      {screenWidth >= 768 ? (
        <div className="relative">
          <motion.div
            id="gal"
            ref={ref}
            initial="hidden"
            variants={listVariants}
            animate={controls}
            className="grid md:grid-rows-2 grid-flow-col my-8 2xl:my-10 space-x-[-3.5rem] 3xl:space-x-[-4.3rem] gap-y-5 overflow-auto py-4 scrollbar-hide"
          >
            {gallery?.image?.data?.map((it, i) => (
              <motion.div
                key={i}
                className={`${
                  i === maximized
                    ? "absolute !w-full h-full !z-50 inset-0  brightness-100"
                    : "3xl:h-56 3xl:!w-[28rem] h-44 !w-96 brightness-90"
                } first:-ml-16 cursor-pointer transition filter ease-out duration-300 scale-100`}
                whileHover={{
                  scale: 1.12,
                  filter: "brightness(1)",
                  zIndex: 40,
                  transition: { duration: 0.15 },
                }}
                style={{
                  clipPath:
                    i == maximized
                      ? ""
                      : "polygon(0.00% 0.00%,80.00% 0.00%,100% 100%,20.00% 100.00%)",
                }}
                variants={itemVariants}
                transition={{ duration: 0.4, type: "tween", ease: "easeOut" }}
                layout
              >
                {i !== maximized ? (
                  <Img image={it.attributes} onClick={() => setMaximized(i)} />
                ) : (
                  <Carousel
                    images={gallery?.image?.data?.map((it) => it.attributes)}
                    className="absolute h-full max-w-screen object-cover"
                    swipeable
                    maximized
                    onMaximizeChange={(isMaximized) => {
                      setMaximized(!isMaximized ? -1 : i);
                      console.log(isMaximized);
                    }}
                    startingIndex={i}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
          <Arrow
            action="prev"
            onClick={() => scrollGalerry(-1)}
            color="#c00000"
          />
          <Arrow
            action="next"
            onClick={() => scrollGalerry(1)}
            color="#c00000"
          />
        </div>
      ) : (
        <div className="relative h-96 md:h-[32rem] mt-8 flex w-screen items-center justify-center overflow-hidden">
          <Carousel
            images={gallery?.image?.data?.map((it) => it.attributes)}
            className="absolute h-full max-w-screen object-cover"
            swipeable
          />
        </div>
      )}
    </div>
  );
}

function scrollGalerry(direction: number) {
  const him = document.getElementById("gal");
  him?.scroll({ left: him.scrollLeft + 720 * direction, behavior: "smooth" });
}

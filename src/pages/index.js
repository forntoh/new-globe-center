import Footer from "@/components/footer";
import { Fullpage } from "@/components/fullpage";
import Header from "@/components/header";
import LandingSection from "@/components/sections/landing";
import useDimensions from "@/lib/utils/dimens";
import { useRef } from "react";

export default function Home() {
  const headerRef = useRef();
  const size = useDimensions(headerRef);

  return (
    <>
      <Header ref={headerRef} className="z-50" />
      {size.height !== 0 ? (
        <Fullpage paddingTop={size.height}>
          <LandingSection />
          <div>{size.width}</div>
          <div className="flex flex-col justify-between h-full">
            <div>fdsd</div>
            <Footer />
          </div>
        </Fullpage>
      ) : undefined}
    </>
  );
}

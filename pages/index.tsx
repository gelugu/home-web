import { useMediaQuery } from "@chakra-ui/react";
import { Tasks } from "../src/ui/components";
import { DesktopLayout, MobileLayout } from "../src/ui/layouts";

function Home(): JSX.Element {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile ? (
        <MobileLayout children={<Tasks />} />
      ) : (
        <DesktopLayout children={<Tasks />} />
      )}
    </>
  );
}

export default Home;

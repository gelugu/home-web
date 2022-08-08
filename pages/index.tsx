import { useMediaQuery } from "@chakra-ui/react";
import { mobileScreen } from "../src/app/config";
import { Tasks } from "../src/ui/components";
import { DesktopLayout, MobileLayout } from "../src/ui/layouts";

function Home(): JSX.Element {
  const [isMobile] = useMediaQuery(mobileScreen);

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

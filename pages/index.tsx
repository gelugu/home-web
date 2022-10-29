import { useMediaQuery } from "@chakra-ui/react";
import { mobileScreen } from "../src/app/config";
import { Tracks } from "../src/ui/components/Tracks/Tracks";
import { DesktopLayout, MobileLayout, withAuth } from "../src/ui/layouts";

function Home(): JSX.Element {
  const [isMobile] = useMediaQuery(mobileScreen);

  return (
    <>
      {isMobile ? (
        <MobileLayout children={<Tracks />} />
      ) : (
        <DesktopLayout children={<Tracks />} />
      )}
    </>
  );
}

export default withAuth(Home);

import React, { useEffect } from "react";
import { Logo } from "@Components";
import { ROUTES } from "@Routes";
import { useNavigation } from "@Hooks";

function Splash() {
  const SPLASH_STAY_TIME_MILE_SECONDS = 3000;
  const { goTo } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      goTo(ROUTES.AUTH.LOGIN);
    }, SPLASH_STAY_TIME_MILE_SECONDS);
  });

  return (
    <div className={"d-flex h-100 justify-content-center align-items-center"}>
      <Logo />
    </div>
  );
}

export { Splash };

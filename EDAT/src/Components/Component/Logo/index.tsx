import { Image, H, P } from "@Components";
import { icons } from "@Assets";
import { translate } from "@I18n";

function Logo() {
  return (
    <div className="text-center">
      <Image src={icons.logo} alt={"quanta-logo"} width={110} height={110} />
      <div className="text-center">
        <H
          className={"mb-0"}
          tag={"h2"}
          text={translate("common.appName")}
        />
        <div className="paragraph">
          <P text={translate("common.edatAppSubtext")} />
        </div>
      </div>
    </div>
  );
}

export { Logo };

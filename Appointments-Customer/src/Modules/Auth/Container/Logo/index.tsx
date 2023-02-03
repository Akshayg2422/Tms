import { Image, Heading, Paragraph } from "@Components";
import { icons } from "@Assets";
import { translate } from "@I18n";

function Logo() {
  return (
    <>
      <div className="text-center mt-2">
        <Image
          src={icons.logo}
          alt="quanta logo"
          width={90}
          height={90}
          className="img-fluid"
        />
      </div>
      <div className="text-center">
        <Heading variant="h2" heading={translate('common.businessAppName')} />
      </div>
      <div className="paragraph text-center mt--2">
        <Paragraph heading={translate('common.businessAppSubtext')} />
      </div>
    </>
  );
}

export { Logo };

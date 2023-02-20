

function TabSelector ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
return (
    <>
  <button
  style={{
    borderColor:"white"
  }}
    className={` bg-white border-top-0   border-left-0 border-right-0 font-medium    pl-4 pr-4 pt-2 pb-2  ${
      isActive
        ? " border-primary bg-white"
        : ""
    }`}
    onClick={onClick}
  >
    {children}
  </button>
  </>
)};
export{TabSelector};

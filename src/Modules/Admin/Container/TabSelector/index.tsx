

function TabSelector ({
  isActive,
  children,
  className,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
  className?:string;
}) {
return (
    <>
  <button
  style={{
    borderColor:"white",
    backgroundColor:"#f7f8fa"
    
  }}
    className={`  border-top-0   border-left-0 border-right-0 font-medium    pt-2 pb-2 ${className}  ${
      isActive
        ? " border-primary "
        : ""
    }`}
    onClick={onClick}
  >
    {children}
  </button>
  </>
)};
export{TabSelector};

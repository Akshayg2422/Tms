import React from "react";
import Select from "react-select";
import DropDown from "../DropDown";
// import monacoThemes from "monaco-themes/themes/themelist";
// import { customStyles } from "../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {

    const defaultThemes = [{id:1, name: "Zenburnesque"},
    {id:2,name: "iPlastic"},
    {id:3,name: "idleFingers"},
    {id:4,name: "krTheme"},
    {id:5,name: "monoindustrial"}]
    

  return (
    // <DropDown 
    // data={defaultThemes}
    // value={theme}
    // onChange={handleThemeChange}
    // />
    // <Select
    //   placeholder={`Select Theme`}
    //   // options={languageOptions}
    // //   options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
    // //     label: themeName,
    // //     value: themeId,
    // //     key: themeId,
    // //   }))}
    //   value={theme}
    // //   styles={customStyles}
    //   onChange={handleThemeChange}
    // />
<></>
  );
};

export default ThemeDropdown;

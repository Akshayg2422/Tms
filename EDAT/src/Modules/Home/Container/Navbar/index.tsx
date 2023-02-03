import React, { FC, useEffect, useState } from 'react'
import { CodeEditor } from "@Modules";
import { Procedure, Question, FlowDiagram } from "@Modules";
import { useNavigation } from '@Hooks';

const HOME = 0;



const HeaderNavbar = ({navHeader}) => {

  const [activeIndex, setActiveIndex] = useState(HOME);
  const [showNavbar, setShowNavbar] = useState(false);




  const nearestIndex = (
    currentPosition,
    sectionPositionArray,
    startIndex,
    endIndex
  ) => {
    // console.log(sectionPositionArray[startIndex].headerRef+"====");
    
    // console.log('t--->',currentPosition)
    // console.log('a--->',sectionPositionArray[startIndex].headerRef.current?.offsetTop+"+=====")
    // console.log('m--->',startIndex)
    // console.log('i--->',endIndex)
    
    if (startIndex === endIndex) return startIndex;
    else if (startIndex === endIndex - 1) {
      if (
        Math.abs(
          sectionPositionArray[startIndex].headerRef.current.offsetTop -
          currentPosition
        ) <
        Math.abs(
          sectionPositionArray[endIndex].headerRef.current.offsetTop -
          currentPosition
        )
      )
        return startIndex;
      else return endIndex;
    } else {
      var nextNearest = ~~((startIndex + endIndex) / 2);
      var a = Math.abs(
        sectionPositionArray[nextNearest].headerRef.current.offsetTop -
        currentPosition
      );
      var b = Math.abs(
        sectionPositionArray[nextNearest + 1].headerRef.current.offsetTop -
        currentPosition
      );
      if (a < b) {
        return nearestIndex(
          currentPosition,
          sectionPositionArray,
          startIndex,
          nextNearest
        );
      } else {
        return nearestIndex(
          currentPosition,
          sectionPositionArray,
          nextNearest,
          endIndex
        );
      }
    }
  };


  

  useEffect(() => {
    const handleScroll = (e) => {
      var index = nearestIndex(
        window.scrollY,
        navHeader,
        0,
        navHeader.length - 1
      );
      // console.log(index + "====useEffect"+index);
      setActiveIndex(index);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // console.log(activeIndex+"=======");
  


  return (
    <>
      <div className='container-fluid d-flex justify-content-center py-4 fixed-top bg-white'>
        {navHeader.map((item, index) => {
          return (
            <>
              <span className={` d-none d-sm-block ml-4 `}>
                <a href={`#${item.href}`} className={`h2 ${activeIndex === index ? 'text-primary' : 'text-black'}`}
                onClick={() => {
                  setActiveIndex(index)
                  setShowNavbar(false)
                }}>{item.headerTitle}</a>
              </span>
            </>
          )
        })}
      </div>
    </>

  )
}

export { HeaderNavbar }

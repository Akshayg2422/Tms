import React, { useState, useEffect } from 'react';

interface Props {
    children: React.ReactNode;
  }
 
  function RemoveEmptySpace({ children }: Props) {
    const [emptySpaceInPixels, setEmptySpaceInPixels] = useState<number | null>(null);
    const [emptySpaceInVh, setEmptySpaceInVh] = useState<number | null>(null);
  
    useEffect(() => {
      function updateEmptySpace() {
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;
        const emptySpaceInPixels = windowHeight - bodyHeight;
  
        setEmptySpaceInPixels(emptySpaceInPixels);
        const emptySpaceInVh = (emptySpaceInPixels / windowHeight) * 100;
  
        setEmptySpaceInVh(emptySpaceInVh);
      }
  
      window.addEventListener('resize', updateEmptySpace);
      updateEmptySpace();
  
      return () => {
        window.removeEventListener('resize', updateEmptySpace);
      };
    }, []);
  
    return (
      <div style={{ height: `${emptySpaceInPixels}px` }}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<any>, { emptySpaceInPixels, emptySpaceInVh })
        )}
      </div>
    );
  }

export { RemoveEmptySpace }
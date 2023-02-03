import { Button } from "@Components";
import { TDDocument, TDExport, TDExportType, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import React from "react";
import { useState } from "react";
import {translate} from '@I18n'

const ACTION = 'download' as 'download' | 'open'

const FlowDiagram = () => {

  const fileSystemEvents = useFileSystem();
  const [flowDiagramData, setFlowDiagramData] = useState<any>()

  const myDocument: any = {
    id: 'doc',
    version: TldrawApp.version,
    pages:
      { "page": { "id": "page", "name": "Page 1", "childIndex": 1, "shapes": { "de9fc77f-3d43-4d38-2193-4e2e8f33a41e": { "id": "de9fc77f-3d43-4d38-2193-4e2e8f33a41e", "type": "rectangle", "name": "Rectangle", "parentId": "page", "childIndex": 1, "point": [636.8, 53.8], "size": [146.6, 151.4], "rotation": 0, "style": { "color": "black", "size": "small", "isFilled": false, "dash": "draw", "scale": 1 }, "label": "", "labelPoint": [0.5, 0.5] }, "0b38d9e9-88ef-431d-13af-34d81e2f79f4": { "id": "0b38d9e9-88ef-431d-13af-34d81e2f79f4", "type": "text", "name": "Text", "parentId": "page", "childIndex": 2, "point": [630.2, 94], "rotation": 0, "text": "hii this is muthu", "style": { "color": "black", "size": "small", "isFilled": false, "dash": "draw", "scale": 1, "font": "script", "textAlign": "middle" } }, "5fbc1d4b-5c1d-4932-33b4-0aa082b03ac0": { "id": "5fbc1d4b-5c1d-4932-33b4-0aa082b03ac0", "type": "ellipse", "name": "Ellipse", "parentId": "page", "childIndex": 3, "point": [667.2, 244.2], "radius": [50.599999999999966, 53.400000000000006], "rotation": 0, "style": { "color": "black", "size": "small", "isFilled": false, "dash": "draw", "scale": 1 }, "label": "gghhg", "labelPoint": [0.5, 0.5] } }, "bindings": {} } }
    ,
    pageStates: { "page": { "id": "page", "selectedIds": ["5fbc1d4b-5c1d-4932-33b4-0aa082b03ac0"], "camera": { "point": [60.8, 170.4], "zoom": 1 } } },
    assets: {},
  }

  const handleExport = React.useCallback(async (app: TldrawApp, info: TDExport) => {
    // When a user exports, the default behavior is to download
    // the exported data as a file. If the onExport callback is
    // provided, it will be called instead.

    switch (ACTION) {
      case 'download': {
        // Download the file
        const blobUrl = URL.createObjectURL(info.blob)
        const link = document.createElement('a')
        link.href = blobUrl
        
        // link.download = info.name + '.' + info.type
        // link.click()
        break
      }
      case 'open': {
        // Open the file in a new tab
        const blobUrl = URL.createObjectURL(info.blob)
        const link = document.createElement('a')
        link.href = blobUrl
        // link.target = '_blank'
        // link.click()
        break
      }
    }
  }, [])

  const handleExportSVG = React.useCallback(() => {
    flowDiagramData?.exportImage(TDExportType.SVG, { scale: 1, quality: 3, color:'white' })
  }, [flowDiagramData])

  function trigger (){
    const event = new KeyboardEvent('keypress', {
      key: 'enter',
    });
    
  }
 

  return (
    <>
      <div className="h-100vh "  >
        <Tldraw
          document={myDocument}
          onExport={handleExport}
          autofocus
          showMenu={false}
          showStyles={false}
          showZoom={false}
          disableAssets={true}
          showPages={false}
          // {...fileSystemEvents}
          onChange={(app: any) => {
            setFlowDiagramData(app)
          }}
        />
        <div className="mr-5" style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 100, marginBottom: '10px' }}>
          <Button text={'Submit'} onClick={() => {
            handleExportSVG()
            trigger()
            console.log("123", flowDiagramData.state.document)
          }} />
        </div>
      </div>

    </>

  );
}


export { FlowDiagram }
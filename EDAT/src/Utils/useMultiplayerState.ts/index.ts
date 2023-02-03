import { TDAsset, TDBinding, TDShape, TDUserStatus, TldrawApp } from '@tldraw/tldraw'
import { useCallback, useEffect, useState } from 'react'

type options = {
  apiKey?: string,
  presence: object,
  syncLoopDuration: number,
  reconnectStreamDelay: number
}


 function useMultiplayerState(roomId: string, userName: string) {
  const [app, setApp] = useState<any>()
  const [loading, setLoading] = useState(true)

  // Callbacks --------------


  const onMount = useCallback(
    (app: TldrawApp) => {
      app.loadRoom(roomId)
      app.setIsLoading(true)
      app.pause()
      setApp(app)

      app.updateUsers([{
        id: app!.currentUser!.id,
        point: [0, 0],
        color: "",
        status: TDUserStatus.Connected,
        activeShapes: [],
        selectedIds: [],
        metadata: { name: userName }, // <-- our custom metadata
      }])
      
    },
    [roomId]
  )
 

  useEffect(() => {
    if (!app) return

    function handleDisconnect() {
    }

    window.addEventListener("beforeunload", handleDisconnect);

    function handleChanges() {
  
    }

    let stillAlive = true

    async function setupDocument() {
      try {
        const options: options = {
          apiKey: "",
          presence: {
            user: app?.currentUser,
          },
          syncLoopDuration: 0,
          reconnectStreamDelay: 1000
        }

        if (`${process.env.REACT_APP_YORKIE_API_KEY}`) {
          options.apiKey = `${process.env.REACT_APP_YORKIE_API_KEY}`;
        }

      
        if (stillAlive) {
          // Update the document with initial content
          handleChanges()

          // Zoom to fit the content & finish loading
          if (app) {
            app.zoomToFit()
            if (app.zoom > 1) {
              app.resetZoom()
            }
            app.setIsLoading(false)
          }

          setLoading(false)
        }
      } catch (e) {
        console.error(e)
      }
    }

    setupDocument()

    return () => {
      window.removeEventListener("beforeunload", handleDisconnect);
      stillAlive = false
    }
  }, [app])


  return {
    onMount,
    loading,

    // onChangePresence,
  }
}

export default useMultiplayerState



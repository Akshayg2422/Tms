


function FilterLinkMessage (message: any) {

    let urlHelper = /(https?:\/\/[^\s]+)/g
    let filterLinkMessage
    let filterMessage
    if (message) {
      filterLinkMessage = message.message.match(urlHelper)
      filterMessage = message.message.replace(urlHelper, '')
    }
  
    if (filterLinkMessage) {
      return <div>
  
  <a  href={filterLinkMessage} target="_blank" rel="noopener noreferrer">
  {filterLinkMessage}
  
  </a>
  <span> {filterMessage && filterMessage}</span>
  
  
  
  </div>
  
  
      
    }
    else {
      return message.message

      
    }
  
  }
  export{FilterLinkMessage}
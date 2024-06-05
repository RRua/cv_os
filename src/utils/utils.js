

const iconImgFromType = (icon_type) => {
    switch(icon_type){
      case 'folder':
        return require('../assets/folder-icon.png')
      default:
        return require('../assets/file-icon.png')}
}

const getFilesURL = () => {
    return "http://localhost:3000/files"
}
    
export {iconImgFromType, getFilesURL}
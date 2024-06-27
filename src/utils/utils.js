

const iconImgFromType = (icon_type, os_type='') => {
    switch(icon_type){
      case 'folder':
        return require(`../assets/folder-icon${os_type === ''? os_type : '-' + os_type.toLowerCase()}.png`)
      default:
        return require('../assets/file-icon.png')}
}

const getFilesURL = () => {
 
    return process.env.PUBLIC_URL + "/data/files"; 
  
    //return process.env.PUBLIC_URL + "/data/files";
}


const getFilesPrefix = () => {
  if (process.env.NODE_ENV === 'development'){
    return 'cv_os';
  }
  return '';
}

    
function replaceLastOccurrence(originalStr, searchStr, replaceStr) {
  const lastIndex = originalStr.lastIndexOf(searchStr);

  if (lastIndex === -1) {
      // If the search string is not found, return the original string
      return originalStr;
  }

  // Slice the string into two parts and replace the last occurrence
  const beforeLastOccurrence = originalStr.slice(0, lastIndex);
  const afterLastOccurrence = originalStr.slice(lastIndex + searchStr.length);

  // Concatenate the parts with the replacement string
  return beforeLastOccurrence + replaceStr + afterLastOccurrence;
}

export {iconImgFromType, getFilesURL, getFilesPrefix, replaceLastOccurrence}
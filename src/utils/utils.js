

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

export {iconImgFromType, getFilesURL, replaceLastOccurrence}
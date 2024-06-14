import { Directory, File } from "../data/data";
import {replaceLastOccurrence} from '../utils/utils';


export class Command {
  constructor(description) {
    this.description = description;
  }
  
  describe(){
    return this.description;
  }

  help(){
    return 'help: ' + this.description;
  }

  execute({output, args, onWindowClose, fs}) {
    const help_flags = ['-h', '--help'];
    if (args.length > 1 && args.some(arg => help_flags.includes(arg))) {
      output((prevOutput) => [...prevOutput, this.help()]);
      return true;
    }
    return false;
  }
}

export function beautify_output(output) {
  return output.map(obj => {
    const row = Object.values(obj)
      .map(value => `${value}`)
      .join(' | ');
    return row;
  });
}

export function transformToTableWithHeader(objects) {
  const allKeys = objects.reduce((keys, obj) => {
    return keys.concat(Object.keys(obj));
  }, []);
  const columnWidths = allKeys.reduce((widths, key) => {
    widths[key] = Math.max(...objects.map(obj => String(obj[key]).length));
    return widths;
  }, {});
  const header = allKeys.map(key => key.padEnd(columnWidths[key])).join(' | ');
  const rows = objects.map(obj => {
    return allKeys.map(key => String(obj[key]).padEnd(columnWidths[key])).join(' | ');
  });
  return [header, ...rows];
}


export function retrieveObjectsAsString(objects) {
  const ret = [];
  for (const obj of objects) {
    ret.push('-----------------------')
    if (typeof obj === 'object') {
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          ret.push(`${key}: ${obj[key]}`);  
        }
        else if (typeof obj[key] === 'object') {
          ret.push(`${key}: ${retrieveObjectsAsString(obj[key])}`);
        } else {
          ret.push(`${key}: ${obj[key]}`);
        }
      }
    } else {
      ret.push(obj);
    }
  } 
  return ret;
}

export function find_key(target_str, fs, match_prefix=false) {
  if (!fs) {
    return null;
  }
  
  if ((target_str.startsWith('/') || target_str.startsWith('~/')) && fs.parentDirectory) {
    return find_key(target_str, find_root(fs), match_prefix);
  }
  if (target_str.startsWith('../') && fs.parentDirectory) {
    fs = fs.parentDirectory ? fs.parentDirectory : fs;
    target_str = target_str.slice(3);
    const res = find_key(target_str, fs, match_prefix);
    return !res? res : '../' + res;
  }
  if (target_str.endsWith('/')) {
    target_str = target_str.slice(0, -1);
  }
  if (target_str.includes('/')) {
    const path = target_str.split('/')
    let currentObj = fs;
    for (const dir of path) {
      if (dir === '') {
        continue;
      }
      if (currentObj instanceof Directory) {
        currentObj = currentObj.content.find((obj) => find_id(obj).toUpperCase() === dir.toUpperCase() 
          || (match_prefix && find_id(obj).toUpperCase().startsWith(dir.toUpperCase())));
      }
      else{
        currentObj = find_obj(dir, currentObj);
      }
      if (!currentObj) {
        break;
      }
    }
    return !find_id(currentObj) ? null : target_str.split("/")[target_str.split("/").length -1 ] !== '' ?
    replaceLastOccurrence(target_str, target_str.split("/")[target_str.split("/").length-1], find_id(currentObj)) : find_id(currentObj);
  }
  else {
    if (fs instanceof Directory) {
      const currentObj = fs.content.find((obj) => find_id(obj).toUpperCase() === target_str.toUpperCase()
       || (match_prefix && find_id(obj).toUpperCase().startsWith(target_str.toUpperCase())));
      return !find_id(currentObj) ? null : target_str !== '' ? find_id(currentObj) : null;
    }
    else{
      for (const key in fs) {
        if (key.toUpperCase() === target_str.toUpperCase() || (match_prefix && key.toUpperCase().startsWith(target_str.toUpperCase()))) {
          return key;
        }
        if (typeof fs[key] === 'object') {
          const result = find_key(target_str, fs[key], match_prefix);
          if (result) {
            return result;
          }
        }
      }
    }
  }
  return null;
}

export function find_obj(target_str, fs) {
  if (target_str.startsWith('/') || target_str.startsWith('~/')) {
    fs = find_root(fs);
    target_str = target_str.startsWith('/') ? target_str.slice(1) : target_str.slice(2);
  }
  if (target_str.startsWith('../')) {
    fs = fs.parentDirectory ? fs.parentDirectory : fs;
    target_str = target_str.slice(2);
  }
  if (target_str.includes('/')) {
    const path = target_str.split('/');
    let currentObj = fs;
    for (const dir of path) {
      if (dir === '') {
        continue;
      }
      currentObj = find_obj(dir, currentObj);
      if (!currentObj) {
        break;
      }
    }
    return currentObj;
  }
  else {
    if (fs instanceof Directory) {
      if (target_str === fs.name) {
        return target_str
      }
      const currentObj = fs.content.find((obj) => find_id(obj) === target_str);
      return currentObj;
    }
    for (const key in fs) {
      if (key === target_str) {
        return fs[key];
      }
      if (typeof fs[key] === 'object') {
        const result = find_obj(target_str, fs[key]);
        if (result) {
          return result;
        }
      }
      if (find_id(fs[key]) === target_str) {
        return fs;
      }
    }
    return null;
  }
}

export function find_id(obj) {
  if (typeof obj === 'string'){
    return obj;
  }
  if (obj instanceof Directory) {
    return obj.name;
  }
  for (const key in obj) {
    if (key === 'parentDirectory') {
      continue;
    }
    if (typeof obj[key] === 'object') {
      const result = find_id(obj[key]);
      if (result) {
        return result;
      }
    }
    if (['filename', 'id', 'uri', 'doi'].includes(key.toLowerCase())) {
      return obj[key];
    }
  }
  if (obj instanceof File) {
    return obj.name;
  }
  return null;
}

export function find_root(fs) {
  if (!fs) {
    return null;
  }
  var target_obj = fs;
  while (target_obj.parentDirectory) {
    target_obj = target_obj.parentDirectory;
  }
  return target_obj;
}


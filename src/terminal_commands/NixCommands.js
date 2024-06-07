import { Command, retrieveObjectsAsString } from './Commands';

export class ExitCommand extends Command {
    constructor(description='Exit the terminal') {
      super(description);
    }
  
    execute(output, args, onWindowClose, fs) {
      output((prevOutput) => [...prevOutput, 'Goodbye!']);
      setTimeout(() => {
        onWindowClose();
      }, 500);
    }
  }
  
  export class ClearCommand extends Command {
      constructor(description='Clear the terminal') {
          super(description);
      }

      execute(output, args, onWindowClose, fs) {
          output([]);
      }
  }

  export function find_key(target_str, fs, match_prefix=false) {
    if (!fs) {
      return null;
    }
    if (target_str.endsWith('/')) {
      target_str = target_str.slice(0, -1);
    }
    console.log(target_str, fs);
    if (target_str.includes('/')) {
      console.log('path');
      const path = target_str.split('/')
      let currentObj = fs;
      for (const dir of path) {
        if (dir === '') {
          continue;
        }
        if (Array.isArray(currentObj)) {
          console.log('array', currentObj);
          currentObj = currentObj.find((obj) => find_id(obj) === dir || (match_prefix && find_id(obj).startsWith(dir)));
        }
        else{
          currentObj = find_obj(dir, currentObj);
        }
        console.log('currentObj', currentObj);
        if (!currentObj) {
          break;
        }
      }
      return target_str.split("/")[target_str.split("/").length -1 ] !== '' ?
       target_str.replace(target_str.split("/")[target_str.split("/").length-1], find_id(currentObj)) : find_id(currentObj);
    }
    else {
      for (const key in fs) {
        if (key === target_str || (match_prefix && key.startsWith(target_str))) {
          console.log('foundada', key);
          return key;
        }
        if (typeof fs[key] === 'object') {
          const result = find_key(target_str, fs[key]);
          if (result) {
            console.log('buba');
            return result;
          }
        }
      }
      return null;
    }
}

export function find_obj(target_str, fs) {
  if (target_str.includes('/')) {
    const path = target_str.split('/');
    let currentObj = fs;
    for (const dir of path) {
      console.log('dir', dir, currentObj);
      if (dir === '') {
        continue;
      }
      currentObj = find_obj(dir, currentObj);
      if (!currentObj) {
        break;
      }
    }
    console.log('slash','currentObj', currentObj);
    return currentObj;
  }
  else {
    for (const key in fs) {
      if (key === target_str) {
        console.log('found', key, fs[key]);
        return fs[key];
      }
      if (typeof fs[key] === 'object') {
        console.log('object', target_str,  key, fs[key]);
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

function find_id(obj) {
  if (typeof obj === 'string'){
    return obj;
  }
  for (const key in obj) {
    if (['filename', 'id', 'uri', 'doi', 'name'].includes(key)) {
      return obj[key];
    }
    if (typeof obj[key] === 'object') {
      const result = find_id(obj[key]);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export class LsCommand extends Command {
  constructor(description='List directory content') {
      super(description);
  }

  execute(output, args, onWindowClose, fs) {
      const res = super.execute(output, args, onWindowClose, fs);
      if (res) {
          return res;
      }
      var target_obj = fs;
      if (args.length > 1) {
          const target_str = args[1].trim();
          target_obj = find_obj(target_str, fs); 
      }
      if (!target_obj) {
          output((prevOutput) => [...prevOutput, 'Directory not found']);
          return;
      }
      const result = Object.keys(target_obj).map((key) => Array.isArray(target_obj)? find_id(target_obj[key]) : key );
      
      output((prevOutput) => [...prevOutput, '', ...result]);
  }
}

export class CatCommand extends Command {
  constructor(description='Concatenate files and print on the standard output') {
      super(description);
  }

  execute(output, args, onWindowClose, fs) {
      const res = super.execute(output, args, onWindowClose, fs);
      if (res) {
          return res;
      }
      var new_output = [];
      for( const arg of args.slice(1)) {
          console.log('arg', arg);
          const target_obj = find_obj(arg, fs);
          console.log('target_obj', target_obj);
          if (!target_obj) {
              output((prevOutput) => [...prevOutput, `File not found: ${arg}`]);
              return;
          }
          new_output = (typeof target_obj === 'object' ? retrieveObjectsAsString([target_obj]) : retrieveObjectsAsString(target_obj));
      }
      if (new_output.length === 0) {
          output((prevOutput) => [...prevOutput, 'File not found']);
          return;
      }
      output((prevOutput) => [...prevOutput, '', ...new_output]);
  }
}

  
  

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

  execute(output, args, onWindowClose, fs) {
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


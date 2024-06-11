import { Directory } from '../../data/data';
import { Command, find_obj, find_key, find_root } from '../Commands';



export class CdCommand extends Command {
    constructor(description='Change directory') {
        super(description);
    }
  
    execute({output, args, onWindowClose, fs, updateFs, rootFs}) {
        const res = super.execute({output, args, onWindowClose, fs});
        if (res) {
            return res;
        }
        if (args.length < 2 ) {
            output((prevOutput) => [...prevOutput, 'cd: missing operand']);
            return;
        }
        if (args[1] === '.' || args[1] === './') {
            return;
        }
        if (args[1] === '/' || args[1] === '~') {
            updateFs(find_root(fs), '~');
            return;
        }

        if (args[1] === '../' || args[1] === '..') {
            const parent = fs.parentDirectory ? fs.parentDirectory : fs;
            updateFs(parent, parent.name === 'root' ? '~' : parent.name);
            return;
        }
        const target_str = args[1].trim();
        const target_key = find_key(target_str, fs);
        if (!target_key) {
            output((prevOutput) => [...prevOutput, `cd: ${target_str}: No such file or directory`]);
            return;
        }
        const target_obj = find_obj(target_key, fs);
        if (!target_obj || !(target_obj instanceof Directory)) {
            output((prevOutput) => [...prevOutput, `cd: ${target_str}: Not a directory`]);
            return;
        }
        updateFs(target_obj, args[1]);
    }
  }
  
  
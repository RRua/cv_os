import { Command, find_obj, find_id, find_root } from '../Commands';
import { Directory, File } from '../../data/data';

export class LsCommand extends Command {
    constructor(description='List directory content') {
        super(description);
    }
  
    execute({output, args, onWindowClose, fs}) {
        const res = super.execute({output, args, onWindowClose, fs});
        if (res) {
            return res;
        }
        var target_obj = fs;
        if (args.length > 1) {
            const target_str = args[1].trim();
            if (['/', '~'].includes(target_str)){
              target_obj = find_root(fs);
            }
            else if (target_str !== '' && target_str !== '.') {
              target_obj = find_obj(target_str, fs); 
            }
        }
        if (!target_obj) {
            output((prevOutput) => [...prevOutput, 'Directory not found']);
            return;
        }
        if (target_obj instanceof File) {
            output((prevOutput) => [...prevOutput, 'This is a file']);
            return;
        }
        if (target_obj instanceof Directory) {
            const result = target_obj.content.map((item) => find_id(item));
            output((prevOutput) => [...prevOutput, ...result]);
            return;
        }
    }
  }
  
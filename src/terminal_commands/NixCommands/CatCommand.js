
import { File } from '../../data/data';
import { Command, find_obj, retrieveObjectsAsString } from '../Commands';

export class CatCommand extends Command {
    constructor(description='Concatenate files and print on the standard output') {
        super(description);
    }
  
    execute({output, args, onWindowClose, fs}) {
        const res = super.execute({output, args, onWindowClose, fs});
        if (res) {
            return res;
        }
        var new_output = [];
        for(const arg of args.slice(1)) {
            const target_obj = find_obj(arg, fs);
            if (!target_obj) {
                new_output.push(`File not found: ${arg}`);
            }
            if (target_obj instanceof File) {
                new_output = [...new_output, ...(retrieveObjectsAsString([target_obj.content]))];
            }
        }
        if (new_output.length === 0) {
            output((prevOutput) => [...prevOutput, 'File not found']);
            return;
        }
        output((prevOutput) => [...prevOutput, '', ...new_output, '']);
    }
  }
import { Command } from '../Commands';


export class PwdCommand extends Command {
    constructor(description='Print name of current/working directory') {
        super(description);
    }
  
    execute({output, args, onWindowClose, fs}) {
        const res = super.execute({output, args, onWindowClose, fs});
        if (res) {
            return res;
        }
        const outputStr = [fs.name === 'root' ? '~' : fs.name];
        var currentDir = fs;
        while (currentDir.parentDirectory) {
            currentDir = currentDir.parentDirectory;
            outputStr.push(currentDir.name === 'root' ? '~' : currentDir.name);
            
        }
        outputStr.reverse();
        output((prevOutput) => [...prevOutput, outputStr.join('/')]);
    }
  }
    
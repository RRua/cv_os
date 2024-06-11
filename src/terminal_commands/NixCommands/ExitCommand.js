import { Command } from '../Commands';


export class ExitCommand extends Command {
    constructor(description='Exit the terminal') {
      super(description);
    }
  
    execute({output, args, onWindowClose, fs, itemKey}) {
      output((prevOutput) => [...prevOutput, 'Goodbye!']);
      setTimeout(() => {
        onWindowClose(null, itemKey);
      }, 500);
    }
  }

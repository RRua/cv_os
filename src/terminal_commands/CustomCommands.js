import { Command } from './Commands';
import { CatCommand } from './NixCommands/CatCommand';


export class SocialsCommand extends Command {
    constructor(description='Print socials') {
        super(description);
    }
  
    execute({output, args, onWindowClose, fs}) {
        const res = super.execute({output, args, onWindowClose, fs});
        if (res) {
            return res;
        }
        new CatCommand().execute({output, args: ['~/socials'], onWindowClose, fs});
    }
    
}
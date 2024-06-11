import { Command } from '../Commands';

export class ClearCommand extends Command {
    constructor(description='Clear the terminal') {
        super(description);
    }

    execute({output, args, onWindowClose, fs}) {
        output([]);
    }
}
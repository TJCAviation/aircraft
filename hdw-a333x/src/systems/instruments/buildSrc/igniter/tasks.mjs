import fs from 'fs';
import { join } from 'path';
import { ExecTask } from '@flybywiresim/igniter';
import { Directories } from '../directories.mjs';

export function getInstrumentsIgniterTasks() {
    const baseInstruments = fs.readdirSync(join(Directories.instruments, 'src'), { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(join(Directories.instruments, 'src', d.name, 'config.json')));

    return baseInstruments.map(({ name }) => {
        const config = JSON.parse(fs.readFileSync(join(Directories.instruments, 'src', name, 'config.json')));
        return new ExecTask(
            name,
            `cd build-a333x && mach build -f ${name}`,
            [
                join('build-a333x/src/systems/instruments/src', name),
                'build-a333x/src/systems/instruments/src/Common',
                join('build-a333x/out/headwindsim-aircraft-a330-300/html_ui/Pages/VCockpit/Instruments/A333X', name),
                ...(config.extraDeps || []),
            ],
        );
    });
}

import fs from 'node:fs/promises';
import type { ArgumentsCamelCase, Argv } from 'yargs';

export const command = 'new';
export const description = 'Create new localization file from master file';

export function builder(yargs: Argv) {
	return yargs
		.option('master', {
			alias: 'm',
			desc: 'Master localization file',
			demandOption: true,
			type: 'string'
		})
		.option('name', {
			alias: 'n',
			desc: 'Name of new localization file',
			demandOption: true,
			type: 'string'
		})
		.usage(`\nExample:\n $0 ${command} -n strings-kz.xml -m strings.xml`);
}

export async function handler({
	name,
	master
}: ArgumentsCamelCase<{
	name: string;
	master: string;
}>) {
	await newLocale({ name, master });
}

async function newLocale(options: { name: string; master: string }) {
	const { name, master } = options;

	try {
		await fs.copyFile(master, name);
		console.log(`${master} was copied to ${name}`);
	} catch (err) {
		console.error(err);
	}
}

#!/usr/bin/env node

import { pbkdf2Sync, randomBytes, createCipheriv } from 'crypto';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceCandidates = [
	resolve(__dirname, '..', 'data', 'mock'),
	resolve(__dirname, '..', 'data'),
];

const sourceDir = sourceCandidates.find((path) => existsSync(path));
const key = process.env.MOCK_DATA_KEY;

if (!sourceDir) {
	console.error('❌ Could not locate server-koa data directory. Tried:');
	sourceCandidates.forEach((path) => console.error(`   - ${path}`));
	process.exit(1);
}

if (!key) {
	console.error('❌ MOCK_DATA_KEY is required to encrypt mock data.');
	process.exit(1);
}

const iterations = 100000;

const toBase64 = (bytes) => bytes.toString('base64');

const encryptPlaintext = (plaintext, passphrase) => {
	const salt = randomBytes(16);
	const iv = randomBytes(12);
	const derivedKey = pbkdf2Sync(passphrase, salt, iterations, 32, 'sha256');

	const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);
	const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
	const authTag = cipher.getAuthTag();
	const packed = Buffer.concat([ciphertext, authTag]);

	return {
		v: 1,
		alg: 'aes-256-gcm',
		kdf: 'pbkdf2-sha256',
		iterations,
		salt: toBase64(salt),
		iv: toBase64(iv),
		data: toBase64(packed),
		generatedAt: new Date().toISOString(),
	};
};

const convertIifeToData = (fileContent, filePath) => {
	try {
		return eval(fileContent);
	} catch (error) {
		throw new Error(`Failed to evaluate IIFE file ${filePath}: ${error.message}`);
	}
};

const isEncryptableIifeFile = (fileName) => {
	if (!fileName.endsWith('.iife.js')) {
		return false;
	}

	return !fileName.endsWith('.init.iife.js');
};

const fileNames = readdirSync(sourceDir).filter(isEncryptableIifeFile);

if (fileNames.length === 0) {
	console.log(`⚠️ No encryptable .iife.js files found in ${sourceDir}`);
	process.exit(0);
}

let encryptedCount = 0;

for (const fileName of fileNames) {
	const sourcePath = join(sourceDir, fileName);
	const encryptedPath = join(sourceDir, fileName.replace('.iife.js', '.enc.json'));

	const fileContent = readFileSync(sourcePath, 'utf8');
	const data = convertIifeToData(fileContent, sourcePath);
	const plaintext = JSON.stringify(data);
	const envelope = encryptPlaintext(plaintext, key);

	writeFileSync(encryptedPath, `${JSON.stringify(envelope, null, 2)}\n`, 'utf8');
	encryptedCount += 1;
	console.log(`✅ Encrypted: ${fileName} -> ${fileName.replace('.iife.js', '.enc.json')}`);
}

console.log(`\n🔐 Encryption complete. Files encrypted: ${encryptedCount}`);

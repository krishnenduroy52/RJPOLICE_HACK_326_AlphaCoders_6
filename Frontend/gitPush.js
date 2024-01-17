#!/usr/bin/env node

const { execSync } = require('child_process');

// This shebang line tells the system to run this script with Node.js

const args = process.argv.slice(2);
const message = args.join(' '); 

if (!message) {
  console.error('Please provide a commit message.');
  process.exit(1);
}

// Git commands
try {
  console.log('Adding changes to the staging area...');
  execSync('git add .');

  console.log('Committing changes...');
  execSync(`git commit -m "${message}"`);

  console.log('Pushing changes to remote repository...');
  execSync('git push');

  console.log('Successfully committed and pushed changes!');
} catch (error) {
  console.error('Error during Git operations:', error.message);
  process.exit(1);
}

import csv2json from 'csvtojson';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const submissions = await csv2json().fromFile('./submissions.csv')
for (const submission of submissions) {
  const name = submission.Name;
  const project = submission['Please select the project you are submitting'];
  const url = submission['URL to Deployed Site (Netlify)'];
  if (project !== "Project 2: Qwirty") {
    continue
  }

  const projectDir = `"./submission-content/${name}/${project}"`;
  console.log(`Downloading submission ${name}: ${url}`)
  try {
    await execPromise(`mkdir -p ${projectDir}`);
    await execPromise(`wget --no-parent --recursive --directory-prefix ${projectDir} ${url}`);
    console.log("Download successful")
  }
  catch (error) {
    console.error("Failed to download")
    console.error(error);
  }
}
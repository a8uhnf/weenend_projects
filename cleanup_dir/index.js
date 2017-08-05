#!/usr/bin/env node
const spawn = require('child_process').spawn;
const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let directory;
let extension;
let flag = true;


rl.question('What directory you want to clean? ', (dir) => {
  console.log(`Thank you for your valuable feedback: ${dir}`);
  directory = dir;
  rl.question('What is the extension?', (ext) => {
    extension = ext;
    console.log(`<<<:Extension ${ext} will be cleared:>>>`);
    rl.question(`Sure want to delete all ${extension} files? (y/n)`, (ans) => {
      console.log(`Thanks for reply >> ${ans}`);
      if (ans === 'y') {
        getAllFileName();
      } else {
        console.log('Nothings');
      }
      rl.close();
    });
  });
});

function getAllFileName() {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return;
    }
    console.log('File Name: >>> ', files)
    if (flag) {
      flag = false;
      files.forEach((file) => {
        if (file.endsWith(extension)) {
          console.log(`${file} will be deleted`);
          console.log('path>>>>', `${directory}/${file}`);
          const del = fs.unlink(`${directory}/${file}`);
          if (del === 0) {
            console.log(`${file} successfully deleted`, del, typeof del);
          } else {
            console.log(`${file}>>> Something went wrong`, del, typeof del);
          }
        }
      });
    }
  });
}

/*
This script is taken from the Jhey Tompkins blog.

For further comments look here:
https://medium.com/@jh3y/how-to-update-all-npm-packages-in-your-project-at-once-17a8981860ea

It contains changes and ideas from Vidur Khanna
https://medium.com/@vidur.khanna

and improvements to get the semver (semantic versioning - https://semver.org/)

The use of the script can be risky in general.
It is important to have backups of the old package.json versions before starting this script.
*/

const fs = require('fs')
const wipeDependencies = () => {
  const file  = fs.readFileSync('package.json')
  const content = JSON.parse(file)
  for (var devDep in content.devDependencies) {
    if (content.devDependencies[devDep].match(/\W+\d+.\d+.\d+-?((alpha|beta|rc)?.\d+)?/g)) {
      content.devDependencies[devDep] = '*';
    }
  }
  for (var dep in content.dependencies) {
    if (content.dependencies[dep].match(/\W+\d+.\d+.\d+-?((alpha|beta|rc)?.\d+)?/g)) {
      content.dependencies[dep] = '*';
    }
  }
  fs.writeFileSync('package.json', JSON.stringify(content))
}

if (require.main === module) {
  wipeDependencies()
} else {
  module.exports = wipeDependencies
}

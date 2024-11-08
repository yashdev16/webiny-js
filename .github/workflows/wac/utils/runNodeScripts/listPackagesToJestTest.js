const args = process.argv.slice(2); // Removes the first two elements
const [packagesWithJestTestsListString, changedPackagesString] = args;

const packagesWithJestTestsList = JSON.parse(packagesWithJestTestsListString);
const changedPackages = JSON.parse(changedPackagesString);

const packagesToJestTest = packagesWithJestTestsList.filter(pkg => {
    return changedPackages.includes(pkg.packageName);
});

console.log(JSON.stringify(Array.from(packagesToJestTest)));

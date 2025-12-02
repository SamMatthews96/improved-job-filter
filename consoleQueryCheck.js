
/* 
to use, simply find and write the selectors for a given site 
in the following format:

container
title-field
company-field

and insert them into selectors. Then run the script to verify
it has 
*/

const selectors = `
`;

const selectorList = selectors.split('\n');
const containerSelector = selectorList[0];
const titleSelector = selectorList[1];
const companySelector = selectorList[2];

const possibleContainers = document.querySelectorAll(containerSelector);
console.log(`possible containers: ${possibleContainers.length}`);
if (possibleContainers.length == 1){
	const container = possibleContainers[0];
	for (let i = 0; i<5; i++){
		const child = container.children[i];
		const title = child.querySelector(titleSelector)?.innerText;
		const company = child.querySelector(companySelector)?.innerText;
		console.log(`title: ${title}`);
		console.log(`company: ${company}`);
	} 
}


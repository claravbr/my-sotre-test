let puppeteer = require('puppeteer');
let reporters = require('jasmine-reporters')

beforeAll(function () {
	var tapReporter = new reporters.JUnitXmlReporter
		({
			savePath: __dirname,
			consolidateAll: false
		});
	jasmine.getEnv().addReporter(tapReporter)
	console.log('Tap reporter configured');
});

describe('Test Case', function () {
	it('Test Item 1 - Share', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/');

		let promise = new Promise(async function (resolve, reject) {
			page.on('dialog', async dialog => {
				console.log(dialog.message());
				console.log('DIALOG');
				let m = dialog.message()
				expect(m).toEqual('The product has been shared!');
				//expect(m).toEqual('Mensaje');
				await dialog.accept();
				await browser.close();
				resolve();
			});
			let share1 = await page.waitForSelector('body > app-root > div > app-product-list > button');
			share1.click();
			await promise;
		})
		return promise;
	});
})
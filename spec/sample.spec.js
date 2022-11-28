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

	it('Test Item 1 - Compartir', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/');

		let promise = new Promise(async function (resolve, reject) {
			page.on('dialog', async dialog => {
				//console.log(dialog.message());
				//console.log('DIALOG');
				let m = dialog.message()
				expect(m).toEqual('The product has been shared!');
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

	it('Test Item 2 - Notificar', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/');

		let promise = new Promise(async function (resolve, reject) {
			page.on('dialog', async dialog => {
				//console.log(dialog.message());
				//console.log('DIALOG');
				let m = dialog.message()
				expect(m).toEqual('You will be notified when the product goes on sale');
				await dialog.accept();
				await browser.close();
				resolve();
			});
			let share1 = await page.waitForSelector('body > app-root > div > app-product-list > div:nth-child(2) > app-product-alerts > p > button');
			share1.click();
			await promise;
		})
		return promise;
	});

	it('Test Item 3 - Ver Producto', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/');

		let promise = new Promise(async function (resolve, reject) {
			page.on('request', async request => {
				//console.log(dialog.message());
				//console.log('DIALOG');
				//let m = dialog.message()
				let m = page.url();
				expect(m).toEqual('http://localhost:4200/products/1');
				//await dialog.accept();
				await browser.close();
				resolve();
			});
			let share1 = await page.waitForSelector('body > app-root > div > app-product-list > div:nth-child(2) > h3 > a');
			share1.click();
			await promise;
		})
		return promise;
	});

	it('Test Item 4 - Listar Productos', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/products/1');

		let promise = new Promise(async function (resolve, reject) {
			page.on('request', async request => {
				//console.log(dialog.message());
				//console.log('DIALOG');
				//let m = dialog.message()
				let m = page.url();
				expect(m).toEqual('http://localhost:4200/');
				//await dialog.accept();
				await browser.close();
				resolve();
			});
			let share1 = await page.waitForSelector('body > app-root > app-top-bar > a:nth-child(1) > h1');
			share1.click();
			await promise;
		})
		return promise;
	});

	it('Test Item 5 - Precios de envio', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/cart');

		let promise = new Promise(async function (resolve, reject) {
			page.on('request', async request => {
				//console.log(dialog.message());
				//console.log('DIALOG');
				//let m = dialog.message()
				let m = page.url();
				expect(m).toEqual('http://localhost:4200/shipping');
				//await dialog.accept();
				await browser.close();
				resolve();
			});
			let share1 = await page.waitForSelector('body > app-root > div > app-cart > p > a');
			share1.click();
			await promise;
		})
		return promise;
	});
})
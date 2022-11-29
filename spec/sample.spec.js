//let performance  = require('perf_hooks');
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
				let m = dialog.message()
				expect(m).toEqual('The product has been shared!');
				await dialog.accept();
				await browser.close();
				resolve();
			});
			console.time(' Compartir')
			let share1 = await page.waitForSelector('body > app-root > div > app-product-list > button');
			share1.click();
			await promise;
			console.timeEnd(' Compartir')
		})
		return promise;
	});

	it('Test Item 2 - Notificar', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/');

		let promise = new Promise(async function (resolve, reject) {
			page.on('dialog', async dialog => {
				let m = dialog.message()
				expect(m).toEqual('You will be notified when the product goes on sale');
				await dialog.accept();
				await browser.close();
				resolve();
			});
			console.time(' Notificar')
			let share1 = await page.waitForSelector('body > app-root > div > app-product-list > div:nth-child(2) > app-product-alerts > p > button');
			share1.click();
			await promise;
			console.timeEnd(' Notificar')
		})
		return promise;
	});

	it('Test Item 3 - Ver Producto', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/');

		let promise = new Promise(async function (resolve, reject) {
			page.on('request', async request => {
				let m = page.url();
				expect(m).toEqual('http://localhost:4200/products/1');
				await browser.close();
				resolve();
			});
			console.time(' Ver Producto')
			let share1 = await page.waitForSelector('body > app-root > div > app-product-list > div:nth-child(2) > h3 > a');
			share1.click();
			await promise;
			console.timeEnd(' Ver Producto')
		})
		return promise;
	});

	it('Test Item 4 - Listar Productos', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/products/1');

		let promise = new Promise(async function (resolve, reject) {
			page.on('request', async request => {
				let m = page.url();
				expect(m).toEqual('http://localhost:4200/');
				await browser.close();
				resolve();
			});
			console.time(' Listar Productos')
			let share1 = await page.waitForSelector('body > app-root > app-top-bar > a:nth-child(1)');
			share1.click();
			await promise;
			console.timeEnd(' Listar Productos')
		})
		return promise;
	});

	it('Test Item 5 - Ver Precios de Envio', async function () {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/cart');

		let promise = new Promise(async function (resolve, reject) {
			page.on('request', async request => {
				let m = page.url();
				expect(m).toEqual('http://localhost:4200/shipping');
				await browser.close();
				resolve();
			});
			console.time(' Ver Precios de Envio')
			let share1 = await page.waitForSelector('body > app-root > div > app-cart > p > a');
			share1.click();
			await promise;
			console.timeEnd(' Ver Precios de Envio')
		})
		return promise;
	});

	it('Test Item 6 - Mostrar Carro', async function () {
		const browser = await puppeteer.launch({ headless: false });
		//Por alguna razon, falla si no se pone el headless false
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/');

		let promise = new Promise(async function (resolve, reject) {
			page.on('request', async request => {
				await page.waitForNavigation();
				let m = page.url();
				expect(m).toEqual('http://localhost:4200/cart');
				await browser.close();
				resolve();
			});
			console.time(' Mostrar Carro')
			let share1 = await page.waitForSelector('body > app-root > app-top-bar > a.button.fancy-button');
			share1.click();
			await promise;
			console.timeEnd(' Mostrar Carro')
		})
		return promise;
	});

	it('Test Item 7 - Añadir Producto al Carro', async function () {
		const browser = await puppeteer.launch({ headless: false });
		//Por alguna razon, falla si no se pone el headless false
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/products/1');

		let promise = new Promise(async function (resolve, reject) {
			page.on('dialog', async dialog => {
				let m = dialog.message()
				expect(m).toEqual('Your product has been added to the cart!');
				await dialog.accept();
				let share1 = await page.waitForSelector('body > app-root > app-top-bar > a.button.fancy-button');
				share1.click();
				await page.waitForNavigation();
				await page.waitForSelector('body > app-root > div > app-cart > div > span:nth-child(1)');
				await browser.close();
				resolve();
			});
			console.time(' Añadir Productos al Carro')
			let share1 = await page.waitForSelector('body > app-root > div > app-product-details > div > button');
			share1.click();
			await promise;
			console.timeEnd(' Añadir Productos al Carro')
		})
		return promise;
	});

	it('Test Item 8 - Comprar Producto', async function () {
		const browser = await puppeteer.launch({ headless: false });
		//Por alguna razon, falla si no se pone el headless false
		const page = await browser.newPage();
		await page.goto('http://localhost:4200/products/1');

		let promise = new Promise(async function (resolve, reject) {
			page.on('dialog', async dialog => {
				await dialog.accept();
				let share1 = await page.waitForSelector('body > app-root > app-top-bar > a.button.fancy-button');
				share1.click();
				await page.waitForNavigation();
				await page.waitForSelector('body > app-root > div > app-cart > div > span:nth-child(1)');
				await page.$eval('#name', el => el.value = 'Julio Caesar');
				await page.$eval('#address', el => el.value = 'Roma');
				await page.waitForSelector('body > app-root > div > app-cart > form > button');
				await browser.close();
				resolve();
			});
			console.time(' Comprar Producto')
			let share1 = await page.waitForSelector('body > app-root > div > app-product-details > div > button');
			share1.click();
			await promise;
			console.timeEnd(' Comprar Producto')
		})
		return promise;
	});
})

/*const puppeteer = require('puppeteer');
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('http://localhost:4200/')

await page.setViewport({ width: 1536, height: 754 })

await page.waitForSelector('body > app-root > app-top-bar > .button')
await page.click('body > app-root > app-top-bar > .button')

await browser.close()*/

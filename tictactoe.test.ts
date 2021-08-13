import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
});

beforeEach(async () => {
    await driver.get('http://localhost:4000')
});

afterAll(async () => {
    await driver.quit()
});

const startGame = async () => {
    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
};

const checkSquare = async (cell, play) => {
    // console.log(cell)
    // console.log(play)
    let square = await (await driver).findElement(By.id(cell));
    await square.click();
    let text = await square.getText();
    // console.log(text)
    expect(text).toEqual(play);
};

test('I can start a game', async () => {
    await startGame();
    
    let buttonArr = await (await driver).findElements(By.id('start-game'));
    expect(buttonArr).toHaveLength(0);
    // await driver.sleep(2000);
    
});

test('X in top left square', async () => {
    await startGame();
    await checkSquare('cell-0', 'X')
    
    // await driver.sleep(2000);
});

// test('O in top center square', async () => {
//     expect(await (await driver).findElement(By.id('cell-1')).getText()).toBe('O');
// });

test('X in the top right square', async () => {
    await startGame();
    await checkSquare('cell-2', 'X');

    // await driver.sleep(2000);
});

test('X in the bottom right square', async () => {
    await startGame();
    await checkSquare('cell-8', 'X');

    // await driver.sleep(2000);
});

test('Check if computer plays O', async () => {
    await startGame();
    await checkSquare('cell-0', "X");

    // const pieceArr = await driver.findElements(By.xpath(`//td[contains(@id, "cell-") and text()="0"]`));
    const pieceArr = await driver.findElements(By.xpath(`//td[contains(@id, 'cell-') and text()='O']`));
  
    console.log(pieceArr);
    
    expect(pieceArr).toHaveLength(1);

    // const pieceArr = await driver.findElements(By.xpath(`//td[contains(@id, 'cell-')]`))

    // let things = []

    // for (let item of pieceArr) {
    //     things.push(await item.getText())
    // }

    // console.log(things)

});
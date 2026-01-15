const getYear = new Date().toISOString().slice(0, 4);
const doc = document;
const year = doc.getElementById("year");
const gameZone = doc.getElementById("gameZone");
const gameContainer = doc.getElementById("gameContainer");
const ctx = gameZone.getContext("2d");
const tilePadding = 4;
const tileSize = 12;
const gameUpdateTimerMS = 5000;
const images = ["x.png", "x.png", "x.png", "x.png"];
const promises = [];
const buttonRectOne = [100, 160, 300, 330];

async function startUp()
{
    console.log("Images loading");
    await loadImages();
    console.log("Images done!");
    await loadJson();
    year.innerHTML = getYear;
    createRect(buttonRectOne[0], buttonRectOne[2], buttonRectOne[1] - buttonRectOne[0], buttonRectOne[3] - buttonRectOne[2], true);
    gameZone.addEventListener("click", function(event)
    {
        const mousePosition = getClickLocation(gameZone, event);
        console.log(`${mousePosition.x}, ${mousePosition.y}`);
        if (clickInBoxOne(mousePosition))
        {
            createImg(Math.random() * 400, Math.random() * 200);
        }
    });
}

function clickInBoxOne(mousePosition)
{
    if (mousePosition.x >= buttonRectOne[0] && mousePosition.x <= buttonRectOne[1] &&
        mousePosition.y >= buttonRectOne[2] && mousePosition.y <= buttonRectOne[3])
        {
            return true;
        }
    return false;
}
async function loadImages()
{
    // await Promise.all(
    //     Array.from(images).map(
    //         (image) => new Promise((resolve) => image.addEventListener("load"), resolve)
    //     )
    // )
    // await Promise.all(
    //     Array.from(images).map(
    //         (image) => new Promise((resolve) => image.addEventListener("load"), resolve)
    //         .then(loaded)
    //     )
    // )
    // const promise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve("loaded");
    //     }, 1000);
    // });
    // promise.then(loaded, failed);

    images.forEach((image) => promises.push(loadImage(image)));


    try {
        //const xImage = await loadImage("x.png");
    }
    catch (error) {
        //console.log("Yo I failed images");
    }
}

function loadImage(imageLocation)
{
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img); 
            console.log("I have resolved");
        }
        img.onerror = reject;
        img.src = imageLocation;
    });
}

function loaded()
{
    console.log("LASDFKASDF");
}
function failed()
{
    console.log("FAILED");
}

async function loadJson()
{

}

function getClickLocation(canvas, event)
{
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
async function draw()
{
    // await Promise.all(
    //     Array.from(document.images).map(
    //     (image) =>
    //         new Promise((resolve) => image.addEventListener("load"), resolve)),
    // ),

    //const img = new Image();
    //img.sourg
    
    //ctx.drawImage(img, 0, 0);
}

//draw();

function createTiles()
{
    for (let y = tilePadding; y < gameZone.getAttribute("height") - tilePadding; y += tileSize + tilePadding)
    {
        for (let x = tilePadding; x < gameZone.getAttribute("width") - tilePadding; x += tileSize + tilePadding)
        {
                createImg(x, y);
                if (Math.random() < .3)
                {
                    //createImg(x, y);
                }
        }
    }
}

function createImg(x, y)
{
    const image = new Image(4, 4);
    image.src = "x.png";
    image.alt = "pixel x";

    ctx.drawImage(image, x, y, 50, 50);
}

function createRect(x, y, w, h, filled = false, color = "black")
{
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    if (filled)
    {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.closePath();

    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Button", x + w / 2, y + h / 2);
}

startUp();

setTimeout(gameUpdate, gameUpdateTimerMS);

function gameUpdate()
{
    let modifier = 1;
    setTimeout(gameUpdate, gameUpdateTimerMS * modifier);

    console.log("I am running gameUpdate");
}
const getYear = new Date().toISOString().slice(0, 4);
const doc = document;
const year = doc.getElementById("year");
const gameZone = doc.getElementById("gameZone");
const gameContainer = doc.getElementById("gameContainer");
const ctx = gameZone.getContext("2d");
const tilePadding = 4;
const tileSize = 12;
const buttons = [];
const gameUpdateTimerMS = 5000;

async function startUp()
{
    await loadImages();
    await loadJson();
    year.innerHTML = getYear.valueOf("year");
    gameZone.addEventListener("click", function(event)
    {
        const mousePosition = getClickLocation(gameZone, event);
        console.log(`${mousePosition.x}, ${mousePosition.y}`);
        createImg(mousePosition.x, mousePosition.y);
    });
}

async function loadImages()
{
    await Promise.all(
        Array.from(doc.images).map(
            (image) =>
                new Promise((resolve) => image.addEventListener("load"), resolve)
        )
    )
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
                //createRect(x, y, tileSize, tileSize, true, "red");
                if (Math.random() < .3)
                {
                    createImg(x, y);
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
}

startUp();

setTimeout(gameUpdate, gameUpdateTimerMS);

function gameUpdate()
{
    let modifier = 1;
    setTimeout(gameUpdate, gameUpdateTimerMS * modifier);

    console.log("I am running gameUpdate");
}
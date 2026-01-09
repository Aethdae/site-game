const getYear = new Date().toISOString().slice(0, 4);
var doc = document;
const year = doc.getElementById("year");
const gameZone = doc.getElementById("gameZone");
const gameContainer = doc.getElementById("gameContainer");
const ctx = gameZone.getContext("2d");
const tilePadding = 4;
const tileSize = 12;
const buttons = [];

function startUp()
{
    year.innerHTML = getYear.valueOf("year");
    createTiles();
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
    let iterator = 0;
    for (let y = tilePadding; y < gameZone.getAttribute("height") - tilePadding; y += tileSize + tilePadding)
    {
        for (let x = tilePadding; x < gameZone.getAttribute("width") - tilePadding; x += tileSize + tilePadding)
        {
                createRect(x, y, tileSize, tileSize, true, "red");
                if (Math.random() < .3)
                {
                    createImg(x, y);
                }
        }
    }
}

function createImg(x, y)
{
    let image = new Image(4, 4);
    image.src = "x.png";
    image.alt = "pixel x";

    ctx.drawImage(image, x, y, 50, 50);
}

function createButtons(x, y, id)
{
    let element = doc.createElement("button");
    element.id = "button" + id;
    element.style.width = tileSize.toString() + "px";
    element.style.height = tileSize.toString() + "px";
    element.style.position = "absolute";
    element.style.left = x.toString() + "px";
    element.style.top = y.toString() + "px";
    element.style.border = "2px white solid";
    element.style.cursor = "pointer";
    element.style.zIndex = "13";
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
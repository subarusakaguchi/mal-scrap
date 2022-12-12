import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://myanimelist.net/info.php?search=%25%25%25&go=relationids&divname=relationGen1",
    { timeout: 0 }
  );

  const ids = await page.evaluate(() => {
    return [...document.querySelectorAll("td > a")].map((anchor) => {
      const id = parseInt(anchor.textContent);
      return `${id}`;
    });
  });

  fs.writeFileSync("animeIds.txt", JSON.stringify(ids), (err) => {
    console.log(err);
  });

  console.log(ids);
  console.log(`Ids count: ${ids.length}`);
  console.log(`Max id: ${Math.max(...ids)}`);

  await browser.close();
})();

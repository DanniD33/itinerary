const puppeteer = require("puppeteer");



const scrapeMerchants = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    const page = await browser.newPage();
    await page.goto("https://www.skymilesshopping.com/b____.htm", {
      waitUntil: "networkidle2",
    });

    // wait for the main groups wrapper
    await page.waitForSelector(".mn_groupsWrap");

    const data = await page.evaluate(() => {
      const groups = document.querySelectorAll(".mn_groupsWrap");

      return Array.from(groups).map(group => {
        const merchants = [];

        const lis = group.querySelectorAll(".mn_groupLists ul li[data-categories]");
        lis.forEach(li => {
          const name = li.querySelector("span.mn_merchName")?.innerText.trim() || "";
          // if rewards are in a span, for example span.mn_merchReward, update this:
          const reward = li.querySelector("span.mn_rebate")?.innerText.trim() || "";

          merchants.push({ name, reward });
        });

        return merchants;
      });
    });

    console.dir(data, { depth: null });

    await browser.close();
  } catch (error) {
    console.error("Error scraping merchants:", error);
  }
};

scrapeMerchants();

// mn_groupsWrap -> mn_groupLists -> ul -> li data-categories="2,3,15,70," -> a href="/me____.htm?gmid=6673" -> span class="mn_merchName" 
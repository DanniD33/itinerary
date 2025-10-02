import puppeteer from "puppeteer";

const getMerchants = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.skymilesshopping.com/b____.htm", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const merchants = await page.evaluate(() => {
    // Fetch the first element with class "mn_merchantGroup"
    const store = document.querySelector(".mn_merchantList");

    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    const listWrapper = store.querySelector(".mn_merchantGroup").innerText;
    const chunked = store.querySelector(".data-merchant-group").innerText;

    return { text, author };
  });

  // Display the quotes
  console.log(merchants);

  // Close the browser
  await browser.close();
};

// Start the scraping
getMerchants();
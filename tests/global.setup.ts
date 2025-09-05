import test from "@playwright/test";
import path from "path";
import filesystem from 'fs';

test('login', async ({ page }) => {
    const storageDir = path.join(__dirname, '../playwrightAuth');
    const storagePath = path.join(storageDir, 'session.json');

    if(!filesystem.existsSync(storageDir)){
        filesystem.mkdirSync(storageDir, {recursive:true});
    }

    //go to login page, enter credentials and click submit

    await page.context().storageState({ path : storagePath })
})
import test from "@playwright/test";
import path from "path";
import filesystem from 'fs';

test('logout', async ({page}) => {
    const storagePath = path.join(__dirname, '../playwrightAuth/session.json');

    if(filesystem.existsSync(storagePath)){
        filesystem.unlinkSync(storagePath);
    }
});
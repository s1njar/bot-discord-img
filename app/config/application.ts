import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @const Process
 */
declare const process : {
    env: {
        BOT_TOKEN: string,
        APP_DEBUG_MODE: boolean,
        IMAGE_BASE_DIR: string
    }
}

/**
 * @export Application
 */
export default {
    botToken: process.env.BOT_TOKEN ?? '',
    debugMode: !!+process.env.APP_DEBUG_MODE ?? false,
    imageBaseDir: process.env.IMAGE_BASE_DIR ?? 'var/images',
}
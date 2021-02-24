import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @const Process
 */
declare const process : {
    env: {
        BOT_TOKEN: string,
        NODE_ENV: boolean,
        IMAGE_BASE_DIR: string,
        IMAGE_TIMEOUT_SLEEP_MS: number
    }
}

/**
 * @export Application
 */
export default {
    botToken: process.env.BOT_TOKEN ?? '',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    imageBaseDir: process.env.IMAGE_BASE_DIR ?? 'var/images',
    imageTimeoutSleepMs: process.env.IMAGE_TIMEOUT_SLEEP_MS ?? 0,
}
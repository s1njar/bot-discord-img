import discord from "discord.js";
import {IEvent} from "../src/core/event/IEvent";
import {IServiceProvider} from "../src/core/provider/IServiceProvider";
import appConfig from './config/application';
import {logger} from "./helper/logger";

/**
 * @class App
 */
export default class App {

    /**
     * @type discord.Client
     */
    public client: discord.Client;

    /**
     * App constructor.
     */
    constructor() {
        this.client = new discord.Client();
    }

    /**
     * Init events.
     *
     * @param events
     * @private
     */
    public initializeEvents(events: IEvent[]) {
        events.forEach((event: IEvent) => {
            event.client = this.client;
            event.init();
        });
    }

    /**
     * Init service providers.
     *
     * @param serviceProviders
     */
    public async initializeServiceProvider(serviceProviders: IServiceProvider[]): Promise<void> {
        const promises = serviceProviders.map(async (serviceProvider: IServiceProvider) => {
            await serviceProvider.register();
        })

        await Promise.all(promises);
    }

    /**
     * Start bot listening.
     */
    public listen() {
        this.client.login(appConfig.botToken)
            .then(value => {
                this.client.on('ready', () => {
                    logger.info(`Logged in as ${this.client.user.tag}!`);
                });
            })
            .catch(reason => {
                console.log(reason)
            });
    }
}
import {IEvent} from "./IEvent";
import discord from "discord.js";

/**
 * @class Event
 */
export class Event implements IEvent {

    /**
     * @type discord.Client
     */
    public client: discord.Client;

    /**
     * Init event.
     */
    public init(): void {};
}
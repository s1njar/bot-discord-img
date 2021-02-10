import discord from "discord.js";
import {Router} from "express";

/**
 * @interface IEvent
 */
export interface IEvent {
    /**
     * @type Router
     */
    client: discord.Client;

    /**
     * Init event.
     */
    init(): void;
}
import discord from "discord.js";

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

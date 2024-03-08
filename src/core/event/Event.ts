import { IEvent } from "./IEvent";
import { Client, Message } from "discord.js";
import stringArgv from "string-argv";

/**
 * @class Event
 */
export class Event implements IEvent {
  /**
   * @type Client
   */
  public client: Client;

  /**
   * @type Message
   */
  protected message: Message;

  /**
   * Init event.
   */
  public init(): void {
    return;
  }

  /**
   * Checks if message matches given content.
   *
   * @param content
   * @protected
   */
  protected containsContent(content: string): boolean {
    return this.message.content === content;
  }

  /**
   * Checks if message matches given content.
   *
   * @param content
   * @protected
   */
  protected containsContentStart(content: string): boolean {
    return this.message.content.startsWith(content);
  }

  /**
   * Returns arguments as list.
   *
   * @protected
   */
  protected getArguments(): string[] {
    return stringArgv(this.message.content);
  }

  /**
   * Returns first argument.
   *
   * @protected
   */
  protected getFirstArgument(): string {
    return this.getArguments()[2] ? this.getArguments()[2] : "";
  }

  /**
   * Checks if message contains image.
   *
   * @protected
   */
  protected containsImage(): boolean {
    return Boolean(this.message.attachments.size);
  }

  /**
   * Checks if message contains given role by name.
   *
   * @param roleName
   * @protected
   */
  protected containsRole(roleName: string): boolean {
    const isAllowed = !!this.message.member.roles.cache.find(
      (role) => role.name === roleName
    );

    if (!isAllowed) {
      this.message.channel
        .send(`You need "${roleName}" role to run this command`)
        .then(null);
    }

    return isAllowed;
  }

  /**
   * Checks if message comes from this bot.
   *
   * @protected
   */
  protected fromThisBot(): boolean {
    return this.message.author.id === this.client.user.id;
  }
}

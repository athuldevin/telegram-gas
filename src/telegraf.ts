import * as tg from "./core/types/typegram";
import * as tt from "./telegram-types";
import { Composer } from "./composer";
import ApiClient from "./core/network/client";
import { compactOptions } from "./core/helpers/compact";
import Context from "./context";
import { generateCallback } from "./core/network/webhook";
import Telegram from "./telegram";

const DEFAULT_OPTIONS: Telegraf.Options<Context> = {
  telegram: {},
  handlerTimeout: 90_000, // 90s in ms
  contextType: Context,
};

function always<T>(x: T) {
  return () => x;
}
// eslint-disable-next-line
export namespace Telegraf {
  export interface Options<TContext extends Context> {
    contextType: new (
      ...args: ConstructorParameters<typeof Context>
    ) => TContext;
    handlerTimeout: number;
    telegram?: Partial<ApiClient.Options>;
  }

  export interface LaunchOptions {
    dropPendingUpdates?: boolean;
    /** List the types of updates you want your bot to receive */
    allowedUpdates?: tt.UpdateType[];
    /** Configuration options for when the bot is run via webhooks */
    webhook?: {
      /** Public domain for webhook. If domain is not specified, hookPath should contain a domain name as well (not only path component). */
      domain?: string;
    };
  }
}

// eslint-disable-next-line import/export
export class Telegraf<C extends Context = Context> extends Composer<C> {
  private readonly options: Telegraf.Options<C>;
  /** Set manually to avoid implicit `getMe` call in `launch` or `webhookCallback` */
  public botInfo?: tg.UserFromGetMe;
  public telegram: Telegram;
  readonly context: Partial<C> = {};

  constructor(token: string, options?: Partial<Telegraf.Options<C>>) {
    super();
    // @ts-expect-error
    this.options = {
      ...DEFAULT_OPTIONS,
      ...compactOptions(options),
    };
    this.telegram = new Telegram(token);
    Logger.log("Created a `Telegraf` instance");
  }

  private get token() {
    return this.telegram.token;
  }

  webhookCallback(e: any) {
    return generateCallback((update: tg.Update) => this.handleUpdate(update))(
      e
    );
  }

  /**
   * @see https://github.com/telegraf/telegraf/discussions/1344#discussioncomment-335700
   */
  async launch(config: Telegraf.LaunchOptions = {}) {
    Logger.log("Connecting to Telegram");
    this.botInfo || (this.botInfo = await this.telegram.getMe());
    Logger.log(`Launching @${this.botInfo.username}`);

    await this.telegram.setWebhook(`https://${config?.webhook?.domain}`, {
      drop_pending_updates: config.dropPendingUpdates,
      allowed_updates: config.allowedUpdates,
    });
    Logger.log(`Bot started with webhook @ https://${config.webhook?.domain}`);
  }

  stop(reason = "unspecified") {
    Logger.log("Stopping bot... Reason:", reason);
    // https://github.com/telegraf/telegraf/pull/1224#issuecomment-742693770
  }

  private botInfoCall?: Promise<tg.UserFromGetMe>;
  async handleUpdate(update: tg.Update) {
    this.botInfo ||
      (this.botInfo = await (this.botInfoCall ||
        (this.botInfoCall = this.telegram.getMe())));
    Logger.log("Processing update", update.update_id);
    const tg = new Telegram(this.token);
    const TelegrafContext = this.options.contextType;
    const ctx = new TelegrafContext(update, tg, this.botInfo);
    Object.assign(ctx, this.context);
    try {
      await Promise.resolve(this.middleware()(ctx, always(Promise.resolve())));
    } catch (err) {
      Logger.log(err);
      return;
    } finally {
      Logger.log("Finished processing update", update.update_id);
    }
  }
}

import * as tg from "./core/types/typegram";
import * as tt from "./telegram-types";
import { Composer } from "./composer";
import ApiClient from "./core/network/client";
import Context from "./context";
import Telegram from "./telegram";
export declare namespace Telegraf {
    interface Options<TContext extends Context> {
        contextType: new (...args: ConstructorParameters<typeof Context>) => TContext;
        handlerTimeout: number;
        telegram?: Partial<ApiClient.Options>;
    }
    interface LaunchOptions {
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
export declare class Telegraf<C extends Context = Context> extends Composer<C> {
    private readonly options;
    /** Set manually to avoid implicit `getMe` call in `launch` or `webhookCallback` */
    botInfo?: tg.UserFromGetMe;
    telegram: Telegram;
    readonly context: Partial<C>;
    constructor(token: string, options?: Partial<Telegraf.Options<C>>);
    private get token();
    webhookCallback(e: any): Promise<void>;
    /**
     * @see https://github.com/telegraf/telegraf/discussions/1344#discussioncomment-335700
     */
    launch(config?: Telegraf.LaunchOptions): Promise<void>;
    stop(reason?: string): void;
    private botInfoCall?;
    handleUpdate(update: tg.Update): Promise<void>;
}
//# sourceMappingURL=telegraf.d.ts.map
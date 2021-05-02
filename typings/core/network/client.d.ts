import { Telegram, Opts } from "../types/typegram";
declare namespace ApiClient {
    interface Options {
        apiRoot: string;
        /**
         * @default 'bot'
         * @see https://github.com/tdlight-team/tdlight-telegram-bot-api#user-mode
         */
        apiMode: "bot" | "user";
    }
}
declare class ApiClient {
    readonly token: string;
    readonly options: ApiClient.Options;
    constructor(token: string);
    callApi<M extends keyof Telegram>(method: M, payload: Opts<M>): Promise<ReturnType<Telegram[M]>>;
}
export default ApiClient;
//# sourceMappingURL=client.d.ts.map
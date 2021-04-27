import { Telegram, Opts } from "../types/typegram";
import TelegramError from "./error";
import { hasProp, hasPropType } from "../helpers/check";

function includesMedia(payload: Record<string, unknown>) {
  return Object.values(payload).some((value) => {
    if (Array.isArray(value)) {
      return value.some(
        ({ media }) =>
          media && typeof media === "object" && (media.source || media.url)
      );
    }
    return (
      value &&
      typeof value === "object" &&
      ((hasProp(value, "source") && value.source) ||
        (hasProp(value, "url") && value.url) ||
        (hasPropType(value, "media", "object") &&
          ((hasProp(value.media, "source") && value.media.source) ||
            (hasProp(value.media, "url") && value.media.url))))
    );
  });
}

function replacer(_: unknown, value: unknown) {
  if (value == null) return undefined;
  return value;
}

function buildJSONConfig(payload: unknown): Promise<any> {
  return Promise.resolve({
    method: "POST",
    compress: true,
    headers: { "content-type": "application/json", connection: "keep-alive" },
    payload: JSON.stringify(payload, replacer),
  });
}

namespace ApiClient {
  export interface Options {
    apiRoot: string;
    /**
     * @default 'bot'
     * @see https://github.com/tdlight-team/tdlight-telegram-bot-api#user-mode
     */
    apiMode: "bot" | "user";
  }
}

class ApiClient {
  readonly options: ApiClient.Options;

  constructor(readonly token: string) {
    this.options = {
      apiRoot: "https://api.telegram.org",
      apiMode: "bot",
    };
  }

  async callApi<M extends keyof Telegram>(
    method: M,
    payload: Opts<M>
  ): Promise<ReturnType<Telegram[M]>> {
    const { token, options } = this;

    if (!token) {
      throw new TelegramError({
        error_code: 401,
        description: "Bot Token is required",
      });
    }

    Logger.log("HTTP call", method, payload);

    const config: any = includesMedia(payload)
      ? null
      : await buildJSONConfig(payload);
    const apiUrl = `${options.apiRoot}/${options.apiMode}${token}/${method}`;

    const res = await UrlFetchApp.fetch(apiUrl, config);
    Logger.log(res);
    const data = await JSON.parse(res.getContentText());
    if (!data.ok) {
      Logger.log("API call failed", data);
      throw new TelegramError(data, { method, payload });
    }
    return data.result;
  }
}

export default ApiClient;

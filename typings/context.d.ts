import * as tg from './core/types/typegram';
import * as tt from './telegram-types';
import { Deunionize, PropOr, UnionKeys } from './deunionize';
import ApiClient from './core/network/client';
import Telegram from './telegram';
declare type Tail<T> = T extends [unknown, ...infer U] ? U : never;
declare type Shorthand<FName extends Exclude<keyof Telegram, keyof ApiClient>> = Tail<Parameters<Telegram[FName]>>;
export declare class Context<U extends Deunionize<tg.Update> = tg.Update> {
    readonly update: U;
    readonly tg: Telegram;
    readonly botInfo?: tg.UserFromGetMe | undefined;
    readonly state: Record<string | symbol, any>;
    constructor(update: U, tg: Telegram, botInfo?: tg.UserFromGetMe | undefined);
    get updateType(): Extract<UnionKeys<U>, tt.UpdateType>;
    get me(): string | undefined;
    get telegram(): Telegram;
    get message(): PropOr<U, "message", undefined>;
    get editedMessage(): PropOr<U, "edited_message", undefined>;
    get inlineQuery(): PropOr<U, "inline_query", undefined>;
    get shippingQuery(): PropOr<U, "shipping_query", undefined>;
    get preCheckoutQuery(): PropOr<U, "pre_checkout_query", undefined>;
    get chosenInlineResult(): PropOr<U, "chosen_inline_result", undefined>;
    get channelPost(): PropOr<U, "channel_post", undefined>;
    get editedChannelPost(): PropOr<U, "edited_channel_post", undefined>;
    get callbackQuery(): PropOr<U, "callback_query", undefined>;
    get poll(): PropOr<U, "poll", undefined>;
    get pollAnswer(): PropOr<U, "poll_answer", undefined>;
    get myChatMember(): PropOr<U, "my_chat_member", undefined>;
    get chatMember(): PropOr<U, "chat_member", undefined>;
    get chat(): Getter<U, 'chat'>;
    get senderChat(): PropOr<GetUpdateContent<U>, "sender_chat", undefined>;
    get from(): PropOr<GetUpdateContent<U>, "from", undefined>;
    get inlineMessageId(): string | undefined;
    private assert;
    answerInlineQuery(...args: Shorthand<'answerInlineQuery'>): Promise<true>;
    answerCbQuery(...args: Shorthand<'answerCbQuery'>): Promise<true>;
    answerGameQuery(...args: Shorthand<'answerGameQuery'>): Promise<true>;
    answerShippingQuery(...args: Shorthand<'answerShippingQuery'>): Promise<true>;
    answerPreCheckoutQuery(...args: Shorthand<'answerPreCheckoutQuery'>): Promise<true>;
    editMessageText(text: string, extra?: tt.ExtraEditMessageText): Promise<true | (tg.Update.Edited & tg.Message.TextMessage)>;
    editMessageCaption(caption: string | undefined, extra?: tt.ExtraEditMessageCaption): Promise<true | (tg.Update.Edited & tg.Message.CaptionableMessage)>;
    editMessageMedia(media: tg.InputMedia, extra?: tt.ExtraEditMessageMedia): Promise<true | (tg.Update.Edited & tg.Message.AnimationMessage) | (tg.Update.Edited & tg.Message.AudioMessage) | (tg.Update.Edited & tg.Message.DocumentMessage) | (tg.Update.Edited & tg.Message.PhotoMessage) | (tg.Update.Edited & tg.Message.VideoMessage)>;
    editMessageReplyMarkup(markup: tg.InlineKeyboardMarkup | undefined): Promise<true | (tg.Update.Edited & tg.Message)>;
    editMessageLiveLocation(latitude: number, longitude: number, extra?: tt.ExtraEditMessageLiveLocation): Promise<true | (tg.Update.Edited & tg.Message.LocationMessage)>;
    stopMessageLiveLocation(markup?: tg.InlineKeyboardMarkup): Promise<true | (tg.Update.Edited & tg.Message.LocationMessage)>;
    reply(...args: Shorthand<'sendMessage'>): Promise<tg.Message.TextMessage>;
    getChat(...args: Shorthand<'getChat'>): Promise<tg.ChatFromGetChat>;
    exportChatInviteLink(...args: Shorthand<'exportChatInviteLink'>): Promise<string>;
    createChatInviteLink(...args: Shorthand<'createChatInviteLink'>): Promise<tg.ChatInviteLink>;
    editChatInviteLink(...args: Shorthand<'editChatInviteLink'>): Promise<tg.ChatInviteLink>;
    revokeChatInviteLink(...args: Shorthand<'revokeChatInviteLink'>): Promise<tg.ChatInviteLink>;
    kickChatMember(...args: Shorthand<'kickChatMember'>): Promise<true>;
    unbanChatMember(...args: Shorthand<'unbanChatMember'>): Promise<true>;
    restrictChatMember(...args: Shorthand<'restrictChatMember'>): Promise<true>;
    promoteChatMember(...args: Shorthand<'promoteChatMember'>): Promise<true>;
    setChatAdministratorCustomTitle(...args: Shorthand<'setChatAdministratorCustomTitle'>): Promise<true>;
    setChatPhoto(...args: Shorthand<'setChatPhoto'>): Promise<true>;
    deleteChatPhoto(...args: Shorthand<'deleteChatPhoto'>): Promise<true>;
    setChatTitle(...args: Shorthand<'setChatTitle'>): Promise<true>;
    setChatDescription(...args: Shorthand<'setChatDescription'>): Promise<true>;
    pinChatMessage(...args: Shorthand<'pinChatMessage'>): Promise<true>;
    unpinChatMessage(...args: Shorthand<'unpinChatMessage'>): Promise<true>;
    unpinAllChatMessages(...args: Shorthand<'unpinAllChatMessages'>): Promise<true>;
    leaveChat(...args: Shorthand<'leaveChat'>): Promise<true>;
    setChatPermissions(...args: Shorthand<'setChatPermissions'>): Promise<true>;
    getChatAdministrators(...args: Shorthand<'getChatAdministrators'>): Promise<tg.ChatMember[]>;
    getChatMember(...args: Shorthand<'getChatMember'>): Promise<tg.ChatMember>;
    getChatMembersCount(...args: Shorthand<'getChatMembersCount'>): Promise<number>;
    setPassportDataErrors(errors: readonly tg.PassportElementError[]): Promise<true>;
    replyWithPhoto(...args: Shorthand<'sendPhoto'>): Promise<tg.Message.PhotoMessage>;
    replyWithMediaGroup(...args: Shorthand<'sendMediaGroup'>): Promise<(tg.Message.DocumentMessage | tg.Message.AudioMessage | tg.Message.PhotoMessage | tg.Message.VideoMessage)[]>;
    replyWithAudio(...args: Shorthand<'sendAudio'>): Promise<tg.Message.AudioMessage>;
    replyWithDice(...args: Shorthand<'sendDice'>): Promise<tg.Message.DiceMessage>;
    replyWithDocument(...args: Shorthand<'sendDocument'>): Promise<tg.Message.DocumentMessage>;
    replyWithSticker(...args: Shorthand<'sendSticker'>): Promise<tg.Message.StickerMessage>;
    replyWithVideo(...args: Shorthand<'sendVideo'>): Promise<tg.Message.VideoMessage>;
    replyWithAnimation(...args: Shorthand<'sendAnimation'>): Promise<tg.Message.AnimationMessage>;
    replyWithVideoNote(...args: Shorthand<'sendVideoNote'>): Promise<tg.Message.VideoNoteMessage>;
    replyWithInvoice(...args: Shorthand<'sendInvoice'>): Promise<tg.Message.InvoiceMessage>;
    replyWithGame(...args: Shorthand<'sendGame'>): Promise<tg.Message.GameMessage>;
    replyWithVoice(...args: Shorthand<'sendVoice'>): Promise<tg.Message.VoiceMessage>;
    replyWithPoll(...args: Shorthand<'sendPoll'>): Promise<tg.Message.PollMessage>;
    replyWithQuiz(...args: Shorthand<'sendQuiz'>): Promise<tg.Message.PollMessage>;
    stopPoll(...args: Shorthand<'stopPoll'>): Promise<tg.Poll>;
    replyWithChatAction(...args: Shorthand<'sendChatAction'>): Promise<true>;
    replyWithLocation(...args: Shorthand<'sendLocation'>): Promise<tg.Message.LocationMessage>;
    replyWithVenue(...args: Shorthand<'sendVenue'>): Promise<tg.Message.VenueMessage>;
    replyWithContact(...args: Shorthand<'sendContact'>): Promise<tg.Message.ContactMessage>;
    getStickerSet(setName: string): Promise<tg.StickerSet>;
    setChatStickerSet(setName: string): Promise<true>;
    deleteChatStickerSet(): Promise<true>;
    setStickerPositionInSet(sticker: string, position: number): Promise<true>;
    setStickerSetThumb(...args: Parameters<Telegram['setStickerSetThumb']>): Promise<true>;
    deleteStickerFromSet(sticker: string): Promise<true>;
    uploadStickerFile(...args: Shorthand<'uploadStickerFile'>): Promise<tg.File>;
    createNewStickerSet(...args: Shorthand<'createNewStickerSet'>): Promise<true>;
    addStickerToSet(...args: Shorthand<'addStickerToSet'>): Promise<true>;
    getMyCommands(): Promise<tg.BotCommand[]>;
    setMyCommands(commands: readonly tg.BotCommand[]): Promise<true>;
    replyWithMarkdown(markdown: string, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    replyWithMarkdownV2(markdown: string, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    replyWithHTML(html: string, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    deleteMessage(messageId?: number): Promise<true>;
    forwardMessage(chatId: string | number, extra?: {
        disable_notification?: boolean;
    }): Promise<tg.Message>;
    copyMessage(chatId: string | number, extra?: tt.ExtraCopyMessage): Promise<tg.MessageId>;
}
export default Context;
declare type UpdateTypes<U extends Deunionize<tg.Update>> = Extract<UnionKeys<U>, tt.UpdateType>;
export declare type GetUpdateContent<U extends tg.Update> = U extends tg.Update.CallbackQueryUpdate ? U['callback_query']['message'] : U[UpdateTypes<U>];
declare type Getter<U extends Deunionize<tg.Update>, P extends string> = PropOr<GetUpdateContent<U>, P>;
//# sourceMappingURL=context.d.ts.map
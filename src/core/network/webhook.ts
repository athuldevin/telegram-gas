import { Update } from "../types/typegram";

export const generateCallback = (
  updateHandler: (update: Update) => Promise<void>
) => {
  return async (e: any): Promise<void> => {
    let body = e.postData.contents;

    let update: Update;
    try {
      update = JSON.parse(body);
    } catch (error) {
      return;
    }
    await updateHandler(update);
  };
};

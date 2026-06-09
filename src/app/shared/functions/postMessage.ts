export function createPostMessage(message: PostMessageModel) {
  let msg = JSON.stringify(message)

  if (globalThis) {
    try {
      if (globalThis?.webkit?.messageHandlers) {
        globalThis.webkit.messageHandlers[message.type].postMessage(msg);
      }
    } catch (e) {
      console.log("error postMessage for ios", e);
    }

    try {
      if (globalThis[message.type]) {globalThis[message.type].dispatch(msg)}
      else{
        globalThis[message.type] = {
          dispatch: (msg: string) => console.log(`Android [${message.type}]:`, msg),
        };
        globalThis[message.type].dispatch(msg);
      }

    } catch (e) {
      console.log("error postMessage for android", e);
    }
  }
};


export interface PostMessageModel {
  type: string,
  user_id: string,
  name: string
  paymenetOrderId?: string,
  link?: string
}
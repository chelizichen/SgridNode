import _ from "lodash";

/** 
 @method notify
 框架告警，由于框架自身原因，暂时需要手动输入 target 来确保消息能正确推到日志中
 target 需要在中心配置中完成，本地开发为log
*/
export default function notify(target: string, info: string) {
  return new Promise<unknown>((resolve, reject) => {
    if (!target) {
      console.log("notify :: ", info);
      return resolve(true);
    }
    const idx = process.env.SGRID_PROCESS_INDEX;
    const name = process.env.SGRID_SERVANT_NAME;
    if (!idx || !name || !info) {
      return reject("notify: env error");
    }
    fetch(target, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        gridId: idx,
        serverName: name,
        info: info,
      }),
    }).then((res) => resolve(res.json()));
  });
}

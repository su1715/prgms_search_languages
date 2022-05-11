const END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

export default async function request(path) {
  try {
    const response = await fetch(`${END_POINT}${path}`);
    if (!response.ok) throw Error("네트워크 오류");
    return await response.json();
  } catch (e) {
    throw Error(e);
  }
}

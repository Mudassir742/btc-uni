interface IObj {
  [key: string]: string;
}
function objectToURLParams(obj: IObj, prefix = "?") {
  const params = new URLSearchParams(obj);
  return prefix + params.toString();
}

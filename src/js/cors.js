function listen(response) {
  const { responseHeaders } = response;
  const corsList = [{
    name: 'Access-Control-Allow-Origin',
    value: response.initiator,
  }, {
    name: 'Access-Control-Allow-Methods',
    value: 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH',
  }, {
    name: 'Access-Control-Allow-Credentials',
    value: 'true',
  }];
  const hasCors = responseHeaders.find(_ => _.name.toLowerCase() === 'access-control-allow-origin');
  if (!hasCors) {
    responseHeaders.push(...corsList);
  }
  return { responseHeaders };
}
chrome.webRequest.onBeforeSendHeaders.addListener(
  function({ requestHeaders }) {
    return { requestHeaders };
  },
  // filters
  {urls: ['https://*/*', 'http://*/*']},
  // extraInfoSpec
  ['blocking', 'requestHeaders', 'extraHeaders']
);


chrome.webRequest.onHeadersReceived.addListener(listen,
  // filters
  {urls: ['https://*/*', 'http://*/*']},
  // extraInfoSpec
  ['blocking', 'responseHeaders', 'extraHeaders']
);
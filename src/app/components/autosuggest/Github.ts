/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

export class Github {

  url = 'https://api.github.com/search/repositories?q=';

  repos(term) {
    // TODO: include fetch polyfill. Right now use global one from Chrome
    return fetch(`${this.url}${term}`)
      .then(status)
      .then(json)
      .catch(error => {
        console.log(error.message);
        return error.message;
      });
  }
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response.text().then(function(text) {
    throw new Error(text);
  });
}

function text(response) {
  return response.text();
}

function json(response) {
  return response.json();
}

/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />
import { Searchable } from 'Searchable';
const fetch = window.fetch; // TypeScript wasn't finding it in global scope

export class Github implements Searchable<string[]> {

  url = 'https://api.github.com/search/repositories?q=';

  /**
   * @returns a Promise of repository names
   */
  search(query: string): Promise<string[]> {
    // TODO: include fetch polyfill. Right now use global one from Chrome
    return fetch(`${this.url}${query}`)
      .then(status)
      .then(json)
      .then(response => response.items)
      .then(repos => repos.map(repo => repo.name))
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

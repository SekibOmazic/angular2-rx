import { bind } from 'angular2/di';
import { Github } from '../components/autosuggest/github';

//TODO: bind Searchable interface
export const appServicesInjectables = [
  bind('Searchable').toClass(Github)
];

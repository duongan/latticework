import { Injectable } from '@angular/core';
import isoLangs from '../../assets/language.json';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getLanguageName = function(key: string) {
		key = key.slice(0,2);
		var lang = isoLangs[key];
		return lang ? lang.name : undefined;
  }
  
	getLanguageNativeName = function(key: string) {
		key = key.slice(0,2);
		var lang = isoLangs[key];
		return lang ? lang.nativveName : undefined;
	}
}

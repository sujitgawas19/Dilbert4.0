import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

// const apiURL = 'http://dilbertapp.ajency.in/api/data/employees';
  const apiURL = 'http://dilbert.ajency.in/api/data/employees/monthly';
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserDataProvider {

	headers : any;

  constructor(public http: Http) {
    console.log('Hello UserDataProvider Provider');
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-API-KEY', 'wLFnEXuo9j52B5Ylf3JVAA1fAeDMfeVHUpJFTM569YhyyspVrqK4GLCAIeUn');

  }


  getUserData(id, date): Observable<any> {
  	console.log('getUserData function');
	let fetchurl = `${apiURL}?user_id=${id}`;
	 
	if (date) {
      fetchurl += `&month=${date.start_date}&year=${date.end_date}`;
    } 
    console.log(fetchurl);  
    return this.http.get(fetchurl, { headers: this.headers })
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitApiService {

  private gitUrl = "https://api.github.com"

  constructor(private http: HttpClient) { }

  searchUser(name: string){
    const url = this.gitUrl + '/search/users?';
    const queryString = 'q=' + encodeURIComponent('user:' + name);
    const header = {"Accept" : "application/vnd.github.v3+json"}

    return this.http.get(url + queryString, { headers: header}).toPromise();
  }
}

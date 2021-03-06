import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GitApiService {

  private gitUrl = "https://api.github.com";

  constructor(private http: HttpClient) { }

  public async searchUser(name: string) {
    const url = this.gitUrl + '/search/users?';
    const queryString = 'q=' + encodeURIComponent('user:' + name);
    const header = { "Accept": "application/vnd.github.v3+json" }

    return this.http.get(url + queryString, { headers: header }).toPromise();
  }

  public async getrecentCommits(name?: string, page?: number): Promise<any> {
    const url = this.gitUrl + '/search/commits?';
    const today = new Date()
    const startDate = today.getFullYear() + '-01-01';
    const endDate = formatDate(today, 'yyyy-MM-dd', 'en');
    let queryString = 'page=' + page + '&per_page=25';
    if (name) {
      queryString += '&q=' + encodeURIComponent('author:' + name + ' author-date:' + startDate + '..' + endDate + ' sort:author-date-desc');
    } else {
      queryString += '&q=' + encodeURIComponent('author-date:' + endDate + ' sort:author-date-desc');
    }
    const header = { "Accept": "application/vnd.github.cloak-preview+json" }

    return this.http.get(url + queryString, { headers: header }).toPromise();
  }
}

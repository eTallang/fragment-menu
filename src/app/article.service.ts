import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from './article';
import { nameData, articleData } from './data';
import { RandomUser } from './types';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(count: number): Observable<Article[]> {
    return combineLatest(this.getNames(), this.getBodies()).pipe(map((value: [RandomUser, string[]]) => {
      const articles: Article[] = [];
      const names = value[0];
      const bodies = value[1];
      for (let i = 0; i < count; i++) {
        const randomName = names.results[Math.floor(Math.random() * names.results.length)];
        const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
        articles.push({
          title: `${randomName.name.first} ${randomName.name.last}`,
          body: randomBody,
          id: i
        });
      }

      return articles;
    }));
  }

  private getNames(): Observable<RandomUser> {
    if (environment.useHttp) {
      return this.http.get<RandomUser>(`/randomuser/api/?results=${20}`);
    }
    return of(nameData);
  }

  private getBodies(): Observable<string[]> {
    if (environment.useHttp) {
      const article: Observable<string> = this.http.get<string[]>('/baseballipsum/api/?paras=2').pipe(map(texts => texts.join(' ')));
      const requests: Observable<string>[] = [];
      for (let i = 0; i < 5; i++) {
        requests.push(article);
      }

      return combineLatest(requests);
    }
    return of(articleData);
  }
}

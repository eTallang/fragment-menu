import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';

interface RandomUser {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: {
    gender: string;
    email: string;
    phone: string;
    name: {
      first: string;
      last: string;
      title: string;
    }
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(count: number): Observable<Article[]> {
    return combineLatest(this.getNames(count), this.getBodies()).pipe(map((value: [RandomUser, string[]]) => {
      const articles: Article[] = [];
      const names = value[0];
      const bodies = value[1];
      let id = 1;
      names.results.forEach(name => {
        articles.push({
          title: `${name.name.first} ${name.name.last}`,
          body: bodies[Math.floor(Math.random() * bodies.length)],
          id: `article-${id++}`
        });
      });

      return articles;
    }));
  }

  private getNames(count: number): Observable<RandomUser> {
    return this.http.get<RandomUser>(`/randomuser/api/?results=${count}`);
  }

  private getBodies(): Observable<string[]> {
    const article: Observable<string> = this.http.get<string[]>('/baseballipsum/api/?paras=2').pipe(map(texts => texts.join(' ')));
    const requests: Observable<string>[] = [];
    for (let i = 0; i < 5; i++) {
      requests.push(article);
    }

    return combineLatest(requests);
  }
}

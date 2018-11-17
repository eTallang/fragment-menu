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
    return this.http.get<RandomUser>(`/randomuser/api/?results=${20}`);
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

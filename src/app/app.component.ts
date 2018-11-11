import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { ActivatedRoute, Router } from '@angular/router';
import * as scrollToElement from 'scroll-to-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  articles: Article[] = [];
  focusedArticle: Article;
  waitingForArticles = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private articleService: ArticleService
  ) {}

  scrollToArticle(article: Article): void {
    this.focusedArticle = article;
  }

  ngOnInit() {
    this.waitingForArticles = true;
    this.articleService.getArticles(10).subscribe(articles => {
      this.articles = articles;
      this.waitingForArticles = false;
      this.changeDetectorRef.detectChanges();
      scrollToElement(`#${this.route.snapshot.fragment}`, {
        ease: 'in-out-cube',
        duration: 600
      });
      this.getFragmentUpdates();
    });
  }

  setFocusedArticle(article: Article): void {
    this.router.navigate([], {
      fragment: article.id
    });
  }

  private getFragmentUpdates() {
    this.route.fragment.subscribe(fragment => {
      this.focusedArticle = this.articles.find(article => article.id === fragment);
    });
  }
}

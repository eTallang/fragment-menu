import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) scrollContainer: CdkVirtualScrollViewport;
  articles: Article[] = [];
  focusedArticle: Article;
  waitingForArticles = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private changeDetector: ChangeDetectorRef
  ) {}

  scrollToArticle(article: Article): void {
    this.scrollContainer.scrollToIndex(article.id, 'smooth');
  }

  ngOnInit() {
    this.waitingForArticles = true;
    this.articleService.getArticles(20).subscribe(articles => {
      this.articles = articles;
      this.waitingForArticles = false;
      // We have to make sure the list is rendered before we can scroll to the appropriate article
      this.changeDetector.detectChanges();
      this.scrollContainer.scrollToIndex(+this.route.snapshot.fragment);
      this.listenToScrolledIndexChange();
    });
  }

  private listenToScrolledIndexChange(): void {
    this.scrollContainer.scrolledIndexChange.subscribe(index => {
      if (this.articles) {
        this.focusedArticle = this.articles.find(article => article.id === index);
        this.router.navigate([], { fragment: index.toString()});
      }
    });
  }
}

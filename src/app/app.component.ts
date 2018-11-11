import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  articles: Article[] = [];
  focusedArticle: Article;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }
  
  scrollToArticle(article: Article): void {
    this.focusedArticle = article;
    // scrollToElement(`#${article.id}`, {
    //   ease: 'in-out-cube',
    //   duration: 600
    // });
  }

  ngOnInit() {

    this.articleService.getArticles(10).subscribe(articles => {
      this.articles = articles;
      this.getFragmentUpdates();
    });
  }

  private getFragmentUpdates() {
    this.route.fragment.subscribe(fragment => {
      this.focusedArticle = this.articles.find(article => article.id === fragment);
    });
  }
}

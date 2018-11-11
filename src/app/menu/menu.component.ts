import { Component, Input } from '@angular/core';
import { Article } from '../article';
import * as scrollToElement from 'scroll-to-element';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() articles: Article[] = [];
  @Input() focusedArticle: Article;

  distanceToActive(article: Article): number {
    if (this.focusedArticle) {
      const indexOfActiveArticle = this.articles.map(a => a.id).indexOf(this.focusedArticle.id);
      const indexOfCurrentArticle = this.articles.map(a => a.id).indexOf(article.id);
      return Math.abs(indexOfCurrentArticle - indexOfActiveArticle);
    }

    return -1;
  }
}

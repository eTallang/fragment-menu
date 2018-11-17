import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent {
  @Input() article: Article;
  @HostBinding('class.article') articleClass = true;
}

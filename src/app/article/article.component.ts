import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements AfterViewInit {
  @Input() article: Article;

  constructor(private self: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {

  }
}

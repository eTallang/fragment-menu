import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { trigger, transition, animate, keyframes, style, query } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Article } from '../article';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          animate(
            '300ms cubic-bezier(0.2, 0, 0, 1)',
            keyframes([
              style({ opacity: 0, height: 0, offset: 0 }),
              style({ opacity: 1, height: '*', offset: 1 })
            ])
          ),
          { optional: true }
        ),
        query(
          ':leave',
          animate(
            '300ms cubic-bezier(0.2, 0, 0.1, 1)',
            style({ height: 0, opacity: 0 })
          ),
          {
            optional: true
          }
        )
      ])
    ])
  ]
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() articles: Article[] = [];
  @Input() focusedArticle: Article;
  @Output() focusArticle = new EventEmitter<Article>();
  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;
  filteredArticles: Article[] = this.articles;

  ngOnInit() {
    fromEvent(this.filterInput.nativeElement, 'input')
      .pipe(debounceTime(150))
      .subscribe((ev: Event) => {
        const val = this.filterInput.nativeElement.value;
        this.filteredArticles = this.articles.filter(
          article => article.title.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.articles) {
      this.filteredArticles = this.articles;
    }
  }

  distanceToActive(article: Article): number {
    if (this.focusedArticle) {
      const indexOfActiveArticle = this.articles.map(a => a.id).indexOf(this.focusedArticle.id);
      const indexOfCurrentArticle = this.articles.map(a => a.id).indexOf(article.id);
      return Math.abs(indexOfCurrentArticle - indexOfActiveArticle);
    }

    return -1;
  }

  goToElement(article: Article) {
    this.focusArticle.emit(article);
  }
}

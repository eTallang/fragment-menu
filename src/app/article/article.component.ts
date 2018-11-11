import { Component, Input, ElementRef, AfterViewInit, EventEmitter, Output, ViewEncapsulation, HostBinding } from '@angular/core';
import { Article } from '../article';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements AfterViewInit {
  @Input() article: Article;
  @Output() isInFocus = new EventEmitter<Article>();
  @HostBinding('class.article') articleClass = true;
  @HostBinding('attr.id') get id() { return this.article.id; }

  constructor(private self: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    fromEvent(document, 'scroll').pipe(debounceTime(100)).subscribe(scroll => {
      const offsetTop = this.self.nativeElement.offsetTop;
      const elementHeight = this.self.nativeElement.clientHeight;
      const scrollPosition = document.documentElement.scrollTop + 400;
      if (scrollPosition > offsetTop && scrollPosition < (elementHeight + offsetTop)) {
        this.isInFocus.emit(this.article);
      }
    });
  }
}

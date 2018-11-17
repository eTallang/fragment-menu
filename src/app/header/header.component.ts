import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() scrollContainer: CdkVirtualScrollViewport;
  initialHeight = 600;
  calculatedHeight = this.initialHeight;
  expanded = true;
  expansionManuallyToggeled = false;
  get percentageOpen(): number {
    return (this.calculatedHeight - 50) / (this.initialHeight - 50);
  }

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.scrollContainer.elementScrolled().subscribe(() => {
      if (this.expansionManuallyToggeled) {
        this.setTogglehedHeight();
      } else {
        const scrollOffset = this.scrollContainer.measureScrollOffset();
        const height = this.initialHeight - scrollOffset;
        this.calculatedHeight = Math.max(height, 50);

        if (this.calculatedHeight === 50) {
          this.expanded = false;
          this.expansionManuallyToggeled = true;
        }
        this.changeDetector.detectChanges();
      }
    });
  }

  toggleExpansion() {
    this.expansionManuallyToggeled = true;
    this.expanded = !this.expanded;
    this.setTogglehedHeight();
  }

  setTogglehedHeight(): void {
    this.calculatedHeight = this.expanded ? 600 : 50;
  }
}

import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const entriesMap = new WeakMap();
const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    if (entriesMap.has(entry.target)) {
      const fittextDirective = entriesMap.get(entry.target);
      fittextDirective._onElementResize(entry);
    }
  }
});

@Directive({
  selector: '[fittext]'
})
export class FittextDirective implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @Input() fittext?= true;
  @Input() compression?= 1;
  @Input() activateOnResize?= true;
  @Input() minFontSize?: number | 'inherit' = 0;
  @Input() maxFontSize?: number | 'inherit' = Number.POSITIVE_INFINITY;
  @Input() throttleTime = 100;
  @Input() innerHTML: string = '';
  @Input() fontUnit?: 'px' | 'em' | string = 'px';

  private fittextParent: HTMLElement | null;
  private fittextElement: HTMLElement;
  private fittextMinFontSize: number | string | undefined = 0;
  private fittextMaxFontSize: number | string | undefined = 0;
  private computed: CSSStyleDeclaration;
  private newlines: number;
  private lineHeight: string;
  private display: string;
  private calcSize = 10;
  private resizeTimeout: number = 0;
  private changeSize$ = new Subject<void>();
  private changeSizeSub: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.fittextElement = el.nativeElement;
    this.fittextParent = this.fittextElement.parentElement;
    this.computed = window.getComputedStyle(this.fittextElement);
    this.newlines = this.fittextElement.childElementCount > 0 ? this.fittextElement.childElementCount : 1;
    this.lineHeight = this.computed.lineHeight;
    this.display = this.computed['display'];

    entriesMap.set(this.fittextElement, this);
    ro.observe(this.fittextElement);

    const throttleConfig = {
      leading: false,
      trailing: true
    }

    this.changeSizeSub = this.changeSize$.pipe(throttleTime(this.throttleTime, undefined, throttleConfig)).subscribe(() => {
      console.log('setFontSize');
      if (this.activateOnResize) {
        this.setFontSize();
      }
    });
  }

  private _onElementResize(): void {
    this.changeSize$.next();
  };

  public ngOnInit() {
    this.fittextMinFontSize = this.minFontSize === 'inherit' ? this.computed.fontSize : this.minFontSize;
    this.fittextMaxFontSize = this.maxFontSize === 'inherit' ? this.computed.fontSize : this.maxFontSize;
  }

  public ngAfterViewInit() {
    this.setFontSize();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['compression'] && !changes['compression'].firstChange) {
      this.setFontSize();
    }
    if (changes['innerHTML']) {
      this.fittextElement.innerHTML = this.innerHTML;
      if (!changes['innerHTML'].firstChange) {
        this.setFontSize();
      }
    }
  }

  private setFontSize(): void {
    if (this.fittextElement.offsetHeight * this.fittextElement.offsetWidth !== 0) {
      // reset to default
      this.setStyles(this.calcSize, 1, 'inline-block');
      // set new
      this.setStyles(this.calculateNewFontSize(), this.lineHeight, this.display);
    }
  };

  private calculateNewFontSize2() {
    const ratio = this.fittextElement.offsetHeight / this.fittextElement.offsetWidth;
  }

  private calculateNewFontSize(): number {
    const ratio = (this.calcSize * this.newlines) / this.fittextElement.offsetWidth / this.newlines;

    const parentPaddingLeft = parseFloat(getComputedStyle(this.fittextParent as any).paddingLeft);
    const parentPaddingRight = parseFloat(getComputedStyle(this.fittextParent as any).paddingRight);
    const horizontalSpace = (this.fittextParent?.offsetWidth || 0) - (parentPaddingLeft + parentPaddingRight);
    const calculatedMinFontSize = Math.min((horizontalSpace - 6) * ratio * (this.compression || 0), +(this.fittextMaxFontSize || 0));

    return Math.max(calculatedMinFontSize, +(this.fittextMinFontSize || 0));
  };

  private setStyles(fontSize: number, lineHeight: number | string, display: string): void {
    this.renderer.setStyle(this.fittextElement, 'fontSize', fontSize.toString() + this.fontUnit);
    this.renderer.setStyle(this.fittextElement, 'lineHeight', lineHeight.toString());
    this.renderer.setStyle(this.fittextElement, 'display', display);
  };

  ngOnDestroy() {
    ro.unobserve(this.fittextElement);
    entriesMap.delete(this.fittextElement);
    this.changeSizeSub.unsubscribe();
  }
}
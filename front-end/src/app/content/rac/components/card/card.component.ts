import { Component, OnInit, Input, HostBinding, ElementRef, Renderer2, } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() title: string;
    @Input() cardClass = '';
    @Input() fullheight = false;
    @Input() header = false;
    @Input() actions: any;

    collapsed = false;
    extended = false;

    constructor(
        private _el: ElementRef,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
    }

    collapse(): void {
        this.collapsed = !this.collapsed;
    }

    remove(): void {
        this.renderer.removeChild(this._el.nativeElement, this._el.nativeElement);
    }

    toggleFullscreen(): void {
        if (!this.extended) {
            document.body.classList.add('fullscreen-mode');
            this.renderer.addClass(this._el.nativeElement.children[0], 'card-fullscreen');
            this.extended = true;
        } else {
            document.body.classList.remove('fullscreen-mode');
            this.renderer.removeClass(this._el.nativeElement.children[0], 'card-fullscreen');
            this.extended = false;
        }
    }

}

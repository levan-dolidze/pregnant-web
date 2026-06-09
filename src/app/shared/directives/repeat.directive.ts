import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[repeat]',
})
export class RepeatDirective implements OnInit {
    @Input('repeat') qty: number = 0;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit() {

        for (let i = 0; i < this.qty; i++) {
            const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
            const el: HTMLElement = embeddedViewRef.rootNodes[0];
            el.id = `repeat-${i}`;
        }
    }
}

import { ComponentRef, Directive, EmbeddedViewRef, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef, inject } from "@angular/core";
import { Loader } from "./loader";

@Directive({
  selector: '[loading]'
})
export class LoadingDirective implements OnInit, OnChanges {
  private readonly templateRef = inject(TemplateRef);
  private readonly vcRef = inject(ViewContainerRef);
  @Input() loading = false;
  templateView!: EmbeddedViewRef<any>;
  loaderRef!: ComponentRef<Loader>;
 
  ngOnInit() {
    this.templateView = this.templateRef.createEmbeddedView({});
    this.loaderRef = this.vcRef.createComponent(Loader, {
      injector: this.vcRef.injector,
      projectableNodes: [this.templateView.rootNodes],
    });
    this.loaderRef.setInput('loading', this.loading);
  }
 
  ngOnChanges() {
    this.loaderRef?.setInput('loading', this.loading);
  }
}
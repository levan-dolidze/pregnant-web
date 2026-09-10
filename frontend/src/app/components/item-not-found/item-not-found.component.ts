import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

export interface NotFoundMessage {
  title:string,
  subTitle:string
}
@Component({
  selector: 'app-item-not-found',
  imports: [TranslocoModule],
  styles: `

  @use "../../../assets/scss/variables" as *;
  @use "../../../assets/scss/mixins" as *;

.item-not-found {
  display: grid;
  &__content {
    display: grid;
    grid-gap: 10px;
    place-self: center; 
    text-align: center;
    margin-top:30px;
  }

  &__icon-box {
     @include iconFrame(40px, 40px);
    place-self: center; 
            background-size: 20px 15px;
            background-color: $pink-1;
  }
  &__title {
    margin-bottom: 8px;

    p {
            @include font(16px, 700, var(--black-white), $font-default);
    }
  }
  &__subtitle {
    p {
            @include font(12px, 700, var(--label), $font-default);
    }
  }
}
  `,

  template: `
    <ng-container *transloco="let t">

      @if(source){

      <div class="item-not-found">
        <div class="item-not-found__content">

        <div class="item-not-found__icon-box"></div>

        <div class="item-not-found__title">
          <p>{{ source.title }}</p>
        </div>

        <div class="item-not-found__subtitle">
          <p>{{source.subTitle }}</p>
        </div>
        </div>

      </div>
      }
    </ng-container>`
})
export class ItemNotFoundComponent {

  @Input() source:NotFoundMessage;
}

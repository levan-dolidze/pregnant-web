import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from 'src/app/components/input/input.component';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { ContactService } from './data-access/contact.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { ButtonComponent } from 'src/app/components/button/button.component';


@Component({
  selector: 'app-contact',
  imports: [InputComponent, TextAreaComponent, LoadingDirective, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [ContactService],

})
export class ContactComponent implements OnInit {



  readonly contactService = inject(ContactService);
  readonly contactInfoState = this.contactService.contactInfoState;
  readonly contactState = this.contactService.contact;
  readonly loading = this.contactService.laoding;

  ngOnInit(): void {



  }



}

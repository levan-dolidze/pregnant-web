import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from 'src/app/components/input/input.component';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { ContactService } from './data-access/contact.service';


@Component({
  selector: 'app-contact',
  imports: [InputComponent, TextAreaComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent  implements OnInit{



  readonly ContactService = inject(ContactService)

ngOnInit(): void {

  this.ContactService.getContactInfo().subscribe({
    next:((er)=>{
      console.log(er)

    })
  })
  
}



}

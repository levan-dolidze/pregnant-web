import { Component } from '@angular/core';
import { InputComponent } from 'src/app/components/input/input.component';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';

@Component({
  selector: 'app-contact',
  imports: [InputComponent, TextAreaComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {}

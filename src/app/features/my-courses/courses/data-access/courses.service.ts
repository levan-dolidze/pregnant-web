import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  //get 
  arr = [
    {
      chapter: 'intro',
      sections: [
        { name: 'who_am_i' },
        { name: 'what_you_will_learn' }
      ]
    },
    {
      chapter: 'childNutrition',
      sections: [
        { name: 'who_am_i' },
        { name: 'what_you_will_learn' }
      ]
    }
  ]

  //getBy

  

}

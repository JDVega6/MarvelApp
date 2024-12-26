import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent {

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }

  search(txt:string)
  {
    this.router.navigate(['home', {query:txt}] );
  }
}

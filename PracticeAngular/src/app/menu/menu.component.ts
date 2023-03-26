import { Component, OnInit } from '@angular/core';
import { ApiCallServiceService } from '../Shared/api-call-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private apicall:ApiCallServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.apicall.gotoMenu(localStorage.getItem('token')).subscribe(res =>{
        if(res){
             console.log("we are in menu")
        }
        else{
          console.log("something went wrong..")
        }
      })
    }
  }

}

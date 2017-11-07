import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesRows : Array<any>;
  constructor(private _tokenService: Angular2TokenService) { 

  }

  ngOnInit() {
    this._tokenService.request({
      method: "GET",
      url:    'http://localhost:3000/teachers/courses'
    })
    .subscribe(
        res =>  {
            var data = res.json()
            var i,j
            var chunk = 4;
            this.coursesRows = []
            for (i = 0; i < data.length; i += chunk) {
                var row = []
                for (j = i; j < i + chunk && j < data.length; ++j){
                    row.push(data[j])
                }
                this.coursesRows.push(row)
                // do whatever
            }
            
        },
        error =>    console.log(error)
        );
  }

}

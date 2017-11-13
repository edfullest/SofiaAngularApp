import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
	coursesRows : Array<Array<any>>;
	query : string;
  title : string = "Resultados para ";
  constructor(private _tokenService: Angular2TokenService, 
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.query = params['query'];
  		console.log(this.query);
  		this.loadCourses();
  	});
  }

  loadCourses(){
  	var data = {
  		"query" : this.query
  	}
  	this._tokenService.request({
      method: "POST",
      url:    'http://localhost:3000/courses/search',
      body:   data
    }).subscribe(
      res => {
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
            }
      },
      error => console.log(error)
    )
  }

    register(courseID){
      this._tokenService.post('/students/courses/' + courseID, {}).subscribe(
          res => {
            console.log(res)
            this.router.navigate(['student/dashboard/courses']);

          },
          error => console.log(error)
      )
    
  }
}

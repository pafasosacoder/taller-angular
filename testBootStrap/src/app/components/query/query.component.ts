import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BackEndService } from 'src/app/shared/services/back-end.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  firstName: string;

  constructor(private backEndService: BackEndService) { }

  ngOnInit(): void {
    this.backEndService.getData().subscribe(data => {
       console.log(`datos son:  ${data.firstName} `);
       this.firstName = data.firstName;
    });
  }

}

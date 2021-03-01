import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService} from 'src/app/services/heroes.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent implements OnInit {

  heroes:any[] = [];
  termino: string;


  constructor( private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService) {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params =>  {
      this.termino = params['value'];
      this.heroes = this.heroesService.buscarHeroes(params['value']);
      console.log(this.heroes);
      
    })


  }

  verHeroe(idx: number) {

  }


}

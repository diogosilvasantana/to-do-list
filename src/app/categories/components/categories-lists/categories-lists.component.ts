import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListModel } from '../../models/list';
import { ListService } from '../../services/lists.service';


@Component({
  selector: 'app-categories-lists',
  templateUrl: './categories-lists.component.html',
  styleUrls: ['./categories-lists.component.scss']
})
export class CategoriesListsComponent implements OnInit {

  public list: ListModel[];

  constructor(
    private listService: ListService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getList()
  }

  public getList(): void{
    this.listService.getList(this.route.snapshot.params['idCategory'])
      .subscribe(result => {
        this.list = result
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from 'src/app/categories/services/items.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsModel } from 'src/app/categories/models/items';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  constructor(private itemsService: ItemsService, private route: ActivatedRoute) { }

  public idCategory = this.route.snapshot.params['idCategory'];
  public idList = this.route.snapshot.params['idList'];
  public idItem = this.route.snapshot.params['idItem'];

  public items: ItemsModel[]

  ngOnInit() {
    this.getItems()
  }

  public getItems(): void{
    this.itemsService.getItem(this.idCategory, this.idList)
      .subscribe(result => {
        this.items = result
        console.log(this.items)
    })
  }

  // public addItem(): void {
  //   this.itemsService.postItem(this.categoria).subscribe(result => {
  //     console.log(result)
  //   })
  // }
}

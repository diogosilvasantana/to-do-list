import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsGridComponent } from './list-items-grid.component';

describe('ListItemsGridComponent', () => {
  let component: ListItemsGridComponent;
  let fixture: ComponentFixture<ListItemsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

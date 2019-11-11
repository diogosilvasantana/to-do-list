import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListsGridComponent } from './categories-lists-grid.component';

describe('CategoriesListsGridComponent', () => {
  let component: CategoriesListsGridComponent;
  let fixture: ComponentFixture<CategoriesListsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesListsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

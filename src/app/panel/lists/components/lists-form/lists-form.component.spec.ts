import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListsFormComponent } from './categories-lists-form.component';

describe('CategoriesListsFormComponent', () => {
  let component: CategoriesListsFormComponent;
  let fixture: ComponentFixture<CategoriesListsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesListsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

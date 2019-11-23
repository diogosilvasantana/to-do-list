import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListsConfirmDialogComponent } from './categories-lists-confirm-dialog.component';

describe('CategoriesListsConfirmDialogComponent', () => {
  let component: CategoriesListsConfirmDialogComponent;
  let fixture: ComponentFixture<CategoriesListsConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesListsConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListsConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

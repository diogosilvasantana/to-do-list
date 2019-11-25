import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesConfirmDialogComponent } from './categories-confirm-dialog.component';

describe('CategoriesConfirmDialogComponent', () => {
  let component: CategoriesConfirmDialogComponent;
  let fixture: ComponentFixture<CategoriesConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

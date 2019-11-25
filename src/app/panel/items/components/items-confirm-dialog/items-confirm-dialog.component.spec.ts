import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsConfirmDialogComponent } from './list-items-confirm-dialog.component';

describe('ListItemsConfirmDialogComponent', () => {
  let component: ListItemsConfirmDialogComponent;
  let fixture: ComponentFixture<ListItemsConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemsConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

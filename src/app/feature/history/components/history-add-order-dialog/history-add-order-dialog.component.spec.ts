import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAddOrderDialogComponent } from './history-add-order-dialog.component';

describe('HistoryAddOrderDialogComponent', () => {
  let component: HistoryAddOrderDialogComponent;
  let fixture: ComponentFixture<HistoryAddOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryAddOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAddOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

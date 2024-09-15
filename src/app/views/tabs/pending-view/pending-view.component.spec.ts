import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingViewComponent } from './pending-view.component';

describe('PendingViewComponent', () => {
  let component: PendingViewComponent;
  let fixture: ComponentFixture<PendingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

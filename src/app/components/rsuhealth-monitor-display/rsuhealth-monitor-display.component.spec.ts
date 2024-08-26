import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSUHealthMonitorDisplayComponent } from './rsuhealth-monitor-display.component';

describe('RSUHealthMonitorDisplayComponent', () => {
  let component: RSUHealthMonitorDisplayComponent;
  let fixture: ComponentFixture<RSUHealthMonitorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RSUHealthMonitorDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RSUHealthMonitorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

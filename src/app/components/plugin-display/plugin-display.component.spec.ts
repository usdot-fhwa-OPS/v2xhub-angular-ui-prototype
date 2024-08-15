import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginDisplayComponent } from './plugin-display.component';

describe('PluginDisplayComponent', () => {
  let component: PluginDisplayComponent;
  let fixture: ComponentFixture<PluginDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PluginDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

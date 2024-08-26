import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginDisplayPageComponent } from './plugin-display-page.component';

describe('PluginDisplayPageComponent', () => {
  let component: PluginDisplayPageComponent;
  let fixture: ComponentFixture<PluginDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginDisplayPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PluginDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

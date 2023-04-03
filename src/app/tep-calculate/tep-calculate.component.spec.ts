import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TepCalculateComponent } from './tep-calculate.component';

describe('TepCalculateComponent', () => {
  let component: TepCalculateComponent;
  let fixture: ComponentFixture<TepCalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TepCalculateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TepCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrachaComponent } from './cracha.component';

describe('CrachaComponent', () => {
  let component: CrachaComponent;
  let fixture: ComponentFixture<CrachaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrachaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

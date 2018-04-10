import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserguidComponent } from './userguid.component';

describe('UserguidComponent', () => {
  let component: UserguidComponent;
  let fixture: ComponentFixture<UserguidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserguidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserguidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

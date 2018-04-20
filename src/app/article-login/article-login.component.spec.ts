import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLoginComponent } from './article-login.component';

describe('ArticleLoginComponent', () => {
  let component: ArticleLoginComponent;
  let fixture: ComponentFixture<ArticleLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

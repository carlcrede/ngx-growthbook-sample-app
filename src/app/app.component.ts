import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type FeatureResult, NgxGrowthbookService } from 'ngx-growthbook';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'ngx-sample-app';

  // Observable approach
  featureA$: Observable<FeatureResult<string>> | undefined;

  // Component property approach
  featureC: FeatureResult<boolean> | undefined;

  constructor(
    @Inject(NgxGrowthbookService) public growthbook: NgxGrowthbookService
  ) {
    // Initialize the observable
     this.featureA$ = this.growthbook.evaluateFeature<string>('test-flag', 'default');
    //  // Initialize sync property
     this.featureC = this.growthbook.evaluateFeatureSync<boolean>('test-flag', false);
  }

  async ngOnInit() {
    // this.growthbook.setAttributes({
    //   gbuuid: this.getGrowthbookUUID(),
    //   url: window.location.href,
    // });
    // Subscribe to feature changes if needed
    // this.growthbook.evaluateFeature('ctf-experiments').subscribe(result => {
    //   this.featureC = result as FeatureResult<boolean>;
    // });
  }

  // Template method approach
  getFeature<T>(key: string, defaultValue?: T): FeatureResult<T> {
    return this.growthbook.evaluateFeatureSync<T>(key, defaultValue);
  }

  getGrowthbookUUID() {
    const COOKIE_NAME = 'gbuuid';
    const COOKIE_DAYS = 400; // 400 days is the max cookie duration for chrome

    // use the browsers crypto.randomUUID if set
    const genUUID = (): string => {
      if (window?.crypto?.randomUUID) return window.crypto.randomUUID();
      return ([1e7].concat(-1e3, -4e3, -8e3, -1e11) as number[])
        .reduce((a, b) => a + b, 0)
        .toString(16)
        .replace(/[018]/g, (c: string) =>
          (
            parseInt(c, 10) ^
            (crypto.getRandomValues(new Uint8Array(1))[0] &
              (15 >> (parseInt(c, 10) / 4)))
          ).toString(16)
        );
    };

    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return undefined;
    };
    const setCookie = (name: string, value: string) => {
      const d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * COOKIE_DAYS);
      document.cookie = `${name}=${value};path=/;expires=${d.toUTCString()}`;
    };

    // get the existing UUID from cookie if set, otherwise create one and store it in the cookie
    if (getCookie(COOKIE_NAME)) return getCookie(COOKIE_NAME);

    const uuid = genUUID();
    setCookie(COOKIE_NAME, uuid);
    return uuid;
  }
}

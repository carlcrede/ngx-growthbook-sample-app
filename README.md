# NGX Growthbook Integration

This project demonstrates the integration of Growthbook with Angular using the `ngx-growthbook` library for feature flags and A/B testing.

## Setup

1. Install the package and growthbook:

```bash
npm install ngx-growthbook @growthbook/growthbook
```

2. Configure Growthbook in your `app.config.ts`:

```typescript
import { provideNgxGrowthbook } from "ngx-growthbook";
import { MyEventTrackingService } from "./events.service";
export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxGrowthbook({
      subscribeToChanges: true, // Auto-update features in real-time
      backgroundSync: true, // Sync features in background
      apiHost: "YOUR_API_HOST", // e.g. 'https://cdn.growthbook.io'
      clientKey: "YOUR_CLIENT_KEY",
      enableDevMode: true, // Enable console logging (disable in production)
      trackingService: MyEventTrackingService, // Your analytics service (optional)
    }),
  ],
};
```

## Usage

### 1. Observable Approach

```typescript
export class YourComponent implements OnInit {
  feature$: Observable<FeatureResult<string>>;

  constructor(private growthbook: NgxGrowthbookService) {
    this.feature$ = this.growthbook.evaluateFeature<string>('feature-key', 'default-value');
  }
}
```

### 2. Sync Evaluation

```typescript
export class YourComponent {
  feature: FeatureResult<boolean>;

  constructor(private growthbook: NgxGrowthbookService) {
    this.feature = this.growthbook.evaluateFeatureSync<boolean>('feature-key', false);
  }
}
```

### 3. Template Usage
```html
@if (getFeature('feature-key', false).on) {
  <div>
    Feature is enabled!
  </div>
}
```

### 4. Setting User Attributes
```typescript
this.growthbook.setAttributes({
  id: 'user-123',
  url: window.location.href,
  // ... other attributes
});
```

## Tracking Service

Create a tracking service that implements the `TrackingService` interface to handle experiment tracking:

```typescript
@Injectable({ providedIn: 'root' })
export class EventsService implements TrackingService {
  track(experiment: Experiment, result: ExperimentResult): void {
    // Implement your analytics tracking
    analytics.track('Experiment Viewed', {
      experimentId: experiment.key,
      variationId: result.variationId
    });
  }
}
```

## Features

- Real-time feature updates with `subscribeToChanges`
- Background synchronization with `backgroundSync`
- TypeScript support for feature values
- Integration with analytics through `TrackingService`
- Dev mode for easier debugging

## Best Practices

1. Always provide default values when evaluating features
2. Implement proper error handling
3. Disable `enableDevMode` in production
4. Use TypeScript types for feature values
5. Keep track of feature dependencies in components

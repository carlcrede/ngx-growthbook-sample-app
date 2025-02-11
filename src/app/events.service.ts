import { Injectable } from "@angular/core";
import { FeatureResult, Result } from "ngx-growthbook";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor() {}

  trackEvent(event: string, data: any) {
    console.log('event', event);
    console.log('data', data);
  }

  trackExperiment(experiment: string, result: Result<any>) {
    console.log('experiment', experiment);
    console.log('result', result);
  }

  trackFeature(feature: string, result: FeatureResult<any>) {
    console.log('feature', feature);
    console.log('result', result);
  }
}

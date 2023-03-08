import { Subject } from 'rxjs';

export class UnsubscribeBase<T> {
  destroy$$ = new Subject();
}

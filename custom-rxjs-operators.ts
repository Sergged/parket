import { takeWhile } from 'rxjs/internal/operators';
import { Observable } from 'rxjs'

// Don't forget to implement ngOnDestroy
const untilExist = <T = any>(component) => {
    return (source: Observable<T>) => {
        let isAlive = true;
        const originFunc = component.ngOnDestroy;

        component.ngOnDestroy = () => {
            isAlive = false;
            originFunc();
        }

        return source.pipe(takeWhile(() => isAlive));
    }
}

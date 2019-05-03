import { TestBed } from '@angular/core/testing';
import { AccelerometerServiceService } from './accelerometer-service.service';
describe('AccelerometerServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AccelerometerServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=accelerometer-service.service.spec.js.map
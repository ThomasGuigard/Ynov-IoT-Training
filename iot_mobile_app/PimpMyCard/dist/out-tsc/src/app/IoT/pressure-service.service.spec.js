import { TestBed } from '@angular/core/testing';
import { PressureServiceService } from './pressure-service.service';
describe('PressureServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PressureServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=pressure-service.service.spec.js.map
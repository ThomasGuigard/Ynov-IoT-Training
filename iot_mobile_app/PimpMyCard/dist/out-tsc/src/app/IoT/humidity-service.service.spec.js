import { TestBed } from '@angular/core/testing';
import { HumidityServiceService } from './humidity-service.service';
describe('HumidityServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(HumidityServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=humidity-service.service.spec.js.map
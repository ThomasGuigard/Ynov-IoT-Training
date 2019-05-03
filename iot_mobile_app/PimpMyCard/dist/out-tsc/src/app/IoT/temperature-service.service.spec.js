import { TestBed } from '@angular/core/testing';
import { TemperatureServiceService } from './temperature-service.service';
describe('TemperatureServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TemperatureServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=temperature-service.service.spec.js.map
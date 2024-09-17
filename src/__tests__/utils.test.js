import { translator, formatDate, formatDateProgram, getFullDateCountdown, getTime } from '../services/utils';

// Mock fetch for tests
global.fetch = jest.fn();

describe('Utility Functions', () => {

    describe('translator', () => {
        it('should correctly translate known messages', () => {
            expect(translator("Email already exist")).toBe("Cette adresse e-mail est déjà utilisé");
            expect(translator("Please log to access this ressource")).toBe("Veuillez vous connecter pour accéder à cette page");
        });

        it('should return default message for unknown messages', () => {
            expect(translator("Unknown message")).toBe("Une erreur s\'est produite");
        });
    });

    describe('formatDate', () => {
        it('should format the date correctly with options', () => {
            const dateISO = '2024-08-10T14:30:00';
            const formattedDate = formatDate(dateISO);
            expect(formattedDate).toBe('10/08/2024 14:30'); // Check local format according to your locale settings
        });

        it('should handle invalid date strings gracefully', () => {
            const invalidDate = 'invalid-date';
            const formattedDate = formatDate(invalidDate);
            expect(formattedDate).toBe('Invalid Date');
        });
    });

    describe('formatDateProgram', () => {
        it('should format the date correctly with weekday and options', () => {
            const dateISO = '2024-08-10T14:30:00';
            const formattedDate = formatDateProgram(dateISO);
            expect(formattedDate).toBe('samedi 10/08/2024 14:30'); // Check local format according to your locale settings
        });

        it('should handle invalid date strings gracefully', () => {
            const invalidDate = 'invalid-date';
            const formattedDate = formatDateProgram(invalidDate);
            expect(formattedDate).toBe('Invalid Date');
        });
    });

    describe('getFullDateCountdown', () => {
        it('should format the date as YYYY-MM-DD', () => {
            const dateISO = '2024-08-10T14:30:00';
            const formattedDate = getFullDateCountdown(dateISO);
            expect(formattedDate).toBe('2024-08-10');
        });

        it('should handle invalid date strings gracefully', () => {
            const invalidDate = 'invalid-date';
            const formattedDate = getFullDateCountdown(invalidDate);
            expect(formattedDate).toBe('NaN-NaN-NaN');
        });
    });

    describe('getTime', () => {
        it('should return the correct time in the format "HHhMM"', () => {
            const dateISO = '2024-08-10T14:30:00';
            const time = getTime(dateISO);
            expect(time).toBe('14h30');
        });

        it('should handle midnight correctly', () => {
            const dateISO = '2024-08-10T00:00:00';
            const time = getTime(dateISO);
            expect(time).toBe('00h00');
        });

        it('should handle invalid date strings gracefully', () => {
            const invalidDate = 'invalid-date';
            const time = getTime(invalidDate);
            expect(time).toBe('NaNhNaN');
        });
    });
});

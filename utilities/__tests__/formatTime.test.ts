import formatTime from "../formatTime";

describe('Format time logic', () => {
    it('format 120 seconds to "2:00" minutes', () => {
        const seconds = 120;
        const minutes = formatTime(seconds);
        
        expect(minutes).toBe("2:00");
    })
})
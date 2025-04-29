describe('health', () => {
  it('should return 200', async () => {
    const response = await fetch('http://localhost:3002/health');

    expect(response.status).toBe(200);
  });

  it("should return 'ok'", async () => {
    const response = await fetch('http://localhost:3002/health');
    const data = await response.text();

    expect(data).toBe('ok');
  });
});

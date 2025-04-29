describe("getCharacters", () => {
  let characterId: number;

  beforeEach(async () => {
    const response = await fetch("http://localhost:3002/character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Character",
        episodes: ["episode1", "episode2"]
      })
    });
    const character = await response.json();

    expect(response.status).toBe(201);

    characterId = character.id;
  });

  afterEach(async () => {
    const response = await fetch(`http://localhost:3002/character/${characterId}`, {
      method: "DELETE"
    });

    expect(response.status).toBe(204);
  });

  it("should return 200", async () => {
    const response = await fetch(`http://localhost:3002/character/${characterId}`);
    expect(response.status).toBe(200);
  });

  it("should return a character", async () => {
    const response = await fetch(`http://localhost:3002/character/${characterId}`);
    const data = await response.json();

    expect(data).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      episodes: expect.any(Array),
    }));
    expect(data.episodes.length).toBeGreaterThan(0);
  });

  it("should return characters", async () => {
    const response = await fetch("http://localhost:3002/characters");
    const data = await response.json();

    expect(data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        episodes: expect.any(Array),
      })
    ]));
    expect(data.length).toBeGreaterThan(0);
  });
});

describe("updateCharacter", () => {
  let characterId: number;

  beforeEach(async () => {
    const response = await fetch("http://localhost:3002/character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Character",
        episodes: ["episode1", "episode2"]
      })
    });
    const character = await response.json();

    expect(response.status).toBe(201);

    characterId = character.id;
  });

  afterEach(async () => {
    const response = await fetch(`http://localhost:3002/character/${characterId}`, {
      method: "DELETE"
    });

    expect(response.status).toBe(204);
  });

  it("should update character", async () => {
    const response = await fetch(`http://localhost:3002/character/${characterId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Updated Character",
        episodes: ["episode3", "episode4"],
        planet: "Updated Planet"
      })
    });

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toEqual({
      id: characterId,
      name: "Updated Character",
      episodes: ["episode3", "episode4"],
      planet: "Updated Planet"
    });
  });
});
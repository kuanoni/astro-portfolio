const LIMIT = 9;
const INTERVAL_MS = 1000;

let tokens = LIMIT;
const waiters: Array<() => void> = [];
let started = false;
const cache = new Map<string, any>();

const startRefill = () => {
    if (started) return;
    started = true;
    setInterval(() => {
        tokens = LIMIT;
        while (tokens > 0 && waiters.length) {
            tokens--;
            waiters.shift()!(); // release next waiter
        }
    }, INTERVAL_MS);
}

const acquire = (): Promise<void> => {
    startRefill();
    return new Promise((resolve) => {
        if (tokens > 0) {
            tokens--;
            resolve();
        } else {
            waiters.push(resolve);
        }
    });
}

const fetchJSON = async (url: string): Promise<any> => {
    // Acquire a rate-limit token first
    await acquire();

    const res = await fetch(url, {
        headers: {
            "Accept": "application/json",
            "User-Agent": "AstroSite/1.0 (MagicCardPreview component)",
        },
    });

    if (res.status === 429) {
        const retryAfter = Number(res.headers.get("retry-after") || "1");
        await new Promise((r) => setTimeout(r, Math.max(1000, retryAfter * 1000)));
        return fetchJSON(url);
    }

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Scryfall ${res.status}: ${text || res.statusText}`);
    }
    return res.json();
}

export const getCardByFuzzy = async (name: string) => {
    const key = name.trim().toLowerCase();
    if (cache.has(key)) return cache.get(key);

    const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`;
    const data = await fetchJSON(url);
    cache.set(key, data);
    return data;
}

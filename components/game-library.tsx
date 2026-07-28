"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, games, type GameCategory } from "@/data/games";
import { GameCard } from "./game-card";

export function GameLibrary() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");
  const [category, setCategory] = useState<GameCategory | "전체">(
    categories.some((item) => item.label === initial) ? (initial as GameCategory) : "전체",
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return games.filter((game) => {
      const categoryMatch = category === "전체" || game.category === category;
      const queryMatch =
        !normalized ||
        `${game.title} ${game.description} ${game.tags.join(" ")}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <div>
      <div className="library-tools">
        <label className="search-box">
          <span aria-hidden>⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="룰렛, 여행, 우정 테스트 검색"
            aria-label="게임 검색"
          />
        </label>
        <div className="category-tabs" role="tablist" aria-label="게임 카테고리">
          {categories.map((item) => (
            <button
              key={item.label}
              className={category === item.label ? "active" : ""}
              onClick={() => setCategory(item.label)}
              role="tab"
              aria-selected={category === item.label}
            >
              <span>{item.emoji}</span> {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="library-count">
        <strong>{filtered.length}</strong>개의 게임
        {category !== "전체" && <span> · {category}</span>}
      </div>
      {filtered.length > 0 ? (
        <div className="game-grid library-grid">
          {filtered.map((game) => <GameCard key={game.slug} game={game} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span>🫥</span>
          <h2>딱 맞는 게임을 못 찾았어요</h2>
          <p>검색어를 짧게 바꾸거나 다른 카테고리를 골라보세요.</p>
          <button onClick={() => { setQuery(""); setCategory("전체"); }}>전체 게임 보기</button>
        </div>
      )}
    </div>
  );
}


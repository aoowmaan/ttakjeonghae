"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Game, QuizResult } from "@/data/games";

const starterNames = ["나", "민지", "도윤", "서준"];
const randomIndex = (max: number) => {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const range = 0x1_0000_0000;
    const limit = Math.floor(range / max) * max;
    let value = range;
    while (value >= limit) value = crypto.getRandomValues(new Uint32Array(1))[0];
    return value % max;
  }
  return Math.floor(Math.random() * max);
};
const shuffle = <T,>(items: T[]) => {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
};
const tapFeedback = (duration = 12) => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(duration);
};

function Celebration() {
  return (
    <div className="celebration" aria-hidden>
      {Array.from({ length: 12 }, (_, index) => (
        <i
          key={index}
          style={{
            left: `${7 + index * 7.8}%`,
            animationDelay: `${index * -0.055}s`,
            "--piece-shift": `${(index - 6) * 4}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function NameEditor({
  values,
  onChange,
  label = "참가자",
  placeholder = "이름 입력",
  max = 24,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  max?: number;
}) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const value = draft.trim();
    if (!value || values.length >= max || values.includes(value)) return;
    tapFeedback();
    onChange([...values, value]);
    setDraft("");
  };
  return (
    <div className="name-editor">
      <div className="field-label"><span>{label}</span><b>{values.length}/{max}</b></div>
      <div className="chips">
        {values.map((value, index) => (
          <button key={`${value}-${index}`} className="name-chip" onClick={() => { tapFeedback(); onChange(values.filter((_, i) => i !== index)); }} aria-label={`${value} 삭제`}>
            {value}<span aria-hidden>×</span>
          </button>
        ))}
      </div>
      <div className="input-row">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter") add(); }}
          placeholder={placeholder}
          aria-label={`${label} 추가`}
          autoComplete="off"
          enterKeyHint="done"
        />
        <button onClick={add}>추가</button>
      </div>
    </div>
  );
}

function ResultActions({ text, onReset }: { text: string; onReset: () => void }) {
  const [copied, setCopied] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      tapFeedback(24);
      window.setTimeout(() => actionsRef.current?.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    }
  }, []);
  const share = async () => {
    tapFeedback();
    const shareData = { title: "딱정해 결과", text: `${text}\n딱정해에서 함께 해봐요.`, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    const copyValue = `${shareData.text}\n${shareData.url}`;
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = copyValue;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="result-actions" ref={actionsRef}>
      <Celebration />
      <button className="button-primary" onClick={share}>{copied ? "복사했어요!" : "결과 공유하기"} <span>↗</span></button>
      <button className="button-ghost" onClick={() => { tapFeedback(); onReset(); }}>다시 하기</button>
    </div>
  );
}

function CardsGame({ game }: { game: Game }) {
  const [names, setNames] = useState(starterNames);
  const [roles, setRoles] = useState(game.options ?? []);
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState<"setup" | "shuffling" | "ready">("setup");
  const [winner, setWinner] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [flipped, setFlipped] = useState<number[]>([]);
  const [choosing, setChoosing] = useState<number | null>(null);
  const cards = useMemo(() => (started ? shuffle(names) : names), [started, names]);
  const assignmentMode = (game.options?.length ?? 0) > 1;
  const isRoomPicker = game.slug === "room-picker";
  const canStart = names.length >= 2 && (!assignmentMode || roles.length >= names.length);

  const start = () => {
    if (!canStart) return;
    tapFeedback(18);
    const shuffledNames = shuffle(names);
    if (assignmentMode) {
      const shuffledRoles = shuffle(roles);
      setAssignments(Object.fromEntries(shuffledNames.map((name, index) => [name, shuffledRoles[index % shuffledRoles.length]])));
      setWinner(null);
    } else {
      setAssignments({});
      setWinner(shuffledNames[0]);
    }
    setFlipped([]);
    setChoosing(null);
    setStarted(true);
    setPhase("shuffling");
    window.setTimeout(() => setPhase("ready"), 1650);
  };
  const revealCard = (index: number) => {
    if (choosing !== null || flipped.includes(index)) return;
    tapFeedback(18);
    setChoosing(index);
    window.setTimeout(() => {
      setFlipped((current) => [...current, index]);
      setChoosing(null);
    }, 520);
  };
  if (!started) {
    return (
      <div className="engine-panel">
        <NameEditor values={names} onChange={setNames} />
        {assignmentMode && (
          <div className="role-editor">
            <NameEditor
              values={roles}
              onChange={setRoles}
              label={isRoomPicker ? "방 / 침대 이름" : "배정할 역할"}
              placeholder={isRoomPicker ? "예: 테라스방" : "역할 입력"}
            />
          </div>
        )}
        <button className="button-primary button-full" onClick={start} disabled={!canStart}>운명의 카드 섞기 <span>→</span></button>
        <p className="microcopy">
          {assignmentMode && roles.length < names.length
            ? `참가자 수에 맞게 ${names.length - roles.length}개의 ${isRoomPicker ? "방 또는 자리" : "역할"}을 더 입력해 주세요.`
            : "이름과 입력 내용은 이 기기에 저장되지 않아요."}
        </p>
      </div>
    );
  }
  if (phase === "shuffling") {
    return (
      <div className="engine-panel suspense-stage" aria-live="polite">
        <div className="shuffle-stack" aria-hidden>
          <span /><span /><span />
        </div>
        <small>운명 배분 중</small>
        <h3>카드를 제대로 섞고 있어요</h3>
        <p>지금 바꾸자고 해도 이미 늦었습니다.</p>
        <div className="suspense-dots"><i /><i /><i /></div>
      </div>
    );
  }
  return (
    <div className="engine-panel">
      <div className="game-status"><span>카드가 준비됐어요</span><b>{assignmentMode ? "하나씩 모두 열어주세요" : "한 장을 골라주세요"}</b></div>
      <div className="pick-card-grid">
        {cards.map((name, index) => {
          const isFlipped = flipped.includes(index);
          const isWinner = winner === name;
          const cardResult = assignmentMode ? assignments[name] : isWinner ? game.options?.[0] ?? "당첨!" : "통과";
          return (
            <button
              className={`pick-card ${isFlipped ? "flipped" : ""} ${choosing === index ? "choosing" : ""} ${isFlipped && isWinner ? "winner" : ""}`}
              key={`${name}-${index}`}
              onClick={() => revealCard(index)}
              disabled={isFlipped || choosing !== null || Boolean(winner && flipped.some((flippedIndex) => cards[flippedIndex] === winner))}
              aria-label={`${index + 1}번 카드${choosing === index ? " 여는 중" : ""}`}
            >
              <span className="card-face card-back" aria-hidden={isFlipped}><i>딱!</i><small>{index + 1}</small></span>
              <span className="card-face card-front" aria-hidden={!isFlipped}><strong>{cardResult}</strong><b>{name}</b><em>{assignmentMode || isWinner ? "🎉" : "휴—"}</em></span>
            </button>
          );
        })}
      </div>
      {winner && flipped.some((index) => cards[index] === winner) && (
        <div className="inline-result" aria-live="polite">
          <span>오늘의 결과</span>
          <h3>{winner}</h3>
          <p>{game.options?.[0] ?? "행운의 주인공"}은 바로 당신!</p>
          <ResultActions text={`${game.title}: ${winner}`} onReset={() => setStarted(false)} />
        </div>
      )}
      {assignmentMode && flipped.length === cards.length && (
        <div className="inline-result" aria-live="polite">
          <span>모든 배정이 끝났어요</span>
          <h3>배정 완료!</h3>
          <p>{cards.map((name) => `${name} · ${assignments[name]}`).join(" / ")}</p>
          <ResultActions
            text={`${game.title}\n${cards.map((name) => `${name}: ${assignments[name]}`).join("\n")}`}
            onReset={() => setStarted(false)}
          />
        </div>
      )}
    </div>
  );
}

function WheelGame({ game }: { game: Game }) {
  const [options, setOptions] = useState(game.options ?? ["한식", "일식", "중식", "양식"]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const spin = () => {
    if (options.length < 2 || spinning) return;
    tapFeedback(20);
    const index = randomIndex(options.length);
    const segmentAngle = 360 / options.length;
    const targetAngle = (360 - (index + 0.5) * segmentAngle + 360) % 360;
    const currentAngle = ((rotation % 360) + 360) % 360;
    const delta = (targetAngle - currentAngle + 360) % 360;
    const next = rotation + 1440 + delta;
    setRotation(next);
    setSpinning(true);
    setResult(null);
    window.setTimeout(() => { setSpinning(false); setResult(options[index]); tapFeedback(28); }, 3200);
  };
  const colors = ["#ff5c46", "#ffbf3f", "#8d66ff", "#20a47a", "#2c6ed5", "#ef72a7"];
  const gradient = options.map((_, index) => `${colors[index % colors.length]} ${index * 100 / options.length}% ${(index + 1) * 100 / options.length}%`).join(", ");
  return (
    <div className="engine-panel wheel-layout">
      <div>
        <NameEditor values={options} onChange={setOptions} label="후보" placeholder="후보 입력" max={8} />
        <button className="button-primary button-full" onClick={spin} disabled={options.length < 2 || spinning}>{spinning ? "돌아가는 중…" : "룰렛 돌리기"} <span>↻</span></button>
      </div>
      <div className={`wheel-stage ${spinning ? "is-spinning" : ""}`}>
        <div className="wheel-pointer">▼</div>
        <button
          className="wheel"
          style={{ background: `conic-gradient(${gradient})`, transform: `rotate(${rotation}deg)` }}
          onClick={spin}
          aria-label="룰렛 돌리기"
        >
          <span className="wheel-center">딱!</span>
          <span className="wheel-segment-labels" aria-hidden>
            {options.slice(0, 8).map((option, index) => (
              <i
                key={option}
                style={{
                  "--label-angle": `${(index + 0.5) * 360 / options.length}deg`,
                  "--label-counter-angle": `${-(index + 0.5) * 360 / options.length}deg`,
                } as React.CSSProperties}
              >
                {option.length > 7 ? `${option.slice(0, 7)}…` : option}
              </i>
            ))}
          </span>
        </button>
        {spinning && <div className="wheel-suspense" aria-live="polite">운명이 고르는 중…</div>}
      </div>
      {result && (
        <div className="inline-result full-row" aria-live="polite">
          <span>룰렛의 결정</span><h3>{result}</h3><p>오늘은 이걸로 딱 정했어요.</p>
          <ResultActions text={`${game.title}: ${result}`} onReset={() => setResult(null)} />
        </div>
      )}
    </div>
  );
}

function TeamGame({ game }: { game: Game }) {
  const [names, setNames] = useState(starterNames);
  const [count, setCount] = useState(2);
  const [teams, setTeams] = useState<string[][] | null>(null);
  const makeTeams = () => {
    tapFeedback(18);
    const next = Array.from({ length: count }, () => [] as string[]);
    shuffle(names).forEach((name, index) => next[index % count].push(name));
    setTeams(next);
  };
  return (
    <div className="engine-panel">
      {!teams ? (
        <>
          <NameEditor values={names} onChange={setNames} />
          <div className="segmented-field">
            <span>팀 수</span>
            <div>{[2, 3, 4].map((value) => <button key={value} className={count === value ? "active" : ""} onClick={() => setCount(value)}>{value}팀</button>)}</div>
          </div>
          <button className="button-primary button-full" onClick={makeTeams} disabled={names.length < count}>팀 만들기 <span>→</span></button>
        </>
      ) : (
        <>
          <div className="team-grid">
            {teams.map((team, index) => (
              <div className="team-card" key={index}>
                <span>TEAM {String(index + 1).padStart(2, "0")}</span>
                <strong>{["코랄", "퍼플", "그린", "블루"][index]} 팀</strong>
                <ul>{team.map((name) => <li key={name}>{name}</li>)}</ul>
              </div>
            ))}
          </div>
          <ResultActions text={`${game.title}\n${teams.map((team, i) => `${i + 1}팀: ${team.join(", ")}`).join("\n")}`} onReset={() => setTeams(null)} />
        </>
      )}
    </div>
  );
}

function OrderGame({ game }: { game: Game }) {
  const [names, setNames] = useState(starterNames);
  const [order, setOrder] = useState<string[] | null>(null);
  return (
    <div className="engine-panel">
      {!order ? (
        <>
          <NameEditor values={names} onChange={setNames} label="이름 또는 항목" />
          <button className="button-primary button-full" onClick={() => { tapFeedback(18); setOrder(shuffle(names)); }} disabled={names.length < 2}>순서 정하기 <span>→</span></button>
        </>
      ) : (
        <>
          <div className="order-list">
            {order.map((name, index) => <div key={name}><b>{index + 1}</b><span>{name}</span>{index === 0 && <em>FIRST</em>}</div>)}
          </div>
          <ResultActions text={`${game.title}: ${order.map((name, i) => `${i + 1}. ${name}`).join(" / ")}`} onReset={() => setOrder(null)} />
        </>
      )}
    </div>
  );
}

function BalanceGame({ game }: { game: Game }) {
  const prompts = game.prompts ?? [];
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const choose = (value: number) => {
    if (selected !== null) return;
    tapFeedback();
    setSelected(value);
    window.setTimeout(() => {
      setChoices((current) => [...current, value]);
      setIndex((current) => current + 1);
      setSelected(null);
    }, 620);
  };
  if (index >= prompts.length) {
    const left = choices.filter((choice) => choice === 0).length;
    return (
      <div className="engine-panel centered-result">
        <div className="result-orbit"><span>{left}</span><i>:</i><span>{choices.length - left}</span></div>
        <p className="result-kicker">당신의 선택이 완성됐어요</p>
        <h3>{left === choices.length - left ? "완벽한 균형 감각의 소유자" : left > choices.length / 2 ? "왼쪽 선택에 마음이 더 움직였어요" : "오른쪽 선택에 마음이 더 움직였어요"}</h3>
        <p>친구에게 같은 게임을 보내고 몇 개나 같은지 비교해 보세요.</p>
        <div className="choice-recap">
          {choices.slice(-4).map((choice, choiceIndex) => {
            const promptIndex = Math.max(0, choices.length - 4) + choiceIndex;
            return <span key={promptIndex}>{choice === 0 ? prompts[promptIndex]?.a : prompts[promptIndex]?.b}</span>;
          })}
        </div>
        <ResultActions text={`${game.title}: ${left} 대 ${choices.length - left}`} onReset={() => { setIndex(0); setChoices([]); setSelected(null); }} />
      </div>
    );
  }
  const prompt = prompts[index];
  return (
    <div className="engine-panel">
      <div className="progress-label"><span>{index + 1} / {prompts.length}</span><b>{Math.round((index / prompts.length) * 100)}%</b></div>
      <div className="progress-track"><span style={{ width: `${(index / prompts.length) * 100}%` }} /></div>
      <div className="balance-stage">
        <button className={selected === 0 ? "selected" : ""} disabled={selected !== null} onClick={() => choose(0)}><small>A</small><strong>{prompt.a}</strong><span>{selected === 0 ? "진짜 이걸 골랐네요!" : "이쪽 선택"}</span></button>
        <i>VS</i>
        <button className={selected === 1 ? "selected" : ""} disabled={selected !== null} onClick={() => choose(1)}><small>B</small><strong>{prompt.b}</strong><span>{selected === 1 ? "취향 접수 완료!" : "이쪽 선택"}</span></button>
      </div>
    </div>
  );
}

function QuizGame({ game }: { game: Game }) {
  const questions = game.questions ?? [];
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const answer = (points: Record<string, number>, answerIndex: number) => {
    if (selectedAnswer !== null) return;
    tapFeedback();
    setSelectedAnswer(answerIndex);
    window.setTimeout(() => {
      const next = { ...scores };
      Object.entries(points).forEach(([key, value]) => { next[key] = (next[key] ?? 0) + value; });
      if (index === questions.length - 1) {
        const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0]?.[0];
        setResult(game.results?.[winner] ?? Object.values(game.results ?? {})[0]);
      } else {
        setScores(next);
        setIndex((current) => current + 1);
      }
      setSelectedAnswer(null);
    }, 460);
  };
  const reset = () => { setIndex(0); setScores({}); setResult(null); setSelectedAnswer(null); };
  if (result) {
    return (
      <div className="engine-panel quiz-result">
        <div className="result-emoji">{result.emoji}</div>
        <span>나의 결과는</span>
        <h3>{result.title}</h3>
        <strong>{result.summary}</strong>
        <p>{result.detail}</p>
        <ResultActions text={`${game.title}: ${result.title} — ${result.summary}`} onReset={reset} />
      </div>
    );
  }
  const question = questions[index];
  return (
    <div className="engine-panel">
      <div className="progress-label"><span>QUESTION {String(index + 1).padStart(2, "0")}</span><b>{index + 1} / {questions.length}</b></div>
      <div className="progress-track"><span style={{ width: `${(index / questions.length) * 100}%` }} /></div>
      <div className="quiz-stage">
        <h3>{question.question}</h3>
        <div>{question.answers.map((item, answerIndex) => (
          <button
            key={item.label}
            className={selectedAnswer === answerIndex ? "selected" : ""}
            disabled={selectedAnswer !== null}
            onClick={() => answer(item.scores, answerIndex)}
          >
            <b>{String.fromCharCode(65 + answerIndex)}</b><span>{item.label}</span><i>{selectedAnswer === answerIndex ? "✓" : "→"}</i>
          </button>
        ))}</div>
      </div>
    </div>
  );
}

function WorldCupGame({ game }: { game: Game }) {
  const initial = game.options ?? [];
  const isMaker = game.slug === "custom-worldcup";
  const [cupTitle, setCupTitle] = useState(isMaker ? "우리끼리 최애 월드컵" : game.title);
  const [candidates, setCandidates] = useState(initial);
  const [status, setStatus] = useState<"setup" | "seeding" | "playing" | "done">("setup");
  const [round, setRound] = useState<string[]>([]);
  const [nextRound, setNextRound] = useState<string[]>([]);
  const [match, setMatch] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [runnerUp, setRunnerUp] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(0);
  const [bracketTotal, setBracketTotal] = useState(0);
  const [requestedBracketSize, setRequestedBracketSize] = useState(0);
  const [roundTrail, setRoundTrail] = useState<string[]>([]);
  const [copiedSetup, setCopiedSetup] = useState(false);
  const possibleSizes = [4, 8, 16, 32].filter((size) => size <= candidates.length);
  const suggestedSize = possibleSizes.at(-1) ?? 0;
  const bracketSize = possibleSizes.includes(requestedBracketSize) ? requestedBracketSize : suggestedSize;

  useEffect(() => {
    if (!isMaker) return;
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const sharedItems = params.get("items");
      const sharedTitle = params.get("title");
      if (sharedTitle) setCupTitle(sharedTitle.slice(0, 40));
      if (sharedItems) {
        try {
          const parsed = JSON.parse(sharedItems);
          if (Array.isArray(parsed)) {
            const safeItems = parsed
              .filter((item): item is string => typeof item === "string")
              .map((item) => item.trim().slice(0, 40))
              .filter(Boolean)
              .filter((item, index, items) => items.indexOf(item) === index)
              .slice(0, 32);
            if (safeItems.length >= 4) setCandidates(safeItems);
          }
        } catch {
          // 잘못된 공유 링크는 기본 후보로 안전하게 시작합니다.
        }
      } else {
        try {
          const saved = JSON.parse(localStorage.getItem("ttak-worldcup-draft") ?? "null");
          if (saved?.title) setCupTitle(String(saved.title).slice(0, 40));
          if (Array.isArray(saved?.items) && saved.items.length >= 4) setCandidates(saved.items.slice(0, 32));
        } catch {
          // 로컬 초안이 손상된 경우 기본값을 사용합니다.
        }
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [isMaker]);

  useEffect(() => {
    if (!isMaker || candidates.length < 4) return;
    localStorage.setItem("ttak-worldcup-draft", JSON.stringify({ title: cupTitle, items: candidates }));
  }, [candidates, cupTitle, isMaker]);

  const start = () => {
    if (!bracketSize) return;
    tapFeedback(20);
    setStatus("seeding");
    setWinner(null);
    setRunnerUp(null);
    setCompleted(0);
    setSelected(null);
    setNextRound([]);
    setRoundTrail([]);
    setMatch(0);
    const seeded = shuffle(candidates).slice(0, bracketSize);
    setBracketTotal(seeded.length - 1);
    window.setTimeout(() => {
      setRound(seeded);
      setStatus("playing");
    }, 1650);
  };
  const pick = (choice: string) => {
    if (selected) return;
    tapFeedback();
    setSelected(choice);
    window.setTimeout(() => {
      const next = [...nextRound, choice];
      const isLastMatch = match + 2 >= round.length;
      setCompleted((current) => current + 1);
      if (isLastMatch) {
        if (next.length === 1) {
          setRunnerUp(round.find((item) => item !== choice) ?? null);
          setWinner(choice);
          setStatus("done");
          tapFeedback(35);
        } else {
          setRoundTrail((current) => [...current, `${round.length}강 · ${next.length}명 진출`]);
          setRound(next);
          setNextRound([]);
          setMatch(0);
        }
      } else {
        setNextRound(next);
        setMatch((current) => current + 2);
      }
      setSelected(null);
    }, 560);
  };
  const reset = () => {
    setStatus("setup");
    setRound([]);
    setNextRound([]);
    setMatch(0);
    setWinner(null);
    setRunnerUp(null);
    setSelected(null);
    setCompleted(0);
    setRoundTrail([]);
  };
  const updateCustomCandidates = (value: string) => {
    const items = value
      .split(/\r?\n/)
      .map((item) => item.trim().slice(0, 40))
      .filter(Boolean)
      .filter((item, index, values) => values.indexOf(item) === index)
      .slice(0, 32);
    setCandidates(items);
  };
  const shareSetup = async () => {
    if (candidates.length < 4) return;
    tapFeedback();
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("title", cupTitle.trim() || "나만의 월드컵");
    url.searchParams.set("items", JSON.stringify(candidates));
    const shareData = {
      title: `${cupTitle.trim() || "나만의 월드컵"} | 딱정해`,
      text: "내가 만든 월드컵, 너도 우승자를 골라봐!",
      url: url.toString(),
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await navigator.clipboard.writeText(url.toString());
    setCopiedSetup(true);
    window.setTimeout(() => setCopiedSetup(false), 1600);
  };
  if (status === "setup") {
    return (
      <div className="engine-panel worldcup-setup">
        <div className="worldcup-intro">
          <span>{isMaker ? "MAKE YOUR OWN" : `${candidates.length}명의 후보`}</span>
          <h3>{isMaker ? "세상에 없던 월드컵을 만드세요" : "내 마음의 토너먼트를 시작합니다"}</h3>
          <p>{isMaker ? "한 줄에 후보 하나씩. 제목과 후보를 정하면 링크로 친구를 초대할 수 있어요." : "후보를 직접 바꾸고 원하는 대진 수를 골라 진짜 토너먼트로 진행하세요."}</p>
        </div>
        {isMaker ? (
          <div className="worldcup-maker-fields">
            <label>
              <span>월드컵 제목</span>
              <input value={cupTitle} maxLength={40} onChange={(event) => setCupTitle(event.target.value)} placeholder="예: 우리끼리 야식 최강자전" />
            </label>
            <label>
              <span>후보 목록 <b>{candidates.length}/32</b></span>
              <textarea
                value={candidates.join("\n")}
                onChange={(event) => updateCustomCandidates(event.target.value)}
                placeholder={"후보를 한 줄에 하나씩 입력하세요\n예: 떡볶이\n예: 치킨"}
                rows={9}
              />
            </label>
          </div>
        ) : (
          <NameEditor values={candidates} onChange={setCandidates} label="월드컵 후보" placeholder="후보 입력" max={32} />
        )}
        <div className="bracket-size-picker" aria-label="대진 규모 선택">
          <span>대진 규모</span>
          <div>
            {[4, 8, 16, 32].map((size) => (
              <button
                key={size}
                className={bracketSize === size ? "active" : ""}
                disabled={candidates.length < size}
                onClick={() => setRequestedBracketSize(size)}
              >
                {size}강
              </button>
            ))}
          </div>
        </div>
        <div className="bracket-ready">
          <span>예정 대진</span>
          <strong>{bracketSize ? `${bracketSize}강 → 결승 · 총 ${bracketSize - 1}번 선택` : "후보를 4명 이상 입력해 주세요"}</strong>
        </div>
        <div className="worldcup-setup-actions">
          <button className="button-primary button-full" onClick={start} disabled={!bracketSize}>대진표 섞고 시작 <span>🏆</span></button>
          {isMaker && <button className="button-ghost" onClick={shareSetup} disabled={candidates.length < 4}>{copiedSetup ? "링크 복사 완료!" : "친구에게 월드컵 공유"}</button>}
        </div>
      </div>
    );
  }
  if (status === "seeding") {
    return (
      <div className="engine-panel suspense-stage" aria-live="polite">
        <div className="bracket-shuffle" aria-hidden><i>16</i><i>8</i><i>4</i><b>🏆</b></div>
        <small>대진 추첨 중</small>
        <h3>첫 상대를 정하고 있어요</h3>
        <p>강자는 결승에서 만날 수도, 지금 만날 수도 있습니다.</p>
        <div className="suspense-dots"><i /><i /><i /></div>
      </div>
    );
  }
  if (status === "done" && winner) {
    return (
      <div className="engine-panel quiz-result worldcup-result">
        <div className="trophy">🏆</div><span>{cupTitle} · 최종 우승</span><h3>{winner}</h3>
        <strong>{runnerUp ? `${runnerUp}을(를) 꺾고 우승했어요.` : "마음은 이미 알고 있었어요."}</strong>
        <p>{bracketTotal}번의 선택 끝에 남은 단 하나. 이 결과를 친구에게 보내 같은 우승자가 나오는지 확인해 보세요.</p>
        <ResultActions text={`${cupTitle} 우승: ${winner}`} onReset={reset} />
      </div>
    );
  }
  const roundName = round.length === 2 ? "결승" : `${round.length}강`;
  const totalPercent = bracketTotal ? Math.round((completed / bracketTotal) * 100) : 0;
  return (
    <div className="engine-panel">
      <div className="progress-label"><span>{roundName} · MATCH {match / 2 + 1} / {round.length / 2}</span><b>전체 {totalPercent}%</b></div>
      <div className="progress-track worldcup-progress"><span style={{ width: `${totalPercent}%` }} /></div>
      <div className="worldcup-round-trail" aria-label="토너먼트 진행 경로">
        <span className="complete">START {bracketTotal + 1}강</span>
        {roundTrail.map((item) => <span className="complete" key={item}>{item}</span>)}
        <span className="current">{roundName} 진행 중</span>
      </div>
      <div className="game-status"><span>이번 라운드 {round.length}개 생존</span><b>{nextRound.length}개 다음 라운드 진출 확정</b></div>
      <div className="worldcup-stage">
        <button className={selected === round[match] ? "selected" : ""} disabled={selected !== null} onClick={() => pick(round[match])}><small>A</small><strong>{round[match]}</strong><span>{selected === round[match] ? "다음 라운드로!" : "선택하기"}</span></button>
        <i>VS</i>
        <button className={selected === round[match + 1] ? "selected" : ""} disabled={selected !== null} onClick={() => pick(round[match + 1])}><small>B</small><strong>{round[match + 1]}</strong><span>{selected === round[match + 1] ? "살아남았습니다!" : "선택하기"}</span></button>
      </div>
    </div>
  );
}

function SplitGame({ game }: { game: Game }) {
  const [amount, setAmount] = useState(68400);
  const [people, setPeople] = useState(4);
  const base = Math.floor(amount / people);
  const remainder = amount - base * people;
  const formatted = new Intl.NumberFormat("ko-KR");
  return (
    <div className="engine-panel split-layout">
      <div className="split-fields">
        <label><span>총 결제금액</span><div><input type="number" inputMode="numeric" min="0" max="999999999" value={amount} onChange={(event) => setAmount(Math.min(999999999, Math.max(0, Number(event.target.value))))} /><b>원</b></div></label>
        <label><span>함께한 인원</span><div className="stepper"><button aria-label="인원 줄이기" onClick={() => { tapFeedback(); setPeople(Math.max(2, people - 1)); }}>−</button><strong>{people}명</strong><button aria-label="인원 늘리기" onClick={() => { tapFeedback(); setPeople(Math.min(30, people + 1)); }}>＋</button></div></label>
      </div>
      <div className="split-result">
        <span>한 사람당</span><h3>{formatted.format(base)}<small>원</small></h3>
        <p>{remainder > 0 ? `${remainder}명만 1원씩 더 내면 딱 맞아요.` : "나머지 없이 정확하게 나뉘어요."}</p>
        <ResultActions text={`${game.title}: 총 ${formatted.format(amount)}원 / ${people}명 = 1인 ${formatted.format(base)}원${remainder ? ` (${remainder}명은 1원 추가)` : ""}`} onReset={() => { setAmount(68400); setPeople(4); }} />
      </div>
    </div>
  );
}

function MissionsGame({ game }: { game: Game }) {
  const missions = game.missions ?? [];
  const [current, setCurrent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const draw = () => {
    tapFeedback(18);
    const pool = missions.filter((mission) => !history.includes(mission));
    const picked = shuffle(pool.length ? pool : missions)[0];
    setCurrent(picked);
    setHistory((items) => [...items, picked]);
  };
  return (
    <div className="engine-panel mission-panel">
      <div className={`mission-card ${current ? "revealed" : ""}`}>
        <span>{game.emoji}</span>
        <small>TODAY&apos;S CARD</small>
        <h3>{current ?? "오늘의 카드를 뽑아보세요"}</h3>
        <p>{current ? "완료한 뒤 친구들과 인증해 보세요." : `${missions.length}개의 카드가 기다리고 있어요.`}</p>
      </div>
      <button className="button-primary" onClick={draw}>{current ? "다른 카드 뽑기" : "카드 한 장 뽑기"} <span>→</span></button>
      {current && <ResultActions text={`${game.title}: ${current}`} onReset={() => { setCurrent(null); setHistory([]); }} />}
    </div>
  );
}

export function GameExperience({ game }: { game: Game }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const engines = {
    cards: CardsGame,
    wheel: WheelGame,
    teams: TeamGame,
    order: OrderGame,
    balance: BalanceGame,
    quiz: QuizGame,
    worldcup: WorldCupGame,
    split: SplitGame,
    missions: MissionsGame,
  };
  const Engine = engines[game.engine];
  return <div ref={wrapRef} className="game-experience"><Engine game={game} /></div>;
}

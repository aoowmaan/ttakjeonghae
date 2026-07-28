"use client";

import { useMemo, useRef, useState } from "react";
import type { Game, QuizResult } from "@/data/games";

const starterNames = ["나", "민지", "도윤", "서준"];
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

function NameEditor({
  values,
  onChange,
  label = "참가자",
  placeholder = "이름 입력",
}: {
  values: string[];
  onChange: (values: string[]) => void;
  label?: string;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const value = draft.trim();
    if (!value || values.length >= 24) return;
    onChange([...values, value]);
    setDraft("");
  };
  return (
    <div className="name-editor">
      <div className="field-label"><span>{label}</span><b>{values.length}/24</b></div>
      <div className="chips">
        {values.map((value, index) => (
          <button key={`${value}-${index}`} className="name-chip" onClick={() => onChange(values.filter((_, i) => i !== index))}>
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
        />
        <button onClick={add}>추가</button>
      </div>
    </div>
  );
}

function ResultActions({ text, onReset }: { text: string; onReset: () => void }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const shareData = { title: "딱정해 결과", text: `${text}\n딱정해에서 함께 해봐요.`, url: window.location.href };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="result-actions">
      <button className="button-primary" onClick={share}>{copied ? "복사했어요!" : "결과 공유하기"} <span>↗</span></button>
      <button className="button-ghost" onClick={onReset}>다시 하기</button>
    </div>
  );
}

function CardsGame({ game }: { game: Game }) {
  const [names, setNames] = useState(starterNames);
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [flipped, setFlipped] = useState<number[]>([]);
  const cards = useMemo(() => (started ? shuffle(names) : names), [started, names]);
  const assignmentMode = (game.options?.length ?? 0) > 1;

  const start = () => {
    if (names.length < 2) return;
    const shuffledNames = shuffle(names);
    if (assignmentMode) {
      const roles = game.options ?? [];
      setAssignments(Object.fromEntries(shuffledNames.map((name, index) => [name, roles[index % roles.length]])));
      setWinner(null);
    } else {
      setAssignments({});
      setWinner(shuffledNames[0]);
    }
    setFlipped([]);
    setStarted(true);
  };
  if (!started) {
    return (
      <div className="engine-panel">
        <NameEditor values={names} onChange={setNames} />
        <button className="button-primary button-full" onClick={start} disabled={names.length < 2}>카드 섞기 <span>→</span></button>
        <p className="microcopy">이름은 이 기기에 저장되지 않아요.</p>
      </div>
    );
  }
  return (
    <div className="engine-panel">
      <div className="game-status"><span>카드가 준비됐어요</span><b>한 장을 골라주세요</b></div>
      <div className="pick-card-grid">
        {cards.map((name, index) => {
          const isFlipped = flipped.includes(index);
          const isWinner = winner === name;
          const cardResult = assignmentMode ? assignments[name] : isWinner ? game.options?.[0] ?? "당첨!" : "통과";
          return (
            <button
              className={`pick-card ${isFlipped ? "flipped" : ""} ${isFlipped && isWinner ? "winner" : ""}`}
              key={`${name}-${index}`}
              onClick={() => setFlipped((current) => current.includes(index) ? current : [...current, index])}
              disabled={isFlipped}
              aria-label={`${index + 1}번 카드`}
            >
              <span className="card-face card-back" aria-hidden={isFlipped}><i>딱!</i><small>{index + 1}</small></span>
              <span className="card-face card-front" aria-hidden={!isFlipped}><strong>{cardResult}</strong><b>{name}</b><em>{assignmentMode || isWinner ? "🎉" : "휴—"}</em></span>
            </button>
          );
        })}
      </div>
      {winner && flipped.some((index) => cards[index] === winner) && (
        <div className="inline-result">
          <span>오늘의 결과</span>
          <h3>{winner}</h3>
          <p>{game.options?.[0] ?? "행운의 주인공"}은 바로 당신!</p>
          <ResultActions text={`${game.title}: ${winner}`} onReset={() => setStarted(false)} />
        </div>
      )}
      {assignmentMode && flipped.length === cards.length && (
        <div className="inline-result">
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
    const index = Math.floor(Math.random() * options.length);
    const next = rotation + 1440 + (360 - (index * 360) / options.length);
    setRotation(next);
    setSpinning(true);
    setResult(null);
    window.setTimeout(() => { setSpinning(false); setResult(options[index]); }, 2200);
  };
  const colors = ["#ff5c46", "#ffbf3f", "#8d66ff", "#20a47a", "#2c6ed5", "#ef72a7"];
  const gradient = options.map((_, index) => `${colors[index % colors.length]} ${index * 100 / options.length}% ${(index + 1) * 100 / options.length}%`).join(", ");
  return (
    <div className="engine-panel wheel-layout">
      <div>
        <NameEditor values={options} onChange={setOptions} label="후보" placeholder="후보 입력" />
        <button className="button-primary button-full" onClick={spin} disabled={options.length < 2 || spinning}>{spinning ? "돌아가는 중…" : "룰렛 돌리기"} <span>↻</span></button>
      </div>
      <div className="wheel-stage">
        <div className="wheel-pointer">▼</div>
        <button
          className="wheel"
          style={{ background: `conic-gradient(${gradient})`, transform: `rotate(${rotation}deg)` }}
          onClick={spin}
          aria-label="룰렛 돌리기"
        >
          <span>딱!</span>
        </button>
        <div className="wheel-labels" aria-hidden>
          {options.slice(0, 6).map((option) => <span key={option}>{option}</span>)}
        </div>
      </div>
      {result && (
        <div className="inline-result full-row">
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
          <button className="button-primary button-full" onClick={() => setOrder(shuffle(names))} disabled={names.length < 2}>순서 정하기 <span>→</span></button>
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
  const choose = (value: number) => {
    const next = [...choices, value];
    setChoices(next);
    window.setTimeout(() => setIndex(index + 1), 180);
  };
  if (index >= prompts.length) {
    const left = choices.filter((choice) => choice === 0).length;
    return (
      <div className="engine-panel centered-result">
        <div className="result-orbit"><span>{left}</span><i>:</i><span>{choices.length - left}</span></div>
        <p className="result-kicker">당신의 선택이 완성됐어요</p>
        <h3>{left === choices.length - left ? "완벽한 균형 감각의 소유자" : left > choices.length / 2 ? "왼쪽 선택에 마음이 더 움직였어요" : "오른쪽 선택에 마음이 더 움직였어요"}</h3>
        <p>친구에게 같은 게임을 보내고 몇 개나 같은지 비교해 보세요.</p>
        <ResultActions text={`${game.title}: ${left} 대 ${choices.length - left}`} onReset={() => { setIndex(0); setChoices([]); }} />
      </div>
    );
  }
  const prompt = prompts[index];
  return (
    <div className="engine-panel">
      <div className="progress-label"><span>{index + 1} / {prompts.length}</span><b>{Math.round((index / prompts.length) * 100)}%</b></div>
      <div className="progress-track"><span style={{ width: `${(index / prompts.length) * 100}%` }} /></div>
      <div className="balance-stage">
        <button onClick={() => choose(0)}><small>A</small><strong>{prompt.a}</strong><span>이쪽 선택</span></button>
        <i>VS</i>
        <button onClick={() => choose(1)}><small>B</small><strong>{prompt.b}</strong><span>이쪽 선택</span></button>
      </div>
    </div>
  );
}

function QuizGame({ game }: { game: Game }) {
  const questions = game.questions ?? [];
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const answer = (points: Record<string, number>) => {
    const next = { ...scores };
    Object.entries(points).forEach(([key, value]) => { next[key] = (next[key] ?? 0) + value; });
    if (index === questions.length - 1) {
      const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0]?.[0];
      setResult(game.results?.[winner] ?? Object.values(game.results ?? {})[0]);
    } else {
      setScores(next);
      setIndex(index + 1);
    }
  };
  const reset = () => { setIndex(0); setScores({}); setResult(null); };
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
        <div>{question.answers.map((item, answerIndex) => <button key={item.label} onClick={() => answer(item.scores)}><b>{String.fromCharCode(65 + answerIndex)}</b><span>{item.label}</span><i>→</i></button>)}</div>
      </div>
    </div>
  );
}

function WorldCupGame({ game }: { game: Game }) {
  const initial = game.options ?? [];
  const [round, setRound] = useState(initial);
  const [nextRound, setNextRound] = useState<string[]>([]);
  const [match, setMatch] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const pick = (choice: string) => {
    const next = [...nextRound, choice];
    if (match + 2 >= round.length) {
      if (next.length === 1) setWinner(choice);
      else { setRound(next); setNextRound([]); setMatch(0); }
    } else setMatch(match + 2);
  };
  const reset = () => { setRound(initial); setNextRound([]); setMatch(0); setWinner(null); };
  if (winner) {
    return (
      <div className="engine-panel quiz-result">
        <div className="trophy">🏆</div><span>최종 우승</span><h3>{winner}</h3>
        <strong>마음은 이미 알고 있었어요.</strong>
        <ResultActions text={`${game.title} 우승: ${winner}`} onReset={reset} />
      </div>
    );
  }
  const roundName = round.length === 2 ? "결승" : `${round.length}강`;
  return (
    <div className="engine-panel">
      <div className="game-status"><span>{roundName} · MATCH {match / 2 + 1}</span><b>더 끌리는 하나를 선택</b></div>
      <div className="worldcup-stage">
        <button onClick={() => pick(round[match])}><small>A</small><strong>{round[match]}</strong><span>선택하기</span></button>
        <i>VS</i>
        <button onClick={() => pick(round[match + 1])}><small>B</small><strong>{round[match + 1]}</strong><span>선택하기</span></button>
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
        <label><span>총 결제금액</span><div><input type="number" min="0" value={amount} onChange={(event) => setAmount(Math.max(0, Number(event.target.value)))} /><b>원</b></div></label>
        <label><span>함께한 인원</span><div className="stepper"><button onClick={() => setPeople(Math.max(2, people - 1))}>−</button><strong>{people}명</strong><button onClick={() => setPeople(Math.min(30, people + 1))}>＋</button></div></label>
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

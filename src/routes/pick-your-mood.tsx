import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Coffee, Download, Music, Sparkles, StickyNote as StickyNoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pick-your-mood")({
  head: () => ({
    meta: [
      { title: "Pick Your Mood | AcadHire" },
      { name: "description", content: "A fun little mood check from AcadHire. Pick how you're feeling today." },
      { property: "og:title", content: "Pick Your Mood | AcadHire" },
      { property: "og:description", content: "A fun little mood check from AcadHire." },
      { property: "og:url", content: "/pick-your-mood" },
    ],
    links: [{ rel: "canonical", href: "/pick-your-mood" }],
  }),
  component: PickYourMoodPage,
});

const MOODS = [
  { emoji: "😄", label: "Ready to Work", message: "Productivity mode activated. AcadHire approves." },
  { emoji: "😴", label: "Need Coffee", message: "Coffee first. Career decisions later." },
  { emoji: "🤯", label: "Too Many Meetings", message: "This meeting could probably have been an email." },
  { emoji: "📚", label: "Learning Mode", message: "New skills today. New opportunities tomorrow." },
  { emoji: "🎯", label: "Job Hunt Mode", message: "Your next opportunity may be closer than you think." },
] as const;

const RECHARGE_TIPS = [
  { icon: Coffee, title: "Take Five", desc: "Step away, stretch, and let your mind reset before diving back in." },
  { icon: Music, title: "Shuffle the Playlist", desc: "A different tune can shift your whole mood in under a minute." },
  { icon: Sparkles, title: "Celebrate Small Wins", desc: "Finished one thing today? That counts. Give yourself credit." },
] as const;

function PickYourMoodPage() {
  const [selected, setSelected] = useState<(typeof MOODS)[number] | null>(null);

  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-teal">A little something extra</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">Pick Your Mood</h1>
          <p className="mt-4 text-lg text-body">How are you feeling today? Choose your current mood.</p>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {MOODS.map((m) => {
              const isSelected = selected?.label === m.label;
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSelected(m)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-elegant",
                    isSelected ? "border-navy bg-navy/5" : "border-border bg-card hover:border-teal/40",
                  )}
                >
                  <span className="text-4xl">{m.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{m.label}</span>
                </button>
              );
            })}
          </div>

          {selected && (
            <div key={selected.label} className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="rounded-2xl border border-amber-cta/20 bg-amber-cta/5 px-6 py-8">
                <span className="text-4xl">{selected.emoji}</span>
                <p className="mt-3 text-lg font-semibold text-foreground">{selected.message}</p>
              </div>
              <Button variant="outline" className="mt-6" onClick={() => setSelected(null)}>
                Pick Another Mood
              </Button>
            </div>
          )}

          <DestressZone />
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <div className="container-prose max-w-4xl">
          <SectionHeading eyebrow="While you're here" title="Quick Recharge Tips" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {RECHARGE_TIPS.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-border bg-card p-6 text-center">
                <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <tip.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{tip.title}</h3>
                <p className="mt-2 text-sm text-body">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hero-navy text-white">
        <div className="container-prose max-w-2xl py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Feeling Recharged?</h2>
          <p className="mt-3 text-white/80">
            Whenever you're ready, your next opportunity in education could be one click away.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
              <Link to="/openings">Browse Openings</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-slate-800 hover:bg-white hover:text-navy">
              <Link to="/for-candidates">Register with AcadHire</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

type BoardItem =
  | { id: number; kind: "bubble"; emoji: string; x: number; y: number; popping?: boolean }
  | { id: number; kind: "note"; text: string; x: number; y: number; popping?: boolean };

interface Size {
  width: number;
  height: number;
}

const BUBBLE_EMOJIS = ["🦄", "🐢", "🦋", "🌈", "🍭", "🪁", "🧁", "🐝"];
const BUBBLE_SIZE: Size = { width: 56, height: 56 };
const NOTE_SIZE: Size = { width: 132, height: 92 };

const INITIAL_ITEMS: BoardItem[] = [
  { id: 1, kind: "bubble", emoji: "🦄", x: 8, y: 12 },
  { id: 2, kind: "bubble", emoji: "🐢", x: 50, y: 45 },
  { id: 3, kind: "bubble", emoji: "🌈", x: 76, y: 10 },
];

const POP_PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const POP_PARTICLE_COLORS = ["bg-amber-cta", "bg-teal", "bg-navy"];

const AMBIENT_SPARKLES = [
  { x: 10, y: 18, delay: 0 },
  { x: 88, y: 22, delay: 0.5 },
  { x: 48, y: 82, delay: 1 },
  { x: 72, y: 55, delay: 1.5 },
  { x: 22, y: 60, delay: 2 },
  { x: 92, y: 78, delay: 0.8 },
];

const SPARKLE_TRAIL_COLORS = ["text-amber-cta", "text-teal"];

function getItemSize(item: BoardItem): Size {
  return item.kind === "note" ? NOTE_SIZE : BUBBLE_SIZE;
}

// Synthesizes a short bubble-wrap-style "pop" with the Web Audio API so no
// audio asset needs to be shipped. The AudioContext is created lazily on the
// first pop (a user gesture), matching browser autoplay policies.
function playPopSound(ctxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.4, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.17);
  } catch {
    // Web Audio unsupported — popping still works visually without sound.
  }
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let cy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, cy);
      line = word;
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
}

function DestressZone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [items, setItems] = useState<BoardItem[]>(INITIAL_ITEMS);
  const nextId = useRef(INITIAL_ITEMS.length + 1);
  const dragRef = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  const [sparkleTrail, setSparkleTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkleIdRef = useRef(0);
  const lastSparkleAtRef = useRef(0);

  const addBubble = () => {
    const emoji = BUBBLE_EMOJIS[Math.floor(Math.random() * BUBBLE_EMOJIS.length)];
    setItems((prev) => [
      ...prev,
      { id: nextId.current++, kind: "bubble", emoji, x: 5 + Math.random() * 70, y: 5 + Math.random() * 65 },
    ]);
  };

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    const text = noteDraft.trim();
    if (!text) return;
    setItems((prev) => [
      ...prev,
      { id: nextId.current++, kind: "note", text: text.slice(0, 80), x: 5 + Math.random() * 55, y: 5 + Math.random() * 50 },
    ]);
    setNoteDraft("");
    setShowNoteInput(false);
  };

  const clearZone = () => setItems([]);

  const popItem = (id: number) => {
    playPopSound(audioCtxRef);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, popping: true } : it)));
    setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }, 380);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>, item: BoardItem) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const itemXPx = (item.x / 100) * rect.width;
    const itemYPx = (item.y / 100) * rect.height;
    dragRef.current = {
      id: item.id,
      offsetX: e.clientX - rect.left - itemXPx,
      offsetY: e.clientY - rect.top - itemYPx,
    };
    setDraggingId(item.id);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const spawnTrailSparkle = (xPercent: number, yPercent: number) => {
    const now = performance.now();
    if (now - lastSparkleAtRef.current < 70) return;
    lastSparkleAtRef.current = now;
    const id = sparkleIdRef.current++;
    setSparkleTrail((prev) => [...prev, { id, x: xPercent, y: yPercent }]);
    setTimeout(() => {
      setSparkleTrail((prev) => prev.filter((s) => s.id !== id));
    }, 550);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!drag || !rect) return;
    const item = items.find((it) => it.id === drag.id);
    if (!item) return;
    const size = getItemSize(item);
    let xPx = e.clientX - rect.left - drag.offsetX;
    let yPx = e.clientY - rect.top - drag.offsetY;
    xPx = Math.max(0, Math.min(rect.width - size.width, xPx));
    yPx = Math.max(0, Math.min(rect.height - size.height, yPx));
    const x = (xPx / rect.width) * 100;
    const y = (yPx / rect.height) * 100;
    setItems((prev) => prev.map((it) => (it.id === drag.id ? { ...it, x, y } : it)));
    spawnTrailSparkle(((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100);
  };

  const stopDragging = () => {
    dragRef.current = null;
    setDraggingId(null);
  };

  const downloadBoard = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);

    items.forEach((item) => {
      const size = getItemSize(item);
      const x = (item.x / 100) * rect.width;
      const y = (item.y / 100) * rect.height;
      if (item.kind === "bubble") {
        ctx.beginPath();
        ctx.arc(x + size.width / 2, y + size.height / 2, size.width / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#f7f8fc";
        ctx.fill();
        ctx.font = "26px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.emoji, x + size.width / 2, y + size.height / 2 + 2);
      } else {
        ctx.fillStyle = "#ffffff";
        roundRectPath(ctx, x, y, size.width, size.height, 10);
        ctx.fill();
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        roundRectPath(ctx, x, y, size.width, size.height, 10);
        ctx.stroke();
        ctx.fillStyle = "#3f3f46";
        ctx.font = "13px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        wrapCanvasText(ctx, item.text, x + 10, y + 12, size.width - 20, 16);
      }
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "acadhire-destress-board.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="mt-16 rounded-2xl border-2 border-dashed border-border bg-surface p-6 text-left md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Need a Break? Drag Some Stress Away 🦋</h2>
          <p className="mt-1 text-sm text-body">Drag to move, double-click to pop. Add a note if something's on your mind.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={addBubble}>Add a Bubble</Button>
          <Button size="sm" variant="outline" onClick={() => setShowNoteInput((v) => !v)}>
            <StickyNoteIcon className="h-3.5 w-3.5" /> Add a Note
          </Button>
          <Button size="sm" variant="ghost" onClick={clearZone}>Clear</Button>
          <Button size="sm" variant="ghost" onClick={downloadBoard} disabled={items.length === 0}>
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        </div>
      </div>

      {showNoteInput && (
        <form onSubmit={addNote} className="mt-4 flex gap-2">
          <Input
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            placeholder="Write a quick note…"
            maxLength={80}
            autoFocus
          />
          <Button type="submit" size="sm" className="shrink-0 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
            Add
          </Button>
        </form>
      )}

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className="relative mt-6 h-64 touch-none select-none overflow-hidden rounded-xl border border-border bg-background md:h-72"
      >
        {items.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-center text-sm text-muted-foreground">
            All clear. Add a bubble or a note to fidget with.
          </p>
        )}

        {AMBIENT_SPARKLES.map((s, i) => (
          <span
            key={i}
            style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.delay}s` }}
            className="pointer-events-none absolute text-amber-cta/50 animate-twinkle"
          >
            ✦
          </span>
        ))}

        {sparkleTrail.map((s) => (
          <span
            key={s.id}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className={cn(
              "pointer-events-none absolute animate-sparkle-trail text-sm",
              SPARKLE_TRAIL_COLORS[s.id % SPARKLE_TRAIL_COLORS.length],
            )}
          >
            ✨
          </span>
        ))}

        {items.map((item) => {
          const size = getItemSize(item);
          const isDragging = draggingId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onPointerDown={(e) => handlePointerDown(e, item)}
              onDoubleClick={() => popItem(item.id)}
              style={{ left: `${item.x}%`, top: `${item.y}%`, width: size.width, height: size.height }}
              title="Drag to move · Double-click to pop"
              className={cn(
                "absolute flex cursor-grab touch-none items-center justify-center rounded-full bg-card text-2xl shadow-elegant animate-in zoom-in-50 active:scale-110 active:cursor-grabbing",
                isDragging ? "transition-none scale-110 shadow-lg" : "transition-all duration-150",
                item.kind === "note" &&
                  "items-start justify-start whitespace-normal break-words rounded-xl border border-border bg-card p-2.5 text-left text-xs font-medium leading-snug text-foreground shadow-sm",
                item.popping && "scale-0 opacity-0",
                isDragging && "z-10",
              )}
            >
              {item.kind === "bubble" ? item.emoji : item.text}

              {item.popping && (
                <>
                  <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-amber-cta animate-pop-ring" />
                  {POP_PARTICLE_ANGLES.map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const distance = item.kind === "note" ? 44 : 32;
                    const tx = Math.cos(rad) * distance;
                    const ty = Math.sin(rad) * distance;
                    return (
                      <span
                        key={angle}
                        style={{ "--tx": `${tx}px`, "--ty": `${ty}px` } as React.CSSProperties}
                        className={cn(
                          "pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full animate-pop-particle",
                          POP_PARTICLE_COLORS[i % POP_PARTICLE_COLORS.length],
                        )}
                      />
                    );
                  })}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

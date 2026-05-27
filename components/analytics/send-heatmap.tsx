import { mockHeatmap } from "@/lib/mock-analytics";

const DAYS  = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

function getOpens(day: number, hour: number): number {
  return mockHeatmap.find((c) => c.day === day && c.hour === hour)?.opens ?? 0;
}

const MAX_OPENS = Math.max(...mockHeatmap.map((c) => c.opens));

function cellBg(opens: number, isBest: boolean): string {
  if (isBest)    return "rgba(129,140,248,0.85)";
  if (opens === 0) return "rgba(255,255,255,0.025)";
  const i = opens / MAX_OPENS;
  if (i >= 0.85) return "rgba(129,140,248,0.70)";
  if (i >= 0.65) return "rgba(129,140,248,0.48)";
  if (i >= 0.45) return "rgba(129,140,248,0.32)";
  if (i >= 0.25) return "rgba(129,140,248,0.18)";
  return "rgba(129,140,248,0.08)";
}

export function SendHeatmap() {
  const best = mockHeatmap.reduce((a, b) => (a.opens > b.opens ? a : b));

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Melhores Horários de Envio</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">
            Aberturas por dia × hora · melhor:{" "}
            <span className="text-primary font-semibold">
              {DAYS[best.day]} {best.hour}h ({best.opens} opens)
            </span>
          </p>
        </div>
        {/* Legend scale */}
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground shrink-0">
          {[0.06, 0.18, 0.36, 0.55, 0.80].map((op, i) => (
            <span key={i} className="w-4 h-4 rounded" style={{ background: `rgba(129,140,248,${op})` }} />
          ))}
          <span className="ml-1 opacity-60">baixo → alto</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[380px]">
          {/* Hour headers */}
          <div className="flex gap-[3px] mb-2 pl-9">
            {HOURS.map((h) => (
              <div key={h} className="flex-1 text-center text-[9px] text-muted-foreground opacity-50 font-medium tabular-nums">
                {h}h
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {DAYS.map((day, di) => (
            <div key={day} className="flex items-center gap-[3px] mb-[3px]">
              <span className="w-8 text-[10px] text-muted-foreground shrink-0 opacity-60 font-medium">{day}</span>
              {HOURS.map((h) => {
                const opens  = getOpens(di, h);
                const isBest = di === best.day && h === best.hour;
                return (
                  <div
                    key={h}
                    title={`${day} ${h}h — ${opens} opens`}
                    className="flex-1 aspect-square rounded-[4px] flex items-center justify-center transition-all duration-200 cursor-default hover:opacity-90"
                    style={{
                      background: cellBg(opens, isBest),
                      boxShadow: isBest ? "0 0 0 1.5px rgba(129,140,248,0.8), 0 0 8px rgba(129,140,248,0.3)" : undefined,
                    }}
                  >
                    <span className={`text-[8px] font-bold tabular-nums ${
                      opens > 0 ? (isBest ? "text-white" : "text-white/70") : "text-transparent"
                    }`}>
                      {opens > 0 ? opens : "."}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

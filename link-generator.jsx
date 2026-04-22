import { useState } from "react";

const GITHUB_BASE = "https://kagerzzz.github.io/GoogleDocs/";

function parseTab(input) {
  try {
    const url = new URL(input.trim());
    return url.searchParams.get("tab") || null;
  } catch {
    return null;
  }
}

export default function LinkGenerator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  function handleGenerate() {
    setError("");
    setResult(null);
    setCopied(false);

    const tab = parseTab(input);
    if (!tab) {
      setError("Không tìm thấy tab trong link. Hãy dán đúng link có ?tab=...");
      return;
    }

    const generated = GITHUB_BASE + "?tab=" + tab;
    setResult(generated);
    setHistory(prev => {
      const exists = prev.find(h => h.link === generated);
      if (exists) return prev;
      return [{ link: generated, tab, time: new Date().toLocaleTimeString("vi-VN") }, ...prev].slice(0, 10);
    });
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "48px 24px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{
          fontSize: "11px",
          letterSpacing: "6px",
          color: "#4a9eff",
          textTransform: "uppercase",
          marginBottom: "12px",
          fontFamily: "'Courier New', monospace",
        }}>
          ◆ GOOGLE DOCS
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: "400",
          color: "#f0f0f0",
          letterSpacing: "-1px",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}>
          Tab Link Generator
        </h1>
        <p style={{ color: "#666", fontSize: "14px", fontFamily: "sans-serif" }}>
          Dán link tab Docs → nhận link chia sẻ ngay
        </p>
      </div>

      {/* Card chính */}
      <div style={{
        width: "100%",
        maxWidth: "620px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "32px",
        backdropFilter: "blur(12px)",
      }}>
        {/* Input */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "11px",
            letterSpacing: "3px",
            color: "#4a9eff",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: "10px",
          }}>
            Link Google Docs Tab
          </label>
          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); setError(""); setResult(null); }}
            placeholder="https://docs.google.com/document/d/.../edit?tab=t.xxxx"
            rows={3}
            style={{
              width: "100%",
              background: "rgba(0,0,0,0.3)",
              border: error ? "1px solid #ff4d4d" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "14px 16px",
              color: "#e0e0e0",
              fontSize: "13px",
              fontFamily: "'Courier New', monospace",
              resize: "none",
              outline: "none",
              lineHeight: 1.6,
              transition: "border 0.2s",
            }}
            onFocus={e => { if (!error) e.target.style.border = "1px solid rgba(74,158,255,0.5)"; }}
            onBlur={e => { if (!error) e.target.style.border = "1px solid rgba(255,255,255,0.1)"; }}
          />
          {error && (
            <div style={{ color: "#ff4d4d", fontSize: "12px", marginTop: "8px", fontFamily: "sans-serif" }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleGenerate}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #4a9eff, #0066cc)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "1px",
            cursor: "pointer",
            fontFamily: "sans-serif",
            transition: "opacity 0.2s, transform 0.1s",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.85"}
          onMouseLeave={e => e.target.style.opacity = "1"}
          onMouseDown={e => e.target.style.transform = "scale(0.98)"}
          onMouseUp={e => e.target.style.transform = "scale(1)"}
        >
          ✦ Tạo Link
        </button>

        {/* Kết quả */}
        {result && (
          <div style={{
            marginTop: "24px",
            background: "rgba(74,158,255,0.06)",
            border: "1px solid rgba(74,158,255,0.2)",
            borderRadius: "10px",
            padding: "20px",
            animation: "fadeIn 0.3s ease",
          }}>
            <div style={{
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#4a9eff",
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginBottom: "10px",
            }}>
              Link của bạn
            </div>
            <div style={{
              color: "#a0d4ff",
              fontSize: "13px",
              fontFamily: "'Courier New', monospace",
              wordBreak: "break-all",
              lineHeight: 1.6,
              marginBottom: "14px",
            }}>
              {result}
            </div>
            <button
              onClick={() => handleCopy(result)}
              style={{
                padding: "10px 20px",
                background: copied ? "rgba(0,200,100,0.15)" : "rgba(74,158,255,0.15)",
                border: copied ? "1px solid rgba(0,200,100,0.4)" : "1px solid rgba(74,158,255,0.3)",
                borderRadius: "8px",
                color: copied ? "#00c864" : "#4a9eff",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "sans-serif",
                transition: "all 0.2s",
                fontWeight: "500",
              }}
            >
              {copied ? "✓ Đã sao chép!" : "⎘ Sao chép"}
            </button>
          </div>
        )}
      </div>

      {/* Lịch sử */}
      {history.length > 0 && (
        <div style={{
          width: "100%",
          maxWidth: "620px",
          marginTop: "32px",
        }}>
          <div style={{
            fontSize: "11px",
            letterSpacing: "3px",
            color: "#555",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: "16px",
          }}>
            Lịch sử tạo link
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {history.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  gap: "12px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: "#888",
                    fontSize: "11px",
                    fontFamily: "monospace",
                    marginBottom: "4px",
                  }}>
                    {item.time}
                  </div>
                  <div style={{
                    color: "#a0d4ff",
                    fontSize: "12px",
                    fontFamily: "'Courier New', monospace",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {item.link}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(item.link)}
                  style={{
                    flexShrink: 0,
                    padding: "6px 12px",
                    background: "rgba(74,158,255,0.1)",
                    border: "1px solid rgba(74,158,255,0.2)",
                    borderRadius: "6px",
                    color: "#4a9eff",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontFamily: "sans-serif",
                  }}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

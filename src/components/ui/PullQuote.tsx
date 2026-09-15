/**
 * @component  PullQuote
 * @spec       design.md § C-14 (Pull Quote), § S-02
 * @tokens     T-02.d-2, T-01.text-hi/copper-300/copper-500
 * @motion     M-02 reveal (via parent)
 */

export function PullQuote({ text, accent }: { text: string; accent: string }) {
  return (
    <blockquote className="border-l-2 border-copper-500 pl-6 font-display text-d-2 text-text-hi">
      &ldquo;{text} <span className="italic text-copper-300">{accent}</span>&rdquo;
    </blockquote>
  );
}

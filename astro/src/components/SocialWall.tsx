/**
 * Social Mention Wall — masonry grid of community mentions from Reddit, HN, Twitter.
 * All mentions are placeholders until real ones are collected after launch.
 */
/* <!-- PLACEHOLDER: replace with real mentions after launch --> */

interface Mention {
  platform: 'Reddit' | 'HN' | 'Twitter';
  subreddit?: string;
  username: string;
  quote: string;
  date: string;
  link: string;
}

const platformStyles: Record<Mention['platform'], { label: string; color: string }> = {
  Reddit: { label: 'Reddit', color: 'text-orange-400' },
  HN: { label: 'Hacker News', color: 'text-orange-300' },
  Twitter: { label: 'X / Twitter', color: 'text-sky-400' },
};

const mentions: Mention[] = [
  {
    platform: 'Reddit',
    subreddit: 'r/standingdesks',
    username: 'ergo_nerd_42',
    quote: 'Finally something that actually tracks my desk usage automatically. Ordered.',
    date: '2026-03-18',
    link: '#',
  },
  {
    platform: 'HN',
    username: 'tinkerer9',
    quote:
      'The WinAPI overlay approach is clever. Most tools use Electron for this and it\u2019s sluggish.',
    date: '2026-03-19',
    link: '#',
  },
  {
    platform: 'Reddit',
    subreddit: 'r/quantifiedself',
    username: 'data_driven_dev',
    quote: 'I was standing only 11% before this. Now at 28% after 2 weeks.',
    date: '2026-03-20',
    link: '#',
  },
  {
    platform: 'Reddit',
    subreddit: 'r/selfhosted',
    username: 'privacyfirst_',
    quote:
      'No cloud, no account, SQLite locally. This is how all health apps should work.',
    date: '2026-03-20',
    link: '#',
  },
  {
    platform: 'Twitter',
    username: '@desk_hacker',
    quote:
      'Just got my zntlDesk kit. Mount took 30 seconds. Already seeing data.',
    date: '2026-03-21',
    link: '#',
  },
  {
    platform: 'Reddit',
    subreddit: 'r/homeautomation',
    username: 'smarthome_pl',
    quote:
      'The WebSocket server means I can pipe this into Home Assistant. Brilliant.',
    date: '2026-03-22',
    link: '#',
  },
  {
    platform: 'HN',
    username: 'foss_advocate',
    quote: 'Open source hardware + open source software. This is the way.',
    date: '2026-03-22',
    link: '#',
  },
  {
    platform: 'Reddit',
    subreddit: 'r/standingdesks',
    username: 'back_pain_no_more',
    quote:
      'My physio recommended changing position every 30\u201345 min. This actually makes me do it.',
    date: '2026-03-23',
    link: '#',
  },
];

export default function SocialWall() {
  return (
    <section id="social-wall" className="py-24 border-t border-gray-800/50">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          What People Are Saying
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
          From communities that care about ergonomics, privacy, and open source.
        </p>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {mentions.map((m, i) => (
            <MentionCard key={i} mention={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MentionCard({ mention, index }: { mention: Mention; index: number }) {
  const style = platformStyles[mention.platform];

  return (
    <a
      href={mention.link}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-6 block break-inside-avoid rounded-2xl border border-gray-800 bg-dark-800 p-5 transition-colors hover:border-gray-700"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Platform + subreddit */}
      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className={`font-semibold ${style.color}`}>{style.label}</span>
        {mention.subreddit && (
          <span className="text-gray-500">{mention.subreddit}</span>
        )}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-gray-300">
        &ldquo;{mention.quote}&rdquo;
      </p>

      {/* Username + date */}
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>{mention.username}</span>
        <span>{mention.date}</span>
      </div>
    </a>
  );
}

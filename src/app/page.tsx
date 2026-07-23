'use client';

import { motion } from 'framer-motion';
const chessPieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
const goPieces = ['⚫', '⚪'];

function FloatingPiece({
  piece,
  delay,
  x,
  y,
}: {
  piece: string;
  delay: number;
  x: number;
  y: number;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute select-none text-2xl opacity-[0.06] sm:text-3xl"
      style={{ left: `${String(x)}%`, top: `${String(y)}%` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.06, 0.08, 0.06, 0],
        y: [20, -30, -60, -90, -120],
        rotate: [0, 10, -10, 5, 0],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 8 + 4,
        ease: 'easeInOut',
      }}
    >
      {piece}
    </motion.span>
  );
}

const floatingPieces = [...chessPieces, ...goPieces, ...chessPieces.slice(0, 4)].map(
  (piece, i) => ({
    piece,
    delay: i * 1.5,
    x: Math.round(5 + ((i * 17 + 11) % 90)),
    y: Math.round(5 + ((i * 23 + 7) % 85)),
  }),
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[96px]" />
      </div>

      {/* Floating pieces */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingPieces.map((fp, i) => (
          <FloatingPiece key={i} {...fp} />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo / Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur-sm"
            animate={{ borderColor: ['rgba(129,140,248,0.2)', 'rgba(129,140,248,0.4)', 'rgba(129,140,248,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Under development
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Willy&apos;s
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Academy
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-12 max-w-lg text-lg text-slate-400 sm:text-xl"
        >
          Master strategic thinking through{' '}
          <span className="text-slate-200">Chess</span> &{' '}
          <span className="text-slate-200">Go</span>
          <br />
          <span className="text-indigo-300/80">AI-powered insights for personal growth</span>
        </motion.p>

        {/* Game icons */}
        <motion.div variants={itemVariants} className="mb-14 flex gap-6">
          <motion.div
            className="group flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-indigo-400/30 hover:bg-indigo-500/10"
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl transition-transform group-hover:scale-110">♔</span>
            <span className="mt-1 text-xs text-slate-400 group-hover:text-indigo-300">Chess</span>
          </motion.div>
          <motion.div
            className="group flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-violet-400/30 hover:bg-violet-500/10"
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl transition-transform group-hover:scale-110">⚫</span>
            <span className="mt-1 text-xs text-slate-400 group-hover:text-violet-300">Go</span>
          </motion.div>
        </motion.div>

        {/* Features preview */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { icon: '🧠', title: 'AI Analysis', desc: 'Deep game insights powered by AI' },
            { icon: '📈', title: 'Growth Path', desc: 'Personalized learning journey' },
            { icon: '🎯', title: 'Strategic Skills', desc: 'Real-world decision making' },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 backdrop-blur-sm"
              whileHover={{ borderColor: 'rgba(255,255,255,0.1)', y: -2 }}
            >
              <div className="mb-2 text-2xl">{feature.icon}</div>
              <h3 className="text-sm font-medium text-slate-200">{feature.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-6 text-xs text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        © 2026 Willy&apos;s Academy — Coming Soon
      </motion.footer>
    </main>
  );
}

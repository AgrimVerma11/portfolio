"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { skillClusters, interClusterLinks, type SkillNode } from "@/lib/skills";

const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Node: icon inside a proficiency ring; glows in the cluster color on hover. */
function ConstellationNode({
  node,
  color,
  delay,
}: {
  node: SkillNode;
  color: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const Icon = node.icon;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      data-cursor="hover"
      tabIndex={0}
      role="img"
      aria-label={`${node.name}, proficiency ${Math.round(node.level * 100)}%`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <svg viewBox="0 0 60 60" className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="30"
            cy="30"
            r={RING_RADIUS}
            fill="rgba(14,14,26,0.85)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="30"
            cy="30"
            r={RING_RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            initial={reduce ? { strokeDashoffset: RING_CIRCUMFERENCE * (1 - node.level) } : { strokeDashoffset: RING_CIRCUMFERENCE }}
            whileInView={{ strokeDashoffset: RING_CIRCUMFERENCE * (1 - node.level) }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
            opacity={0.7}
          />
        </svg>
        <Icon
          className="relative h-5 w-5 text-text-secondary transition-all duration-300 group-hover:scale-110 group-hover:text-text-primary group-focus-visible:text-text-primary"
          style={{ filter: "none" }}
        />
        {/* hover glow */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ boxShadow: `0 0 24px 4px ${color}44` }}
        />
      </div>
      <p className="mt-1 whitespace-nowrap text-center font-mono text-[11px] text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
        {node.name}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <Reveal>
        <p className="mb-3 font-mono text-sm tracking-wider text-accent-primary/80">
          <span className="text-text-muted">{"//"}</span> tech stack
        </p>
        <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
          <span className="text-accent-primary">&lt;</span>
          Skills
          <span className="text-accent-primary"> /&gt;</span>
        </h2>
        <p className="mt-4 max-w-lg text-text-secondary">
          The constellation I navigate by – grouped by orbit, sized by hours logged.
        </p>
      </Reveal>

      {/* Desktop: constellation graph */}
      <div className="relative mt-16 hidden aspect-[16/10] w-full md:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          {/* faint structural lines between cluster hubs */}
          {interClusterLinks.map(([a, b], i) => (
            <motion.line
              key={`hub-${i}`}
              x1={skillClusters[a].hub.x}
              y1={skillClusters[a].hub.y}
              x2={skillClusters[b].hub.x}
              y2={skillClusters[b].hub.y}
              stroke="rgba(240,238,248,0.05)"
              strokeWidth="0.15"
              strokeDasharray="1 1.5"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 1.2, ease: "easeOut" }}
            />
          ))}
          {/* spokes from each node to its cluster hub */}
          {skillClusters.map((cluster, ci) =>
            cluster.nodes.map((node, ni) => (
              <motion.line
                key={`${cluster.category}-${node.name}`}
                x1={cluster.hub.x}
                y1={cluster.hub.y}
                x2={node.x}
                y2={node.y}
                stroke={cluster.color}
                strokeOpacity="0.14"
                strokeWidth="0.12"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + ci * 0.12 + ni * 0.05, duration: 0.8 }}
              />
            ))
          )}
          {/* hub points */}
          {skillClusters.map((cluster) => (
            <circle
              key={cluster.category}
              cx={cluster.hub.x}
              cy={cluster.hub.y}
              r="0.45"
              fill={cluster.color}
              opacity="0.8"
            />
          ))}
        </svg>

        {/* category labels at hubs */}
        {skillClusters.map((cluster) => (
          <span
            key={cluster.category}
            className="absolute -translate-x-1/2 translate-y-2 font-mono text-[11px] tracking-widest"
            style={{
              left: `${cluster.hub.x}%`,
              top: `${cluster.hub.y}%`,
              color: cluster.color,
              opacity: 0.75,
            }}
          >
            {cluster.category.toUpperCase()}
          </span>
        ))}

        {/* skill nodes */}
        {skillClusters.map((cluster, ci) =>
          cluster.nodes.map((node, ni) => (
            <ConstellationNode
              key={`${cluster.category}-${node.name}`}
              node={node}
              color={cluster.color}
              delay={0.2 + ci * 0.12 + ni * 0.06}
            />
          ))
        )}
      </div>

      {/* Mobile: grouped chips with cascading proficiency bars */}
      <div className="mt-12 space-y-8 md:hidden">
        {skillClusters.map((cluster, ci) => (
          <Reveal key={cluster.category} delay={ci * 0.05}>
            <h3
              className="mb-3 font-mono text-xs tracking-widest"
              style={{ color: cluster.color }}
            >
              {cluster.category.toUpperCase()}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {cluster.nodes.map((node, ni) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.name}
                    className="rounded-lg border border-white/5 bg-bg-secondary px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-text-secondary" />
                      <span className="truncate text-sm text-text-primary">{node.name}</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: cluster.color, opacity: 0.7 }}
                        initial={reduce ? { width: `${node.level * 100}%` } : { width: 0 }}
                        whileInView={{ width: `${node.level * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + ni * 0.08, duration: 0.7, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';

const groups = [
  { id: 'backend', label: 'Backend engineering', number: '01', description: 'Reliable services, authentication boundaries, and API contracts.', skills: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JPA / Hibernate'] },
  { id: 'frontend', label: 'Frontend engineering', number: '02', description: 'Clear interfaces shaped around people, content, and interaction.', skills: ['Angular', 'TypeScript', 'HTML', 'CSS'] },
  { id: 'database', label: 'Data & migrations', number: '03', description: 'Data models and migration flows that can evolve with the product.', skills: ['PostgreSQL', 'SQL', 'Flyway', 'Schema design'] },
  { id: 'infrastructure', label: 'Infrastructure', number: '04', description: 'Repeatable environments and the systems knowledge behind them.', skills: ['Docker', 'Linux', 'Git', 'CI/CD concepts'] },
  { id: 'foundations', label: 'Foundations', number: '05', description: 'The lower layers: algorithms, memory, processes, and robust code.', skills: ['C', 'C++', 'Algorithms', 'Data structures'] },
];

export function SkillsConstellation() {
  const [selectedId, setSelectedId] = useState(groups[0].id);
  const selected = groups.find((group) => group.id === selectedId) ?? groups[0];
  return <section className="skills-section" id="expertise" aria-labelledby="skills-title"><div className="skills-layout"><div><div className="section-number light"><span>03</span><i /> KNOWLEDGE SYSTEM</div><h2 id="skills-title">Tools are only<br /><span>useful in context.</span></h2><p className="skills-intro">A constellation rather than a scorecard. Select a domain to see the engineering focus behind it.</p><div className="skills-detail" aria-live="polite"><span>{selected.number} / {selected.label}</span><p>{selected.description}</p><ul>{selected.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div></div><div className="constellation" aria-label="Technology groups">{groups.map((group, index) => <button type="button" aria-pressed={selectedId === group.id} className={`constellation-node node-${index + 1} ${selectedId === group.id ? 'is-selected' : ''}`} key={group.id} onClick={() => setSelectedId(group.id)}><span>{group.number}</span><b>{group.label}</b></button>)}<i className="constellation-line line-1" /><i className="constellation-line line-2" /><i className="constellation-line line-3" /><i className="constellation-line line-4" /><i className="constellation-core" /></div></div></section>;
}

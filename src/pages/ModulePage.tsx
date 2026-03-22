import type { ModuleContent } from '../types/workspace'

type ModulePageProps = {
  title: string
  module: ModuleContent | undefined
}

export default function ModulePage({ title, module }: ModulePageProps) {
  return (
    <section className="module-stage" aria-label={`${title} view`}>
      <div className="module-head">
        <p className="eyebrow">{module?.subtitle ?? 'Workspace Module'}</p>
        <h2>{module?.title ?? title}</h2>
        <p className="muted">{module?.description ?? 'Live module preview.'}</p>
      </div>
      <div className="module-grid">
        {(module?.cards ?? []).map((card) => (
          <article className="module-card" key={card.title}>
            <h3>{card.title}</h3>
            <p className="muted">{card.description}</p>
            <button type="button" className="ghost-btn">
              {card.action}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

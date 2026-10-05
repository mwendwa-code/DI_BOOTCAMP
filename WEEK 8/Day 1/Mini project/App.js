import { Fragment } from 'react';
import { ColumnLeft } from './src/columns/ColumnLeft.js';
import { ColumnRight } from './src/columns/ColumnRight.js';

export const App = () => (
  <Fragment>
    <header className="topbar">
      <div className="topbar-inner">
        <span className="brand-mark" aria-hidden="true">EB</span>
        <span>Error boundaries in React</span>
      </div>
    </header>

    <main className="page-layout">
      <aside className="column column-left">
        <ColumnLeft />
      </aside>
      <section className="column column-right">
        <ColumnRight />
      </section>
    </main>
  </Fragment>
);

function UnknownPage(): JSX.Element {
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <div className="cities">
        <span style={{ fontSize: 404, alignSelf: 'center' }}>404</span>
        <div className="cities__status-wrapper tabs__content">
          <h2>{'If we knew what it was, but we don\'t know what it is'}</h2>
        </div>
      </div>
    </main>
  );
}

export default UnknownPage;

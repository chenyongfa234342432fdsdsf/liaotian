import styles from './layout.module.css'

export function UserChatInfoLayout(props) {
  const { Info, Note, Media, Settings, CommonSettings } = props
  return (
    <div className={styles.scoped}>
      {Info && (
        <section className="info-section">
          <Info />
        </section>
      )}
      {Note && (
        <section className="note-section">
          <Note />
        </section>
      )}
      {Media && (
        <section className="media-section">
          <Media />
        </section>
      )}
      {Settings && (
        <section className="settings-section">
          <Settings />
        </section>
      )}
      {CommonSettings && (
        <section className="common-settings-section">
          <CommonSettings />
        </section>
      )}
    </div>
  )
}

export function GroupChatInfoLayout(props) {
  const { Info, Note, Media, Settings, GroupSettings, Members, CommonSettings } = props
  return (
    <div className={styles.scoped}>
      {Info && (
        <section className="info-section">
          <Info />
        </section>
      )}
      {Note && (
        <section className="note-section">
          <Note />
        </section>
      )}
      {Media && (
        <section className="media-section">
          <Media />
        </section>
      )}
      {Settings && (
        <section className="settings-section">
          <Settings />
        </section>
      )}
      {GroupSettings && (
        <section className="GroupSettings-section">
          <GroupSettings />
        </section>
      )}
      {Members && (
        <section className="Members-section">
          <Members />
        </section>
      )}
      {CommonSettings && (
        <section className="common-settings-section">
          <CommonSettings />
        </section>
      )}
    </div>
  )
}

export function SystemAdminChatInfoLayout(props) {
  const { Info } = props
  return (
    <div className={styles.scoped} style={{ height: 'calc(100% - 60px)' }}>
      {Info && (
        <section className="info-section h-full">
          <Info />
        </section>
      )}
    </div>
  )
}

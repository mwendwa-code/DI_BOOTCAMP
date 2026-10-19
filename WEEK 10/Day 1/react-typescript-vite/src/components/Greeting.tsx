interface GreetingProps {
  name: string
  messageCount: number
}

function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <div className="greeting-content">
      <div className="avatar avatar-sun" aria-hidden="true">J</div>
      <div>
        <p className="greeting-title">Good to see you, {name}.</p>
        <p className="muted-copy">
          You have {messageCount} new {messageCount === 1 ? 'message' : 'messages'}.
        </p>
      </div>
      <span className="message-badge" aria-label={`${messageCount} messages`}>
        {messageCount}
      </span>
    </div>
  )
}

export default Greeting

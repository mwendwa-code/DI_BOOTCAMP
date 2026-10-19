interface UserCardProps {
  name?: string
  age?: number
  role?: string
}

function UserCard({
  name = 'Alex Morgan',
  age = 28,
  role = 'Frontend Developer',
}: UserCardProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter((initial): initial is string => initial !== undefined)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="user-card">
      <div className="avatar avatar-profile" aria-hidden="true">{initials}</div>
      <div className="user-card-info">
        <p className="user-name">{name}</p>
        <p className="muted-copy">{role}</p>
      </div>
      <span className="user-age">{age} yrs</span>
    </div>
  )
}

export default UserCard
